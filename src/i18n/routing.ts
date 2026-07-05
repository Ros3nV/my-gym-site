import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["bg", "en"],
  defaultLocale: "bg",
  // BG is default and shown WITHOUT a prefix (/); EN is /en/...
  localePrefix: "as-needed",
  // Always land on Bulgarian regardless of the browser's Accept-Language;
  // visitors switch to English only via the language toggle (/en/...).
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
