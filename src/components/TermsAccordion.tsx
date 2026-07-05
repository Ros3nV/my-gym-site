"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface TermsSection {
  title: string;
  items: string[];
}

/**
 * Single large collapsible panel for the MyGym Terms of Use, styled to match the
 * FAQ Accordion. Collapsed on initial load; expands to reveal the full,
 * section-by-section terms with numbered points.
 */
export function TermsAccordion({
  heading,
  sections,
}: {
  heading: string;
  sections: TermsSection[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const baseId = useId();
  const headerId = `${baseId}-header`;
  const panelId = `${baseId}-panel`;

  return (
    <div className="border-b border-ink/10">
      <h2>
        <button
          type="button"
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((v) => !v)}
          className={cn(
            "flex w-full items-center justify-between gap-4 py-5 text-left " +
              "text-xl font-bold tracking-tight transition-colors " +
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand " +
              "focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            isOpen ? "text-brand-600" : "text-ink hover:text-brand"
          )}
        >
          <span>{heading}</span>
          <ChevronDown
            aria-hidden
            className={cn(
              "shrink-0 text-brand transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </h2>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        hidden={!isOpen}
        className="overflow-hidden"
      >
        <div className="space-y-6 pb-6 pr-2">
          {sections.map((section, i) => (
            <section key={i}>
              <h4 className="text-sm font-bold uppercase tracking-wide text-ink">
                {section.title}
              </h4>
              <ol className="mt-2 list-decimal space-y-2 pl-6 text-sm text-ink-soft marker:font-semibold marker:text-brand">
                {section.items.map((item, j) => (
                  <li key={j} className="pl-1">
                    {item}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
