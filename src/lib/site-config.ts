/**
 * Single source of truth for store details. Phone, address, hours and links are edited in the
 * admin (/keystatic → ข้อมูลร้าน) and saved to content/store.json; every page (header, footer,
 * contact buttons, maps, JSON-LD) reads them from here.
 */

import stored from "@content/store.json";
import type { Localized } from "@/i18n/config";
import { fromContent } from "./content";

type StoredAddressLines = { street?: string; district?: string; province?: string };

type StoredStore = {
  phone?: string;
  hours?: { open?: string; close?: string };
  address?: { th?: StoredAddressLines; en?: StoredAddressLines; postalCode?: string };
  social?: { line?: string; facebook?: string; instagram?: string; tiktok?: string };
  googleReviewUrl?: string;
};

const data = fromContent<StoredStore>(stored);

/** Stops the build with a message saying which admin field to fix, instead of publishing a broken page. */
function required(value: string | undefined, field: string): string {
  const trimmed = value?.trim();
  if (!trimmed) throw new Error(`content/store.json: "${field}" is empty. Fill it in at /keystatic → ข้อมูลร้าน.`);
  return trimmed;
}

/** "10:00" → minutes after midnight. */
function parseClock(value: string | undefined, field: string): number {
  const match = required(value, field).match(/^(\d{1,2}):(\d{2})$/);
  if (!match) throw new Error(`content/store.json: "${field}" must look like 10:00, got "${value}".`);
  return Number(match[1]) * 60 + Number(match[2]);
}

/** Thai number as typed ("042-722-394") → international format for tel: links and structured data. */
function toE164(display: string): string {
  const digits = display.replace(/\D/g, "");
  return digits.startsWith("0") ? `+66${digits.slice(1)}` : `+${digits}`;
}

type AddressLines = {
  street: string;
  /** District + province line, e.g. "อ.สว่างแดนดิน จ.สกลนคร". */
  locality: string;
  /** อำเภอ */
  district: string;
  /** จังหวัด */
  province: string;
  full: string;
};

const postalCode = required(data.address?.postalCode, "address.postalCode");

function addressLines(lines: StoredAddressLines | undefined, lang: "th" | "en"): AddressLines {
  const street = required(lines?.street, `address.${lang}.street`);
  const district = required(lines?.district, `address.${lang}.district`);
  const province = required(lines?.province, `address.${lang}.province`);
  const locality = lang === "th" ? `อ.${district} จ.${province}` : `${district}, ${province}`;
  const full = lang === "th" ? `${street} ${locality} ${postalCode}` : `${street}, ${locality} ${postalCode}`;
  return { street, locality, district, province, full };
}

const address: Localized<AddressLines> & { postalCode: string; country: string } = {
  postalCode,
  country: "TH",
  th: addressLines(data.address?.th, "th"),
  en: addressLines(data.address?.en, "en"),
};

// Search in Thai: that is how the shop is listed on Google Maps.
const mapQuery = `นานาคอฟฟี่ ${address.th.street} ${address.th.district} ${address.th.province} ${postalCode}`;
const embed = (hl: string) => `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&hl=${hl}&z=16&output=embed`;

/** Full profile URLs. An empty value hides its button and keeps it out of structured data. */
type SocialLinks = {
  /** LINE Official Account, e.g. "https://line.me/R/ti/p/@nanacoffee" */
  line: string;
  facebook: string;
  instagram: string;
  tiktok: string;
};

const social: SocialLinks = {
  line: data.social?.line?.trim() ?? "",
  facebook: data.social?.facebook?.trim() ?? "",
  instagram: data.social?.instagram?.trim() ?? "",
  tiktok: data.social?.tiktok?.trim() ?? "",
};

const phoneDisplay = required(data.phone, "phone");

const hours = {
  /** Minutes after midnight (Asia/Bangkok). The store opens every day. */
  open: parseClock(data.hours?.open, "hours.open"),
  close: parseClock(data.hours?.close, "hours.close"),
};
if (hours.close <= hours.open) {
  throw new Error(
    `content/store.json: closing time (${data.hours?.close}) must be after opening time (${data.hours?.open}).`,
  );
}

/**
 * Language-neutral store facts. Wording (branch name, tagline, opening-hours sentence)
 * lives in src/i18n/dictionaries so it can be translated.
 */
export const siteConfig = {
  name: "NaNa Coffee",
  nameTh: "นานาคอฟฟี่",
  phone: {
    display: phoneDisplay,
    href: `tel:${toE164(phoneDisplay)}`,
    e164: toE164(phoneDisplay),
  },
  address,
  hours,
  maps: {
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`,
    searchUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`,
    embedUrl: { th: embed("th"), en: embed("en") } satisfies Localized,
  },
  social,
  reviews: {
    /**
     * "Ask for reviews" link from Google Business Profile (looks like https://g.page/r/XXXX/review).
     * While empty, the review button opens the store on Google Maps instead.
     */
    googleWriteReviewUrl: data.googleReviewUrl?.trim() ?? "",
  },
} as const;

export const lineUrl: string | null = siteConfig.social.line || null;

export const writeReviewUrl: string = siteConfig.reviews.googleWriteReviewUrl || siteConfig.maps.searchUrl;

/** Configured social profiles, for footer links and schema.org `sameAs`. */
export const socialProfiles = (
  [
    { id: "line", label: "LINE", url: siteConfig.social.line },
    { id: "facebook", label: "Facebook", url: siteConfig.social.facebook },
    { id: "instagram", label: "Instagram", url: siteConfig.social.instagram },
    { id: "tiktok", label: "TikTok", url: siteConfig.social.tiktok },
  ] as const
).filter((profile) => profile.url !== "");
