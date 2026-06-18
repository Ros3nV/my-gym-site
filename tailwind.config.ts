import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      // Design System tokens — the single source of truth for color.
      // Strict orange/white/black palette (exact hexes from the
      // implementation plan's Design System table). Reference colors ONLY
      // via these tokens so the "orange is the only accent" rule stays
      // enforceable by review — no hard-coded hex anywhere else.
      colors: {
        ink: "#111111", // text, headings, dividers, borders
        "ink-soft": "#4B4B4B", // secondary text
        brand: "#E8772E", // primary orange — all interactive elements
        "brand-600": "#CC5F1A", // orange hover / pressed
        surface: "#FFFFFF", // page background
        "surface-2": "#FAFAF8", // subtle off-white section background
      },
    },
  },
  plugins: [],
};

export default config;
