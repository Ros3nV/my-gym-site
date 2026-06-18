import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";

function HowToBookContent() {
  const t = useTranslations("howToBook");
  const steps = t.raw("steps") as string[];

  return (
    <Section containerClassName="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="mt-3 text-ink-soft">{t("intro")}</p>

      <ol className="mt-10 space-y-6">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-4">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-base font-bold text-surface"
              aria-hidden
            >
              {i + 1}
            </span>
            <p className="pt-2 text-ink-soft">{step}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<import("next").Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "howToBook" });
  return { title: t("title") };
}

export default async function HowToBookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HowToBookContent />;
}
