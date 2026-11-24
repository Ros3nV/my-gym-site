import { LOCATION_IMAGE } from "@/data/images";

/** Ids of the live locations — also the keys into the galleries map. */
export type LocationId = "karshiyaka" | "stochna" | "ruse";

export interface Location {
  /** Stable id; matches the localized entry in messages `locations.items`. */
  id: string;
  image?: string;
  /**
   * Google Maps search used for the keyless embed. Uses the business name as
   * listed on Google Maps (not the bare address) so the embed opens the actual
   * MyGym place — name, rating and reviews — instead of an unnamed address pin.
   * Each query was checked to resolve to the right listing.
   */
  mapsQuery?: string;
  /** Gallery key for the lightbox photos (live locations only). */
  galleryKey?: LocationId;
  /** Marks an upcoming, not-yet-open location (corrections7 §3). */
  comingSoon?: boolean;
}

/**
 * Non-localized location facts. Localized name/description/address/amenities live in
 * messages `locations.items` (Task 004) and are matched to this list by `id`.
 */
export const LOCATIONS: readonly Location[] = [
  {
    id: "karshiyaka",
    image: LOCATION_IMAGE.karshiyaka,
    mapsQuery: "MyGym Кършияка, Пловдив",
    galleryKey: "karshiyaka",
  },
  {
    id: "stochna",
    image: LOCATION_IMAGE.stochna,
    mapsQuery: "MyGym Сточна Гара, Пловдив",
    galleryKey: "stochna",
  },
  {
    id: "ruse",
    image: LOCATION_IMAGE.ruse,
    mapsQuery: "MyGym Русе",
    galleryKey: "ruse",
  },
] as const;

export function mapsEmbedUrl(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}
