import type { Project } from '@/types/content'
import { Icon } from '@/components/ui/Icon'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
  /** The first rows load their cover right away; the rest wait until they near the viewport. */
  eager?: boolean
  onOpen: (slug: string) => void
}

/** Covers fade in once decoded, instead of showing an empty framed box while loading. */
function markLoaded(img: HTMLImageElement) {
  img.dataset.loaded = 'true'
}

// Cached images can finish before React attaches onLoad.
function markIfLoaded(img: HTMLImageElement | null) {
  if (img?.complete && img.naturalWidth > 0) markLoaded(img)
}

/**
 * One project as a row: the cover fills a fixed frame on the left, the text sits beside it.
 * Every row is the same size, so no project looks featured by accident. The title button's
 * hit area is stretched over the whole row, so the row is one click target while the
 * heading stays a real heading.
 */
export function ProjectCard({ project, eager = false, onOpen }: ProjectCardProps) {
  const [cover] = project.images

  return (
    <article className={styles.row}>
      <div className={styles.media}>
        {cover && (
          <img
            ref={markIfLoaded}
            src={cover.src}
            alt=""
            width={cover.width}
            height={cover.height}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={(event) => markLoaded(event.currentTarget)}
          />
        )}
      </div>

      <div className={styles.body}>
        <p className={styles.eyebrow}>
          <span>{project.kind}</span>
          <span>{project.date}</span>
          {project.status === 'live' && (
            <span className={styles.live}>
              <span className={styles.dot} aria-hidden="true" />
              Live
            </span>
          )}
        </p>
        <h3 className={styles.title}>
          <button type="button" className={styles.open} onClick={() => onOpen(project.slug)} aria-haspopup="dialog">
            {project.title}
            <Icon name="arrowUpRight" size={16} className={styles.arrow} />
          </button>
        </h3>
        <p className={styles.summary}>{project.summary}</p>
        <p className={styles.tags}>{project.tags.join(', ')}</p>
      </div>
    </article>
  )
}
