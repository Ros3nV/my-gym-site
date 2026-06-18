"use client";

import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const current = (params.locale as Locale) ?? routing.defaultLocale;
  const [isPending, startTransition] = useTransition();

  function switchTo(locale: Locale) {
    if (locale === current) return;
    startTransition(() => {
      // Preserve the rest of the path; only the locale segment changes.
      router.replace(pathname, { locale });
    });
  }

  return (
    <div
      className="flex items-center gap-1 text-sm font-semibold"
      aria-label="Language"
      data-pending={isPending ? "" : undefined}
    >
      {routing.locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          {i > 0 && <span className="text-ink-soft/40">/</span>}
          <button
            type="button"
            onClick={() => switchTo(locale)}
            aria-current={locale === current ? "true" : undefined}
            className={cn(
              "uppercase transition-colors focus-visible:outline-none " +
                "focus-visible:ring-2 focus-visible:ring-brand rounded px-1",
              locale === current ? "text-brand-600" : "text-ink-soft hover:text-ink"
            )}
          >
            {locale}
          </button>
        </span>
      ))}
    </div>
  );
}
