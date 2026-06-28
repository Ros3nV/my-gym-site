"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { BookingModal } from "@/components/BookingModal";

/**
 * The unified "Резервирай" trigger (corrections8 §3). Every booking entry point
 * across the site (header CTA + home hero CTA) renders this so they share one
 * behaviour: open the {@link BookingModal}. It reuses the {@link Button} primitive
 * (button variant) so styling stays consistent with the rest of the palette;
 * `className` lets a caller resize/emphasize it (e.g. the enlarged home CTA).
 */
export function BookButton({
  variant = "primary",
  className,
  label,
}: {
  variant?: "primary" | "secondary";
  className?: string;
  label?: string;
}) {
  const tc = useTranslations("common");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant={variant}
        className={className}
        onClick={() => setOpen(true)}
      >
        {label ?? tc("bookShort")}
      </Button>
      {open && <BookingModal onClose={() => setOpen(false)} />}
    </>
  );
}
