import type messages from "../messages/bg.json";

declare module "next-intl" {
  interface AppConfig {
    Messages: typeof messages;
  }
}

// CSS side-effect imports (Next.js handles these at build time)
declare module "*.css" {}

