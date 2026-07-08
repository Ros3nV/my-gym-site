import { LOCATION_IMAGE } from "@/data/images";

/**
 * The two live locations offered in the global "Резервирай" booking modal
 * (corrections8 §3), in display order (stacked top→bottom: Кършияка first, then
 * Сточна гара). Each entry pairs the location's cover photo with its Octiv
 * Fitness sign-up portal so clicking a block opens that location's booking flow
 * in a new tab. Localized block labels live in messages under
 * `booking.locations.<id>`. `coverPosition` optionally overrides the crop focal
 * point for this modal's wide, short blocks — Сточна is raised toward the top so
 * the MyGym sign stays visible.
 */
export const BOOKING_LOCATIONS = [
  {
    id: "karshiyaka",
    cover: LOCATION_IMAGE.karshiyaka,
    coverPosition: "",
    url: "https://app.octivfitness.com/widget/sign-up?publicToken=901b06f652725e48e4f5fa5370854050b5e17434",
  },
  {
    id: "stochna",
    cover: LOCATION_IMAGE.stochna,
    coverPosition: "object-[35%_top]",
    url: "https://app.octivfitness.com/widget/sign-up?publicToken=979d3ac92b95fd3ee343f1d86ba50dd943e60a38",
  },
] as const;
