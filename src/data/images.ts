/**
 * Single source of truth for asset → placement, per the implementation plan's
 * Image Mapping table. Components import from here so no photo is reused off-map.
 */
export const IMAGES = {
  logo: "/images/new_logo.png", // MG monogram + "MY GYM" wordmark (from logo.pdf)
  hero: "/images/7.jpg", // ONLY landscape → Home hero background
  concept: "/images/8.jpg", // premium lounge → "Why MyGym"
  privacy: "/images/9.jpg", // frosted "PRIVATE 24/7" → How it works
  contact: "/images/8.jpg", // premium lounge portrait → Contacts vertical image
  ctaBg: "/images/1.jpg", // equipment-dense gym → Home CTA banner background
  locationCenter: "/images/4.png", // MYGYM wall logo lounge
  locationTrakiya: "/images/1.jpg", // equipment-dense private room
  locationKapana: "/images/6.png", // ATX power rack
  gallery: ["/images/3.png", "/images/5.png", "/images/2.png"] as const,
} as const;

/** Map a location id (Task 004 data) to its mapped photo. */
export const LOCATION_IMAGE: Record<"center" | "kapana" | "trakiya", string> = {
  center: IMAGES.locationCenter,
  kapana: IMAGES.locationKapana,
  trakiya: IMAGES.locationTrakiya,
};
