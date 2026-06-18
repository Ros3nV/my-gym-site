import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary";

// Shared structural + focus styles. Orange focus ring keeps the accent rule
// consistent for keyboard users; offset against `surface` so it reads on white.
const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 " +
  "text-sm font-semibold transition-colors focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-surface disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  // Orange solid → darker orange on hover.
  primary: "bg-brand text-surface hover:bg-brand-600",
  // Ink outline → turns orange on hover (orange is the only accent).
  secondary: "border border-ink text-ink hover:border-brand hover:text-brand",
};

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

// Renders a <button> when no href is given...
type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

// ...or a Next.js <Link> when an href is provided.
type ButtonAsLink = CommonProps & { href: string };

/**
 * Shared CTA primitive used by every interactive element across the site so
 * the palette stays consistent. Pass `href` to render a navigational link,
 * otherwise it renders a native button (forwarding all button attributes such
 * as `type`, `onClick`, `disabled`).
 *
 * Note: for locale-aware navigation, swap the `next/link` import for
 * `@/i18n/navigation` once Task 003 lands; `next/link` keeps this usable now.
 */
export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", className, children } = props;
  const classes = cn(base, variants[variant], className);

  if ("href" in props && props.href !== undefined) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  // Strip the primitive's own props so only valid button attributes are spread.
  const { variant: _variant, className: _className, children: _children, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
