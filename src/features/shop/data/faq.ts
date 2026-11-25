import type { Locale } from "@/i18n/config";
import { lineUrl, siteConfig } from "@/lib/site-config";
import { formatClock } from "@/lib/time";

export type FaqItem = { question: string; answer: string };

const phone = siteConfig.phone.display;
const open = formatClock(siteConfig.hours.open);
const close = formatClock(siteConfig.hours.close);

export const faq: Record<Locale, readonly FaqItem[]> = {
  th: [
    {
      question: "สั่งอาหารกลับบ้านได้ไหม?",
      answer: `ได้ ${lineUrl ? `โทร ${phone} หรือทัก LINE ของร้าน` : `โทร ${phone}`} สั่งล่วงหน้า แล้วแวะมารับที่ร้านได้เลย ไม่ต้องรอนาน`,
    },
    { question: "ร้านมีที่จอดรถไหม?", answer: "มีที่จอดรถสำหรับลูกค้า แวะได้สะดวก ไม่ต้องวนหาที่จอด" },
    {
      question: "มีห้องแอร์ไหม?",
      answer: "มีห้องแอร์เย็นสบาย เหมาะกับนั่งทำงาน อ่านหนังสือ หรือประชุมกลุ่มเล็ก และมีโซนทั่วไปที่โปร่งเป็นกันเอง",
    },
    { question: "ร้านเปิดกี่โมง?", answer: `เปิดทุกวัน ${open} – ${close} น. ที่ ${siteConfig.address.th.full}` },
  ],
  en: [
    {
      question: "Can I order food to take away?",
      answer: `Yes. ${lineUrl ? `Call ${phone} or message us on LINE` : `Call ${phone}`} to order ahead, then pick it up at the shop with no waiting.`,
    },
    { question: "Is there parking?", answer: "Yes, there is customer parking, so it's easy to stop by." },
    {
      question: "Is there an air-conditioned area?",
      answer:
        "Yes. The air-conditioned room is great for working, reading or small meetings, and there is also a relaxed open seating area.",
    },
    { question: "What are your opening hours?", answer: `Open every day, ${open} – ${close}, at ${siteConfig.address.en.full}.` },
  ],
};
