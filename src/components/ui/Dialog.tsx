import { useEffect, useId, useRef, type ReactNode, type RefObject } from 'react'
import { Icon } from './Icon'
import styles from './Dialog.module.css'

interface DialogProps {
  open: boolean
  onClose: () => void
  title: string
  /** Small label above the title. */
  eyebrow?: ReactNode
  children: ReactNode
  footer?: ReactNode
}

/**
 * Modal built on the native <dialog> element: focus trap, Escape to close, and
 * top-layer rendering come from the browser. Becomes a bottom sheet on small screens,
 * which can be swiped down to close.
 */
export function Dialog({ open, onClose, title, eyebrow, children, footer }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  useSwipeToClose(ref, bodyRef, onClose)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      // A click whose target is the <dialog> itself landed on the backdrop.
      onClick={(event) => event.target === ref.current && onClose()}
    >
      <div className={styles.panel}>
        <span className={styles.handle} aria-hidden="true" />
        <header className={styles.header}>
          <div>
            {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
          </div>
          <button className={styles.close} onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </header>
        <div ref={bodyRef} className={styles.body}>
          {children}
        </div>
        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </dialog>
  )
}

const SHEET_QUERY = '(max-width: 40rem)'
const CLOSE_DISTANCE_PX = 120
const CLOSE_VELOCITY = 0.6 // px per ms, for a quick flick

/**
 * On the phone bottom sheet, dragging down closes it: from the header at any time, or from the
 * body once it is scrolled to the top. Sideways drags (the screenshot strip) are left alone.
 */
function useSwipeToClose(
  dialogRef: RefObject<HTMLDialogElement | null>,
  bodyRef: RefObject<HTMLDivElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    const dialog = dialogRef.current
    const body = bodyRef.current
    if (!dialog || !body) return

    let startX = 0
    let startY = 0
    let startTime = 0
    let offset = 0
    let state: 'idle' | 'pending' | 'dragging' = 'idle'

    const reset = () => {
      dialog.style.transition = ''
      dialog.style.translate = ''
      state = 'idle'
      offset = 0
    }

    const onStart = (event: TouchEvent) => {
      if (!matchMedia(SHEET_QUERY).matches || event.touches.length !== 1) return
      const inBody = body.contains(event.target as Node)
      if (inBody && body.scrollTop > 0) return
      const touch = event.touches[0]
      startX = touch.clientX
      startY = touch.clientY
      startTime = performance.now()
      state = 'pending'
    }

    const onMove = (event: TouchEvent) => {
      if (state === 'idle') return
      const touch = event.touches[0]
      const dx = touch.clientX - startX
      const dy = touch.clientY - startY
      if (state === 'pending') {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
        // Upward or sideways: a normal scroll or a swipe through the screenshots.
        if (dy <= 0 || Math.abs(dx) > Math.abs(dy)) {
          state = 'idle'
          return
        }
        state = 'dragging'
        dialog.style.transition = 'none'
      }
      event.preventDefault()
      offset = Math.max(0, dy)
      dialog.style.translate = `0 ${offset}px`
    }

    const onEnd = () => {
      if (state !== 'dragging') {
        state = 'idle'
        return
      }
      const velocity = offset / (performance.now() - startTime)
      const shouldClose = offset > CLOSE_DISTANCE_PX || velocity > CLOSE_VELOCITY
      reset()
      // With the inline offset cleared in the same frame, the sheet animates from where the
      // finger left it: down and out when closing, back up otherwise.
      if (shouldClose) onClose()
    }

    dialog.addEventListener('touchstart', onStart, { passive: true })
    dialog.addEventListener('touchmove', onMove, { passive: false })
    dialog.addEventListener('touchend', onEnd)
    dialog.addEventListener('touchcancel', onEnd)
    return () => {
      dialog.removeEventListener('touchstart', onStart)
      dialog.removeEventListener('touchmove', onMove)
      dialog.removeEventListener('touchend', onEnd)
      dialog.removeEventListener('touchcancel', onEnd)
    }
  }, [dialogRef, bodyRef, onClose])
}
