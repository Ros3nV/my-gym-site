import Image from "next/image";
import { CalendarCheck, KeyRound, Dumbbell } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { IMAGES } from "@/data/images";

const STEP_ICONS = [CalendarCheck, KeyRound, Dumbbell] as const;

type Step = { title: string; body: string };

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const steps = t.raw("steps") as Step[];

  return (
    <Section className="bg-surface-2">
      {/* Mirror the "Why MyGym" (Concept) layout so the heading sits directly
          above the first step with the same `mt-6` rhythm, instead of being
          pushed apart by the vertically-centered grid (corrections4 §3). */}
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h2>
          <ol className="mt-6 grid gap-8 sm:grid-cols-3 lg:grid-cols-1">
            {steps.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? Dumbbell;
              return (
                <li key={step.title} className="flex gap-4">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand"
                    aria-hidden
                  >
                    <Icon />
                  </span>
                  <div>
                    <h3 className="font-semibold">
                      <span className="text-brand-600">{i + 1}.</span> {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft">{step.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src={IMAGES.privacy}
            alt={t("imageAlt")}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
