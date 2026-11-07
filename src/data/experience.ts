import type { Experience } from '@/types/content'

// TODO: replace with your own roles, most recent first.
export const experience: Experience[] = [
  {
    company: 'Company A',
    title: 'Software Engineer',
    period: '2024 — Now',
    summary: 'One line on the team and what you own.',
    points: [
      'A shipped feature and its impact.',
      'A system you improved and by how much.',
      'Something you led or mentored.',
    ],
    stack: ['TypeScript', 'React', 'AWS'],
  },
  {
    company: 'Company B',
    title: 'Software Engineering Intern',
    period: '2023',
    summary: 'One line on the team and what you worked on.',
    points: ['A shipped feature and its impact.', 'What you learned.'],
    stack: ['Python', 'SQL'],
  },
]
