/**
 * Single source of truth for store details.
 * Edit here and every page (header, footer, contact buttons, maps, JSON-LD) updates.
 */

import type { Localized } from "@/i18n/config";

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

const postalCode = "47110";

const address: Localized<AddressLines> & { postalCode: string; country: string } = {
  postalCode,
  country: "TH",
  th: {
    street: "101 หมู่ 1 ถนนนิตโย",
    locality: "อ.สว่างแดนดิน จ.สกลนคร",
    district: "สว่างแดนดิน",
    province: "สกลนคร",
    full: `101 หมู่ 1 ถนนนิตโย อ.สว่างแดนดิน จ.สกลนคร ${postalCode}`,
  },
  en: {
    street: "101 Moo 1, Nittayo Road",
    locality: "Sawang Daen Din, Sakon Nakhon",
    district: "Sawang Daen Din",
    province: "Sakon Nakhon",
    full: `101 Moo 1, Nittayo Road, Sawang Daen Din, Sakon Nakhon ${postalCode}`,
  },
};

// Search in Thai: that is how the shop is listed on Google Maps.
const mapQuery = `นานาคอฟฟี่ ${address.th.street} ${address.th.district} ${address.th.province} ${postalCode}`;
const embed = (hl: string) => `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&hl=${hl}&z=16&output=embed`;

/** Full profile URLs. Leave a value empty to hide its button and keep it out of structured data. */
type SocialLinks = {
  /** LINE Official Account, e.g. "https://line.me/R/ti/p/@nanacoffee" */
  line: string;
  facebook: string;
  instagram: string;
  tiktok: string;
};

const social: SocialLinks = {
  line: "",
  facebook: "",
  instagram: "",
  tiktok: "",
};

/**
 * Language-neutral store facts. Wording (branch name, tagline, opening-hours sentence)
 * lives in src/i18n/dictionaries so it can be translated.
 */
export const siteConfig = {
  name: "NaNa Coffee",
  nameTh: "นานาคอฟฟี่",
  phone: {
    display: "042-722-394",
    href: "tel:+6642722394",
    e164: "+6642722394",
  },
  address,
  hours: {
    /** Minutes after midnight (Asia/Bangkok). The store opens every day. */
    open: 10 * 60,
    close: 21 * 60,
  },
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
    googleWriteReviewUrl: "",
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
