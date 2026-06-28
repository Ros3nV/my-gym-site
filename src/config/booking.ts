import { LOCATION_IMAGE } from "@/data/images";

/**
 * The two live locations offered in the global "Резервирай" booking modal
 * (corrections8 §3), in display order (stacked top→bottom). Each entry pairs the
 * location's cover photo with its Octiv Fitness sign-up portal so clicking a
 * block opens that location's booking flow in a new tab. Localized block labels
 * live in messages under `booking.locations.<id>`.
 */
export const BOOKING_LOCATIONS = [
  {
    id: "stochna",
    cover: LOCATION_IMAGE.stochna,
    url: "https://app.octivfitness.com/widget/sign-up?publicToken=979d3ac92b95fd3ee343f1d86ba50dd943e60a38",
  },
  {
    id: "karshiyaka",
    cover: LOCATION_IMAGE.karshiyaka,
    url: "https://app.octivfitness.com/widget/sign-up?publicToken=901b06f652725e48e4f5fa5370854050b5e17434",
  },
] as const;
