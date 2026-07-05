/**
 * Single source of truth for asset → placement, per the implementation plan's
 * Image Mapping table. Components import from here so no photo is reused off-map.
 */
export const IMAGES = {
  logo: "/images/new_logo.png", // MG monogram + "MY GYM" wordmark (from logo.pdf)
  hero: "/images/hero-stochna.jpg", // Сточна гара #2 → Home hero background (corrections6 §2.1)
  concept: "/images/locations/karshiyaka/09.jpg", // Кършияка gallery #9 → "Why MyGym"
  privacy: "/images/howitworks-karshiyaka.jpg", // Кършияка #1 → How it works (corrections6 §2.3)
  contact: "/images/8.jpg", // premium lounge portrait → Contacts vertical image (replaced by crossfade slideshow)
  ctaBg: "/images/cta-stochna.jpg", // Сточна гара #1 → "Your private gym awaits" CTA bg (corrections6 §2.4)
  // Contacts auto-crossfade pair: Кършияка #10 ⇄ Сточна гара storefront.
  contactSlides: ["/images/contacts-karshiyaka.jpg", "/images/stochna-storefront.jpg"] as const,
  // Location-card preview / cover.
  locationKarshiyaka: "/images/locations/karshiyaka/10.jpg", // Кършияка cover
  locationStochna: "/images/stochna-storefront.jpg", // Сточна гара cover (storefront photo)
} as const;

/** Map a location id (corrections6 §1: exactly 2 locations) to its mapped photo. */
export const LOCATION_IMAGE: Record<"karshiyaka" | "stochna", string> = {
  karshiyaka: IMAGES.locationKarshiyaka,
  stochna: IMAGES.locationStochna,
};
