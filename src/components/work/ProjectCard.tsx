import type { CSSProperties } from 'react'
import type { Project } from '@/types/content'
import { Icon } from '@/components/ui/Icon'
import { StatusBadge } from './StatusBadge'
import { isTall } from './isTall'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
  featured?: boolean
  onOpen: (slug: string) => void
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
      <div className={styles.media} data-tall={cover ? isTall(cover) : undefined}>
        {cover && (
          <img
            src={cover.src}
            alt=""
            width={cover.width}
            height={cover.height}
            loading={featured ? 'eager' : 'lazy'}
            decoding="async"
          />
        )}
        {project.status && <StatusBadge status={project.status} className={styles.badge} />}
      </div>

      <div className={styles.body}>
        <p className={styles.eyebrow}>
          {project.kind} · {project.year}
        </p>
        <h3 className={styles.title}>
          <button type="button" className={styles.open} onClick={() => onOpen(project.slug)} aria-haspopup="dialog">
            {project.title}
          </button>
        </h3>
        <p className={styles.summary}>{project.summary}</p>
        <div className={styles.meta}>
          <span className={styles.tags}>{project.tags.join(' · ')}</span>
          <span className={styles.arrow} aria-hidden="true">
            <Icon name="arrowUpRight" size={16} />
          </span>
        </div>
      </div>
    </article>
  )
}
