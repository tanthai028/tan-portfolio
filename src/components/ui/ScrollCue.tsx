import { useScrolled } from '@/hooks/useScrolled'
import styles from './ScrollCue.module.css'

/**
 * A quiet hint that there is more below: a dot glides down a short track.
 * It links to the next section and fades out once the visitor starts scrolling.
 */
export function ScrollCue({ href, label = 'Scroll' }: { href: string; label?: string }) {
  const scrolled = useScrolled(40)

  return (
    <a href={href} className={styles.cue} data-hidden={scrolled} tabIndex={scrolled ? -1 : 0}>
      <span className={styles.label}>{label}</span>
      <span className={styles.track} aria-hidden="true">
        <span className={styles.dot} />
      </span>
    </a>
  )
}
