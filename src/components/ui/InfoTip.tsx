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
 * A small "?" button that reveals secondary detail in a floating popover: on hover with a mouse,
 * on tap with touch.
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
      const maxTop = window.innerHeight - height - VIEWPORT_MARGIN
      // To the right of the button, centered on it. On narrow screens with no room there,
      // fall back to below it (or above, near the bottom of the screen).
      const fitsRight = anchor.right + OFFSET + width <= window.innerWidth - VIEWPORT_MARGIN
      let left: number
      let top: number
      if (fitsRight) {
        left = anchor.right + OFFSET
        top = Math.max(VIEWPORT_MARGIN, Math.min(anchor.top + anchor.height / 2 - height / 2, maxTop))
      } else {
        left = Math.max(VIEWPORT_MARGIN, Math.min(anchor.left + anchor.width / 2 - width / 2, maxLeft))
        const fitsBelow = anchor.bottom + OFFSET + height < window.innerHeight - VIEWPORT_MARGIN
        top = fitsBelow ? anchor.bottom + OFFSET : anchor.top - OFFSET - height
      }
      popover.dataset.side = fitsRight ? 'right' : 'below'
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

    // With a mouse, hovering opens the tip; touch keeps tap-to-open. A short delay lets the
    // pointer travel from the button onto the tip without it closing.
    let closeTimer: number | undefined
    const isOpen = () => popover.matches(':popover-open')
    const onEnter = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      window.clearTimeout(closeTimer)
      if (!isOpen()) popover.showPopover()
    }
    const onLeave = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      closeTimer = window.setTimeout(() => isOpen() && popover.hidePopover(), 150)
    }
    // A click while hover already opened it would toggle it shut; keep it open instead.
    const onClick = (event: MouseEvent) => {
      if (event.detail > 0 && button.matches(':hover') && isOpen()) event.preventDefault()
    }

    popover.addEventListener('toggle', onToggle)
    for (const el of [button, popover]) {
      el.addEventListener('pointerenter', onEnter)
      el.addEventListener('pointerleave', onLeave)
    }
    button.addEventListener('click', onClick)
    return () => {
      window.clearTimeout(closeTimer)
      popover.removeEventListener('toggle', onToggle)
      for (const el of [button, popover]) {
        el.removeEventListener('pointerenter', onEnter)
        el.removeEventListener('pointerleave', onLeave)
      }
      button.removeEventListener('click', onClick)
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
