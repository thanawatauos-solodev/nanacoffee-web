# NaNa Coffee (นานาคอฟฟี่) สาขาสว่างแดนดิน

เว็บไซต์แนะนำร้าน (presentation site) **2 ภาษา (ไทย / English)**: หน้าแรกเล่าเรื่องร้าน, เมนูพร้อมราคา, รีวิวจากลูกค้า และหน้าติดต่อ
การสั่งอาหารกลับบ้านทำผ่าน **โทรศัพท์ / LINE** ทุกปุ่มจึงใช้งานได้จริงโดยไม่ต้องมีระบบหลังบ้าน

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · Tailwind CSS v4 · Motion (animation) · Lucide (icons) · Keystatic (หน้า admin แก้เนื้อหา)

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
- **ข้อมูลที่มีสองภาษา** (เมนู, โปรโมชั่น, คำถามที่พบบ่อย, ที่อยู่, ข้อความหลักของแต่ละหน้า) เก็บเป็น `{ "th": "...", "en": "..." }` ในไฟล์ JSON ใต้ `content/` ซึ่งแก้ผ่านหน้า admin ถ้าช่องภาษาอังกฤษว่าง หน้าอังกฤษจะแสดงภาษาไทยแทน
- รีวิวเก็บข้อความต้นฉบับ + ภาษาที่ลูกค้าเขียน และใส่คำแปลได้ หน้าภาษาอื่นจะแสดงคำแปลพร้อมป้าย "Translated from Thai"
- Server Component อ่านภาษาด้วย `getLocale()` / `getDictionary()` (`src/i18n/server.ts`, ใช้ `next/root-params`) ส่วน Client Component ใช้ `useI18n()`
- เพิ่มภาษาใหม่: เพิ่มใน `locales` (`src/i18n/config.ts`), สร้าง dictionary ใหม่, แล้วเติม key ภาษานั้นในไฟล์ข้อมูล

## แก้ไขเนื้อหา: หน้า admin (`/keystatic`)

