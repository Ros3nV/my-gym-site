"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { BOOKING_LOCATIONS } from "@/config/booking";

/**
 * Global booking modal (corrections8 §3). Triggered by every "Резервирай" button
 * (header + home CTA), it dims the page behind the same `bg-black/80` backdrop as
 * the {@link Lightbox} and stacks the two live locations vertically. Each block
 * uses the location's cover photo as background with its name centered in crisp
 * white over a dark gradient, gently zooms (`scale-105`) on hover, and is wrapped
 * in an anchor to that location's Octiv Fitness sign-up portal (new tab).
 *
 * Rendered through a portal into `document.body` so the fixed backdrop covers the
 * whole viewport regardless of any transformed ancestor (same reasoning as the
 * Lightbox). Escape and a backdrop click close it, and body scroll is locked
 * while open.
 */
export function BookingModal({ onClose }: { onClose: () => void }) {
  const t = useTranslations("booking");
  const [mounted, setMounted] = useState(false);

  // Portals require the DOM; only render after mount (the modal is client-only).
  useEffect(() => setMounted(true), []);

  // Escape closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll while the modal is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("ariaLabel")}
      onClick={onClose}
      className="lightbox-fade fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-sm"
    >
      {/* Top bar: title + close. */}
      <div className="flex items-center justify-between p-4 text-white">
        <span className="text-base font-semibold">{t("title")}</span>
        <button
          type="button"
          aria-label={t("close")}
          onClick={onClose}
          className="rounded-full bg-white/10 p-2 transition hover:bg-brand focus-visible:bg-brand"
        >
          <X size={22} aria-hidden />
        </button>
      </div>

      {/* Stacked location blocks. stopPropagation so clicks on the blocks don't
          bubble up to the backdrop's onClose. */}
      <div
        className="flex flex-1 items-center justify-center overflow-y-auto px-4 pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full max-w-3xl flex-col gap-4 sm:gap-6">
          {BOOKING_LOCATIONS.map((loc) => {
            const name = t(`locations.${loc.id}`);
            return (
              <a
                key={loc.id}
                href={loc.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="group relative block h-44 w-full overflow-hidden rounded-2xl ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:h-56"
              >
                <Image
                  src={loc.cover}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
                {/* Dark gradient so the white name stays legible over any photo. */}
                <span
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/40"
                  aria-hidden
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="px-4 text-center text-3xl font-bold tracking-tight text-white drop-shadow-lg sm:text-4xl">
                    {name}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}
