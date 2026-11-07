import type { Profile } from '@/types/content'

// TODO: replace placeholder copy with your own.
export const profile: Profile = {
  name: 'Tan',
  role: 'Software Engineer',
  tagline: 'I build calm, reliable software that people enjoy using.',
  taglineDetail:
    'Full-stack focus: product-minded frontends, pragmatic APIs, and the tooling that keeps teams shipping.',
  location: 'United States',
  availability: {
    open: true,
    label: 'Open to new roles',
    detail: 'Full-time software engineering roles. Remote, hybrid, or on-site.',
  },
  email: 'hello@example.com',
  resumeUrl: '/resume.pdf',
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ],
  about: [
    'I care about the details that make software feel effortless: fast pages, clear interfaces, and code the next engineer can read.',
    'I like owning features end to end, from the first sketch to the metrics after launch.',
  ],
  skills: [
    { label: 'Languages', items: ['TypeScript', 'Python', 'SQL', 'Java'] },
    { label: 'Frontend', items: ['React', 'Next.js', 'CSS', 'Accessibility'] },
    { label: 'Backend', items: ['Node.js', 'PostgreSQL', 'REST', 'GraphQL'] },
    { label: 'Tooling', items: ['Git', 'Docker', 'CI/CD', 'Vercel'] },
  ],
}
