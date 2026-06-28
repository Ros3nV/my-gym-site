"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Images } from "lucide-react";
import { Lightbox } from "@/components/Lightbox";

/**
 * Clickable location preview (corrections7 §2). The card's preview image becomes
 * an inviting trigger: on hover it eases to `scale-105` under a dark overlay
 * that reveals a "View Gallery" / "Разгледай" cue, signalling it opens a
 * lightbox. Clicking (or Enter/Space, since it's a real <button>) opens the
 * {@link Lightbox} carousel of the facility's real photos.
 */
export function LocationGallery({
  cover,
  images,
  name,
}: {
  cover: string;
  images: readonly string[];
  name: string;
}) {
  const t = useTranslations("locations");
  const [open, setOpen] = useState(false);
  const triggerLabel = t("labels.viewGallery");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${triggerLabel} — ${name}`}
        className="group relative block h-48 w-full overflow-hidden rounded-2xl sm:h-56"
      >
        <Image
          src={cover}
          alt={name}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
        {/* Dark overlay + "View Gallery" cue, fading in on hover/focus. */}
        <span className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 text-white opacity-0 transition duration-300 group-hover:bg-black/50 group-hover:opacity-100 group-focus-visible:bg-black/50 group-focus-visible:opacity-100">
          <Images size={18} aria-hidden />
          <span className="text-sm font-semibold">{triggerLabel}</span>
        </span>
      </button>

      {open && (
        <Lightbox images={images} name={name} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
