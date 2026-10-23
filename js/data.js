// Default content. Admin edits are saved in localStorage under "shopData" and override these values.
const DEFAULT_DATA = {
  shop: { name: "Pratha", tagline: "The Beauty of Traditions", logo: "images/logo.jpg" },
  hero: [
    { img: "images/hero1.jpg", title: "Wedding & Festive Collection", sub: "Hand-finished sarees and lehengas for your biggest days" },
    { img: "images/hero2.jpg", title: "Silk That Remembers", sub: "Soft silks in colours that glow in lamplight" },
    { img: "images/hero3.jpg", title: "Epics From Rajasthan", sub: "Bridal drapes matched with heirloom jewellery" }
  ],
  strip: { title: "Crafted to be remembered", text: "Each piece is chosen with intention, blending timeless silhouettes with detailing that leaves a lasting impression.", images: ["images/strip1.jpg", "images/strip2.jpg"] },
  occasionsTitle: "Shop by occasion",
  occasions: [
    { img: "images/occ1.jpg", label: "Wedding" },
    { img: "images/occ2.jpg", label: "Festive" },
    { img: "images/occ3.jpg", label: "Evening" },
    { img: "images/occ4.jpg", label: "Everyday Elegance" }
  ],
  craft: { title: "Woven with tradition. Crafted with care.", text: "Every piece is brought to life through skilled craftsmanship, where time, precision and heritage come together in perfect harmony. From the first thread to the final drape, each detail is thoughtfully created.", imgLarge: "images/woven.jpg", imgSmall: "images/handloom.jpg" },
  reviews: [
    { name: "Priya Kulkarni", text: "I found my wedding saree here. The staff understood the look I wanted before I could explain it.", img: "images/story.jpg" },
    { name: "Sneha Patil", text: "Beautiful Diwali collection and fair prices. The fall and pico was ready in two days.", img: "images/occ3.jpg" },
    { name: "Meera Deshmukh", text: "A calm, well-lit store with real silk. I now buy all my family's festive sarees here.", img: "images/store.jpg" }
  ],
  contact: { phone: "+91 90000 00000", whatsapp: "919000000000", address: "Shop No. 12, Main Road, Pune, Maharashtra 411001", hours: "Mon–Sun, 10:30 AM – 9:00 PM", instagram: "yourshop", mapQuery: "Pune, Maharashtra", storeImg: "images/store.jpg" }
};
const KEY = "shopData";
function isObj(x) { return x && typeof x === "object" && !Array.isArray(x); }
function merge(base, over) {
  if (!isObj(base)) return over === undefined ? base : over;
  const out = { ...base };
  for (const k in over || {}) out[k] = isObj(base[k]) ? merge(base[k], over[k]) : over[k];
  return out;
}
function loadData() {
  try { return merge(DEFAULT_DATA, JSON.parse(localStorage.getItem(KEY) || "{}")); }
  catch (e) { return JSON.parse(JSON.stringify(DEFAULT_DATA)); }
}
function saveData(d) {
  try { localStorage.setItem(KEY, JSON.stringify(d)); return true; }
  catch (e) { return false; }
}
