"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Full-screen gallery modal (corrections7 §2). Dims the page behind a
 * `bg-black/80` backdrop and centers one photo at a time inside a letterboxed
 * box (`object-contain`, so portrait and landscape shots both fit). Provides a
 * prominent close button, prev/next arrows, a position counter and a thumbnail
 * strip to jump between photos. Copy comes from the `locations.labels.*` keys.
 *
 * Rendered through a portal into `document.body` so the fixed backdrop covers
 * the whole viewport — otherwise the `Reveal` ancestor's `will-change:
 * transform` would make `position: fixed` resolve against that box and only dim
 * part of the screen (corrections8 §6). It fades in via `.lightbox-fade`.
 *
 * Accessibility / UX:
 * - `role="dialog"` + `aria-modal`; Escape closes, ←/→ navigate.
 * - Clicking the dimmed backdrop (but not the image) closes.
 * - Body scroll is locked while open and restored on close.
 */
export function Lightbox({
  images,
  name,
  startIndex = 0,
  onClose,
}: {
  images: readonly string[];
  name: string;
  startIndex?: number;
  onClose: () => void;
}) {
  const t = useTranslations("locations");
  const count = images.length;
  const [index, setIndex] = useState(startIndex);
  const [mounted, setMounted] = useState(false);

  // Portals require the DOM; only render after mount (the modal is client-only).
  useEffect(() => setMounted(true), []);

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count]
  );

  // Keyboard controls.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  // Lock body scroll while the modal is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const counter = (i: number) =>
    t("labels.galleryCounter", { index: i + 1, total: count });

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={name}
      className="lightbox-fade fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Top bar: counter + close. */}
      <div className="flex items-center justify-between p-4 text-white">
        <span className="text-sm font-medium tabular-nums">{counter(index)}</span>
        <button
          type="button"
          aria-label={t("labels.galleryClose")}
          onClick={onClose}
          className="rounded-full bg-white/10 p-2 transition hover:bg-brand focus-visible:bg-brand"
        >
          <X size={22} aria-hidden />
        </button>
      </div>

      {/* Stage: arrows flank a letterboxed image. stopPropagation so clicks on
          the controls/image don't bubble up to the backdrop's onClose. */}
      <div
        className="relative flex flex-1 items-center justify-center px-2 sm:px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {count > 1 && (
          <button
            type="button"
            aria-label={t("labels.galleryPrev")}
            onClick={() => go(-1)}
            className="absolute left-2 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-brand focus-visible:bg-brand sm:left-4"
          >
            <ChevronLeft size={28} aria-hidden />
          </button>
        )}

        <div className="relative h-full max-h-[78vh] w-full max-w-5xl">
          <Image
            key={images[index]}
            src={images[index]}
            alt={`${name} — ${counter(index)}`}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
            className="object-contain"
          />
        </div>

        {count > 1 && (
          <button
            type="button"
            aria-label={t("labels.galleryNext")}
            onClick={() => go(1)}
            className="absolute right-2 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-brand focus-visible:bg-brand sm:right-4"
          >
            <ChevronRight size={28} aria-hidden />
          </button>
        )}
      </div>

      {/* Thumbnail strip. */}
      {count > 1 && (
        <div
          className="flex justify-center gap-2 overflow-x-auto p-4"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={counter(i)}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition",
                i === index
                  ? "ring-brand"
                  : "opacity-60 ring-transparent hover:opacity-100"
              )}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}
