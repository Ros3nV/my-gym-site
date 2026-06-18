"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Wraps content in a scroll-reveal effect: children start faded/offset and
 * animate into place the first time they enter the viewport (corrections §8).
 * Uses a one-shot IntersectionObserver and disconnects after revealing. Users
 * with `prefers-reduced-motion` see content immediately (handled in CSS).
 */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("reveal", shown && "reveal-in", className)}>
      {children}
    </div>
  );
}
