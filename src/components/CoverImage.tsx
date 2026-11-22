import Image from "next/image";
import { imageFrame, imagePosition } from "@/data/images";
import { cn } from "@/lib/cn";

const ZOOM =
  "transition-transform duration-300 ease-out group-hover:scale-105";

/**
 * Full-bleed cover photo for a `relative` + `overflow-hidden` container that
 * zooms on parent `group` hover. Photos mapped in `imageFrame` (tall portrait
 * shots in wide strips) are drawn "zoomed out": the sharp photo in a centred
 * box of the mapped aspect ratio over a blurred copy of itself; all others use
 * a plain `object-cover` crop. `position` overrides the mapped focal point.
 */
export function CoverImage({
  src,
  alt,
  sizes,
  position,
}: {
  src: string;
  alt: string;
  sizes: string;
  position?: string;
}) {
  const frame = imageFrame(src);
  const focal = position || imagePosition(src);

  if (!frame) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        loading="lazy"
        sizes={sizes}
        className={cn("object-cover", ZOOM, focal)}
      />
    );
  }

  return (
    <span className={cn("absolute inset-0", ZOOM)}>
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        loading="lazy"
        sizes={sizes}
        className="scale-110 object-cover blur-xl brightness-75"
      />
      <span className={cn("absolute inset-y-0 left-1/2 h-full -translate-x-1/2", frame)}>
        <Image
          src={src}
          alt={alt}
          fill
          loading="lazy"
          sizes={sizes}
          className={cn("object-cover", focal)}
        />
      </span>
    </span>
  );
}
