import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IMAGES } from "@/data/images";

export function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");
  const subtitle = t("subtitle");

  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={IMAGES.hero}
        alt={t("imageAlt")}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* Light theme: soft white→transparent gradient for legibility, NOT a dark scrim */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-surface/90 via-surface/70 to-surface/20"
        aria-hidden
      />
      <Container>
        <div className="max-w-2xl py-28 sm:py-36 lg:py-44">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          {subtitle ? (
            <p className="mt-6 text-lg text-ink-soft sm:text-xl">{subtitle}</p>
          ) : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/how-to-book" variant="primary">
              {tc("bookCta")}
            </Button>
            <Button href="/locations" variant="secondary">
              {tc("exploreLocations")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
