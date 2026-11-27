/**
 * Admin (/keystatic): the forms the shop uses to edit the site's content without touching code.
 * Every form saves a JSON file under content/ (images under public/menu/), and the site reads
 * those files at build time. In production each save is a commit to GitHub, which redeploys
 * the site on Vercel; in `npm run dev` it writes straight to the files on this machine.
 *
 * Labels are Thai because the people editing are the shop's staff.
 */
import { config, fields, singleton } from "@keystatic/core";
import { categoryList } from "./src/features/menu/category-list";

const repo = { owner: "thanawatauos-solodev", name: "nanacoffee-web" } as const;

// Local files while developing (set NEXT_PUBLIC_KEYSTATIC_STORAGE=github to test the GitHub setup),
// GitHub everywhere else.
const storage =
  process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE !== "github"
    ? ({ kind: "local" } as const)
    : ({ kind: "github", repo } as const);

/** One text, in Thai and English side by side. An empty English box shows the Thai text on the English pages. */
function localized(label: string, options: { multiline?: boolean; description?: string; required?: boolean } = {}) {
  return fields.object(
    {
      th: fields.text({ label: "ไทย", multiline: options.multiline, validation: { isRequired: options.required } }),
      en: fields.text({ label: "English", multiline: options.multiline }),
    },
    { label, description: options.description, layout: [6, 6] },
  );
}

const noWrapHint = "ครอบคำด้วย [[ ]] ถ้าไม่อยากให้ตัดบรรทัดกลางคำ เช่น [[ถนนนิตโย]]";

/**
 * Builds the id of a list item (a dish, a tour spot) from its Thai name, so staff never have to
 * think about it. Keystatic keeps the id once saved; it names the item's image folder.
 * A name in English letters becomes a readable id ("Latte" → "latte"); anything else, such as Thai,
 * becomes the prefix plus a short code from the name. Never empty for a non-empty name, which
 * Keystatic's slug check would refuse.
 */
export function idFromName(prefix: string) {
  return (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return "";
    if (/^[\x20-\x7e]+$/.test(trimmed)) {
      const latin = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      if (latin) return latin;
    }
    let hash = 0x811c9dc5;
    for (const char of trimmed) hash = Math.imul(hash ^ char.codePointAt(0)!, 0x01000193) >>> 0;
    return `${prefix}-${hash.toString(36)}`;
  };
}

// ── Store details ────────────────────────────────────────────────────

const clock = (label: string) =>
  fields.text({
    label,
    validation: {
      isRequired: true,
      pattern: { regex: /^([01]?\d|2[0-3]):[0-5]\d$/, message: "ใช้รูปแบบ 24 ชั่วโมง เช่น 10:00 หรือ 21:30" },
    },
  });

const addressLines = (label: string) =>
  fields.object(
    {
      street: fields.text({ label: "บ้านเลขที่ / ถนน", validation: { isRequired: true } }),
      district: fields.text({ label: "อำเภอ", description: "ไม่ต้องใส่ อ.", validation: { isRequired: true } }),
      province: fields.text({ label: "จังหวัด", description: "ไม่ต้องใส่ จ.", validation: { isRequired: true } }),
    },
    { label, layout: [6, 3, 3] },
  );

