import { useRef } from 'react'
import { dropTetrisPieces } from '@/components/fun/tetrisRain'
import { profile } from '@/data/profile'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrolled } from '@/hooks/useScrolled'
import { ThemeToggle } from './ThemeToggle'
import styles from './Header.module.css'

const NAV_ITEMS = [
  { id: 'work', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const

const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

export function Header() {
  const active = useActiveSection(SECTION_IDS)
  const scrolled = useScrolled()
  // Easter egg: three quick clicks on the avatar drop Tetris pieces.
  const clicks = useRef<number[]>([])
  const onBrandClick = () => {
    const now = Date.now()
    clicks.current = [...clicks.current.filter((t) => now - t < 900), now]
    if (clicks.current.length >= 3) {
      clicks.current = []
      dropTetrisPieces()
    }
  }

  return (
    <header className={styles.header} data-scrolled={scrolled}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand} aria-label={`${profile.name}, back to top`} onClick={onBrandClick}>
          <img src={profile.photo.avatar} alt="" width={28} height={28} className={styles.avatar} />
          <span className={styles.brandName}>{profile.name}</span>
        </a>

        <nav className={styles.navWrap} aria-label="Primary">
          <ul className={styles.nav}>
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={styles.link}
                  aria-current={active === id ? 'location' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  )
}
