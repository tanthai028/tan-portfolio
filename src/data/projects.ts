import type { Project } from '@/types/content'

/** Shown in this order. The first project is featured with a wide card. */
export const projects: Project[] = [
  {
    slug: 'rj-tracker',
    title: 'RJ Job Tracker',
    kind: 'Automation bot',
    summary: 'Watches the Raymond James job board and posts new openings to Discord twice a week.',
    date: 'Jun 2026',
    swatch: 'var(--swatch-beige)',
    tags: ['Python', 'GitHub Actions', 'GitHub Pages'],
    status: 'live',
    images: [
      {
        src: '/projects/rj-tracker-report.webp',
        alt: 'The report page in dark mode: a searchable table of open Raymond James jobs, with a NEW badge on postings since the last digest',
        width: 1200,
        height: 820,
      },
      {
        src: '/projects/rj-tracker-report-phone.webp',
        alt: 'The same report on a phone, with each job shown as a card',
        width: 440,
        height: 918,
      },
    ],
    problem:
      'Raymond James posts openings on a Workday board with no alerts, and roles fill on a rolling basis. I kept forgetting to check. My first version pinged me for every change, which got noisy fast.',
    approach: [
      'Calls the JSON endpoint the board itself uses, with the same St. Petersburg location filter the site sends. No scraping and no headless browser.',
      'Runs on a GitHub Actions cron every Monday and Thursday. State lives in the repo as JSON, so the commit history doubles as the log.',
      'Builds a report page on GitHub Pages with search, sorting and a "new only" filter, then posts one short Discord message that links to it.',
    ],
    outcome: [
      'Running since June 2026 for $0. The bot has made over 100 commits.',
      'Fixed a Workday paging quirk where only the first page reports the total. My first version stopped at 40 of 137 jobs.',
    ],
    nextSteps: [
      'Make the board URL and location configurable so it can watch any company that uses Workday.',
      'Retry failed network requests instead of skipping a run.',
      'Add a test that runs against a saved API response.',
    ],
    stack: ['Python', 'requests', 'GitHub Actions', 'GitHub Pages', 'Workday API', 'Discord webhooks'],
    links: [
      { label: 'Live report', href: 'https://tanthai028.github.io/RJTracker/' },
      { label: 'Code and write-up', href: 'https://github.com/tanthai028/RJTracker#readme' },
    ],
  },
  {
    slug: 'tetrain',
    title: 'TETRAIN',
    kind: 'Web app',
    summary: 'Drills Tetris piece colors and shapes, and quizzes you more on the ones you miss.',
    date: 'Oct 2026',
    swatch: 'var(--swatch-krypton)',
    tags: ['JavaScript', 'Web Audio', 'No framework'],
    status: 'live',
    images: [
      {
        src: '/projects/tetrain-learn-mobile.webp',
        alt: 'Learn mode on a phone: all seven pieces shown in their four rotations',
        width: 780,
        height: 1688,
      },
      {
        src: '/projects/tetrain-quiz-mobile.webp',
        alt: 'Quiz mode on a phone: a purple color swatch above seven gray Tetris pieces to choose from',
        width: 780,
        height: 1240,
      },
      {
        src: '/projects/tetrain-stats.webp',
        alt: 'Stats page: accuracy and average time per piece, with J and L lowest at 78%',
        width: 1074,
        height: 613,
      },
    ],
    problem:
      'In fast Tetris I still hesitated on mirror pairs like J and L. I wanted to practice recognizing pieces on their own, outside a real game.',
    approach: [
      'Quiz modes show pieces at random rotations. There are also 15 and 30 second timed runs.',
      'Each piece is weighted by recent accuracy. Picking L when the answer was J bumps up both.',
      'Sound effects are generated with the Web Audio API, so the app ships no audio files.',
      'Plain JavaScript modules with no framework or build step. Unit tests check every rotation of every piece.',
    ],
    outcome: [
      'About 1,300 lines in total. Every push to main deploys to Vercel.',
      'My own stats had J and L at 78% while everything else was above 90%. That is what led to the weighting.',
    ],
    nextSteps: [
      'A Fill the Gap mode where you place the right piece into a board. The board model for it is already written.',
      'A drill for reading the next-piece queue.',
      'Optional syncing of stats across devices.',
    ],
    stack: ['JavaScript (ES modules)', 'HTML/CSS', 'Web Audio API', 'Node test runner', 'Vercel'],
    links: [
      { label: 'Play it', href: 'https://tetrain.vercel.app' },
      { label: 'Code and write-up', href: 'https://github.com/tanthai028/tetrain#readme' },
    ],
  },
  {
    slug: 'trailcards',
    title: 'Trailcards',
    kind: 'Mobile web app',
    summary: 'A study app that works like a scrolling feed, with reviews spaced out over weeks.',
    date: 'Oct 2026',
    swatch: 'var(--swatch-magnetic)',
    tags: ['React', 'TypeScript', 'Supabase'],
    status: 'live',
    images: [
      {
        src: '/projects/trailcards-feed.webp',
        alt: 'A Trailcards study card on a phone: a short note on why the sky is blue, then a four-choice question',
        width: 375,
        height: 812,
      },
    ],
    problem:
      'I like flashcards in theory but rarely open them. Scrolling a feed takes no effort to start, so I tried making studying work the same way.',
    approach: [
      'The feed mixes new cards, reviews that are due, and practice. Reviews come back after 1, 3, 7, 16, 35 and 90 days.',
      'Decks can be pasted in from Quizlet or Anki, or generated with AI and then edited.',
      'Accounts, shared decks and a leaderboard run on Supabase.',
      'The game rules are plain functions with unit tests. None of the React or storage code is mixed in.',
    ],
    outcome: [
      'Live on Vercel and installable as a home-screen app.',
      'Most of the 78 commits are phone UX fixes, like making every card fit on one screen without scrolling inside it.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'Vitest'],
    links: [{ label: 'Try it', href: 'https://cozyquest-nine.vercel.app' }],
  },
  {
    slug: 'resumatch',
    title: 'Resumatch',
    kind: 'Chrome extension',
    summary: 'Reads a job posting and tells me which of my résumés to send.',
    date: 'Nov 2026',
    swatch: 'var(--swatch-anew)',
    tags: ['JavaScript', 'Chrome MV3', 'Node'],
    images: [
      {
        src: '/projects/resumatch-popup-dark.webp',
        alt: 'Resumatch popup for a sample posting: "Use Software" with a high match, and scores for all four résumés',
        width: 704,
        height: 708,
      },
      {
        src: '/projects/resumatch-popup.webp',
        alt: 'The same popup in light mode',
        width: 704,
        height: 720,
      },
    ],
    problem:
      'I keep four résumés for different kinds of roles. Picking one for each posting, and catching dealbreakers buried in the requirements, slowed down every application.',
    approach: [
      'Highlight a posting and the popup scores each résumé on weighted keywords, synonyms and title matches.',
      'It flags years of experience, senior titles, missing required tools and clearance. Lines marked "preferred" are ignored.',
      'If nothing fits well, one button copies a prompt and opens Claude to tailor a version.',
      'Every application goes into a log with its status, notes and follow-up reminders. Duplicates get caught, and the log exports to CSV.',
    ],
    outcome: [
      'The weights and keyword lists live in one config file, so tuning it never touches code.',
      'A Node script runs saved postings through the scorer and prints why each résumé won or lost.',
    ],
    stack: ['JavaScript', 'Chrome Manifest V3', 'chrome.storage', 'Node.js'],
    links: [],
  },
  {
    slug: 'tubescript',
    title: 'TubeScript',
    kind: 'Chrome extension',
    summary: 'Search, copy and jump through any YouTube transcript, on desktop or iPhone.',
    date: 'Oct 2026',
    swatch: 'var(--swatch-morris)',
    tags: ['TypeScript', 'React', 'Chrome MV3'],
    images: [
      {
        src: '/projects/tubescript-popup.webp',
        alt: 'TubeScript popup with a caption picker, copy and download buttons, search, and a timestamped transcript',
        width: 340,
        height: 594,
      },
    ],
    problem:
      "YouTube's transcript panel is hard to find, can't be searched, and is painful to copy from. A YouTube change in 2026 also broke most of the existing caption tools.",
    approach: [
      'YouTube now signs caption requests with a token. Instead of faking it, the extension watches the requests the player already makes and reuses them.',
      'Everything YouTube-specific sits in one extractor module, so when YouTube changes something there is one place to fix.',
      'The Chrome extension and an iPhone bookmarklet share that extractor.',
      'There is no server and no API key. Requests only go to YouTube, and a local cache makes reopening instant.',
    ],
    outcome: [
      'An 817-line transcript loads in about 90 ms, or about 40 ms from the cache.',
      '69 unit tests run against real YouTube responses saved as fixtures.',
    ],
    nextSteps: [
      'Check the transcript-panel fallback against live YouTube. It is written against known structures but not verified yet.',
      'Transcribe audio for videos that have no captions.',
      "Offer YouTube's auto-translated caption tracks.",
    ],
    stack: ['TypeScript', 'React 19', 'Chrome Manifest V3', 'esbuild', 'Node test runner', 'Vercel'],
    links: [{ label: 'Code and write-up', href: 'https://github.com/tanthai028/yt-transcriber#readme' }],
    tryLocally: [
      'Clone the repo and run `npm install`, then `npm run build`. Needs Node 24.',
      'Open `chrome://extensions` and turn on Developer mode.',
      'Click Load unpacked and pick the `dist` folder.',
      'Reload any open YouTube tab, open a video, and click the extension icon or press Alt+T.',
    ],
  },
  {
    slug: 'ytbookmarks',
    title: 'YTBookmarks',
    kind: 'Chrome extension',
    summary: 'Adds your own labeled bookmarks to the YouTube progress bar. On the Chrome Web Store.',
    date: 'Jun 2025',
    swatch: 'var(--swatch-french-gray)',
    tags: ['JavaScript', 'Chrome MV3', 'SCSS'],
    status: 'live',
    images: [
      {
        src: '/projects/ytbookmarks-cover.webp',
        alt: 'YTBookmarks on a YouTube video: labeled pins stacked on the progress bar, and the bookmark sidebar',
        width: 1353,
        height: 664,
      },
    ],
    problem:
      "I'd remember a moment in a long lecture, then scrub around trying to find it again. YouTube chapters only exist if the creator adds them.",
    approach: [
      'A button in the player saves the current time. Each bookmark shows up as a pin on the progress bar and as a row in a sidebar.',
      "YouTube changes videos without reloading the page, so the extension rebuilds itself on YouTube's own navigation events.",
      'When labels would overlap, a small layout pass stacks them into rows.',
      'Bookmarks can be renamed, searched, undone, and exported or imported as JSON.',
    ],
    outcome: [
      'My first extension. It went through Chrome Web Store review and is now on version 2.4.',
      'It asks for very few permissions and has no account, server or tracking.',
    ],
    nextSteps: [
      'Sync bookmarks across devices with chrome.storage.sync.',
      'Stop adding a timeupdate listener on every render, so long sessions stay light.',
      'Add tests for the label layout logic.',
    ],
    stack: ['JavaScript (ES modules)', 'Chrome Manifest V3', 'SCSS', 'esbuild'],
    links: [
      {
        label: 'Chrome Web Store',
        href: 'https://chromewebstore.google.com/detail/ytbookmarks/jkiapphfienejigejenmajblkimmclcl',
      },
      { label: 'Code and write-up', href: 'https://github.com/tanthai028/YTBookmark#readme' },
    ],
  },
]
