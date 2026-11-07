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

Types for all of it are in `src/types/content.ts`. The résumé is served from `public/Tan_Thai_Resume.pdf`.

## Structure

```
src/
  components/
    layout/    Header, Footer, Section, ThemeToggle
    sections/  Hero, Work, About, Contact (one per page section)
    work/      ProjectCard, ProjectDialog
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
- **Motion is subtle and optional.** Fade-up on scroll via `IntersectionObserver`; all motion respects `prefers-reduced-motion`.
