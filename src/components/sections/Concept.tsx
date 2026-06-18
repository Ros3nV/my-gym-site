import Image from "next/image";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { IMAGES } from "@/data/images";

export function Concept() {
  const t = useTranslations("concept");
  const bullets = t.raw("bullets") as string[];

  return (
    <Section>
      <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src={IMAGES.concept}
            alt={t("imageAlt")}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h2>
          <ul className="mt-6 space-y-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <Check className="mt-0.5 shrink-0 text-brand" aria-hidden />
                <span className="text-ink-soft">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
