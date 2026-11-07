import type { Profile } from '@/types/content'

export const profile: Profile = {
  name: 'Tan Thai',
  role: 'Software Engineer',
  tagline: 'I build backend systems, internal tools, and automations that take repetitive work off people’s plates.',
  taglineDetail:
    'USF Computer Science graduate (2024) with internships at JPMorgan Chase and GE Aerospace across full-stack, backend, CI/CD, and test automation.',
  location: 'St. Petersburg, FL',
  availability: {
    open: true,
    label: 'Open to roles · Tampa Bay or remote',
    detail:
      'Entry-level backend, internal tools, platform, automation, and data engineering roles. Tampa Bay, elsewhere in Florida, or remote. U.S. citizen.',
  },
  email: 'tanthai028.jobs@gmail.com',
  resumeUrl: '/Tan_Thai_Resume.pdf',
  socials: [
    { label: 'GitHub', href: 'https://github.com/tanthai028' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tanthai028' },
    { label: 'Devpost', href: 'https://devpost.com/tanthai028' },
  ],
  about: [
    'I like building practical software that makes a workflow faster or removes a chore entirely, especially Python backends, internal tools, and automation.',
    'I’ve done that in internships at JPMorgan Chase and GE Aerospace, and in side projects I use myself, like a job-board bot and a résumé matcher. I like to experiment, ship something small, and keep improving it.',
    'Outside of code: pickleball, learning piano, anime, and Path of Exile.',
  ],
  skills: [
    { label: 'Languages', items: ['Python', 'SQL', 'TypeScript', 'JavaScript', 'C#'] },
    { label: 'Backend & data', items: ['FastAPI', 'Node.js', '.NET', 'BigQuery', 'SQLite'] },
    { label: 'Cloud & CI/CD', items: ['AWS', 'GCP', 'Jenkins', 'GitHub Actions', 'Terraform'] },
    { label: 'Frontend & tools', items: ['React', 'Electron', 'Tailwind CSS', 'Chrome extensions'] },
  ],
}
