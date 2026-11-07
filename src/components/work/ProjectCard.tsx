import type { CSSProperties } from 'react'
import type { Project } from '@/types/content'
import { Icon } from '@/components/ui/Icon'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
  number: number
  onOpen: (slug: string) => void
}

/** Paint-chip style card: a color block with a code label, then the essentials. */
export function ProjectCard({ project, number, onOpen }: ProjectCardProps) {
  const code = String(number).padStart(2, '0')

  return (
    <button
      type="button"
      className={styles.card}
      style={{ '--swatch': project.swatch } as CSSProperties}
      onClick={() => onOpen(project.slug)}
      aria-haspopup="dialog"
    >
      <div className={styles.chip}>
        <span className={styles.code}>
          No. {code} · {project.year}
        </span>
        {project.highlight && <span className={styles.highlight}>{project.highlight}</span>}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>
        <div className={styles.meta}>
          <span className={styles.tags}>{project.tags.join(' · ')}</span>
          <span className={styles.open} aria-hidden="true">
            <Icon name="arrowUpRight" size={16} />
          </span>
        </div>
      </div>
    </button>
  )
}
