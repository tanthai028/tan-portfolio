/** "How I built this", opened from the footer. Written in Tan's voice; edit freely. */
export const colophon = {
  trigger: 'Built with Claude Code',
  title: 'How I built this',
  lead: 'I built this site with Claude Code, an AI coding agent. I made the decisions and reviewed the results. It wrote most of the code.',
  sections: [
    {
      title: 'What I asked for',
      items: [
        'Clean and minimal, quick to skim on a phone.',
        'Light mode by default, with a dark mode.',
        'Details in pop-ups, not text that expands and shifts the page.',
        'Code organized well enough that an engineer would want to read it.',
      ],
    },
    {
      title: 'How I steered it',
      items: [
        'Ran user tests from four points of view: a recruiter, a hiring manager, an engineer, and someone skeptical of AI-made work.',
        'Caught problems myself, like phone screenshots getting cut off in the image viewer and covers that looked inconsistent, and had them fixed.',
        'Asked for an audit of anything that read as AI-generated, then had it rewritten or removed.',
        'Reviewed changes on desktop and phone before they shipped.',
      ],
    },
  ],
  stack: ['React', 'TypeScript', 'CSS Modules', 'Vite', 'Vercel'],
}
