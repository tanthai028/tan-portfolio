import { profile } from '@/data/profile'
import { InfoTip } from '@/components/ui/InfoTip'
import styles from './Footer.module.css'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        © {YEAR} {profile.name}
      </p>
      <p className={styles.built}>
        Built from scratch
        <InfoTip label="how this site was built">
          React 19, TypeScript, and CSS Modules on Vite. Native {'<dialog>'} and Popover APIs for overlays, no UI
          library.
        </InfoTip>
      </p>
    </footer>
  )
}
