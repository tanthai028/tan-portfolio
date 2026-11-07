/** Content model. Everything shown on the site is typed here and lives in `src/data`. */

export interface Link {
  label: string
  href: string
}

export interface Profile {
  name: string
  role: string
  /** One sentence. Shown large in the hero. */
  tagline: string
  /** Optional longer context, tucked behind an info tip. */
  taglineDetail?: string
  location: string
  availability: {
    open: boolean
    label: string
    detail?: string
  }
  email: string
  resumeUrl: string
  socials: Link[]
  about: string[]
  skills: SkillGroup[]
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface ProjectImage {
  /** Path under `public/`, e.g. `/projects/tetrain-quiz.webp`. */
  src: string
  alt: string
  width: number
  height: number
}

export type ProjectStatus = 'live' | 'running' | 'in-progress'

export interface Project {
  /** Stable, URL-safe id. Used for deep links (`#project-<slug>`). */
  slug: string
  title: string
  /** What it is, in two or three words, e.g. "Chrome extension". */
  kind: string
  /** One line for the card. Keep it under ~90 characters. */
  summary: string
  year: string
  role: string
  /** Card color. Any CSS color or a `var(--swatch-*)` token. */
  swatch: string
  tags: string[]
  status?: ProjectStatus
  /** The first image is the card cover; all of them show in the dialog. */
  images: ProjectImage[]
  /** Everything below only appears in the project dialog. */
  problem: string
  approach: string[]
  outcome: string[]
  stack: string[]
  links: Link[]
}

export interface Experience {
  company: string
  title: string
  period: string
  summary: string
  /** Shown in the dialog. */
  points: string[]
  stack: string[]
}
