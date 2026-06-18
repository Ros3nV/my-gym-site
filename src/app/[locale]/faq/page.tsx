import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Accordion, type AccordionItem } from "@/components/Accordion";

function FaqContent() {
  const t = useTranslations("faq");
  const rules = t.raw("rules") as string[];
  const items = t.raw("items") as AccordionItem[];

  return (
    <Section containerClassName="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>

      <section className="mt-10" aria-labelledby="gym-rules-heading">
        <h2 id="gym-rules-heading" className="text-xl font-bold tracking-tight">
          {t("rulesHeading")}
        </h2>
        <ul className="mt-4 space-y-3">
          {rules.map((rule, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="mt-0.5 shrink-0 text-brand" size={20} aria-hidden />
              <span className="text-ink-soft">{rule}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-xl font-bold tracking-tight">
          {t("faqHeading")}
        </h2>
        <div className="mt-4">
          <Accordion items={items} />
        </div>
      </section>
    </Section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<import("next").Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return { title: t("title") };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FaqContent />;
}
