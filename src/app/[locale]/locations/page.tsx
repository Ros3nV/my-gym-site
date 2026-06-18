import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { LocationCard } from "@/components/LocationCard";
import { LOCATIONS } from "@/data/locations";

function LocationsContent() {
  const t = useTranslations("locations");
  return (
    <Section className="py-12 sm:py-14 lg:py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="mt-3 text-ink-soft">{t("subtitle")}</p>
      </header>
      {/* Compact, evenly-spaced stack so one location reads cleanly per screen
          without unnecessary scrolling (corrections §4). */}
      <div className="mt-8 flex flex-col gap-6">
        {LOCATIONS.map((loc) => (
          <LocationCard key={loc.id} location={loc} />
        ))}
      </div>
    </Section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<import("next").Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "locations" });
  return { title: t("title") };
}

export default async function LocationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LocationsContent />;
}
