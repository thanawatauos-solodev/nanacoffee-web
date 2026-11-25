# NaNa Coffee (นานาคอฟฟี่) สาขาสว่างแดนดิน

เว็บไซต์แนะนำร้าน (presentation site) **2 ภาษา (ไทย / English)**: หน้าแรกเล่าเรื่องร้าน, เมนูพร้อมราคา, รีวิวจากลูกค้า และหน้าติดต่อ
การสั่งอาหารกลับบ้านทำผ่าน **โทรศัพท์ / LINE** ทุกปุ่มจึงใช้งานได้จริงโดยไม่ต้องมีระบบหลังบ้าน

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · Tailwind CSS v4 · Motion (animation) · Lucide (icons)

## เริ่มใช้งาน

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (ทุกหน้าเป็น static)
npm run lint
```

## หน้าเว็บ

| ไทย | English | เนื้อหา |
| --- | --- | --- |
| `/` | `/en` | Hero, เรื่องของร้าน, เมนูแนะนำ, โปรโมชั่น, บรรยากาศ, รีวิว, แผนที่ |
| `/menu` | `/en/menu` | เมนูทั้งหมด แบ่งหมวด ค้นหาได้ทั้งไทยและอังกฤษ แสดงราคาร้อน/เย็น/ปั่น |
| `/reviews` | `/en/reviews` | คะแนนเฉลี่ย, กรองตามหัวข้อ, เรียงตามวันที่/คะแนน, ปุ่มเขียนรีวิวบน Google |
| `/contact` | `/en/contact` | ที่อยู่ เบอร์โทร แผนที่, เวลาเปิด-ปิด (ไฮไลต์วันนี้), คำถามที่พบบ่อย |

## 2 ภาษา (i18n)

- ภาษาไทยเป็นภาษาหลัก อยู่ที่ URL เดิมไม่มี prefix ส่วนภาษาอังกฤษอยู่ใต้ `/en` ปุ่ม **TH | EN** บน header สลับภาษาโดยอยู่หน้าเดิม
- หน้าทั้งหมดอยู่ใน `src/app/[lang]/` และ `src/proxy.ts` rewrite `/menu` → `/th/menu` ภายใน (URL ไม่เปลี่ยน) ส่วน `/th/...` จะ redirect ไป URL ไม่มี prefix
- ไม่ redirect ตามภาษาเบราว์เซอร์ เพื่อให้ Google เก็บได้ทั้งสองภาษา
- **ข้อความ UI** อยู่ที่ `src/i18n/dictionaries/th.ts` (ต้นแบบ) และ `en.ts` ถ้าเพิ่ม key ใน th แล้วลืมใส่ใน en, TypeScript จะแจ้ง error
  - `{name}` คือค่าที่เติมทีหลัง ส่วน `[[คำ]]` บังคับไม่ให้ตัดบรรทัดกลางคำ (เช่น ชื่อถนน)
- **ข้อมูลที่มีสองภาษา** (เมนู, โปรโมชั่น, คำถามที่พบบ่อย, ที่อยู่) เก็บเป็น `{ th: "...", en: "..." }` ในไฟล์ข้อมูลของแต่ละ feature
- รีวิวเก็บข้อความต้นฉบับ + `language` และใส่คำแปลใน `translations` ได้ หน้าภาษาอื่นจะแสดงคำแปลพร้อมป้าย "Translated from Thai"
- Server Component อ่านภาษาด้วย `getLocale()` / `getDictionary()` (`src/i18n/server.ts`, ใช้ `next/root-params`) ส่วน Client Component ใช้ `useI18n()`
- เพิ่มภาษาใหม่: เพิ่มใน `locales` (`src/i18n/config.ts`), สร้าง dictionary ใหม่, แล้วเติม key ภาษานั้นในไฟล์ข้อมูล

## แก้ไขข้อมูลร้าน

| ต้องการแก้ | ไฟล์ |
| --- | --- |
| ที่อยู่ (ไทย/อังกฤษ) เบอร์โทร เวลาเปิด-ปิด แผนที่ | `src/lib/site-config.ts` |
| ข้อความบนเว็บ ชื่อสาขา คำอธิบายร้าน (SEO) | `src/i18n/dictionaries/th.ts`, `en.ts` |
| **LINE OA, Facebook, Instagram, TikTok** (เว้นว่าง = ซ่อนปุ่ม) | `src/lib/site-config.ts` → `social` |
| **ลิงก์ขอรีวิว Google** | `src/lib/site-config.ts` → `reviews.googleWriteReviewUrl` |
| เมนู หมวดหมู่ ราคา (ชื่อและคำอธิบายสองภาษา) | `src/features/menu/data/menu.ts` |
| **รีวิวลูกค้า** | `src/features/reviews/data/reviews.ts` |
| โปรโมชั่น | `src/features/shop/data/promotions.ts` |
| คำถามที่พบบ่อย | `src/features/shop/data/faq.ts` |
| สีและฟอนต์ | `src/app/globals.css` (`@theme`) และ `src/app/layout.tsx` |

**ใส่รูปเมนูจริง:** วางไฟล์ไว้ที่ `public/menu/` แล้วเพิ่ม `image: "/menu/ชื่อไฟล์.jpg"` ให้รายการนั้นใน `menu.ts`

**รีวิวตอนนี้เป็นตัวอย่าง** (`reviewsAreSamples = true`) หน้าเว็บจะขึ้นป้าย "รีวิวตัวอย่าง" จนกว่าจะแทนด้วยรีวิวจริง
(คัดลอกจาก Google / Facebook โดยได้รับอนุญาตจากลูกค้า) แล้วตั้งค่าเป็น `false`

## Deploy (Vercel)

เว็บนี้ต้องรันบน Node server (ใช้ `proxy.ts` และ Cache Components) จึงไม่รองรับ static hosting ส่วน Vercel รองรับครบโดยไม่ต้องตั้งค่าเพิ่ม

1. Push repo ขึ้น GitHub
2. ที่ [vercel.com/new](https://vercel.com/new) เลือก Import repo นี้ (Framework: Next.js ตรวจเจออัตโนมัติ ไม่ต้องแก้ Build Command) แล้วกด Deploy
3. **Settings → Domains** เพิ่มโดเมนของร้าน และตั้ง DNS ตามที่ Vercel แสดง
4. **Settings → Environment Variables** ตั้ง `NEXT_PUBLIC_SITE_URL` = โดเมนจริง (ดู `.env.example`) แล้ว Redeploy
5. ยืนยันเว็บใน [Google Search Console](https://search.google.com/search-console) แล้วส่ง `https://โดเมน/sitemap.xml` และใส่ลิงก์เว็บใน Google Business Profile ของร้าน

