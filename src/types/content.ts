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
  photo: {
    /** Small square face crop for the header. */
    avatar: string
    /** Larger photo for the About section. */
    full: string
    alt: string
    caption?: string
  }
  availability: {
    open: boolean
    label: string
    detail?: string
  }
  email: string
  resumeUrl: string
  /** This site's repository. Leave unset while the repo is private. */
  sourceUrl?: string
  socials: Link[]
  about: string[]
  /** Words in `about` that get a hover explanation, for readers who don't know them. */
  aboutTerms?: Term[]
  skills: SkillGroup[]
}

export interface Term {
  /** Exact text in `about` to attach the tip to. */
  term: string
  text: string
  link?: Link
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface ProjectImage {
  /** Path under `public/`, e.g. `/projects/tetrain-quiz-mobile.webp`. */
  src: string
  alt: string
  width: number
  height: number
}

export type ProjectStatus = 'live' | 'in-progress'

export interface Project {
  /** Stable, URL-safe id. Used for deep links (`#project-<slug>`). */
  slug: string
  title: string
  /** What it is, in two or three words, e.g. "Chrome extension". */
  kind: string
  /** One line for the card. Keep it under ~90 characters. */
  summary: string
  /** Month the project started, e.g. "Oct 2026". */
  date: string
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
  /** Shown as "What I'd change": known gaps and planned work, in my words. */
  nextSteps?: string[]
  stack: string[]
  links: Link[]
  /** Shown beside the links when the code can't be linked, e.g. a private repo. */
  codeNote?: string
  /** Setup steps for projects with no hosted version. Wrap commands in `backticks`. */
  tryLocally?: string[]
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
