import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { mapsEmbedUrl, type Location } from "@/data/locations";
import { GALLERIES } from "@/data/galleries";
import { LocationGallery } from "@/components/LocationGallery";

interface LocationItem {
  id: string;
  name: string;
  area: string;
  description: string;
  address: string;
  phone: string;
  hours: string;
  amenities: string[];
}

export function LocationCard({ location }: { location: Location }) {
  const t = useTranslations("locations");
  const items = t.raw("items") as LocationItem[];
  const data = items.find((i) => i.id === location.id);
  if (!data) return null;

  // Coming-soon variant (corrections7 §3): an upcoming gym rendered as a
  // visually distinct, non-interactive card in the red/black brand palette,
  // muted so it reads as "not active yet", with a prominent badge.
  if (location.comingSoon) {
    // "Coming soon" teaser (Nova-lokacia design): a solid orange panel densely
    // tiled with a faded "Очаквайте скоро" watermark that bleeds off every edge —
    // each row repeats the phrase well past the card width and is nudged left by a
    // varying amount, so phrases are clipped mid-word at the sides; the whole stack
    // starts above the top edge so the first and last rows are cut off too, as if
    // the pattern continued beyond the screen. The location name sits centered on
    // top in bold white italic at a slight tilt. Static and non-interactive.
    // The watermark is decorative (aria-hidden); the accessible name + status live
    // in an sr-only line so screen readers read them once, not per repeat.
    const WATERMARK_ROWS = 14;
    const WATERMARK_REPEAT = 6;
    const ROW_SHIFTS = [
      "-translate-x-6",
      "-translate-x-24",
      "-translate-x-16",
      "-translate-x-32",
    ];
    const rowText = Array.from({ length: WATERMARK_REPEAT }, () =>
      t("labels.comingSoon")
    ).join(" ");

    return (
      <article className="relative min-h-[340px] overflow-hidden rounded-3xl bg-brand text-surface shadow-md sm:min-h-[380px]">
        {/* Tiled watermark background, bleeding off all four edges. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-10 -right-10 -top-6 flex flex-col gap-2">
            {Array.from({ length: WATERMARK_ROWS }, (_, r) => (
              <div
                key={r}
                className={`whitespace-nowrap text-2xl font-extrabold italic uppercase leading-none tracking-tight text-white/20 sm:text-3xl ${
                  ROW_SHIFTS[r % ROW_SHIFTS.length]
                }`}
              >
                {rowText}
              </div>
            ))}
          </div>
        </div>

        {/* Centered location name, slightly tilted. */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <h2 className="-rotate-6 text-center text-4xl font-extrabold italic uppercase tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] sm:text-5xl">
            {data.name}
          </h2>
        </div>

        {/* Screen-reader context (conveyed visually by the design above). */}
        <span className="sr-only">
          {t("labels.comingSoon")} — {data.area}
        </span>
      </article>
    );
  }

  const gallery = location.galleryKey ? GALLERIES[location.galleryKey] : [];
  const cover = location.image ?? gallery[0];

  // Per corrections §2: details are always on the left, the Google Map always
  // on the right (they stack on mobile, details first). corrections3 §3: the
  // line under the name shows only the address, the description / phone / hours
  // are dropped, and the equipment list is the last block in the left column so
  // its bottom edge aligns with the bottom edge of the map (which fills the
  // full card height — see the iframe `h-full` with no max-height cap).
  return (
    <article className="overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-sm">
      <div className="grid md:grid-cols-2">
        {/* Details (left) */}
        <div className="flex flex-col gap-4 p-5 sm:p-6">
          {/* Clickable preview → lightbox gallery (corrections7 §2). */}
          {cover && gallery.length > 0 ? (
            <LocationGallery cover={cover} images={gallery} name={data.name} />
          ) : null}

          <div>
            <h2 className="text-2xl font-bold tracking-tight">{data.name}</h2>
            <p className="mt-1 text-sm text-ink-soft">{data.area}</p>
          </div>

          <div>
            <p className="text-sm font-semibold">{t("labels.amenities")}</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-ink-soft">
              {data.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2">
                  <Check className="shrink-0 text-brand" size={16} aria-hidden />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Google Map (right) — fills the full card height so its bottom edge
            lines up with the equipment list on the left (corrections3 §3). */}
        <div className="min-h-[220px]">
          <iframe
            src={mapsEmbedUrl(location.mapsQuery ?? data.address)}
            title={t("labels.mapTitle", { name: data.name })}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[220px] w-full border-0"
          />
        </div>
      </div>
    </article>
  );
}
