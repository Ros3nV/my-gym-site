import Image from "next/image";

/**
 * Reviewer avatar (corrections7 §1). When a real member photo is supplied via
 * `src` it is rendered as a perfect circle — fixed 1:1 box, `object-cover`,
 * `rounded-full` — so any source aspect ratio is cropped to a clean disc. When
 * no photo exists (`src` omitted/null) it falls back to a neutral grey male
 * silhouette drawn as inline SVG, which stays crisp at any size and needs no
 * asset. Decorative by default (`aria-hidden`) since the adjacent caption
 * already names the member.
 */
export function Avatar({
  src,
  alt,
  size = 44,
  className,
}: {
  src?: string | null;
  alt?: string;
  size?: number;
  className?: string;
}) {
  if (src) {
    return (
      <span
        className={className}
        style={{ width: size, height: size, display: "inline-block" }}
      >
        <Image
          src={src}
          alt={alt ?? ""}
          width={size}
          height={size}
          loading="lazy"
          className="aspect-square h-full w-full rounded-full object-cover"
        />
      </span>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-hidden
      className={className}
    >
      <circle cx="24" cy="24" r="24" fill="#E5E5E5" />
      <circle cx="24" cy="19" r="8" fill="#9AA0A6" />
      <path d="M10 41a14 14 0 0 1 28 0v1H10v-1Z" fill="#9AA0A6" />
    </svg>
  );
}
