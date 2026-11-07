import { useState } from 'react'
import { experience } from '@/data/experience'
import { profile } from '@/data/profile'
import type { Experience } from '@/types/content'
import { Section } from '@/components/layout/Section'
import { Dialog } from '@/components/ui/Dialog'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { TagList } from '@/components/ui/Tag'
import styles from './About.module.css'

export function About() {
  const [role, setRole] = useState<Experience | null>(null)
  // Keep the last role rendered while the dialog animates closed.
  const [shown, setShown] = useState<Experience | null>(null)
  if (role && role !== shown) setShown(role)

  return (
    <Section id="about" index="02" title="About">
      <div className={styles.layout}>
        <Reveal className={styles.bio}>
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal index={1} className={styles.skills}>
          <dl className={styles.skillGrid}>
            {profile.skills.map((group) => (
              <div key={group.label}>
                <dt>{group.label}</dt>
                <dd>{group.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <h3 className={styles.subTitle}>Experience</h3>
      <ul className={styles.roles}>
        {experience.map((item, i) => (
          <Reveal as="li" key={`${item.company}-${item.period}`} index={i}>
            <button type="button" className={styles.role} onClick={() => setRole(item)} aria-haspopup="dialog">
              <span className={styles.period}>{item.period}</span>
              <span className={styles.roleName}>
                {item.title} <span className={styles.company}>· {item.company}</span>
              </span>
              <Icon name="arrowRight" size={16} className={styles.roleArrow} />
            </button>
          </Reveal>
        ))}
      </ul>

      <Dialog
        open={role !== null}
        onClose={() => setRole(null)}
        title={shown?.title ?? ''}
        eyebrow={shown ? `${shown.company} · ${shown.period}` : undefined}
      >
        {shown && (
          <div className={styles.dialogBody}>
            <p className={styles.lead}>{shown.summary}</p>
            <ul className={styles.points}>
              {shown.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <TagList items={shown.stack} label="Tech used" />
          </div>
        )}
      </Dialog>
    </Section>
  )
}