const store = singleton({
  label: "ข้อมูลร้าน",
  path: "content/store",
  format: { data: "json" },
  schema: {
    phone: fields.text({
      label: "เบอร์โทร",
      description: "ใช้กับปุ่มโทรทุกจุดบนเว็บ",
      validation: {
        isRequired: true,
        pattern: { regex: /^0[\d\s-]{8,13}$/, message: "ใส่เบอร์ที่ขึ้นต้นด้วย 0 เช่น 042-722-394" },
      },
    }),
    hours: fields.object(
      { open: clock("เปิด"), close: clock("ปิด") },
      { label: "เวลาเปิด-ปิด (ทุกวัน)", description: "เวลาปิดต้องอยู่หลังเวลาเปิดในวันเดียวกัน", layout: [6, 6] },
    ),
    address: fields.object(
      {
        th: addressLines("ที่อยู่ภาษาไทย"),
        en: addressLines("ที่อยู่ภาษาอังกฤษ"),
        postalCode: fields.text({
          label: "รหัสไปรษณีย์",
          validation: { isRequired: true, pattern: { regex: /^\d{5}$/, message: "ตัวเลข 5 หลัก" } },
        }),
      },
      { label: "ที่อยู่", description: "ใช้ในหน้าติดต่อ แผนที่ และข้อมูลร้านที่ส่งให้ Google" },
    ),
    social: fields.object(
      {
        line: fields.url({ label: "LINE OA", description: "เช่น https://line.me/R/ti/p/@nanacoffee" }),
        facebook: fields.url({ label: "Facebook" }),
        instagram: fields.url({ label: "Instagram" }),
        tiktok: fields.url({ label: "TikTok" }),
      },
      { label: "ลิงก์โซเชียล", description: "ใส่ลิงก์เต็ม เว้นว่างไว้ = ไม่แสดงปุ่มนั้น", layout: [6, 6, 6, 6] },
    ),
    googleReviewUrl: fields.url({
      label: "ลิงก์ขอรีวิว Google",
      description:
        "จาก Google Business Profile (หน้าตาแบบ https://g.page/r/XXXX/review) ถ้าเว้นว่าง ปุ่มเขียนรีวิวจะเปิดร้านใน Google Maps แทน",
    }),
  },
});

// ── Page copy ────────────────────────────────────────────────────────

const amenity = (label: string) =>
  fields.object({ title: localized("หัวข้อ"), body: localized("คำอธิบาย") }, { label });

const siteText = singleton({
  label: "ข้อความบนเว็บ",
  path: "content/site-text",
  format: { data: "json" },
  schema: {
    site: fields.object(
      {
        title: localized("ชื่อเว็บบน Google", { required: true, description: "บรรทัดสีน้ำเงินในผลค้นหา ยาวไม่เกิน ~60 ตัวอักษร" }),
        description: localized("คำอธิบายบน Google", {
          multiline: true,
          required: true,
          description: "ข้อความใต้ชื่อเว็บในผลค้นหา ยาวประมาณ 1–2 บรรทัด ถ้าเปลี่ยนเวลาเปิด-ปิด อย่าลืมแก้ตรงนี้ด้วย",
        }),
        tagline: localized("สโลแกนสั้นๆ", { required: true, description: "แสดงที่ส่วนท้ายของทุกหน้า" }),
      },
      { label: "ทั้งเว็บ / Google" },
    ),
    hero: fields.object(
      { intro: localized("ข้อความแนะนำร้าน", { multiline: true, required: true }) },
      { label: "หน้าแรก · ส่วนบนสุด" },
    ),
    ribbon: fields.array(localized("คำ", { required: true }), {
      label: "หน้าแรก · แถบคำที่วิ่งผ่าน",
      itemLabel: (props) => props.fields.th.value || "คำใหม่",
    }),
    story: fields.object(
      {
        titleStart: localized("หัวข้อ (ช่วงแรก)", { required: true }),
        titleAccent: localized("หัวข้อ (ช่วงตัวเอียงสีเขียว)", { required: true }),
        titleEnd: localized("หัวข้อ (ช่วงท้าย)", { required: true, description: noWrapHint }),
        body: fields.array(localized("ย่อหน้า", { multiline: true, required: true, description: noWrapHint }), {
          label: "เนื้อหา",
          itemLabel: (props) => props.fields.th.value.slice(0, 60) || "ย่อหน้าใหม่",
        }),
      },
      { label: "หน้าแรก · เรื่องราวของร้าน" },
    ),
    signature: fields.object(
      { title: localized("หัวข้อ", { required: true }), description: localized("คำอธิบาย", { multiline: true }) },
      { label: "หน้าแรก · เมนูแนะนำ", description: "เมนูที่แสดงคือเมนูที่ติดป้าย \"ซิกเนเจอร์\"" },
    ),
    amenities: fields.object(
      {
        title: localized("หัวข้อ", { required: true, description: noWrapHint }),
        description: localized("คำอธิบาย", { multiline: true }),
        items: fields.object(
          {
            airConditioned: amenity("ช่องที่ 1 (ไอคอนเกล็ดหิมะ)"),
            parking: amenity("ช่องที่ 2 (ไอคอนรถ)"),
            atmosphere: amenity("ช่องที่ 3 (ไอคอนใบไม้)"),
            takeaway: amenity("ช่องที่ 4 (ไอคอนถุง)"),
          },
          { label: "จุดเด่นของร้าน 4 ช่อง" },
        ),
      },
      { label: "หน้าแรก · บรรยากาศร้าน" },
    ),
    menu: fields.object(
      {
        intro: localized("คำแนะนำใต้หัวข้อ", { multiline: true }),
        takeaway: fields.object(
          { title: localized("หัวข้อ", { required: true }), body: localized("ข้อความ", { multiline: true }) },
          { label: "กล่องสั่งกลับบ้าน (ท้ายหน้า)" },
        ),
      },
      { label: "หน้าเมนู" },
    ),
    reviews: fields.object(
      {
        sectionTitle: localized("หัวข้อในหน้าแรก", { required: true }),
        sectionDescription: localized("คำอธิบายในหน้าแรก", { multiline: true }),
        pageIntro: localized("คำแนะนำในหน้ารีวิว", { multiline: true }),
        thanks: fields.object(
          { title: localized("หัวข้อ", { required: true }), body: localized("ข้อความ", { multiline: true }) },
          { label: "กล่องชวนเขียนรีวิว" },
        ),
      },
      { label: "รีวิว" },
    ),
    tour: fields.object(
      { intro: localized("คำแนะนำใต้หัวข้อ", { multiline: true }) },
      { label: "หน้าทัวร์ 360°" },
    ),
    footer: fields.object(
      { blurb: localized("ข้อความแนะนำร้านส่วนท้าย", { multiline: true }) },
      { label: "ส่วนท้ายของทุกหน้า" },
    ),
  },
});

