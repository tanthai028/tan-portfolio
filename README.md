# tan-portfolio

Personal portfolio. React 19 + TypeScript + CSS Modules on Vite. No UI library.

## Run

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build to dist/
npm run lint       # oxlint
```

## Editing content

All copy lives in typed data files. Components never hold content.

| File                     | What it holds                                   |
| ------------------------ | ----------------------------------------------- |
| `src/data/profile.ts`    | Name, role, tagline, availability, links, skills |
| `src/data/projects.ts`   | Project cards and their dialog details          |
| `src/data/experience.ts` | Roles and education shown in the About section  |

Types for all of it are in `src/types/content.ts`. Static files live in `public/`:

- `Tan_Thai_Resume.pdf`: the résumé download
- `projects/*.webp`: project screenshots. The first image of a project is its card cover; all of them show in its dialog. Phone and popup shots (taller than wide) get a narrower layout automatically.
- `og.png`: the 1200×630 link-preview image

## Structure

```
src/
  components/
    layout/    Header, Footer, Section, ThemeToggle
    sections/  Hero, Work, About, Contact (one per page section)
    work/      ProjectCard, ProjectDialog, StatusBadge
    ui/        Reusable primitives: Button, Dialog, InfoTip, Icon, Reveal, Tag, Toast
  data/        Site content
  hooks/       useTheme, useActiveSection, useCopyToClipboard
  styles/      tokens.css (design tokens), global.css (reset + base)
  types/       Content model
```

## Design decisions

- **Tokens first.** Colors, type, spacing, and motion are CSS custom properties in `styles/tokens.css`. Components use semantic tokens (`--color-text`), never raw values, so light/dark is one attribute swap on `<html>`.
- **Light by default.** The saved theme is applied by an inline script in `index.html` before first paint, so there is no flash. Theme switches cross-fade with the View Transitions API.
- **Overlays, not expanding blocks.** Details open in a native `<dialog>` (focus trap, Escape, top layer for free; bottom sheet on phones). Secondary notes sit behind a `?` using the Popover API. Nothing pushes layout around.
- **Deep links.** `/#project-<slug>` opens that project's dialog.
- **One click target per card, real headings.** The card's title is a `<button>` inside an `<h3>`, and its hit area is stretched over the card with `::after`.
- **Link previews need absolute URLs.** `index.html` uses `%SITE_URL%`, filled at build time by a small Vite plugin from `SITE_URL`, or from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`.
- **Analytics.** `@vercel/analytics` counts visits (no cookies). Turn it on under the project's Analytics tab in Vercel.
- **Motion is subtle and optional.** Fade-up on scroll via `IntersectionObserver`; all motion respects `prefers-reduced-motion`.
