"use client";

/**
 * A `template` re-mounts on every navigation (unlike `layout`), so the white
 * veil below replays its fade-out each time the route changes. The result is a
 * smooth white fade-in / fade-out between pages (corrections §8). The veil is
 * fixed, full-screen and `pointer-events-none` so it never blocks interaction;
 * it is hidden entirely for `prefers-reduced-motion` users (see globals.css).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="route-veil" aria-hidden />
    </>
  );
}
