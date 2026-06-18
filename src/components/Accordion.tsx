"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  q: string;
  a: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  // No item is expanded on initial load (corrections4 §4); answers reveal only
  // when the user explicitly clicks a question.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const headerId = `${baseId}-header-${i}`;
        const panelId = `${baseId}-panel-${i}`;

        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={cn(
                  "flex w-full items-center justify-between gap-4 py-5 text-left " +
                    "text-base font-semibold transition-colors " +
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand " +
                    "focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                  isOpen ? "text-brand-600" : "text-ink hover:text-brand"
                )}
              >
                <span>{item.q}</span>
                <ChevronDown
                  aria-hidden
                  className={cn(
                    "shrink-0 text-brand transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
              className="overflow-hidden"
            >
              <p className="pb-5 pr-8 text-ink-soft">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
