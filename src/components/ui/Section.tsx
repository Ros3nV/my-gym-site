import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { Reveal } from "@/components/Reveal";

/**
 * Page section providing consistent vertical rhythm and wrapping its children
 * in a {@link Container} for max-width + horizontal gutters. Pass `id` for
 * in-page anchors, `className` to tune the section (e.g. `bg-surface-2`), and
 * `containerClassName` to adjust the inner container.
 *
 * By default the section's content scroll-reveals as it enters the viewport
 * (corrections §8); pass `reveal={false}` to opt out.
 */
export function Section({
  id,
  className,
  containerClassName,
  reveal = true,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  reveal?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-28", className)}>
      <Container className={containerClassName}>
        {reveal ? <Reveal>{children}</Reveal> : children}
      </Container>
    </section>
  );
}
