import { PricingItem, SocialLink, IconPanelItem, WhyThisMattersItem } from './types';

export const BRAND_LOGO_URL = "https://res.cloudinary.com/dhyffe9mm/image/upload/v1749337493/ChatGPT_Image_Jun_8_2025_04_29_23_AM_gyozpg.png";
export const SPINNER_LOGO_URL = "https://res.cloudinary.com/dhyffe9mm/image/upload/v1749768830/KRISHNA_GARDEN_VIRAr__1_-removebg-preview_1_awbusz.png";

export const HERO_IMAGES_TOP: string[] = [
  "https://res.cloudinary.com/dhyffe9mm/image/upload/v1749663756/ChatGPT_Image_Jun_11_2025_08_27_25_PM_zw28ng.png",
  "https://res.cloudinary.com/dhyffe9mm/image/upload/v1749663756/ChatGPT_Image_Jun_11_2025_09_03_43_PM_tf57eo.png",
  "https://res.cloudinary.com/dhyffe9mm/image/upload/v1749663756/ChatGPT_Image_Jun_11_2025_08_54_42_PM_u9gqoy.png",
  "https://res.cloudinary.com/dhyffe9mm/image/upload/v1749663756/ChatGPT_Image_Jun_11_2025_08_29_21_PM_gesdg9.png",
  "https://res.cloudinary.com/dhyffe9mm/image/upload/v1749663756/ChatGPT_Image_Jun_11_2025_08_32_20_PM_jhctrf.png"
];

export const HERO_IMAGES_MID: string[] = [
  "https://res.cloudinary.com/dhyffe9mm/image/upload/v1749663754/ChatGPT_Image_Jun_11_2025_08_35_28_PM_cpubtg.png",
  "https://res.cloudinary.com/dhyffe9mm/image/upload/v1749663755/ChatGPT_Image_Jun_11_2025_08_57_12_PM_cca5oj.png",
  "https://res.cloudinary.com/dhyffe9mm/image/upload/v1749663754/ChatGPT_Image_Jun_11_2025_09_09_00_PM_sj6exw.png",
  "https://res.cloudinary.com/dhyffe9mm/image/upload/v1749663754/ChatGPT_Image_Jun_11_2025_09_20_07_PM_wfrc79.png",
  "https://res.cloudinary.com/dhyffe9mm/image/upload/v1749663752/ChatGPT_Image_Jun_11_2025_09_24_22_PM_fkkvai.png"
];

export const PRICING_DATA: PricingItem[] = [
  { item: "Full Website", description: "Homepage with trust design", value: "₹2999", offered: "₹1499" },
  { item: "Campaign Page", description: "For launches/offers", value: "₹2499", offered: "₹1249" },
  { item: "Booking Form", description: "Lead form + GSheet link", value: "₹1999", offered: "₹999" },
  { item: "QR Code", description: "For print & digital", value: "₹499", offered: "₹249" },
  { item: "Hosting", description: "Fast, secure, forever", value: "₹499", offered: "₹249" },
  { item: "Creative Flow", description: "Smart layout planning", value: "₹2499", offered: "₹1249" },
  { item: "Mobile Friendly", description: "Fully responsive site", value: "₹999", offered: "₹499" },
  { item: "WhatsApp Logic", description: "Direct chat integration", value: "₹499", offered: "₹249" },
];

export const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwO4T4NVbrbzTGgb4F4gRJxJyNug5BB3YZgjsYndKIOgIQ4OkpL6V2dQPkTQako86s0/exec";

