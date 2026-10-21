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
| Projects, Journey (see below) / Recognition / Skills | `data/*.json` (types in `lib/content.ts`) |
| Colors (whole palette) | `app/globals.css` (`:root` tokens; `.theme-navy` for dark sections) |

Entries marked `"placeholder": true` or `[PLACEHOLDER]` are dummies. Replace or delete them.

## Add a new project

No component changes needed: edit one JSON file and add images.

1. **Images.** Create a folder `public/images/projects/<slug>/` and put in:
   - `cover.jpg`: landscape, 4:3 (e.g. 1600×1200). Featured cards crop it to 16:9 on desktop, so keep the subject centred.
   - `gallery-1.jpg`, `gallery-2.jpg`, …: also shown at 4:3. Add as many as you like.
2. **Data.** Add an object to `data/projects.json` (copy an existing one):

   ```json
   {
     "slug": "my-project",
     "title": "My Project",
     "category": "design",
     "year": "2026",
     "role": "Designer",
     "summary": "One sentence about the project.",
     "cover": "/images/projects/my-project/cover.jpg",
     "tools": ["Figma"],
     "featured": false,
     "caseStudy": {
       "problem": "…",
       "process": ["Step one", "Step two"],
       "result": ["Outcome one"],
       "gallery": ["/images/projects/my-project/gallery-1.jpg"],
       "link": "https://example.com"
     }
   }
   ```

   - `slug` becomes the URL `/work/my-project`. Lowercase and hyphens, unique.
   - `category` must be one of `design`, `photo-video`, `web`, `ai`. The build stops with a clear error if it isn't, or if two projects share a slug.
   - `featured: true` makes the card span the full width (in the "All" view).
   - `link` is optional; leave it `""` to hide the "View live project" button.
   - Order in the file = order on the page. "Next project" follows the same order.
3. Run `npm run dev` to check, then commit and push. Vercel redeploys automatically.

The four seeded projects are placeholders (`"placeholder": true`, `TODO:` text, grey images). Replace their text and images, or delete them.

## Edit the Journey

Everything lives in `data/journey.json`: no component changes needed.

- `heading` / `subline`: the section title and line under it.
- `chapters`: one object per chapter, shown top to bottom in file order, alternating sides on desktop.
  - `id`: unique, lowercase (e.g. `"explore"`).
  - `label` + `period`: shown as "01 Explore · 2020 – 2023". The number comes from the position.
  - `title`, `description` (1–2 sentences), `highlights` (short pills).
  - `image`: optional. Put a 4:3 image in `public/images/journey/` and set e.g. `"/images/journey/explore.jpg"`; leave `""` for none. On desktop it sits on the other side of the line.
- `closing.quote`: the quote card after the last chapter.

## Colors

The palette is defined once, at the top of `app/globals.css`. Components only use the token names
(`bg-background`, `bg-background-alt`, `text-primary`, `text-muted`, `text-accent`, `border-border`, `bg-tag`),
so changing a hex value there updates the whole site. Sections pick a background with
`<Section tone="default" | "alt" | "navy">`; `navy` (Contact, footer) remaps the same tokens to light-on-navy.
All text/background pairs meet WCAG AA contrast.

If you replace an image but still see the old one locally, delete `.next/cache/images` and restart.

## Structure

```
app/            layout.tsx (font, navbar, footer), page.tsx (section order), globals.css
  work/[slug]/  case study page (static, one per project)
components/
  layout/       Navbar, Footer, MotionProvider (reduced-motion handling)
  sections/     Hero, HeroPhoto
  work/         WorkGrid, FilterTabs, ProjectCard, CaseStudySection
  journey/      JourneyTimeline, JourneyChapter
  ui/           Section, Reveal, Button, Container, Placeholder
data/           JSON content
lib/            site.ts (identity + nav), content.ts (typed JSON access)
public/images/  hero.jpg, projects/<slug>/…
```

## Deploy

Push to GitHub, then import the repo at vercel.com/new. No configuration is needed.