- Branch หลัก (`main`) = production ส่วน branch อื่นได้ลิงก์ preview แยก ซึ่งตั้ง noindex ไว้แล้ว
- แผนฟรี (Hobby) ของ Vercel ใช้ได้เฉพาะงานส่วนตัวที่ไม่ใช่เชิงพาณิชย์ เว็บร้านค้าควรใช้แผน Pro
- ตอน build รูปแชร์ลิงก์ (`opengraph-image`) ดึงฟอนต์จาก Google Fonts ถ้าดึงไม่ได้ รูปจะแสดงเฉพาะชื่อร้านภาษาอังกฤษ

## SEO

- **โดเมน:** ตั้ง env `NEXT_PUBLIC_SITE_URL=https://โดเมนของร้าน` ตอน build (ถ้า deploy บน Vercel จะใช้ production URL ให้อัตโนมัติจนกว่าจะตั้ง)
  ค่านี้ใช้ทำ canonical, sitemap, Open Graph และ structured data
- **Metadata ทุกหน้าทั้งสองภาษา:** title / description, canonical, `hreflang` (th / en / x-default), `og:locale`, Open Graph + Twitter card (`src/lib/seo.ts`) และ `<html lang>` ตามภาษา
- **รูปตอนแชร์ลิงก์** (Facebook / LINE): สร้างอัตโนมัติแยกภาษาจาก `src/app/[lang]/opengraph-image.tsx` พร้อมไอคอนหน้าจอ iPhone (`apple-icon.tsx`)
- **`/sitemap.xml` และ `/robots.txt`:** สร้างอัตโนมัติ sitemap มีทุกหน้าทั้งสองภาษาพร้อมลิงก์คู่ภาษา, Vercel preview deployment จะถูกตั้ง noindex
- **Structured data (JSON-LD):** `Restaurant` (ที่อยู่ เบอร์โทร เวลาเปิด ห้องแอร์ ที่จอดรถ) ทุกหน้าตามภาษา, `Menu` พร้อมราคาที่ `/menu`, `BreadcrumbList` หน้าย่อย
  - ไม่ใส่คะแนนรีวิวใน structured data โดยตั้งใจ: Google ไม่นับคะแนนที่ร้านเผยแพร่เกี่ยวกับตัวเอง คะแนนดาวในผลค้นหามาจาก Google Business Profile
