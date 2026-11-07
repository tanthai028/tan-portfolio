import { useEffect, useId, useRef, type ReactNode } from 'react'
import { Icon } from './Icon'
import styles from './InfoTip.module.css'

interface InfoTipProps {
  /** What the tip is about. Used for the button's accessible name. */
  label: string
  children: ReactNode
}

const VIEWPORT_MARGIN = 12
const OFFSET = 8

/**
 * A small "?" button that reveals secondary detail in a floating popover.
 * Uses the native Popover API (top layer, light dismiss) so nothing in the layout shifts.
 */
export function InfoTip({ label, children }: InfoTipProps) {
  const id = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    const popover = popoverRef.current
    if (!button || !popover) return

    const place = () => {
      const anchor = button.getBoundingClientRect()
      const { width, height } = popover.getBoundingClientRect()
      const maxLeft = window.innerWidth - width - VIEWPORT_MARGIN
      const left = Math.max(VIEWPORT_MARGIN, Math.min(anchor.left + anchor.width / 2 - width / 2, maxLeft))
      const fitsBelow = anchor.bottom + OFFSET + height < window.innerHeight - VIEWPORT_MARGIN
      const top = fitsBelow ? anchor.bottom + OFFSET : anchor.top - OFFSET - height
      popover.style.left = `${left}px`
      popover.style.top = `${top}px`
    }

    const hide = () => popover.hidePopover()

    const onToggle = (event: Event) => {
      if ((event as ToggleEvent).newState === 'open') {
        place()
        window.addEventListener('scroll', hide, { passive: true, once: true })
        window.addEventListener('resize', hide, { once: true })
      } else {
        window.removeEventListener('scroll', hide)
        window.removeEventListener('resize', hide)
      }
    }

    popover.addEventListener('toggle', onToggle)
    return () => {
      popover.removeEventListener('toggle', onToggle)
      window.removeEventListener('scroll', hide)
      window.removeEventListener('resize', hide)
    }
  }, [])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={styles.trigger}
        popoverTarget={id}
        aria-label={`More about ${label}`}
      >
        <Icon name="question" size={14} />
      </button>
      <span ref={popoverRef} id={id} popover="auto" className={styles.popover}>
        {children}
      </span>
    </>
  )
}
