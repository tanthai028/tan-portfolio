import type { Project } from '@/types/content'

/** Shown in this order. The first project is featured with a wide card. */
export const projects: Project[] = [
  {
    slug: 'rj-tracker',
    title: 'RJ Job Tracker',
    kind: 'Automation bot',
    summary: 'A free, serverless bot that posts new job openings to Discord twice a week, linked to a searchable report.',
    year: '2026',
    role: 'Solo',
    swatch: 'var(--swatch-beige)',
    tags: ['Python', 'GitHub Actions', 'GitHub Pages'],
    status: 'live',
    images: [
      {
        src: '/projects/rj-tracker-report.webp',
        alt: 'The report page: a searchable, sortable table of open Raymond James jobs, with NEW badges on postings since the last digest',
        width: 1200,
        height: 820,
      },
      {
        src: '/projects/rj-tracker-report-phone.webp',
        alt: 'The same report on a phone in dark mode, with each job shown as a card',
        width: 440,
        height: 918,
      },
    ],
    problem:
      'Raymond James openings sit on a Workday board with no way to get notified, and postings fill on a rolling basis. Checking by hand was slow and easy to forget, and per-posting alerts turned into noise I stopped reading.',
    approach: [
      "Called the JSON API behind the board instead of scraping the JavaScript-rendered page, reusing the page's own Saint Petersburg location filter. No headless browser.",
      'Every Monday and Thursday, a GitHub Actions cron diffs listings on requisition IDs, skips postings older than 30 days, and commits state back to the repo, so the history doubles as a log.',
      'Publishes a report page to GitHub Pages with search, sort, a new-only filter, dark mode and a card layout on phones.',
      'Deploys first, then posts one short Discord message with the five newest jobs and a link, so the link works the moment it arrives. Silent when nothing is new.',
    ],
    outcome: [
      'Running since June 2026 at zero hosting cost, with 100+ automated state updates committed by the bot.',
      'Replaced per-posting alerts with a twice-weekly digest, because that is what I actually read.',
      'Found and fixed a Workday paging quirk that silently stopped the first version at 40 of 137 jobs.',
    ],
    stack: ['Python', 'requests', 'GitHub Actions', 'GitHub Pages', 'Workday API', 'Discord webhooks'],
    links: [
      { label: 'Live report', href: 'https://tanthai028.github.io/RJTracker/' },
      { label: 'Source', href: 'https://github.com/tanthai028/RJTracker' },
    ],
  },
  {
    slug: 'tetrain',
    title: 'tetrain',
    kind: 'Web app',
    summary: 'A Tetris piece trainer that adapts to the pieces you keep mixing up.',
    year: '2026',
    role: 'Solo · Design + build',
    swatch: 'var(--swatch-krypton)',
    tags: ['JavaScript', 'Web Audio', 'No framework'],
    status: 'live',
    images: [
      {
        src: '/projects/tetrain-quiz.webp',
        alt: 'Quiz mode: an orange color swatch above seven gray Tetris pieces to choose from',
        width: 1053,
        height: 666,
      },
      {
        src: '/projects/tetrain-learn.webp',
        alt: 'Learn mode: all seven pieces shown in their four rotations',
        width: 1057,
        height: 615,
      },
      {
        src: '/projects/tetrain-stats.webp',
        alt: 'Stats page: accuracy and average time per piece, with J and L lowest at 78%',
        width: 1074,
        height: 613,
      },
    ],
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
    kind: 'Mobile web app',
    summary: 'A cozy study app you scroll like a social feed, with spaced reviews and AI-made decks.',
    year: '2026',
    role: 'Solo · Design + build',
    swatch: 'var(--swatch-magnetic)',
    tags: ['React', 'TypeScript', 'Supabase'],
    status: 'live',
    images: [
      {
        src: '/projects/wayfarer-feed.webp',
        alt: 'A Wayfarer study card on a phone: a short note on why the sky is blue, then a four-choice question',
        width: 375,
        height: 812,
      },
    ],
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
      'Live on Vercel and installable as a home-screen app.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'Vitest'],
    links: [{ label: 'Try it', href: 'https://cozyquest-nine.vercel.app' }],
  },
  {
    slug: 'resumatch',
    title: 'Resumatch',
    kind: 'Chrome extension',
    summary: 'Reads a job posting and tells me which of my four résumés to send, or when to tailor one.',
    year: '2026',
    role: 'Solo',
    swatch: 'var(--swatch-anew)',
    tags: ['JavaScript', 'Chrome MV3', 'Node tests'],
    images: [
      {
        src: '/projects/resumatch-popup.webp',
        alt: 'Resumatch popup for a sample posting: "Use Software" with a high match, and scores for all four résumés',
        width: 704,
        height: 720,
      },
    ],
    problem:
      'I apply with four résumés (software, tech support, IT support, business analyst). Picking the right one for each posting, and spotting dealbreakers buried in the requirements, took time on every application.',
    approach: [
      'Highlight a posting and the popup scores every résumé by weighted keywords, synonyms and title matches, then gives one verdict: use a résumé, tailor one, or likely skip.',
      'Red-flag checks for years of experience, seniority, missing required tools, clearance and location, reading only the required section, not "preferred".',
      'When no résumé fits well, one click copies a ready-made prompt and opens Claude to tailor a version.',
      'An application log with duplicate detection, undo, filtering and CSV export.',
    ],
    outcome: [
      'All weights, keywords and thresholds live in one config file, so tuning needs no code changes.',
      'A Node test runner checks the expected verdict for saved postings and prints every score and keyword hit.',
    ],
    stack: ['JavaScript', 'Chrome Manifest V3', 'chrome.storage', 'Node.js'],
    links: [],
  },
  {
    slug: 'yt-transcriber',
    title: 'yt-transcriber',
    kind: 'Chrome extension',
    summary: 'Search and copy any YouTube transcript, with clickable timestamps, on desktop and iPhone.',
    year: '2026',
    role: 'Solo',
    swatch: 'var(--swatch-morris)',
    tags: ['TypeScript', 'React', 'Chrome MV3'],
    images: [
      {
        src: '/projects/yt-transcriber-popup.webp',
        alt: 'yt-transcriber popup with a caption picker, copy and download buttons, search, and a timestamped transcript',
        width: 340,
        height: 594,
      },
    ],
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
