import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["bg", "en"],
  defaultLocale: "bg",
  // BG is default and shown WITHOUT a prefix (/); EN is /en/...
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
