import Image from "next/image";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { mapsEmbedUrl, type Location } from "@/data/locations";

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
          <div className="relative h-28 w-full overflow-hidden rounded-2xl">
            <Image
              src={location.image}
              alt={data.name}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

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
            src={mapsEmbedUrl(location.mapsQuery)}
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
