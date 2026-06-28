import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { BookButton } from "@/components/BookButton";
import { IMAGES } from "@/data/images";

/**
 * Home-page call-to-action (corrections §5, §7): a catchy phrase above the
 * primary "Резервирай" CTA — the focal point of the page, deliberately larger and
 * heavier than the header's booking button, which opens the global booking modal
 * (corrections8 §3). The whole section is backed by a full-bleed gym photo with a
 * dark overlay so the phrase and button read in white over the image. The photo
 * was shot through a mirror (the "MyGym" wordmark reads backwards), so it is
 * flipped horizontally to make the logo legible (corrections8 §1).
 */
export function BookCta() {
  const t = useTranslations("homeCta");

  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-28">
      {/* Full-bleed gym photo background + dark overlay for legibility. */}
      <Image
        src={IMAGES.ctaBg}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        // Shot through a mirror → flip horizontally so the "MyGym" wordmark in
        // the photo reads correctly (corrections8 §1).
        className="-z-10 -scale-x-100 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-ink/60" aria-hidden />

      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <p className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-surface sm:text-4xl lg:text-5xl">
            {t("phrase")}
          </p>
          {/* Primary focal CTA (corrections8 §1): deliberately larger and heavier
              than the header's booking button — more padding, larger text, bolder
              weight, plus a drop shadow for prominence. The ring offset is against
              ink since this sits on a dark photo backdrop, not the white surface. */}
          <BookButton
            label={t("button")}
            className="mt-8 px-10 py-5 text-lg font-bold shadow-xl shadow-brand/30 focus-visible:ring-offset-ink sm:text-xl"
          />
        </Reveal>
      </Container>
    </section>
  );
}
