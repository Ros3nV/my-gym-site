"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IMAGES } from "@/data/images";

const SLIDE_INTERVAL_MS = 3000;

/**
 * Contacts auto-crossfader (corrections6 §2.5): alternates Кършияка #10 and
 * Сточна гара #10 with a smooth fade every 3 seconds. The first listed image
 * (Кършияка) is visible on load. Both images are stacked and toggled via
 * opacity so the fade has something to cross-dissolve into; the interval is
 * cleared on unmount and paused when the user prefers reduced motion.
 */
export function ContactSlideshow({ alt }: { alt: string }) {
  const slides = IMAGES.contactSlides;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <>
      {slides.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          aria-hidden={i !== 0}
          fill
          priority={i === 0}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={
            "object-cover transition-opacity duration-1000 ease-in-out " +
            (i === active ? "opacity-100" : "opacity-0")
          }
        />
      ))}
    </>
  );
}