// ── 360° tour ────────────────────────────────────────────────────────

const tour = singleton({
  label: "ทัวร์ 360°",
  path: "content/tour",
  format: { data: "json" },
  schema: {
    isSample: fields.checkbox({
      label: "ยังเป็นภาพตัวอย่าง",
      description:
        "ติ๊กไว้ = หน้าทัวร์ขึ้นป้ายว่าเป็นภาพตัวอย่าง และยังไม่มีลิงก์จากหน้าแรก เอาติ๊กออกเมื่อใส่รูปร้านจริงครบแล้ว",
    }),
    spots: fields.array(
      fields.object(
        {
          nameTh: fields.slug({
            name: { label: "ชื่อจุด (ไทย)", description: "เช่น หน้าร้าน ห้องแอร์ เคาน์เตอร์", validation: { isRequired: true } },
            slug: {
              label: "รหัสจุด",
              description: "สร้างให้อัตโนมัติ ใช้ตั้งชื่อไฟล์รูป ไม่ต้องแก้",
              generate: idFromName("spot"),
            },
          }),
          nameEn: fields.text({ label: "ชื่อจุด (English)", description: "เว้นว่างได้ หน้าภาษาอังกฤษจะแสดงชื่อไทยแทน" }),
          description: localized("คำอธิบายสั้นๆ", { multiline: true }),
          image: fields.image({
            label: "รูป 360°",
            description:
              "รูปจากกล้อง 360° แบบภาพแผ่ (สัดส่วน 2:1 เช่น 6000×3000) ไฟล์ JPG ไม่เกินประมาณ 5 MB ด้านหน้ากล้องคือมุมแรกที่ลูกค้าเห็น",
            directory: "public/tour",
            publicPath: "/tour/",
            validation: { isRequired: true },
          }),
        },
        { layout: [6, 6, 12, 12] },
      ),
      {
        label: "จุดในร้าน",
        description: "ลูกค้าเริ่มดูจากจุดแรก แล้วกดชื่อจุดอื่นเพื่อเดินไปดู ลากเพื่อเรียงลำดับ",
        slugField: "nameTh",
        itemLabel: (props) => props.fields.nameTh.value.name || "จุดใหม่",
      },
    ),
  },
});