export const ICON_URLS = {
  check: "https://api.iconify.design/mdi:check-circle.svg?color=%23f1c40f",
  whatsapp: "https://api.iconify.design/ri:whatsapp-fill.svg?color=%23f1c40f",
  form: "https://api.iconify.design/fluent:form-new-20-filled.svg?color=%23f1c40f",
  googleSheets: "https://res.cloudinary.com/dyhsnmziv/image/upload/v1749700528/ChatGPT_Image_Jun_12_2025_09_25_05_AM_adhyq5.png",
  qrCode: "https://api.iconify.design/mdi:qrcode.svg?color=%23f1c40f",
  mobileOptimized: "https://api.iconify.design/mdi:cellphone-link.svg?color=%23f1c40f",
  hosting: "https://api.iconify.design/mdi:cloud-upload.svg?color=%23f1c40f",
  campaignLogic: "https://api.iconify.design/mdi:bullhorn-variant.svg?color=%23f1c40f",
  trustShield: "https://api.iconify.design/mdi:shield-check.svg?color=%23f1c40f",
  share: "https://api.iconify.design/mdi:share-circle.svg?color=%23f1c40f",
  simpleShare: "https://api.iconify.design/mdi:share-variant-outline.svg?color=%23f1c40f",
  uploadCue: "https://api.iconify.design/mdi:arrow-up-thin-circle-outline.svg?color=%23f1c40f",
  gift: "https://api.iconify.design/mdi:gift.svg?color=%23f1c40f",
  timer: "https://api.iconify.design/mdi:timer-sand.svg?color=%23f1c40f",
  tools: "https://api.iconify.design/mdi:tools.svg?color=%23f1c40f",
  arrowRight: "https://api.iconify.design/mdi:arrow-right-circle.svg?color=%23f1c40f",
  chevronDown: "https://api.iconify.design/mdi:chevron-down.svg?color=%23f1c40f",
  linkVariant: "https://api.iconify.design/mdi:link-variant.svg?color=%23f1c40f",
  facebook: "https://api.iconify.design/mdi:facebook.svg?color=%23f1c40f",
  twitter: "https://api.iconify.design/mdi:twitter.svg?color=%23f1c40f",
  star: "https://api.iconify.design/mdi:star-circle.svg?color=%23f1c40f",
  web: "https://api.iconify.design/mdi:web.svg?color=%23f1c40f",
  partyPopper: "https://api.iconify.design/mdi:party-popper.svg?color=%23f1c40f",
  rocketLaunch: "https://api.iconify.design/mdi:rocket-launch-outline.svg?color=%23f1c40f",
  lock: "https://api.iconify.design/mdi:lock-outline.svg?color=%23f1c40f",
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "Instagram", url: "https://www.instagram.com/uday_kumar1430?igsh=OWhxcTI4YnB4ZHZz", iconUrl: "https://api.iconify.design/mdi:instagram.svg?color=%23f1c40f" },
  { name: "YouTube", url: "https://youtube.com/@ukcreationentertainments6696?si=rV5Ay25D6C9JXbUa", iconUrl: "https://api.iconify.design/mdi:youtube.svg?color=%23f1c40f" },
  { name: "Facebook", url: "https://www.facebook.com/share/189c2NvUec/?mibextid=wwXIfr", iconUrl: ICON_URLS.facebook },
  { name: "Email", url: "mailto:udaykumar.uk1@gmail.com", iconUrl: "https://api.iconify.design/mdi:email.svg?color=%23f1c40f" },
  { name: "WhatsApp", url: "https://wa.me/+919867677928", iconUrl: ICON_URLS.whatsapp }
];

export const ICON_PANEL_ITEMS: IconPanelItem[] = [
  { name: "WhatsApp", iconUrl: ICON_URLS.whatsapp },
  { name: "Hosting", iconUrl: ICON_URLS.hosting },
  { name: "QR Code", iconUrl: ICON_URLS.qrCode },
  { name: "Google Sheet", iconUrl: ICON_URLS.googleSheets },
  { name: "Mobile Friendly", iconUrl: ICON_URLS.mobileOptimized },
  { name: "Share", iconUrl: ICON_URLS.share },
  { name: "Campaign", iconUrl: ICON_URLS.campaignLogic },
  { name: "Trust Shield", iconUrl: ICON_URLS.trustShield },
  { name: "Form Submit", iconUrl: ICON_URLS.form }
];

export const WHO_NEEDS_THIS_POINTS: string[] = [
  "Small Businesses",
  "Local Shops",
  "Service Providers",
  "Clinics & Gyms",
  "Salons & Spas",
  "Personal Brands",
  "Resellers",
  "New Entrepreneurs",
  "Home Food Creators (Cakes, Cookies, Snacks)"
];

export const WHY_THIS_MATTERS_DATA: WhyThisMattersItem[] = [
  { title: "TRUST BUILDING", description: "People buy from people they trust. A clean webpage creates that trust in seconds.", iconUrl: ICON_URLS.trustShield },
  { title: "24/7 VISIBILITY", description: "Your business gets seen even when you sleep – by anyone, anytime.", iconUrl: ICON_URLS.trustShield },
  { title: "INSTANT WHATSAPP LEADS", description: "No tech skills needed. Customers click and contact you directly.", iconUrl: ICON_URLS.trustShield },
  { title: "PORTFOLIO POWER", description: "Every booking & client builds your brand library.", iconUrl: ICON_URLS.trustShield },
  { title: "FUTURE READY", description: "This setup is not a design; it's your personal shop-window for today and tomorrow.", iconUrl: ICON_URLS.trustShield }
];

export const GOOGLE_PAY_QR_CODE_URL = "https://res.cloudinary.com/dhyffe9mm/image/upload/v1749771339/UK_CREATION_y9bsxt.png";

export const PREPAID_OFFER_FREEBIES_ITEMS = [
    { name: "Campaign Page", iconUrl: ICON_URLS.campaignLogic, value: "₹1249" },
    { name: "WhatsApp Direct Chat", iconUrl: ICON_URLS.whatsapp, value: "₹249" },
    { name: "QR Code for Print/Digital", iconUrl: ICON_URLS.qrCode, value: "₹249" },
];
export const PREPAID_OFFER_FREEBIES_TOTAL_VALUE = "₹1747"; // 1249 + 249 + 249
