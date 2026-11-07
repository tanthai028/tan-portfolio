import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import styles from './Section.module.css'

interface SectionProps {
  id: string
  /** Two-digit index shown before the title, e.g. "01". */
  index: string
  title: string
  /** Optional element beside the title, e.g. an InfoTip. */
  aside?: ReactNode
  children: ReactNode
}

export function Section({ id, index, title, aside, children }: SectionProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Reveal className={styles.heading}>
        <span className={styles.index}>{index}</span>
        <h2 id={`${id}-title`} className={styles.title}>
          {title}
        </h2>
        {aside}
      </Reveal>
      {children}
    </section>
  )
}
