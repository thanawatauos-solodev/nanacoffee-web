import type { MenuCategory, MenuItem, Variant } from "../types";

/**
 * Menu content in Thai and English. Prices and descriptions here are sample values:
 * replace them with the store's real menu. Add a photo by setting `image` to a file under /public.
 * Hot / iced / frappe labels come from the dictionaries (menu.variants).
 */

export const categories: readonly MenuCategory[] = [
  {
    id: "thai",
    name: { th: "อาหารไทย", en: "Thai" },
    blurb: { th: "รสจัดจ้าน สูตรบ้านๆ ทำสดทุกจาน", en: "Bold and fiery home-style recipes, cooked fresh to order" },
    tint: "#dfe7d3",
  },
  {
    id: "vietnamese",
    name: { th: "อาหารเวียดนาม", en: "Vietnamese" },
    blurb: { th: "ของดีสกลนคร สดชื่น เบา สบายท้อง", en: "A Sakon Nakhon favourite: fresh, light and easy on the stomach" },
    tint: "#d8e6dc",
  },
  {
    id: "western",
    name: { th: "อาหารฝรั่ง", en: "Western" },
    blurb: { th: "สเต๊ก พาสต้า และจานอิ่มสไตล์คาเฟ่", en: "Steaks, pasta and hearty café plates" },
    tint: "#f0dcc4",
  },
  {
    id: "coffee",
    name: { th: "กาแฟ", en: "Coffee" },
    blurb: { th: "คั่วกลางค่อนเข้ม หอมกลมกล่อม", en: "Medium-dark roast, smooth and well rounded" },
    tint: "#e9d6bf",
  },
  {
    id: "tea",
    name: { th: "ชา & เครื่องดื่ม", en: "Tea & More" },
    blurb: { th: "ชาไทย มัทฉะ และเมนูไม่มีกาแฟ", en: "Thai tea, matcha and coffee-free drinks" },
    tint: "#f2dfc0",
  },
  {
    id: "dessert",
    name: { th: "ของหวาน", en: "Dessert" },
    blurb: { th: "เค้กไอศกรีมและของหวานคู่กาแฟ", en: "Ice cream cakes and sweet treats to go with your coffee" },
    tint: "#f4d9d3",
  },
];

const hot = (price: number): Variant => ({ id: "hot", price });
const iced = (price: number): Variant => ({ id: "iced", price });
const frappe = (price: number): Variant => ({ id: "frappe", price });

