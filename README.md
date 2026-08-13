# Meridian Journeys — React Edition

A tours & travels website, converted from the original HTML/CSS design prototype into a
React + Vite project, styled with **Tailwind CSS v4** and routed with **React Router DOM**.

All original animations (scroll reveals, the floating boarding-pass card, the flight-path SVG
draw-in, hover interactions, page-load fade, sticky nav shrink, map-pin ping) are preserved
exactly as in the design prototype.

## Tech stack

- React 19 + Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- React Router DOM v7

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/      Navbar, Footer, PackageCard, DestinationChip
  pages/           Home, Packages, About, Contact — one per route
  data/            destinations.js, packages.js, team.js (edit content here)
  hooks/           useScrollReveal.js — the scroll-in-view animation hook
  index.css        Design tokens, Tailwind import, and all component/animation CSS
```

## Notes

- The bespoke design system (perforation dividers, boarding-pass ticket, passport stamps,
  postcards, dashed flight-path line) lives in `src/index.css` as hand-written CSS alongside
  Tailwind — these are custom enough that hand-authored CSS keeps them exactly as designed,
  while Tailwind is available for any new UI you add.
- Routing: `/`, `/packages`, `/about`, `/contact` — edit `src/App.jsx` to add more.
- Images currently point to Unsplash URLs for placeholder photography — swap in your own
  assets in `src/data/*.js` and inline `<img>` tags where needed.
- The Contact form UI is wired up (`onSubmit` shows a confirmation state) but has no backend —
  connect it to your enquiry endpoint of choice.