// ── Menu: one form per category ──────────────────────────────────────

const variantPrice = (label: string) => fields.integer({ label, validation: { min: 0 } });

function menuCategory({ id, adminLabel }: (typeof categoryList)[number]) {
  return singleton({
    label: adminLabel,
    path: `content/menu/${id}`,
    format: { data: "json" },
    schema: {
      name: localized("ชื่อหมวด", { required: true }),
      blurb: localized("คำอธิบายหมวด"),
      items: fields.array(
        fields.object(
          {
            nameTh: fields.slug({
              name: { label: "ชื่อเมนู (ไทย)", validation: { isRequired: true } },
              slug: {
                label: "รหัสเมนู",
                description: "สร้างให้อัตโนมัติ ใช้ตั้งชื่อไฟล์รูป ไม่ต้องแก้",
                generate: idFromName("menu"),
              },
            }),
            nameEn: fields.text({
              label: "ชื่อเมนู (English)",
              description: "เว้นว่างได้ หน้าภาษาอังกฤษจะแสดงชื่อไทยแทน",
            }),
            description: localized("คำอธิบาย", { multiline: true }),
            price: fields.conditional(
              fields.select({
                label: "ราคา",
                options: [
                  { label: "ราคาเดียว", value: "single" },
                  { label: "แยกร้อน / เย็น / ปั่น", value: "variants" },
                ],
                defaultValue: "single",
              }),
              {
                single: fields.integer({ label: "ราคา (บาท)", validation: { isRequired: true, min: 0 } }),
                variants: fields.object(
                  { hot: variantPrice("ร้อน (บาท)"), iced: variantPrice("เย็น (บาท)"), frappe: variantPrice("ปั่น (บาท)") },
                  { label: "ราคาแต่ละแบบ", description: "เว้นว่างแบบที่ไม่มีขาย ต้องใส่อย่างน้อย 1 ช่อง", layout: [4, 4, 4] },
                ),
              },
            ),
            tags: fields.multiselect({
              label: "ป้าย",
              options: [
                { label: "ซิกเนเจอร์ (ขึ้นในเมนูแนะนำหน้าแรก)", value: "signature" },
                { label: "ขายดี", value: "bestseller" },
                { label: "ใหม่", value: "new" },
              ],
            }),
            spicy: fields.select({
              label: "ความเผ็ด",
              options: [
                { label: "ไม่เผ็ด", value: "0" },
                { label: "🌶 เผ็ดน้อย", value: "1" },
                { label: "🌶🌶 เผ็ดกลาง", value: "2" },
                { label: "🌶🌶🌶 เผ็ดมาก", value: "3" },
              ],
              defaultValue: "0",
            }),
            image: fields.image({
              label: "รูปเมนู",
              description: "แสดงเป็นวงกลม ใช้รูปสี่เหลี่ยมจัตุรัสที่จานอยู่กลางภาพ รูปใหญ่จากมือถือใช้ได้เลย เว็บจะย่อขนาดให้เอง",
              directory: `public/menu/${id}`,
              publicPath: `/menu/${id}/`,
            }),
            emoji: fields.text({ label: "อีโมจิ", description: "แสดงบนจานแทนรูป เมื่อยังไม่มีรูปเมนู", defaultValue: "🍽️" }),
            aliases: fields.text({
              label: "ชื่อที่ลูกค้ามักเรียก",
              description:
                "คั่นด้วยเครื่องหมายจุลภาค เช่น สเต๊กหมู, pork steak ใช้ค้นหาในหน้าเมนู และจับว่ารีวิวไหนพูดถึงเมนูนี้",
            }),
          },
          { layout: [6, 6, 12, 12, 6, 6, 8, 4, 12] },
        ),
        {
          label: "รายการเมนู",
          description: "ลากเพื่อเรียงลำดับตามที่อยากให้แสดงบนเว็บ",
          slugField: "nameTh",
          itemLabel: (props) => {
            const name = props.fields.nameTh.value.name || "เมนูใหม่";
            const price = props.fields.price;
            if (price.discriminant === "single") return price.value.value === null ? name : `${name} · ฿${price.value.value}`;
            const prices = [price.value.fields.hot.value, price.value.fields.iced.value, price.value.fields.frappe.value].filter(
              (value): value is number => value !== null,
            );
            return prices.length ? `${name} · ฿${prices.join(" / ")}` : name;
          },
        },
      ),
    },
  });
}

