import { Icon } from '@/components/ui/Icon'
import { useTheme } from '@/hooks/useTheme'
import styles from './ThemeToggle.module.css'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className={styles.icon} data-active={!isDark}>
        <Icon name="sun" />
      </span>
      <span className={styles.icon} data-active={isDark}>
        <Icon name="moon" />
      </span>
    </button>
  )
}
