import type { CSSProperties } from 'react'
import type { Project } from '@/types/content'
import { Icon } from '@/components/ui/Icon'
import { StatusBadge } from './StatusBadge'
import { imageShape } from './imageShape'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
  featured?: boolean
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
 * Paint-chip style card: the cover screenshot sits on the project's swatch color.
 * The title button's hit area is stretched over the whole card, so the card is
 * one click target while the heading stays a real heading.
 */
export function ProjectCard({ project, featured = false, onOpen }: ProjectCardProps) {
  const [cover] = project.images

  return (
    <article
      className={styles.card}
      data-featured={featured}
      style={{ '--swatch': project.swatch } as CSSProperties}
    >
      <div className={styles.media} data-shape={cover ? imageShape(cover) : undefined}>
        {cover && (
          <img
            ref={markIfLoaded}
            src={cover.src}
            alt=""
            width={cover.width}
            height={cover.height}
            loading={featured ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={(event) => markLoaded(event.currentTarget)}
          />
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.eyebrow}>
          <span className={styles.kind}>
            <span>{project.kind}</span>
            <span>{project.date}</span>
          </span>
          {project.status && <StatusBadge status={project.status} />}
        </div>
        <h3 className={styles.title}>
          <button type="button" className={styles.open} onClick={() => onOpen(project.slug)} aria-haspopup="dialog">
            {project.title}
          </button>
        </h3>
        <p className={styles.summary}>{project.summary}</p>
        <div className={styles.meta}>
          <span className={styles.tags}>{project.tags.join(', ')}</span>
          <span className={styles.arrow} aria-hidden="true">
            <Icon name="arrowUpRight" size={16} />
          </span>
        </div>
      </div>
    </article>
  )
}