// ── Promotions, FAQ, reviews ─────────────────────────────────────────

const promotions = singleton({
  label: "โปรโมชั่น",
  path: "content/promotions",
  format: { data: "json" },
  schema: {
    items: fields.array(
      fields.object(
        {
          eyebrow: fields.text({ label: "หัวข้อเล็ก", description: "ตัวเขียนเล็กๆ ด้านบน ใช้ภาษาอังกฤษ เช่น Happy Hour" }),
          title: localized("ชื่อโปรโมชั่น", { required: true }),
          detail: localized("รายละเอียด", { multiline: true }),
          highlight: localized("ข้อความตัวใหญ่", { description: "เช่น -20%, ฿129, ฟรี!" }),
          cta: localized("ข้อความบนปุ่ม", { required: true, description: "เช่น ดูเมนูกาแฟ" }),
          link: fields.select({
            label: "ปุ่มพาไปที่",
            options: [
              { label: "เมนูทั้งหมด", value: "/menu" },
              ...categoryList.map((category) => ({ label: `เมนู · ${category.adminLabel}`, value: `/menu#${category.id}` })),
            ],
            defaultValue: "/menu",
          }),
          tone: fields.select({
            label: "สีการ์ด",
            options: [
              { label: "น้ำตาลเข้ม", value: "espresso" },
              { label: "เขียว", value: "leaf" },
              { label: "คาราเมล", value: "caramel" },
            ],
            defaultValue: "espresso",
          }),
          emoji: fields.object(
            {
              first: fields.text({ label: "ตัวที่ 1 (ใหญ่สุด)", defaultValue: "☕" }),
              second: fields.text({ label: "ตัวที่ 2", defaultValue: "✨" }),
              third: fields.text({ label: "ตัวที่ 3", defaultValue: "🍰" }),
            },
            { label: "อีโมจิประกอบ", layout: [4, 4, 4] },
          ),
        },
        { layout: [12, 12, 12, 12, 12, 6, 6, 12] },
      ),
      {
        label: "โปรโมชั่น",
        description: "สไลด์บนหน้าแรกตามลำดับนี้ ลากเพื่อเรียงใหม่ได้ ถ้าไม่มีโปรโมชั่นเลย ส่วนนี้จะถูกซ่อน",
        itemLabel: (props) => props.fields.title.fields.th.value || "โปรโมชั่นใหม่",
      },
    ),
  },
});

const faq = singleton({
  label: "คำถามที่พบบ่อย",
  path: "content/faq",
  format: { data: "json" },
  schema: {
    items: fields.array(
      fields.object({
        question: localized("คำถาม", { required: true }),
        answer: localized("คำตอบ", {
          multiline: true,
          required: true,
          description:
            "พิมพ์ {phone} {open} {close} หรือ {address} เพื่อใส่เบอร์โทร เวลาเปิด เวลาปิด หรือที่อยู่จากหน้า \"ข้อมูลร้าน\" ให้อัตโนมัติ",
        }),
      }),
      {
        label: "คำถาม",
        description: "แสดงในหน้าติดต่อเรา",
        itemLabel: (props) => props.fields.question.fields.th.value || "คำถามใหม่",
      },
    ),
  },
});

