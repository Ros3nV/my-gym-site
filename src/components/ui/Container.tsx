import { cn } from "@/lib/cn";

/**
 * Centered, max-width content wrapper with responsive horizontal padding.
 * Every section funnels its content through this so page gutters stay uniform.
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
