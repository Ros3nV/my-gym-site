# MyGym — Site

Bilingual (BG default / EN) marketing website for MyGym, built with **Next.js (App
Router) + TypeScript + Tailwind CSS**. See [`../.work/mygym-website/implementation-plan.md`](../.work/mygym-website/implementation-plan.md).

## Prerequisites

- **Node.js 18.18+ or 20+** and npm.

## Getting started

```bash
# from inside Site/
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Script          | Purpose                          |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the dev server             |
| `npm run build` | Production build (type + lint)   |
| `npm run start` | Serve the production build       |
| `npm run lint`  | ESLint (`eslint-config-next`)    |

## Stack

- Next.js App Router + TypeScript (strict)
- Tailwind CSS v3
- `next-intl` (i18n — wired in Task 003)
- `lucide-react` (icons)
- One geometric sans (`Inter` via `next/font`), base palette `bg-surface text-ink`

> This is the **R1 scaffold** (Task 001). The full color palette (Task 002), `[locale]`
> routing and middleware (Task 003), and page content land in subsequent tasks. The
> current `src/app/layout.tsx` is a temporary root layout that Task 003 moves to
> `src/app/[locale]/layout.tsx`.
