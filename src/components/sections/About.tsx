import { useState } from 'react'
import { education, experience } from '@/data/experience'
import { profile } from '@/data/profile'
import type { Experience, Term } from '@/types/content'
import { Section } from '@/components/layout/Section'
import { BrandIcon } from '@/components/ui/BrandIcon'
import { Dialog } from '@/components/ui/Dialog'
import { Icon } from '@/components/ui/Icon'
import { InfoTip } from '@/components/ui/InfoTip'
import { Reveal } from '@/components/ui/Reveal'
import { TagList } from '@/components/ui/Tag'
import styles from './About.module.css'

export function About() {
  const [role, setRole] = useState<Experience | null>(null)
  // Keep the last role rendered while the dialog animates closed.
  const [shown, setShown] = useState<Experience | null>(null)
  if (role && role !== shown) setShown(role)

  return (
    <Section id="about" title="About">
      <div className={styles.layout}>
        <Reveal className={styles.bio}>
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{withTerms(paragraph, profile.aboutTerms ?? [])}</p>
          ))}
        </Reveal>

        <Reveal index={1} className={styles.skills}>
          <figure className={styles.figure}>
            <img
              src={profile.photo.full}
              alt={profile.photo.alt}
              width={460}
              height={460}
              loading="lazy"
              decoding="async"
              className={styles.photo}
            />
            {profile.photo.caption && <figcaption className={styles.caption}>{profile.photo.caption}</figcaption>}
          </figure>
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

      <RoleList title="Experience" items={experience} onOpen={setRole} />
      <RoleList title="Education" items={education} onOpen={setRole} />

      <Dialog
        open={role !== null}
        onClose={() => setRole(null)}
        title={shown?.title ?? ''}
        eyebrow={shown ? `${shown.company}, ${shown.period}` : undefined}
      >
        {shown && (
          <div className={styles.dialogBody}>
            <p className={styles.lead}>{shown.summary}</p>
            <ul className={styles.points}>
              {shown.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            {shown.stack.length > 0 && <TagList items={shown.stack} label="Tech used" />}
          </div>
        )}
      </Dialog>
    </Section>
  )
}

/** Splits a paragraph so each glossary term becomes a hover tip. */
function withTerms(text: string, terms: Term[]) {
  if (terms.length === 0) return text
  const escaped = terms.map((t) => t.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  return text.split(new RegExp(`(${escaped.join('|')})`)).map((part, i) => {
    const term = terms.find((t) => t.term === part)
    if (!term) return part
    return (
      <InfoTip key={i} label={term.term} term={term.term}>
        {term.text}
        {term.link && (
          <>
            <br />
            <a href={term.link.href} target="_blank" rel="noreferrer">
              {term.link.label}
            </a>
          </>
        )}
      </InfoTip>
    )
  })
}

/** The small mark beside a role, so employers can be spotted at a glance. */
function RoleLogo({ logo }: { logo: Experience['logo'] }) {
  if (!logo) return null
  return (
    <span className={styles.logo} aria-hidden="true">
      {logo === 'self' ? (
        <img src={profile.photo.avatar} alt="" width={20} height={20} />
      ) : logo === 'school' ? (
        <Icon name="school" size={18} />
      ) : (
        <BrandIcon name={logo} size={16} />
      )}
    </span>
  )
}

interface RoleListProps {
  title: string
  items: Experience[]
  onOpen: (item: Experience) => void
}

function RoleList({ title, items, onOpen }: RoleListProps) {
  return (
    <>
      <h3 className={styles.subTitle}>{title}</h3>
      <ul className={styles.roles}>
        {items.map((item, i) => (
          <Reveal as="li" key={`${item.company}-${item.period}`} index={i}>
            <button type="button" className={styles.role} onClick={() => onOpen(item)} aria-haspopup="dialog">
              <span className={styles.period}>{item.period}</span>
              <span className={styles.roleName}>
                <RoleLogo logo={item.logo} />
                <span>
                  {item.title}, <span className={styles.company}>{item.company}</span>
                </span>
              </span>
              <Icon name="arrowRight" size={16} className={styles.roleArrow} />
            </button>
          </Reveal>
        ))}
      </ul>
    </>
  )
}
