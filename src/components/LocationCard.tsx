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
    // "Coming soon" teaser (corrections8): an orange section criss-crossed by
    // scattered white tape bands (orange text) at widely varied angles and
    // heights — some near-horizontal so they run straight off the sides, some
    // steep — like the chaos of a real construction site, each carrying repeated
    // "Очаквайте скоро". A clean white sign with orange text reads the location
    // name, centered over the tangle. Static (no animation) and non-interactive.
    // The tape is decorative (aria-hidden); the accessible name + status live in
    // the centered sign so screen readers read them once, not per repeat.
    // Each band carries its own absolute placement + rotation. Two diagonal
    // bands cross on the left/center; the third sits in the right part of the
    // card and runs horizontally, exiting off the right edge.
    const BANDS = [
      "left-1/2 top-[22%] w-[260%] -translate-x-1/2 -translate-y-1/2 -rotate-[24deg]",
      "left-1/2 top-[66%] w-[260%] -translate-x-1/2 -translate-y-1/2 rotate-[15deg]",
      "right-[-12%] top-[44%] w-[62%] -translate-y-1/2 rotate-0",
    ];

    return (
      <article className="relative min-h-[340px] overflow-hidden rounded-3xl bg-brand text-surface shadow-md sm:min-h-[380px]">
        {BANDS.map((band, b) => (
          <div
            key={b}
            aria-hidden
            className={`pointer-events-none absolute ${band} overflow-hidden bg-surface shadow-md`}
          >
            {/* Striped top edge. */}
            <div className="tape-stripes h-2 w-full" />
            <div className="flex items-center justify-center gap-6 whitespace-nowrap py-1.5 text-sm font-extrabold uppercase tracking-[0.25em] text-brand">
              {Array.from({ length: 18 }, (_, i) => (
                <span key={i} className="flex items-center gap-6">
                  {t("labels.comingSoon")}
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand/50" />
                </span>
              ))}
            </div>
            {/* Striped bottom edge. */}
            <div className="tape-stripes h-2 w-full" />
          </div>
        ))}

        {/* Centered sign sitting on top of the tangle of tape. */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="max-w-sm rounded-2xl bg-surface px-6 py-5 text-center shadow-2xl ring-1 ring-ink/10 sm:px-9 sm:py-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              {t("labels.comingSoon")}
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand sm:text-3xl">
              {data.name}
            </h2>
            <p className="mx-auto mt-2 max-w-xs text-sm text-ink-soft">{data.area}</p>
          </div>
        </div>
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
