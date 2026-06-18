import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names with conflict resolution.
 *
 * `clsx` flattens conditional/array/object inputs into a class string, and
 * `twMerge` then dedupes conflicting Tailwind utilities so the last one wins
 * (e.g. a caller's `bg-brand-600` overrides a primitive's default `bg-brand`).
 * Every UI primitive uses this so a `className` prop can override base styles.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
