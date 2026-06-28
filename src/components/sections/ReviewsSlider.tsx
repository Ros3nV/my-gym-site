import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { StarRating } from "@/components/StarRating";
import { Avatar } from "@/components/Avatar";
import { REVIEWS } from "@/data/reviews";

const VISIBLE_COUNT = 6; // pull up to 6 reviews into the marquee pool

/**
 * Home-page reviews marquee (corrections4 §2): a white-background section,
 * placed just before the booking CTA, that scrolls the reviews horizontally in
 * a slow, continuous, infinite loop. The pool of reviews is duplicated back to
 * back and the track translates by exactly half its width (`marquee` keyframes
 * in globals.css), so the seam is invisible and the loop never visibly rewinds.
 * Card widths are sized so at most four reviews are on screen at once. The
 * animation is pure CSS and is disabled for `prefers-reduced-motion` users.
 *
 * Reviews are the real, imported testimonials from {@link REVIEWS}
 * (corrections7 §1): each card shows the member's real name and photo, falling
 * back to the default avatar when a review has no photo.
 */
export function ReviewsSlider() {
  const t = useTranslations("reviews");
  const items = REVIEWS.slice(0, VISIBLE_COUNT);
  // Duplicate the pool so the -50% translate lands on a seamless repeat.
  const track = [...items, ...items];

  return (
    <section className="bg-surface py-16 sm:py-20 lg:py-24">
      <Container>
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h2>
          <p className="mt-3 text-ink-soft">{t("subtitle")}</p>
        </header>
      </Container>

      {/* Full-bleed track: overflow hidden on the section, no Container, so the
          marquee can run edge to edge. Each card carries its own horizontal
          padding (no flex gap) so half the track width is exactly one pool. */}
      <div className="mt-10 overflow-hidden">
        <ul className="marquee-track flex w-max">
          {track.map((review, i) => (
            // Cards are wider than they are tall (corrections5 §3): horizontal
            // rectangles rather than squares. The wider width also keeps at most
            // ~4 reviews on screen at once.
            <li key={`${review.id}-${i}`} className="w-[22rem] shrink-0 px-3 sm:w-[26rem]">
              <figure className="flex h-full flex-col items-center justify-center gap-3 rounded-3xl border border-ink/10 bg-surface px-8 py-6 text-center shadow-sm">
                <StarRating rating={review.rating} />
                <blockquote className="line-clamp-5 text-lg text-ink-soft">
                  “{review.text}”
                </blockquote>
                {/* Avatar and member name share one centered row so they sit on
                    exactly the same horizontal axis (corrections5 §3). */}
                <figcaption className="mt-1 flex items-center justify-center gap-3">
                  <Avatar src={review.avatar} alt={review.author} size={40} className="shrink-0" />
                  <span className="text-sm font-semibold text-ink">{review.author}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
