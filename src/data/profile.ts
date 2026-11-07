import type { Profile } from '@/types/content'

// TODO: email and about copy are still placeholders.
export const profile: Profile = {
  name: 'Tan Thai',
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
    { label: 'GitHub', href: 'https://github.com/tanthai028' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tanthai028' },
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
