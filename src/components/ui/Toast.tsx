import styles from './Toast.module.css'

/** Floating status message. Always mounted so screen readers pick up changes. */
export function Toast({ message }: { message: string | null }) {
  return (
    <div className={styles.toast} role="status" aria-live="polite" data-visible={Boolean(message)}>
      {message}
    </div>
  )
}
