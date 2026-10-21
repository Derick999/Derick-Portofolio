# Derick Raditya: Portfolio

Next.js (App Router, TypeScript) · Tailwind CSS v4 · Framer Motion · next/image. Deploys to Vercel.

## Run locally

Needs Node.js 20.9 or newer.

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build; use this for Lighthouse checks
```

## Replace the hero photo

1. Export your photo as **`hero.jpg`**. Portrait works best (4:5, e.g. 1200×1500 px or larger). Keep it under ~500 KB.
2. Overwrite `public/images/hero.jpg` with it, keeping the same name.
3. Restart `npm run dev`. The width, height and blur placeholder are generated automatically.

The frame crops to 4:5 with `object-cover`. To change the shape, edit `aspect-[4/5]` and
`rounded-[2rem]` in `components/sections/HeroPhoto.tsx`. For a circle, use `aspect-square` with `rounded-full`.

## Edit content

| What | Where |
| --- | --- |
| Name, tagline, subline, nav links | `lib/site.ts` |
| Projects / Journey / Recognition / Skills | `data/*.json` (types in `lib/content.ts`) |
| Colors (including the accent) and dark mode | `app/globals.css` (`:root` tokens) |

Entries marked `"placeholder": true` or `[PLACEHOLDER]` are dummies. Replace or delete them.

## Structure

```
app/            layout.tsx (font, navbar, footer), page.tsx (section order), globals.css
components/
  layout/       Navbar, Footer, MotionProvider (reduced-motion handling)
  sections/     Hero, HeroPhoto
  ui/           Section, Reveal, Button, Container, Placeholder
data/           JSON content
lib/            site.ts (identity + nav), content.ts (typed JSON access)
public/images/  hero.jpg
```

## Deploy

Push to GitHub, then import the repo at vercel.com/new. No configuration is needed.
