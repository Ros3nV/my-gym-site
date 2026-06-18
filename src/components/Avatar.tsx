/**
 * Default placeholder profile picture (corrections §3): a neutral grey male
 * silhouette on a soft grey disc, used for every review/testimonial where no
 * real member photo exists. Rendered as inline SVG so it stays crisp at any
 * size and needs no image asset or remote loader. Decorative by default
 * (`aria-hidden`) since the adjacent caption already names the member.
 */
export function Avatar({
  size = 44,
  className,
}: {
  size?: number;
  className?: string;
}) {
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
      <path
        d="M10 41a14 14 0 0 1 28 0v1H10v-1Z"
        fill="#9AA0A6"
      />
    </svg>
  );
}