คนที่ร้านแก้เนื้อหาเองได้ที่ `https://โดเมนของร้าน/keystatic` โดยไม่ต้องแตะโค้ด หน้า admin สร้างด้วย [Keystatic](https://keystatic.com)
อยู่ในเว็บเดียวกัน ไม่มี database: ทุกฟอร์มบันทึกเป็นไฟล์ JSON ใต้ `content/` (รูปเมนูอยู่ใต้ `public/menu/`) แล้วเว็บอ่านไฟล์เหล่านั้นตอน build

| หน้าใน admin | แก้อะไรได้ | ไฟล์ |
| --- | --- | --- |
| ข้อมูลร้าน | เบอร์โทร ที่อยู่ไทย/อังกฤษ เวลาเปิด-ปิด LINE / Facebook / Instagram / TikTok (เว้นว่าง = ซ่อนปุ่ม) ลิงก์ขอรีวิว Google | `content/store.json` |
| ข้อความบนเว็บ | ชื่อเว็บและคำอธิบายบน Google, ข้อความหน้าแรก (แนะนำร้าน เรื่องราว จุดเด่น), หน้าเมนู, หน้ารีวิว, ส่วนท้าย | `content/site-text.json` |
| โปรโมชั่น | สไลด์โปรโมชั่นหน้าแรก (ไม่มีเลย = ซ่อนส่วนนี้) | `content/promotions.json` |
| คำถามที่พบบ่อย | คำถาม-คำตอบหน้าติดต่อ พิมพ์ `{phone}` `{open}` `{close}` `{address}` เพื่อใส่ข้อมูลร้านให้อัตโนมัติ | `content/faq.json` |
| เมนู (หมวดละหน้า) | ชื่อ คำอธิบาย ราคา (ราคาเดียว หรือร้อน/เย็น/ปั่น) ป้าย ความเผ็ด รูป ชื่อที่ลูกค้ามักเรียก ลากเพื่อเรียงลำดับ | `content/menu/*.json` |
| รีวิวลูกค้า | เพิ่ม/ลบรีวิว คะแนน วันที่ คำแปล หัวข้อ และช่องติ๊ก "ยังเป็นรีวิวตัวอย่าง" | `content/reviews.json` |

**การบันทึก:**
- **บนเว็บจริง (GitHub mode):** ล็อกอินด้วยบัญชี GitHub ที่มีสิทธิ์เขียน repo นี้ กด Save แล้ว Keystatic จะ commit เข้า branch หลัก Vercel จะ deploy ใหม่ให้เอง เว็บอัปเดตในประมาณ 1–2 นาที
- **ตอน `npm run dev` (local mode):** `http://localhost:3000/keystatic` เขียนลงไฟล์ในเครื่องโดยตรง เห็นผลทันทีโดยไม่ต้องล็อกอิน (ตั้ง `NEXT_PUBLIC_KEYSTATIC_STORAGE=github` ถ้าต้องการทดสอบ GitHub mode ในเครื่อง)
- ถ้าข้อมูลร้านไม่ครบ (เช่น ลบเบอร์โทรจนว่าง หรือเวลาปิดก่อนเวลาเปิด) build จะหยุดพร้อมข้อความบอกช่องที่ต้องแก้ เว็บจริงจะยังเป็นเวอร์ชันเดิมจนกว่าจะแก้
- เมนูที่ไม่มีชื่อไทยหรือไม่มีราคาเลยจะถูกข้ามไป (มีคำเตือนใน log ตอน build) เพื่อไม่ให้เมนูที่กรอกไม่เสร็จทำให้การแก้อื่นขึ้นเว็บไม่ได้

**ลิงก์เมนูในรีวิว:** ไม่ต้องติ๊กเอง ถ้าข้อความรีวิว (หรือคำแปล) มีชื่อเมนูไทย ชื่ออังกฤษ หรือ "ชื่อที่ลูกค้ามักเรียก" ของเมนูไหน
จะขึ้นเป็นลิงก์ไปเมนูนั้นให้อัตโนมัติ (`findMentionedDishes` ใน `src/features/menu/catalog.ts`)

**รีวิวตอนนี้เป็นตัวอย่าง:** หน้าเว็บจะขึ้นป้าย "รีวิวตัวอย่าง" จนกว่าจะแทนด้วยรีวิวจริง (คัดลอกจาก Google / Facebook โดยได้รับอนุญาตจากลูกค้า)
แล้วเอาติ๊ก "ยังเป็นรีวิวตัวอย่าง" ในหน้า admin ออก

### ตั้งค่า GitHub mode ครั้งแรก (ทำครั้งเดียว)

1. ในเครื่อง: `NEXT_PUBLIC_KEYSTATIC_STORAGE=github npm run dev` แล้วเปิด `http://localhost:3000/keystatic`
2. Keystatic จะพาสร้าง GitHub App ให้ ใส่ URL เว็บจริงในช่อง deployed URL (เช่น `https://xxx.vercel.app` หรือโดเมนร้าน) แล้วติดตั้ง App บน repo นี้
   เสร็จแล้ว Keystatic จะเขียนค่า `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` และ `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` ลงไฟล์ `.env` (ไฟล์นี้ไม่ถูก commit)
3. คัดลอกทั้ง 4 ค่าไปใส่ใน Vercel → Settings → Environment Variables แล้ว Redeploy
4. เพิ่มคนที่ร้านเป็น collaborator ของ repo บน GitHub (สิทธิ์ Write) เขาจะล็อกอินที่ `/keystatic` ด้วยบัญชี GitHub ของตัวเองได้
5. ถ้าเปลี่ยนโดเมนทีหลัง ให้เพิ่ม `https://โดเมนใหม่/api/keystatic/github/oauth/callback` ใน Callback URL ของ GitHub App

ก่อนตั้งค่าเสร็จ เว็บหลักยัง build และใช้งานได้ปกติ มีแค่หน้า `/keystatic` บนเว็บจริงที่ยังล็อกอินไม่ได้

### สิ่งที่ยังแก้ในโค้ด

| ต้องการแก้ | ไฟล์ |
| --- | --- |
| ข้อความปุ่ม ป้าย และข้อความเล็กๆ อื่น, คำค้นหา SEO (keywords) | `src/i18n/dictionaries/th.ts`, `en.ts` |
| เพิ่ม/ลบหมวดเมนู และสีพื้นหลังของแต่ละหมวด | `src/features/menu/category-list.ts` + `CategoryId` ใน `types.ts` |
| ฟอร์มในหน้า admin (เพิ่มช่อง เปลี่ยนชื่อช่อง) | `keystatic.config.ts` |
| สีและฟอนต์ | `src/app/globals.css` (`@theme`) และ `src/app/[lang]/layout.tsx` |

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
keystatic.config.ts           # ฟอร์มทั้งหมดในหน้า admin (/keystatic)
content/                      # เนื้อหาที่แก้ผ่าน admin: store, site-text, promotions, faq, reviews, menu/*.json
src/
├── proxy.ts                  # Locale routing (ไทยไม่มี prefix, อังกฤษ /en) ยกเว้น /keystatic
├── app/
│   ├── [lang]/               # ทุกหน้าอยู่ใต้ภาษา
│   │   ├── layout.tsx        # Root layout: <html lang>, ฟอนต์, header, footer, JSON-LD ร้าน
│   │   ├── page.tsx          # หน้าแรก
│   │   ├── menu/  reviews/  contact/
│   │   ├── opengraph-image.tsx   # รูปแชร์ลิงก์แยกภาษา
│   │   └── not-found.tsx  [...rest]/   # หน้า 404 ตามภาษา
│   ├── keystatic/            # หน้า admin (root layout แยก ไม่มี header/footer ของเว็บ, noindex)
│   ├── api/keystatic/        # API ของ admin: ล็อกอิน GitHub และบันทึกเนื้อหา
│   └── sitemap.ts  robots.ts  manifest.ts  icon.svg  apple-icon.tsx
├── i18n/                     # config, dictionaries (th, en), site-text (ข้อความจาก admin), server/client helpers, path helpers
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
└── lib/                      # site-config, content (ตัวช่วยอ่าน content/), site-url, seo, time (Asia/Bangkok), format, cn
```

หลักการสำคัญ
- **ข้อมูลร้านอยู่ที่เดียว** (`content/store.json` อ่านผ่าน `site-config.ts`) ทั้ง header, footer, ปุ่มติดต่อ, FAQ และ structured data ดึงจากที่นี่
- **ไฟล์ใน `content/` อ่านผ่านตัวแปลงของแต่ละ feature** (เช่น `features/menu/data/menu.ts`) ซึ่งเติมค่าที่ว่างและแปลงเป็น type ของเว็บ
  ส่วนอื่นของโค้ดจึงใช้ `menuItems`, `reviews`, `siteConfig` เหมือนเดิม และ type ไม่ได้อนุมานจากค่าในไฟล์ การแก้เนื้อหาจึงไม่ทำให้ TypeScript พัง
- **เวลาอิงเวลาไทยเสมอ** สถานะเปิด/ปิดและไฮไลต์ "วันนี้" ถูกต้องแม้เครื่องผู้ใช้ตั้งโซนเวลาอื่น และคำนวณบน client หลัง hydrate เพื่อให้ทุกหน้า prerender เป็น static ได้
- **เนื้อหาอยู่ใน HTML ตั้งแต่แรก** เมนู รีวิว และคำตอบ FAQ (`<details>`) อ่านได้โดยไม่ต้องรัน JavaScript ดีต่อ SEO
- **รองรับ reduced motion** แอนิเมชันทั้งหมดหยุดหรือลดลงเมื่อเครื่องตั้งค่าลดการเคลื่อนไหว
