import { useState } from 'react'
import { colophon } from '@/data/colophon'
import { profile } from '@/data/profile'
import { Taro } from '@/components/fun/Taro'
import { Dialog } from '@/components/ui/Dialog'
import { TagList } from '@/components/ui/Tag'
import styles from './Footer.module.css'

const YEAR = new Date().getFullYear()
const UPDATED = new Date(__BUILT_AT__).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

export function Footer() {
  const [open, setOpen] = useState(false)

  return (
    <footer className={styles.footer}>
      <div className={styles.taroSpot}>
        <Taro />
      </div>
      <p>
        © {YEAR} {profile.name}
        <span className={styles.updated}>Updated {UPDATED}</span>
      </p>
      <div className={styles.links}>
        <button type="button" className={styles.link} onClick={() => setOpen(true)} aria-haspopup="dialog">
          {colophon.trigger}
        </button>
        {profile.sourceUrl && (
          <a href={profile.sourceUrl} className={styles.link} target="_blank" rel="noreferrer">
            Source
          </a>
        )}
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} title={colophon.title}>
        <div className={styles.colophon}>
          <p className={styles.lead}>{colophon.lead}</p>
          {colophon.sections.map((section) => (
            <section key={section.title}>
              <h3 className={styles.blockTitle}>{section.title}</h3>
              <ul className={styles.list}>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
          <section>
            <h3 className={styles.blockTitle}>Stack</h3>
            <TagList items={colophon.stack} label="Site stack" />
          </section>
        </div>
      </Dialog>
    </footer>
  )
}
