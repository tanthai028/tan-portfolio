import type { Profile } from '@/types/content'

export const profile: Profile = {
  name: 'Tan Thai',
  role: 'Software Engineer',
  tagline: 'I build software that takes boring, repetitive work off people’s hands.',
  taglineDetail: 'CS graduate from USF (2024). Interned at JPMorgan Chase and GE Aerospace.',
  location: 'St. Petersburg, FL',
  photo: {
    avatar: '/tan-avatar.webp',
    full: '/tan-photo.webp',
    alt: 'Tan Thai at the See Seven States overlook on a clear day',
    caption: 'Rock City, Lookout Mountain',
  },
  availability: {
    open: true,
    label: 'Open to entry-level roles in Tampa Bay or remote',
    detail: 'Backend, internal tools, platform, automation or data engineering. Anywhere in Florida works too. U.S. citizen.',
  },
  email: 'tanthai028@gmail.com',
  resumeUrl: '/Tan_Thai_Resume.pdf',
  sourceUrl: 'https://github.com/tanthai028/tan-portfolio',
  socials: [
    { label: 'GitHub', href: 'https://github.com/tanthai028' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tanthai028' },
    { label: 'Devpost', href: 'https://devpost.com/tanthai028' },
  ],
  about: [
    'I like building software that saves someone time. Usually that means a Python backend, an internal tool, or a script that replaces a manual step.',
    'I interned at JPMorgan Chase and GE Aerospace. Most of my side projects started as something I wanted for myself, like the job board bot and the résumé matcher on this page.',
    'Outside of code I play Pickleball, I’m learning Tetris, and I spend too much time in Path of Exile.',
  ],
  aboutTerms: [
    {
      term: 'Pickleball',
      text: 'A paddle sport that mixes tennis, badminton and ping-pong, played with a plastic ball on a small court. Fun fact: it was invented in 1965 on Bainbridge Island, Washington, by three dads keeping their kids busy over the summer.',
      link: { label: 'What is Pickleball? (USA Pickleball)', href: 'https://usapickleball.org/what-is-pickleball/' },
    },
    {
      term: 'Tetris',
      text: 'The falling-block puzzle game from 1984. You rotate seven shapes as they drop and fit them into full rows, which then clear. I play modern, competitive Tetris on TETR.IO, a free browser version.',
      link: { label: 'TETR.IO', href: 'https://tetr.io/' },
    },
    {
      term: 'Path of Exile',
      text: 'An online action RPG: you fight through dark fantasy maps and build a character from a huge passive skill tree. Planning builds is half the game. I play the sequel, Path of Exile 2.',
      link: { label: 'pathofexile2.com', href: 'https://pathofexile2.com/' },
    },
  ],
  skills: [
    { label: 'Languages', items: ['Python', 'SQL', 'TypeScript', 'JavaScript', 'C#'] },
    { label: 'Backend & data', items: ['FastAPI', 'Node.js', '.NET', 'BigQuery', 'SQLite'] },
    { label: 'Cloud & CI/CD', items: ['AWS', 'GCP', 'Jenkins', 'GitHub Actions', 'Terraform'] },
    { label: 'Frontend & tools', items: ['React', 'Electron', 'Tailwind CSS', 'Chrome extensions'] },
  ],
}
