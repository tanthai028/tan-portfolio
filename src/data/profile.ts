import type { Profile } from '@/types/content'

export const profile: Profile = {
  name: 'Tan Thai',
  role: 'Software Engineer',
  tagline: 'I build reliable pipelines, cloud backends, and tools teams can run on their own.',
  taglineDetail:
    'CS graduate from the University of South Florida, with engineering experience at JPMorgan Chase and GE Aerospace in CI/CD, AWS, and backend integration.',
  location: 'St. Petersburg, FL',
  availability: {
    open: true,
    label: 'Open to new roles',
    detail: 'Full-time software engineering roles. U.S. citizen, based in St. Petersburg, FL.',
  },
  email: 'tanthai028.jobs@gmail.com',
  resumeUrl: '/Tan_Thai_Resume.pdf',
  socials: [
    { label: 'GitHub', href: 'https://github.com/tanthai028' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tanthai028' },
    { label: 'Devpost', href: 'https://devpost.com/tanthai028' },
  ],
  about: [
    'I like owning problems end to end: tracing a failing pipeline to its root cause, fixing it, and writing it down so the team never has to ask me again.',
    'At JPMorgan Chase and GE Aerospace I worked on CI/CD, AWS backends, and internal tools. On my own, I build automations and small apps that solve problems I actually have.',
  ],
  skills: [
    { label: 'Infrastructure', items: ['AWS (EC2, RDS)', 'Terraform', 'Jenkins', 'GitHub Actions'] },
    { label: 'Languages', items: ['Python', 'Java', 'C#', 'JavaScript', 'TypeScript', 'SQL'] },
    { label: 'Frameworks', items: ['React', 'Node.js', '.NET', 'Electron', 'SQLite'] },
    { label: 'Practices', items: ['Root cause analysis', 'Unit testing', 'UML design', 'Documentation'] },
  ],
}