export const menuItems: readonly MenuItem[] = [
  // ── อาหารไทย ───────────────────────────────────────────────
  {
    id: "yum-pla-duk-fu",
    categoryId: "thai",
    name: { th: "ยำปลาดุกฟู", en: "Crispy Catfish Salad" },
    description: {
      th: "ปลาดุกฟูกรอบเบา ราดยำมะม่วงเปรี้ยวหวาน โรยถั่วลิสงคั่ว",
      en: "Fluffy crispy catfish topped with a sweet-sour green mango salad and roasted peanuts",
    },
    price: 120,
    emoji: "🐟",
    tags: ["signature"],
    spicy: 2,
  },
  {
    id: "kaeng-liang-kung",
    categoryId: "thai",
    name: { th: "แกงเลียงกุ้งสด", en: "Spicy Vegetable Soup with Shrimp" },
    description: {
      th: "ผักพื้นบ้านหลากชนิด กุ้งสดตัวโต น้ำแกงหอมพริกไทยและหอมแดง",
      en: "Local vegetables and plump fresh shrimp in a peppery broth scented with shallots",
    },
    price: 140,
    emoji: "🍲",
    tags: ["signature"],
    spicy: 1,
  },
  {
    id: "tom-yum-kung",
    categoryId: "thai",
    name: { th: "ต้มยำกุ้งน้ำข้น", en: "Creamy Tom Yum Kung" },
    description: {
      th: "น้ำซุปเข้มข้น เปรี้ยวเผ็ดกลมกล่อม หอมตะไคร้ใบมะกรูด",
      en: "Rich, creamy hot-and-sour soup fragrant with lemongrass and kaffir lime leaves",
    },
    price: 160,
    emoji: "🍤",
    spicy: 2,
  },
  {
    id: "kaprao-moo-krob",
    categoryId: "thai",
    name: { th: "ผัดกะเพราหมูกรอบ + ไข่ดาว", en: "Holy Basil Crispy Pork" },
    description: {
      th: "หมูกรอบผัดใบกะเพราไฟแรง เสิร์ฟพร้อมข้าวสวยและไข่ดาวกรอบ",
      en: "Crispy pork wok-fried with holy basil, served with jasmine rice and a crispy fried egg",
    },
    price: 75,
    emoji: "🍳",
    tags: ["bestseller"],
    spicy: 2,
  },
  {
    id: "khao-pad-poo",
    categoryId: "thai",
    name: { th: "ข้าวผัดปู", en: "Crab Fried Rice" },
    description: {
      th: "ข้าวผัดไฟแรง เนื้อปูแน่นๆ ไข่หอม เสิร์ฟพร้อมมะนาวและแตงกวา",
      en: "Wok-fried rice with generous crab meat and egg, served with lime and cucumber",
    },
    price: 90,
    emoji: "🦀",
  },
  {
    id: "som-tam-thai",
    categoryId: "thai",
    name: { th: "ส้มตำไทย", en: "Green Papaya Salad" },
    description: {
      th: "มะละกอกรอบ ถั่วฝักยาว มะเขือเทศ กุ้งแห้ง รสเปรี้ยวหวานลงตัว",
      en: "Crunchy green papaya, long beans, tomato and dried shrimp, perfectly sweet and sour",
    },
    price: 60,
    emoji: "🥗",
    spicy: 2,
  },
  {
    id: "moo-tod-kratiam",
    categoryId: "thai",
    name: { th: "หมูทอดกระเทียม", en: "Garlic Fried Pork" },
    description: {
      th: "หมูหมักนุ่ม ทอดกรอบโรยกระเทียมเจียวหอมๆ เสิร์ฟพร้อมข้าวสวย",
      en: "Tender marinated pork fried crisp and topped with golden garlic, served with rice",
    },
    price: 75,
    emoji: "🧄",
  },
  {
    id: "pad-thai-kung",
    categoryId: "thai",
    name: { th: "ผัดไทยกุ้งสด", en: "Pad Thai with Shrimp" },
    description: {
      th: "เส้นจันท์เหนียวนุ่ม ซอสมะขามเคี่ยวเอง กุ้งสด ถั่วงอก กุยช่าย",
      en: "Chewy rice noodles in house-made tamarind sauce with fresh shrimp, bean sprouts and chives",
    },
    price: 89,
    emoji: "🥢",
  },

  // ── อาหารเวียดนาม ─────────────────────────────────────────
  {
    id: "naem-nueang",
    categoryId: "vietnamese",
    name: { th: "แหนมเนือง", en: "Nem Nuong Platter" },
    description: {
      th: "แหนมย่างหอมกรุ่น แผ่นแป้งเวียดนาม ผักสดและน้ำจิ้มสูตรเฉพาะร้าน",
      en: "Grilled Vietnamese pork sausage with rice paper, fresh herbs and our signature dipping sauce",
    },
    price: 159,
    emoji: "🌯",
    tags: ["signature"],
  },
  {
    id: "khao-piak-sen",
    categoryId: "vietnamese",
    name: { th: "ข้าวเปียกเส้นหมู", en: "Khao Piak Sen" },
    description: {
      th: "เส้นเหนียวนุ่ม น้ำซุปกระดูกหมูเคี่ยวนาน ใส่หมูยอ โรยกระเทียมเจียว",
      en: "Soft, chewy noodles in a slow-simmered pork bone broth with Vietnamese pork roll and fried garlic",
    },
    price: 60,
    emoji: "🍜",
  },
  {
    id: "kai-kratha",
    categoryId: "vietnamese",
    name: { th: "ไข่กระทะ", en: "Vietnamese Pan Eggs" },
    description: {
      th: "ไข่ดาวในกระทะร้อน หมูยอ กุนเชียง หมูสับ เสิร์ฟพร้อมขนมปังอุ่นๆ",
      en: "Eggs sizzled in a hot pan with pork roll, Chinese sausage and minced pork, served with warm bread",
    },
    price: 69,
    emoji: "🥘",
    tags: ["bestseller"],
  },
  {
    id: "pho-nuea",
    categoryId: "vietnamese",
    name: { th: "เฝอเนื้อ", en: "Beef Pho" },
    description: {
      th: "น้ำซุปเนื้อใส หอมเครื่องเทศ เส้นเฝอนุ่ม เนื้อสไลซ์ ใบโหระพา",
      en: "Clear, aromatic beef broth with soft pho noodles, sliced beef and Thai basil",
    },
    price: 89,
    emoji: "🥣",
  },
  {
    id: "banh-mi",
    categoryId: "vietnamese",
    name: { th: "บั๋นหมี่", en: "Banh Mi" },
    description: {
      th: "ขนมปังเวียดนามกรอบนอกนุ่มใน ไส้หมูยอ หมูหยอง ผักดอง ผักชี",
      en: "Crusty Vietnamese baguette with pork roll, pork floss, pickles and coriander",
    },
    price: 55,
    emoji: "🥖",
  },
  {
    id: "popia-tod",
    categoryId: "vietnamese",
    name: { th: "ปอเปี๊ยะทอดเวียดนาม", en: "Fried Spring Rolls" },
    description: {
      th: "แป้งข้าวทอดกรอบ ไส้หมูวุ้นเส้นเห็ดหูหนู จิ้มน้ำจิ้มเปรี้ยวหวาน",
      en: "Crispy rice-paper rolls filled with pork, glass noodles and wood-ear mushroom, with sweet chilli dip",
    },
    price: 79,
    emoji: "🥟",
  },

  // ── อาหารฝรั่ง ─────────────────────────────────────────────
  {
    id: "pork-steak",
    categoryId: "western",
    name: { th: "สเต๊กหมูพริกไทยดำ", en: "Black Pepper Pork Steak" },
    description: {
      th: "สันคอหมูย่าง ซอสพริกไทยดำ มันบด สลัดผัก และขนมปังกระเทียม",
      en: "Grilled pork neck with black pepper sauce, mashed potato, salad and garlic bread",
    },
    price: 159,
    emoji: "🍖",
    tags: ["signature"],
  },
  {
    id: "beef-steak",
    categoryId: "western",
    name: { th: "สเต๊กเนื้อซอสเกรวี่", en: "Beef Steak with Gravy" },
    description: {
      th: "เนื้อย่างตามระดับที่ชอบ ซอสเกรวี่เข้มข้น เฟรนช์ฟรายส์ และผักย่าง",
      en: "Beef grilled to your liking with rich gravy, French fries and grilled vegetables",
    },
    price: 259,
    emoji: "🥩",
  },
  {
    id: "chicken-steak",
    categoryId: "western",
    name: { th: "สเต๊กไก่ซอสเห็ด", en: "Chicken Steak, Mushroom Sauce" },
    description: {
      th: "สะโพกไก่ย่างหนังกรอบ ซอสครีมเห็ด มันบด และสลัด",
      en: "Crispy-skinned grilled chicken thigh with creamy mushroom sauce, mashed potato and salad",
    },
    price: 139,
    emoji: "🍗",
  },
  {
    id: "american-fried-rice",
    categoryId: "western",
    name: { th: "ข้าวผัดอเมริกัน", en: "American Fried Rice" },
    description: {
      th: "ข้าวผัดซอสมะเขือเทศ ไก่ทอด ไส้กรอก แฮม และไข่ดาว",
      en: "Tomato-ketchup fried rice with fried chicken, sausage, ham and a fried egg",
    },
    price: 99,
    emoji: "🍛",
    tags: ["bestseller"],
  },
  {
    id: "carbonara",
    categoryId: "western",
    name: { th: "สปาเกตตีคาโบนารา", en: "Spaghetti Carbonara" },
    description: {
      th: "ซอสครีมไข่แดง เบคอนกรอบ ชีสพาร์เมซาน พริกไทยดำ",
      en: "Creamy egg-yolk sauce, crispy bacon, Parmesan and black pepper",
    },
    price: 129,
    emoji: "🍝",
  },
  {
    id: "spaghetti-kee-mao",
    categoryId: "western",
    name: { th: "สปาเกตตีขี้เมาทะเล", en: "Spicy Seafood Spaghetti" },
    description: {
      th: "ผัดพริกสดกระเทียม กุ้ง หมึก หอยแมลงภู่ หอมใบกะเพรา",
      en: "Spaghetti stir-fried with chilli, garlic, shrimp, squid, mussels and holy basil",
    },
    price: 139,
    emoji: "🦐",
    spicy: 3,
  },
  {
    id: "club-sandwich",
    categoryId: "western",
    name: { th: "คลับแซนด์วิช", en: "Club Sandwich" },
    description: {
      th: "ขนมปังปิ้ง แฮม ไก่ ไข่ ชีส ผักสด เสิร์ฟพร้อมเฟรนช์ฟรายส์",
      en: "Toasted bread layered with ham, chicken, egg, cheese and fresh salad, served with fries",
    },
    price: 119,
    emoji: "🥪",
  },
  {
    id: "french-fries",
    categoryId: "western",
    name: { th: "เฟรนช์ฟรายส์", en: "French Fries" },
    description: {
      th: "มันฝรั่งทอดกรอบนอกนุ่มใน จิ้มซอสมะเขือเทศหรือมายองเนส",
      en: "Crispy outside, fluffy inside, with ketchup or mayonnaise",
    },
    price: 59,
    emoji: "🍟",
  },

  // ── กาแฟ ──────────────────────────────────────────────────
  {
    id: "es-yen",
    categoryId: "coffee",
    name: { th: "เอสเย็น", en: "Thai Iced Espresso" },
    description: {
      th: "เอสเปรสโซช็อตเข้ม นมข้นหวาน นมสด สูตรเอสเย็นแบบไทยแท้",
      en: "A strong espresso shot with sweetened condensed milk and fresh milk, Thai-style",
    },
    variants: [iced(60), frappe(70)],
    emoji: "🧋",
    tags: ["signature"],
  },
  {
    id: "espresso",
    categoryId: "coffee",
    name: { th: "เอสเปรสโซ", en: "Espresso" },
    description: {
      th: "ช็อตเข้มข้น บอดี้หนัก กลิ่นช็อกโกแลตและคาราเมล",
      en: "A rich, full-bodied shot with notes of chocolate and caramel",
    },
    variants: [hot(45), iced(55)],
    emoji: "☕",
  },
  {
    id: "americano",
    categoryId: "coffee",
    name: { th: "อเมริกาโน่", en: "Americano" },
    description: {
      th: "กาแฟดำนุ่ม หอมสะอาด ไม่มีน้ำตาล",
      en: "Smooth, clean black coffee with no sugar",
    },
    variants: [hot(45), iced(55)],
    emoji: "☕",
  },
  {
    id: "latte",
    categoryId: "coffee",
    name: { th: "ลาเต้", en: "Caffè Latte" },
    description: {
      th: "เอสเปรสโซกับนมสดนุ่มละมุน ฟองนมเนียน",
      en: "Espresso with silky steamed milk and fine foam",
    },
    variants: [hot(50), iced(60), frappe(70)],
    emoji: "☕",
    tags: ["bestseller"],
  },
  {
    id: "cappuccino",
    categoryId: "coffee",
    name: { th: "คาปูชิโน่", en: "Cappuccino" },
    description: {
      th: "ฟองนมหนานุ่ม โรยผงโกโก้ หอมกรุ่น",
      en: "Thick, velvety milk foam dusted with cocoa",
    },
    variants: [hot(50), iced(60), frappe(70)],
    emoji: "☕",
  },
  {
    id: "mocha",
    categoryId: "coffee",
    name: { th: "มอคค่า", en: "Mocha" },
    description: {
      th: "กาแฟผสานช็อกโกแลตเข้มข้น หวานกำลังดี",
      en: "Coffee blended with rich chocolate, just sweet enough",
    },
    variants: [hot(55), iced(65), frappe(75)],
    emoji: "☕",
  },
  {
    id: "caramel-macchiato",
    categoryId: "coffee",
    name: { th: "คาราเมลมัคคิอาโต้", en: "Caramel Macchiato" },
    description: {
      th: "นมสด วานิลลา เอสเปรสโซ ราดซอสคาราเมล",
      en: "Fresh milk, vanilla and espresso finished with caramel sauce",
    },
    variants: [hot(60), iced(70), frappe(80)],
    emoji: "🍮",
  },
  {
    id: "honey-lemon-americano",
    categoryId: "coffee",
    name: { th: "อเมริกาโน่น้ำผึ้งมะนาว", en: "Honey Lemon Americano" },
    description: {
      th: "กาแฟดำเย็น น้ำผึ้งแท้ มะนาวสด สดชื่นสุดๆ",
      en: "Iced black coffee with real honey and fresh lime, wonderfully refreshing",
    },
    variants: [iced(65)],
    emoji: "🍯",
    tags: ["new"],
  },

  // ── ชา & เครื่องดื่ม ────────────────────────────────────────
  {
    id: "thai-tea",
    categoryId: "tea",
    name: { th: "ชาไทย", en: "Thai Milk Tea" },
    description: {
      th: "ชาไทยชงเข้ม หอมมัน นมสดและนมข้น",
      en: "Strong-brewed Thai tea, creamy with fresh and condensed milk",
    },
    variants: [iced(50), frappe(60)],
    emoji: "🧋",
    tags: ["bestseller"],
  },
  {
    id: "matcha-latte",
    categoryId: "tea",
    name: { th: "มัทฉะลาเต้", en: "Matcha Latte" },
    description: {
      th: "มัทฉะเกรดพรีเมียม นมสดนุ่ม หอมชาเขียวแท้",
      en: "Premium matcha with smooth fresh milk",
    },
    variants: [hot(60), iced(65), frappe(75)],
    emoji: "🍵",
  },
  {
    id: "lemon-tea",
    categoryId: "tea",
    name: { th: "ชามะนาว", en: "Iced Lemon Tea" },
    description: {
      th: "ชาไทยเปรี้ยวหวาน มะนาวสดคั้นใหม่",
      en: "Sweet-and-sour Thai tea with freshly squeezed lime",
    },
    variants: [iced(45), frappe(55)],
    emoji: "🍋",
  },
  {
    id: "cocoa",
    categoryId: "tea",
    name: { th: "โกโก้เข้มข้น", en: "Rich Cocoa" },
    description: {
      th: "โกโก้แท้เข้มข้น นมสด หวานมันกำลังดี",
      en: "Rich real cocoa with fresh milk, perfectly balanced",
    },
    variants: [hot(50), iced(55), frappe(65)],
    emoji: "🍫",
  },
  {
    id: "pink-milk",
    categoryId: "tea",
    name: { th: "นมชมพู", en: "Pink Milk" },
    description: {
      th: "นมสดเย็นๆ กับน้ำแดงหอมหวาน",
      en: "Cold fresh milk with sweet, fragrant red syrup",
    },
    variants: [iced(45), frappe(55)],
    emoji: "🥛",
  },
  {
    id: "italian-soda",
    categoryId: "tea",
    name: { th: "อิตาเลียนโซดาบลูฮาวาย", en: "Blue Hawaii Italian Soda" },
    description: {
      th: "โซดาซ่าๆ ไซรัปบลูฮาวาย สีสวยดื่มสดชื่น",
      en: "Sparkling soda with Blue Hawaii syrup, bright and refreshing",
    },
    price: 45,
    emoji: "🥤",
  },

  // ── ของหวาน ───────────────────────────────────────────────
  {
    id: "ice-cream-cake-chocolate",
    categoryId: "dessert",
    name: { th: "เค้กไอศกรีมช็อกโกแลต", en: "Chocolate Ice Cream Cake" },
    description: {
      th: "ไอศกรีมช็อกโกแลตเข้มข้นบนเค้กนุ่ม ราดกานาช (ต่อชิ้น)",
      en: "Rich chocolate ice cream on soft sponge cake with ganache (per slice)",
    },
    price: 89,
    emoji: "🍰",
    tags: ["signature"],
  },
  {
    id: "ice-cream-cake-strawberry",
    categoryId: "dessert",
    name: { th: "เค้กไอศกรีมสตรอว์เบอร์รี", en: "Strawberry Ice Cream Cake" },
    description: {
      th: "ไอศกรีมสตรอว์เบอร์รีหอมหวาน เนื้อเค้กวานิลลา (ต่อชิ้น)",
      en: "Sweet strawberry ice cream on vanilla sponge (per slice)",
    },
    price: 89,
    emoji: "🍓",
  },
  {
    id: "honey-toast",
    categoryId: "dessert",
    name: { th: "ฮันนี่โทสต์", en: "Honey Toast" },
    description: {
      th: "ขนมปังเนยอบกรอบ ราดน้ำผึ้ง วิปครีม และไอศกรีมวานิลลา",
      en: "Buttery toasted bread with honey, whipped cream and vanilla ice cream",
    },
    price: 129,
    emoji: "🍞",
  },
  {
    id: "brownie-ice-cream",
    categoryId: "dessert",
    name: { th: "บราวนี่อุ่นๆ ไอศกรีม", en: "Warm Brownie à la Mode" },
    description: {
      th: "บราวนี่หนึบอุ่นๆ เสิร์ฟคู่ไอศกรีมวานิลลา",
      en: "A warm, fudgy brownie served with vanilla ice cream",
    },
    price: 85,
    emoji: "🍨",
  },
  {
    id: "thai-tea-bingsu",
    categoryId: "dessert",
    name: { th: "บิงซูชาไทย", en: "Thai Tea Bingsu" },
    description: {
      th: "น้ำแข็งไสนมเนื้อนุ่ม ราดชาไทย ท็อปปิ้งขนมปังกรอบ",
      en: "Fluffy shaved milk ice drizzled with Thai tea and topped with crunchy toast",
    },
    price: 139,
    emoji: "🍧",
    tags: ["new"],
  },
  {
    id: "waffle-ice-cream",
    categoryId: "dessert",
    name: { th: "วาฟเฟิลไอศกรีม", en: "Waffle & Ice Cream" },
    description: {
      th: "วาฟเฟิลกรอบนอกนุ่มใน ไอศกรีม 2 สกู๊ป ซอสช็อกโกแลต",
      en: "Crisp-yet-fluffy waffle with two scoops of ice cream and chocolate sauce",
    },
    price: 99,
    emoji: "🧇",
  },
];