- **สิ่งที่ช่วย SEO มากที่สุดอยู่นอกเว็บ:** อัปเดต Google Business Profile ให้ตรงกับเว็บ (เวลาเปิด เบอร์โทร ใส่ลิงก์เว็บ) และขอให้ลูกค้ารีวิวบน Google
  หลังขึ้นโดเมนจริง ให้ส่ง sitemap ใน Google Search Console และทดสอบด้วย [Rich Results Test](https://search.google.com/test/rich-results)

## โครงสร้างโปรเจกต์

```
src/
├── proxy.ts                  # Locale routing (ไทยไม่มี prefix, อังกฤษ /en)
├── app/
│   ├── [lang]/               # ทุกหน้าอยู่ใต้ภาษา
│   │   ├── layout.tsx        # Root layout: <html lang>, ฟอนต์, header, footer, JSON-LD ร้าน
│   │   ├── page.tsx          # หน้าแรก
│   │   ├── menu/  reviews/  contact/
│   │   ├── opengraph-image.tsx   # รูปแชร์ลิงก์แยกภาษา
│   │   └── not-found.tsx  [...rest]/   # หน้า 404 ตามภาษา
│   └── sitemap.ts  robots.ts  manifest.ts  icon.svg  apple-icon.tsx
├── i18n/                     # config, dictionaries (th, en), server/client helpers, path helpers
├── features/                 # แบ่งตามโดเมน: components + data + logic อยู่ด้วยกัน
│   ├── shop/                 # Hero, เรื่องของร้าน, โปรโมชั่น, เวลาเปิด, FAQ, แผนที่, JSON-LD ร้าน
│   ├── menu/                 # ข้อมูลเมนู, catalog, การ์ดเมนู, ค้นหา/หมวดหมู่, JSON-LD เมนู
│   └── reviews/              # ข้อมูลรีวิว, สรุปคะแนน, การ์ด, marquee หน้าแรก, review wall
├── components/
│   ├── ui/                   # Primitive ที่ใช้ร่วมกัน (Button, Reveal, CountUp, SectionHeading…)
│   ├── layout/               # SiteHeader, LanguageSwitcher, MobileTabBar (มีปุ่มโทรตรงกลาง), SiteFooter
│   ├── seo/                  # JsonLd, BreadcrumbJsonLd
│   └── brand/                # โลโก้และกราฟิกตกแต่ง
├── hooks/                    # useStoreClock (เวลาไทย), useHydrated
└── lib/                      # site-config, site-url, seo, time (Asia/Bangkok), format, cn
```

หลักการสำคัญ
- **ข้อมูลร้านอยู่ที่เดียว** (`site-config.ts`) ทั้ง header, footer, ปุ่มติดต่อ, FAQ และ structured data ดึงจากที่นี่
- **เวลาอิงเวลาไทยเสมอ** สถานะเปิด/ปิดและไฮไลต์ "วันนี้" ถูกต้องแม้เครื่องผู้ใช้ตั้งโซนเวลาอื่น และคำนวณบน client หลัง hydrate เพื่อให้ทุกหน้า prerender เป็น static ได้
- **เนื้อหาอยู่ใน HTML ตั้งแต่แรก** เมนู รีวิว และคำตอบ FAQ (`<details>`) อ่านได้โดยไม่ต้องรัน JavaScript ดีต่อ SEO
- **รองรับ reduced motion** แอนิเมชันทั้งหมดหยุดหรือลดลงเมื่อเครื่องตั้งค่าลดการเคลื่อนไหว
