import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { SOCIAL } from "@/config/nav";
import { IMAGES } from "@/data/images";

/**
 * Home-page call-to-action that replaces the former 3-image gallery
 * (corrections §5, §7): a catchy phrase above a compact orange button that
 * opens the MyGym Instagram page in a new tab. The whole section is backed by a
 * full-bleed gym photo with a dark overlay (replacing the former white
 * background), so the phrase and button read in white over the image.
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
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-ink/60" aria-hidden />

      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <p className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-surface sm:text-4xl lg:text-5xl">
            {t("phrase")}
          </p>
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            // Shape/proportions/design mirror the header's primary "Book" button
            // (Button variant="primary") for consistency (corrections5 §4): same
            // rounded-full pill, px-6 py-3, text-sm font-semibold, gap-2, solid
            // brand. Focus ring is offset against ink here since this CTA sits on
            // a dark photo backdrop rather than the white surface.
            className={
              "mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand " +
              "px-6 py-3 text-sm font-semibold text-surface " +
              "transition-colors hover:bg-brand-600 focus-visible:outline-none " +
              "focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 " +
              "focus-visible:ring-offset-ink"
            }
          >
            {t("button")}
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
