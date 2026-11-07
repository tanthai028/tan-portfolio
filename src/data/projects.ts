import type { Project } from '@/types/content'

export const projects: Project[] = [
  {
    slug: 'rj-tracker',
    title: 'RJ Job Tracker',
    summary: 'A free, serverless bot that pings Discord the moment a job posting goes up or comes down.',
    year: '2026',
    role: 'Solo',
    swatch: 'var(--swatch-beige)',
    tags: ['Python', 'GitHub Actions', 'Discord'],
    highlight: 'Running daily',
    problem:
      'Early-career roles on the Raymond James Workday board fill on a rolling basis, and the board has no alerts. Checking it by hand every day was slow and easy to forget.',
    approach: [
      'Called the JSON API behind the board instead of scraping the JavaScript-rendered page: about 100 lines of plain Python, no headless browser.',
      'Scheduled it with a GitHub Actions cron and used the repo itself as the database: the workflow commits the latest listings back, so the history doubles as a log.',
      'Diffed listings on requisition IDs, not titles, to avoid false "new posting" alerts.',
      'Kept it quiet: Discord messages only when a posting is added or removed.',
    ],
    outcome: [
      'Running every day since June 2026 at zero hosting cost.',
      '80+ automated state updates committed by the bot.',
    ],
    stack: ['Python', 'requests', 'GitHub Actions', 'Workday API', 'Discord webhooks'],
    links: [{ label: 'Source', href: 'https://github.com/tanthai028/RJTracker' }],
  },
  {
    slug: 'tetrain',
    title: 'tetrain',
    summary: 'A Tetris piece trainer that adapts to the pieces you keep mixing up.',
    year: '2026',
    role: 'Solo · Design + build',
    swatch: 'var(--swatch-krypton)',
    tags: ['JavaScript', 'Web Audio', 'No framework'],
    highlight: 'Live',
    problem:
      'In fast Tetris, every split second spent on "is that J or L?" costs a placement. There was no simple way to practice just piece recognition outside a real game.',
    approach: [
      'Learn and quiz modes at random SRS rotations, with timed 15s and 30s runs and per-piece stats.',
      'Adaptive weighting from recent accuracy: a J/L mix-up boosts both pieces until you improve.',
      'Game feel with combos and sound effects synthesized in the Web Audio API, no audio files.',
      'One data module is the source of truth for every piece; unit tests check all rotations and colors.',
    ],
    outcome: [
      'About 1,300 lines of vanilla JS with no dependencies or build step; deploys on every push.',
      'My own stats showed J and L at 78% against 90%+ for the rest, which drove the adaptive weighting.',
    ],
    stack: ['JavaScript (ES modules)', 'HTML/CSS', 'Web Audio API', 'Node test runner', 'Vercel'],
    links: [
      { label: 'Play it', href: 'https://tetrain.vercel.app' },
      { label: 'Source', href: 'https://github.com/tanthai028/tetrain' },
    ],
  },
  {
    slug: 'wayfarer',
    title: 'Wayfarer',
    summary: 'A cozy, mobile-first study app you scroll like a social feed.',
    year: '2026',
    role: 'Solo · Design + build',
    swatch: 'var(--swatch-magnetic)',
    tags: ['React', 'TypeScript', 'Supabase'],
    highlight: 'In progress',
    problem:
      'Flashcard apps feel like chores. I wanted studying to feel as easy to pick up as scrolling a feed, with short cards, instant feedback, and reviews that come back at the right time.',
    approach: [
      'An endless study feed: new cards, then due reviews, then practice. Reviews return after 1, 3, 7, 16, 35 and 90 days.',
      'Import Quizlet or Anki-style decks by pasting text, or generate a deck with AI and edit the cards.',
      'Accounts, a leaderboard and shared decks on Supabase, with email-code sign-in that works from a home-screen app.',
      'Pure, unit-tested game rules behind a save adapter, so the logic has no React or storage dependencies.',
    ],
    outcome: [
      '78 commits of iteration on phone UX: one card per swipe, no inner scrolling, 44px tap targets.',
      'Not deployed yet. Runs locally while I finish it.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'Vitest'],
    links: [],
  },
  {
    slug: 'yt-transcriber',
    title: 'yt-transcriber',
    summary: 'Search and copy any YouTube transcript, with clickable timestamps, on desktop and iPhone.',
    year: '2026',
    role: 'Solo',
    swatch: 'var(--swatch-morris)',
    tags: ['TypeScript', 'React', 'Chrome extension'],
    problem:
      "YouTube's transcript panel is buried, can't be searched, and is awkward to copy from, especially on a phone. A 2026 YouTube change also broke most existing caption tools.",
    approach: [
      "Instead of forging YouTube's new caption token, observed the player's own caption requests and reused them, with a transcript-panel fallback.",
      'Isolated every YouTube-specific detail in one extractor module, so a YouTube change is a local fix.',
      'One extractor, two products: a Chrome extension and an iPhone bookmarklet, both built by esbuild.',
      'No server and no API keys. Requests only go to YouTube; a local LRU cache makes reopening instant.',
    ],
    outcome: [
      'An 817-line transcript loads in about 90 ms; cached videos in about 40 ms.',
      '57 unit tests against saved real YouTube responses.',
    ],
    stack: ['TypeScript', 'React 19', 'Chrome Manifest V3', 'esbuild', 'Node test runner', 'Vercel'],
    links: [{ label: 'Source', href: 'https://github.com/tanthai028/yt-transcriber' }],
  },
]
