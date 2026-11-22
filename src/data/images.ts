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
  contactSlides: ["/images/contacts-karshiyaka.jpg", "/images/stochna-storefront-2.jpg"] as const,
  // Location-card preview / cover.
  locationKarshiyaka: "/images/locations/karshiyaka/10.jpg", // Кършияка cover
  locationStochna: "/images/stochna-storefront-2.jpg", // Сточна гара cover (storefront photo)
  locationRuse: "/images/locations/ruse/07.jpg", // Русе cover (last gallery photo — the entrance)
} as const;

/** Map a location id to its mapped cover photo. */
export const LOCATION_IMAGE: Record<"karshiyaka" | "stochna" | "ruse", string> = {
  karshiyaka: IMAGES.locationKarshiyaka,
  stochna: IMAGES.locationStochna,
  ruse: IMAGES.locationRuse,
};

/**
 * Optional focal point (object-position) for photos shown with `object-cover`.
 * The Сточна гара storefront is a wide, horizontal shot whose entrance sits
 * left-of-centre, so bias the crop that way to keep the doorway/facade in frame
 * (instead of the neighbouring shop and street on the right) at every aspect
 * ratio it's used in. Falls back to the default centre crop when unmapped.
 */
const IMAGE_POSITION: Record<string, string> = {
  [IMAGES.locationStochna]: "object-[35%_center]",
  // Русе entrance is a tall portrait shot; bias the crop upward so the whole
  // MY GYM sign stays in frame above the doorway.
  [IMAGES.locationRuse]: "object-[center_30%]",
};

export function imagePosition(src: string): string {
  return IMAGE_POSITION[src] ?? "";
}

/**
 * Optional "zoomed-out" framing for portrait photos shown in wide preview
 * strips. A plain `object-cover` crop of a tall photo into a wide strip only
 * shows a thin horizontal slice; mapped photos are instead drawn into a centred
 * box of this aspect ratio (revealing more of their height), with a blurred
 * copy of the same photo filling the strip behind it. Unmapped photos keep the
 * full-bleed cover crop.
 */
const IMAGE_FRAME: Record<string, string> = {
  // Русе: show the whole MY GYM sign down to the foot of the entrance door.
  [IMAGES.locationRuse]: "aspect-square",
};

export function imageFrame(src: string): string | undefined {
  return IMAGE_FRAME[src];
}
