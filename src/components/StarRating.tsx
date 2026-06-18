import { Star } from "lucide-react";

/**
 * Renders a row of `max` stars with the first `rating` filled in brand orange
 * and the rest as faint outlines. The whole row is exposed to assistive tech as
 * a single image with a "{rating} / {max}" label, so individual stars are
 * hidden from the accessibility tree.
 */
export function StarRating({
  rating,
  max = 5,
  label,
}: {
  rating: number;
  max?: number;
  label?: string;
}) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={label ?? `${rating} / ${max}`}
    >
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          size={18}
          aria-hidden
          className={i < rating ? "fill-brand text-brand" : "fill-ink/10 text-ink/15"}
        />
      ))}
    </div>
  );
}
