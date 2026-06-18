export const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/locations", key: "locations" },
  { href: "/reviews", key: "reviews" },
  { href: "/how-to-book", key: "howToBook" },
  { href: "/faq", key: "faq" },
  // Contacts is intentionally last so it renders directly before the BG/EN
  // language switcher in the navbar (per corrections §7).
  { href: "/contacts", key: "contacts" },
] as const;

export const SOCIAL = {
  instagram: "https://www.instagram.com/mygym.bg/",
  facebook: "https://www.facebook.com/profile.php?id=61586711604459",
} as const;
