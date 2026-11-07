import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import styles from './Section.module.css'

interface SectionProps {
  id: string
  title: string
  /** Optional element beside the title, e.g. an InfoTip. */
  aside?: ReactNode
  children: ReactNode
}

export function Section({ id, title, aside, children }: SectionProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Reveal className={styles.heading}>
        <h2 id={`${id}-title`} className={styles.title}>
          {title}
        </h2>
        {aside}
      </Reveal>
      {children}
    </section>
  )
}
