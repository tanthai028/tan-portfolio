import { useEffect, useState } from 'react'
import { profile } from '@/data/profile'
import { useActiveSection } from '@/hooks/useActiveSection'
import { ThemeToggle } from './ThemeToggle'
import styles from './Header.module.css'

const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const

const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

export function Header() {
  const active = useActiveSection(SECTION_IDS)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={styles.header} data-scrolled={scrolled}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand} aria-label={`${profile.name}, back to top`}>
          {profile.name}
          <span className={styles.dot} aria-hidden="true">
            .
          </span>
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
