import { ImageResponse } from "next/og";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { fill } from "@/i18n/format";
import { dictionaryFor } from "@/i18n/server";
import { ogImageAlt } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { hoursText } from "@/lib/time";

export const alt = ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Build both share cards at build time. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const title = siteConfig.name;
const kicker = "SAWANG DAEN DIN · SAKON NAKHON";
const subtitle: Record<Locale, string> = {
  th: `${siteConfig.nameTh} · คาเฟ่และร้านอาหาร`,
  en: `Café & Restaurant · ${siteConfig.nameTh}`,
};

/**
 * Fetches just the glyphs we need from Google Fonts (TTF, which the image renderer accepts).
 * Cached, so it runs once at build time. Returns null when offline so the image still renders.
 */
async function loadGoogleFont(family: string, text: string): Promise<ArrayBuffer | null> {
  "use cache";
  try {
    const cssResponse = await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`);
    if (!cssResponse.ok) return null;
    const css = await cssResponse.text();
    const fontUrl = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!fontUrl) return null;
    const fontResponse = await fetch(fontUrl);
    return fontResponse.ok ? await fontResponse.arrayBuffer() : null;
  } catch {
    return null;
  }
}

/** One share card per language: /opengraph-image (Thai) and /en/opengraph-image. */
export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const t = dictionaryFor(locale);
  const thaiLine = subtitle[locale];
  const chips = [hoursText(t.site.hours), fill(t.contact.call, { phone: siteConfig.phone.display })];

  const [display, body] = await Promise.all([
    loadGoogleFont("Trirong:ital,wght@1,600", title),
    loadGoogleFont("Anuphan:wght@500", [thaiLine, ...chips, kicker].join("")),
  ]);
  // Without the Thai font the renderer would draw empty boxes, so fall back to Latin-only text.
  const hasThai = body !== null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#2a1a12",
          backgroundImage: "linear-gradient(125deg, #4a2f1f 0%, #2a1a12 48%, #231a12 70%, #2f3a26 100%)",
          color: "#f5ecdc",
          fontFamily: hasThai ? "Anuphan" : undefined,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: 80, width: 720 }}>
          <div style={{ fontSize: 24, letterSpacing: 5, color: "#8ea582" }}>{kicker}</div>
          <div
            style={{
              marginTop: 18,
              fontSize: 112,
              lineHeight: 1.05,
              color: "#fcf8f1",
              fontFamily: display ? "Trirong" : undefined,
              fontStyle: "italic",
            }}
          >
            {title}
          </div>
          {hasThai ? <div style={{ marginTop: 14, fontSize: 44, color: "#e6bb7c" }}>{thaiLine}</div> : null}
          {hasThai ? (
            <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
              {chips.map((chip) => (
                <div
                  key={chip}
                  style={{
                    display: "flex",
                    padding: "10px 24px",
                    borderRadius: 9999,
                    border: "2px solid rgba(245,236,220,0.25)",
                    fontSize: 26,
                    color: "#f5ecdc",
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* Latte seen from above: saucer, cup, crema and a heart of milk foam */}
        <div
          style={{
            position: "absolute",
            right: 70,
            top: 125,
            width: 380,
            height: 380,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 9999,
            background: "#fcf8f1",
            boxShadow: "0 40px 80px rgba(0,0,0,0.45)",
          }}
        >
          <div
            style={{
              width: 300,
              height: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 9999,
              background: "#e8dbc6",
            }}
          >
            <div
              style={{
                width: 254,
                height: 254,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 9999,
                background: "radial-gradient(circle at 50% 42%, #c08447, #8f5626 55%, #4e3324)",
              }}
            >
              <svg width="150" height="140" viewBox="0 0 24 22">
                <path
                  d="M12 21s-7.6-4.7-9.7-9.3C.8 8.3 3 4.4 6.8 4.4c2.1 0 3.6 1.2 5.2 3 1.6-1.8 3.1-3 5.2-3 3.8 0 6 3.9 4.5 7.3C19.6 16.3 12 21 12 21Z"
                  fill="#f5ecdc"
                  opacity="0.94"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        ...(display ? [{ name: "Trirong", data: display, style: "italic" as const, weight: 600 as const }] : []),
        ...(body ? [{ name: "Anuphan", data: body, style: "normal" as const, weight: 500 as const }] : []),
      ],
    },
  );
}
