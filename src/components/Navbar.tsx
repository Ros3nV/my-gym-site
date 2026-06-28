"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { BookButton } from "@/components/BookButton";
import { Container } from "@/components/ui/Container";
import { LanguageToggle } from "@/components/LanguageToggle";
import { NAV_LINKS } from "@/config/nav";
import { IMAGES } from "@/data/images";
import { cn } from "@/lib/cn";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-surface/90 backdrop-blur">
      <Container>
        {/* Logo and nav links stay clustered on the left (corrections §2), while
            the BG/EN switcher and Book CTA are pushed to the right edge so they
            align with the right edge of the Locations map — "Point N"
            (corrections3 §4). The mobile hamburger is pushed right via
            `ml-auto`. */}
        <div className="flex h-16 items-center gap-8">
          <Link href="/" className="flex items-center" aria-label="MyGym home">
            <Image
              src={IMAGES.logo}
              alt="MyGym"
              width={66}
              height={44}
              priority
              className="h-11 w-auto"
            />
          </Link>

          {/* Desktop nav links — left cluster, next to the logo. Contacts (the
              last link) is the rightmost of this group. */}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand",
                  isActive(l.href) ? "text-brand-600" : "text-ink"
                )}
              >
                {t(l.key)}
              </Link>
            ))}
          </nav>

          {/* BG/EN switcher + Book CTA — pinned to the right edge (Point N). */}
          <div className="ml-auto hidden items-center gap-6 lg:flex">
            <LanguageToggle />
            <BookButton variant="primary" />
          </div>

          <button
            type="button"
            className="ml-auto rounded p-2 lg:hidden"
            aria-expanded={open}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="text-brand" /> : <Menu className="text-ink" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-ink/5 bg-surface lg:hidden">
          <Container>
            <nav className="flex flex-col gap-1 py-4" aria-label="Mobile">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-2 py-3 text-base font-medium",
                    isActive(l.href) ? "text-brand-600" : "text-ink"
                  )}
                >
                  {t(l.key)}
                </Link>
              ))}
              <div className="flex items-center justify-between px-2 pt-3">
                <LanguageToggle />
                <BookButton variant="primary" />
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
