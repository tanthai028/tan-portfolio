import type { Experience } from '@/types/content'

/** Most recent first. */
export const experience: Experience[] = [
  {
    company: 'Self-directed',
    title: 'Independent projects',
    period: 'Since 2023',
    logo: 'self',
    summary: 'Tools I build for myself, plus coursework in Python automation and AWS.',
    points: [
      'Built automated website monitors on GitHub Actions that detect changes and post digests to Discord.',
      'Engineered a data pipeline that pulls, filters, deduplicates, and caches postings from multiple sources.',
      'Developed a job application tracker desktop app (React/Electron) with SQLite storage and CSV/JSON import and export.',
      'Shipped the Chrome extensions and web apps on this page.',
    ],
    stack: ['Python', 'TypeScript', 'React', 'Electron', 'GitHub Actions'],
  },
  {
    company: 'GE Aerospace',
    title: 'Software Engineer Intern',
    period: 'Summer 2023',
    logo: 'ge',
    summary: 'On the DXL team in Tools & Simulation. I kept the team’s Jenkins jobs running and automated recurring work.',
    points: [
      'Owned diagnosis and resolution of failing Jenkins jobs, restoring internal CI/CD pipelines for the team.',
      'Automated recurring workflows in Python and DXL (IBM DOORS) and integrated them into Jenkins jobs.',
      'Coordinated with engineers to find failing jobs and communicated fixes and status updates.',
      'Documented the automation so the team could run and maintain it independently.',
    ],
    stack: ['Python', 'DXL', 'Jenkins'],
  },
  {
    company: 'GE Aerospace',
    title: 'Systems Engineer Co-op',
    period: 'Fall 2022',
    logo: 'ge',
    summary: 'Built Auto Test Batcher, an internal C#/.NET Windows app the Tools & Simulation team used to validate system behavior.',
    points: [
      'Developed and tested an internal C#/.NET Windows application used to validate system behavior.',
      'Built unit tests with about 80% coverage and wired them into Jenkins to catch defects before release.',
      'Designed UML class diagrams to document core workflows and guide the backend implementation.',
      "Refactored legacy backend code to meet the team's .NET coding standards.",
    ],
    stack: ['C#', '.NET Framework', 'MSTest', 'Jenkins'],
  },
  {
    company: 'JPMorgan Chase & Co.',
    title: 'Full-Stack Software Engineer Intern',
    period: 'Summer 2022',
    logo: 'chase',
    summary: 'Worked on DispVis, an internal web app for visualizing disputes data, as one of five engineers on an Agile team.',
    points: [
      'Built Java backend integrations using JDBC/SQL against AWS RDS.',
      "Deployed and maintained the app on AWS EC2 for the team's shared testing environment.",
      'Led the front-end data visualization features and presented them at sprint demos.',
      'Validated APIs and UI behavior with Postman and Jest, resolving issues during sprints.',
    ],
    stack: ['React', 'Java', 'SQL', 'AWS', 'Terraform'],
  },
]

export const education: Experience[] = [
  {
    company: 'University of South Florida',
    title: 'B.S. Computer Science',
    period: '2024',
    logo: 'school',
    summary: 'Tampa, FL. Graduated May 2024 with a 3.46 GPA.',
    points: ['Best Financial Hack, Capital One Challenge at UF SwampHacks VII (314 participants).'],
    stack: [],
  },
]