const reviews = singleton({
  label: "รีวิวลูกค้า",
  path: "content/reviews",
  format: { data: "json" },
  schema: {
    isSample: fields.checkbox({
      label: "ยังเป็นรีวิวตัวอย่าง",
      description: "ติ๊กไว้ = หน้าเว็บขึ้นป้ายบอกว่าเป็นรีวิวตัวอย่าง เอาติ๊กออกเมื่อแทนด้วยรีวิวจริงครบแล้ว",
    }),
    items: fields.array(
      fields.object(
        {
          author: fields.text({
            label: "ชื่อลูกค้า",
            description: "ชื่อที่ลูกค้ายินยอมให้แสดง เช่น ชื่อเล่น หรือชื่อจริงอย่างเดียว",
            validation: { isRequired: true },
          }),
          rating: fields.select({
            label: "คะแนน",
            options: [
              { label: "★★★★★ 5", value: "5" },
              { label: "★★★★ 4", value: "4" },
              { label: "★★★ 3", value: "3" },
              { label: "★★ 2", value: "2" },
              { label: "★ 1", value: "1" },
            ],
            defaultValue: "5",
          }),
          date: fields.date({ label: "วันที่รีวิว", defaultValue: { kind: "today" }, validation: { isRequired: true } }),
          source: fields.select({
            label: "รีวิวจาก",
            options: [
              { label: "Google", value: "google" },
              { label: "Facebook", value: "facebook" },
            ],
            defaultValue: "google",
          }),
          language: fields.select({
            label: "ภาษาที่ลูกค้าเขียน",
            options: [
              { label: "ไทย", value: "th" },
              { label: "English", value: "en" },
            ],
            defaultValue: "th",
          }),
          text: fields.text({
            label: "ข้อความรีวิว",
            description: "คัดลอกตามที่ลูกค้าเขียน (ขออนุญาตลูกค้าก่อนนำมาแสดง)",
            multiline: true,
            validation: { isRequired: true },
          }),
          translation: fields.text({
            label: "คำแปล",
            description: "ถ้ารีวิวเป็นภาษาไทย ใส่คำแปลภาษาอังกฤษสำหรับหน้าภาษาอังกฤษ (และกลับกัน) เว้นว่างได้",
            multiline: true,
          }),
          topics: fields.multiselect({
            label: "รีวิวนี้พูดถึง",
            description: "ใช้กรองรีวิวในหน้ารีวิว",
            options: [
              { label: "กาแฟ", value: "coffee" },
              { label: "อาหาร", value: "food" },
              { label: "ของหวาน", value: "dessert" },
              { label: "บรรยากาศ", value: "atmosphere" },
              { label: "บริการ", value: "service" },
            ],
          }),
        },
        { layout: [6, 6, 4, 4, 4, 12, 12, 12] },
      ),
      {
        label: "รีวิว",
        description:
          "หน้าเว็บเรียงรีวิวจากใหม่ไปเก่าให้เอง ถ้าในรีวิวมีชื่อเมนูของร้าน จะขึ้นเป็นลิงก์ไปที่เมนูนั้นให้อัตโนมัติ",
        itemLabel: (props) =>
          `${"★".repeat(Number(props.fields.rating.value))} ${props.fields.author.value || "รีวิวใหม่"}${
            props.fields.date.value ? ` · ${props.fields.date.value}` : ""
          }`,
      },
    ),
  },
});

const menuSingletons = Object.fromEntries(categoryList.map((category) => [`menu-${category.id}`, menuCategory(category)]));

export default config({
  storage,
  ui: {
    brand: { name: "NaNa Coffee" },
    navigation: {
      ร้าน: ["store", "siteText", "promotions", "faq", "tour"],
      เมนู: Object.keys(menuSingletons),
      รีวิว: ["reviews"],
    },
  },
  singletons: { store, siteText, promotions, faq, tour, reviews, ...menuSingletons },
});
