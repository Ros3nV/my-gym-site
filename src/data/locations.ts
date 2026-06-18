import { LOCATION_IMAGE } from "@/data/images";

export type LocationId = "center" | "kapana" | "trakiya";

export interface Location {
  id: LocationId;
  image: string;
  /** Plain-text address used to build the keyless Google Maps embed URL. */
  mapsQuery: string;
}

/**
 * Non-localized location facts. Localized name/description/address/amenities live in
 * messages `locations.items` (Task 004) and are matched to this list by `id`.
 */
export const LOCATIONS: readonly Location[] = [
  { id: "center", image: LOCATION_IMAGE.center, mapsQuery: "Отец Паисий, Център, Пловдив" },
  { id: "kapana", image: LOCATION_IMAGE.kapana, mapsQuery: "Капана, Пловдив" },
  { id: "trakiya", image: LOCATION_IMAGE.trakiya, mapsQuery: "Тракия, Пловдив" },
] as const;

export function mapsEmbedUrl(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}
