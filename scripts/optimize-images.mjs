/**
 * Shrinks the photos uploaded through the admin, which Keystatic saves exactly as they came off the phone
 * (often 3000+ px, several MB, with the GPS position in the EXIF data). For each photo it:
 *   - scales it down to the largest size the site can use,
 *   - drops EXIF / XMP / IPTC metadata after applying the EXIF rotation,
 *   - re-encodes it in the same format at web quality.
 * Paths and extensions stay the same, so content/*.json needs no change.
 *
 * Runs before every build (package.json), so the deployed site only ever serves the optimized files.
 * A photo that already fits its rule and carries no metadata is left untouched, so a second run changes nothing.
 *
 *   npm run images:optimize            optimize in place
 *   npm run images:optimize -- --dry-run   only report what would change
 */
import { readdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rules = [
  // Shown at 128 px at most; 1600 px leaves room for search engines, which get the file itself via the menu's structured data.
  { dir: "public/menu", maxSide: 1600, quality: 80, budgetBytes: 500 * 1024 },
  // Equirectangular 360° photos (2:1). 4096 × 2048 is the largest texture many phones can draw.
  { dir: "public/tour", maxSide: 4096, quality: 82, budgetBytes: 2 * 1024 * 1024 },
];

const extensions = new Set([".jpg", ".jpeg", ".jfif", ".png", ".webp"]);

/** Same format out as in. Anything else (GIF, SVG…) is left as is. */
const encoders = {
  jpeg: (image, quality) => image.jpeg({ quality, mozjpeg: true }),
  png: (image) => image.png({ compressionLevel: 9 }),
  webp: (image, quality) => image.webp({ quality }),
};

const root = path.resolve(import.meta.dirname, "..");
const dryRun = process.argv.includes("--dry-run");

async function listImages(dir) {
  const entries = await readdir(path.join(root, dir), { recursive: true, withFileTypes: true }).catch((error) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  return entries
    .filter((entry) => entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => path.join(entry.parentPath, entry.name))
    .sort();
}

/** The new bytes and why, or null when the file is fine as it is. */
async function optimize(input, rule) {
  const { format, width = 0, height = 0, exif, xmp, iptc } = await sharp(input).metadata();
  const encode = encoders[format];
  if (!encode) return null;

  const reasons = [];
  const oversized = Math.max(width, height) > rule.maxSide;
  if (oversized) reasons.push(`${width}×${height}`);
  const hasMetadata = Boolean(exif || xmp || iptc);
  if (hasMetadata) reasons.push("metadata");
  if (input.length > rule.budgetBytes) reasons.push("heavy");
  if (reasons.length === 0) return null;

  const output = await encode(
    sharp(input).autoOrient().resize({ width: rule.maxSide, height: rule.maxSide, fit: "inside", withoutEnlargement: true }),
    rule.quality,
  ).toBuffer();

  // Only heavy: keep the original unless re-encoding clearly helps, so later runs don't recompress it every time.
  if (!oversized && !hasMetadata && output.length > input.length * 0.9) return null;
  return { output, reasons };
}

const formatBytes = (bytes) => (bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`);

let checked = 0;
let changed = 0;
let failed = 0;
let bytesBefore = 0;
let bytesAfter = 0;

for (const rule of rules) {
  for (const file of await listImages(rule.dir)) {
    checked++;
    const name = path.relative(root, file);
    try {
      const input = await readFile(file);
      const result = await optimize(input, rule);
      if (!result) continue;
      if (!dryRun) {
        await writeFile(`${file}.tmp`, result.output);
        await rename(`${file}.tmp`, file);
      }
      changed++;
      bytesBefore += input.length;
      bytesAfter += result.output.length;
      console.log(`[images] ${name}: ${formatBytes(input.length)} → ${formatBytes(result.output.length)} (${result.reasons.join(", ")})`);
    } catch (error) {
      // Skip instead of failing the build, so one broken upload doesn't hold back other edits.
      failed++;
      console.warn(`[images] Skipped ${name}: ${error instanceof Error ? error.message : error}`);
    }
  }
}

const verb = dryRun ? "would optimize" : "optimized";
console.log(
  changed > 0
    ? `[images] ${verb} ${changed} of ${checked} photos: ${formatBytes(bytesBefore)} → ${formatBytes(bytesAfter)}`
    : `[images] ${checked} photos checked, all already optimized`,
  failed > 0 ? `(${failed} skipped)` : "",
);
