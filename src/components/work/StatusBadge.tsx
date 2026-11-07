import type { ProjectStatus } from '@/types/content'
import styles from './StatusBadge.module.css'

const LABELS: Record<ProjectStatus, string> = {
  live: 'Live',
  running: 'Running daily',
  'in-progress': 'In progress',
}

export function StatusBadge({ status, className = '' }: { status: ProjectStatus; className?: string }) {
  return (
    <span className={`${styles.badge} ${className}`} data-status={status}>
      <span className={styles.dot} aria-hidden="true" />
      {LABELS[status]}
    </span>
  )
}
