"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IMAGES } from "@/data/images";

const STORAGE_KEY = "mygym:intro-shown";
const FADE_IN_MS = 500; // logo fades in from the blank white screen
const HOLD_MS = 500; // logo held fully visible for exactly 0.5 seconds
const FADE_OUT_MS = 500; // then the whole white screen fades out

/**
 * First-visit intro overlay (corrections5 §2): a blank white screen that
 * smoothly fades in the MyGym logo, holds it for exactly 0.5s, then fades the
 * entire white screen out to reveal the home page. It plays only once per
 * browser tab (guarded by `sessionStorage`), so client-side navigation between
 * pages keeps the regular route fade (`route-veil`) without replaying this
 * screen.
 *
 * The overlay is rendered "visible" from the very first paint (SSR + initial
 * client render) so it completely hides the underlying page before anything
 * else appears — this prevents the flash where the page showed first, then the
 * loader, then the page again (corrections4 §1, FOUC fix). The logo itself
 * starts at `opacity-0` (blank white screen) and is faded in on the first
 * frame. The effect either runs the full sequence (first visit) or hides the
 * overlay immediately when it has already played this tab. Skipped entirely for
 * `prefers-reduced-motion`.
 */
export function InitialLoader() {
  // Start "visible" so the overlay is part of the first paint (no FOUC); the
  // effect below corrects this on repeat visits / reduced-motion.
  const [phase, setPhase] = useState<"idle" | "visible" | "leaving">("visible");
  // Drives the logo fade-in; starts hidden so the screen begins fully blank.
  const [logoIn, setLogoIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) {
      setPhase("idle");
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setPhase("idle");
      return;
    }

    // Flip the logo to visible on the next frame so the opacity transition runs
    // (a fade-in) instead of the logo appearing instantly.
    const raf = requestAnimationFrame(() => setLogoIn(true));
    const fade = setTimeout(() => setPhase("leaving"), FADE_IN_MS + HOLD_MS);
    const done = setTimeout(() => {
      setPhase("idle");
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, FADE_IN_MS + HOLD_MS + FADE_OUT_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, []);

  if (phase === "idle") return null;

  return (
    <div
      aria-hidden
      className={
        "fixed inset-0 z-[10000] flex items-center justify-center bg-surface " +
        "transition-opacity duration-500 ease-out " +
        (phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100")
      }
    >
      <Image
        src={IMAGES.logo}
        alt=""
        width={240}
        height={160}
        priority
        className={
          "h-auto w-40 transition-opacity duration-500 ease-out sm:w-48 " +
          (logoIn ? "opacity-100" : "opacity-0")
        }
      />
    </div>
  );
}
