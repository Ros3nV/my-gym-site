import { LOCATION_IMAGE } from "@/data/images";

/** Ids of the two live locations — also the keys into the galleries map. */
export type LocationId = "karshiyaka" | "stochna";

export interface Location {
  /** Stable id; matches the localized entry in messages `locations.items`. */
  id: string;
  image?: string;
  /** Plain-text address used to build the keyless Google Maps embed URL. */
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
    mapsQuery: 'Ул. "Победа" 9, гр. Пловдив',
    galleryKey: "karshiyaka",
  },
  {
    id: "stochna",
    image: LOCATION_IMAGE.stochna,
    mapsQuery: 'бул. "Найчо Цанов" 5, гр. Пловдив',
    galleryKey: "stochna",
  },
  // Third location (corrections7 §3): upcoming, non-interactive "Coming Soon"
  // card. No image/map/gallery — it renders its own muted red/black panel.
  {
    id: "third",
    comingSoon: true,
  },
] as const;

export function mapsEmbedUrl(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}
