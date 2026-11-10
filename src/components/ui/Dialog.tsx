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
    if (!open && dialog.open) {
      // Close anything stacked inside first (the image viewer). Left open, it would stay modal
      // while hidden with its parent, and the whole page would stop responding.
      dialog.querySelectorAll('dialog[open]').forEach((nested) => (nested as HTMLDialogElement).close())
      dialog.close()
    }
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
const CLOSE_VELOCITY = 0.5 // px per ms, for a quick flick
const START_SLOP_PX = 6
// Feels like the sheet keeps the finger's momentum, then settles.
const RELEASE_EASE = 'cubic-bezier(0.2, 0.9, 0.3, 1)'

/**
 * On the phone bottom sheet, dragging down closes it: from the header at any time, or from the
 * body once it is scrolled to the top. Sideways drags (the screenshot strip) are left alone.
 * The sheet follows the finger one frame at a time, the backdrop fades as it goes, and on
 * release it carries the flick's speed: out and closed, or back up into place.
 */
function useSwipeToClose(
  dialogRef: RefObject<HTMLDialogElement | null>,
  bodyRef: RefObject<HTMLDivElement | null>,
  onClose: () => void,
) {
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const dialog = dialogRef.current
    const body = bodyRef.current
    if (!dialog || !body) return

    let startX = 0
    let startY = 0
    let offset = 0
    let frame = 0
    let state: 'idle' | 'pending' | 'dragging' | 'settling' = 'idle'
    // Recent positions, so release speed reflects the end of the gesture, not its average.
    let samples: { y: number; t: number }[] = []

    const paint = () => {
      frame = 0
      const height = dialog.offsetHeight || 1
      dialog.style.translate = `0 ${offset}px`
      dialog.style.setProperty('--sheet-drag', String(Math.min(1, offset / height)))
    }

    const clear = () => {
      dialog.style.transition = ''
      dialog.style.translate = ''
      dialog.style.removeProperty('--sheet-drag')
      dialog.style.removeProperty('will-change')
      state = 'idle'
      offset = 0
    }

    const settle = (to: number, duration: number, then: () => void) => {
      state = 'settling'
      dialog.style.transition = `translate ${duration}ms ${RELEASE_EASE}`
      dialog.style.translate = `0 ${to}px`
      dialog.style.setProperty('--sheet-drag', String(Math.min(1, to / (dialog.offsetHeight || 1))))
      let done = false
      const finish = () => {
        if (done) return
        done = true
        dialog.removeEventListener('transitionend', onEndTransition)
        then()
      }
      const onEndTransition = (event: TransitionEvent) => {
        if (event.target === dialog && event.propertyName === 'translate') finish()
      }
      dialog.addEventListener('transitionend', onEndTransition)
      window.setTimeout(finish, duration + 50) // in case transitionend never fires
    }

    const onStart = (event: TouchEvent) => {
      if (state === 'settling') return
      if (!matchMedia(SHEET_QUERY).matches || event.touches.length !== 1) return
      // Touches in a dialog opened on top of this one (the image viewer) belong to that dialog.
      if ((event.target as Element).closest('dialog') !== dialog) return
      const inBody = body.contains(event.target as Node)
      if (inBody && body.scrollTop > 0) return
      const touch = event.touches[0]
      startX = touch.clientX
      startY = touch.clientY
      state = 'pending'
    }

    const onMove = (event: TouchEvent) => {
      if (state !== 'pending' && state !== 'dragging') return
      const touch = event.touches[0]
      if (state === 'pending') {
        const dx = touch.clientX - startX
        const dy = touch.clientY - startY
        if (Math.abs(dx) < START_SLOP_PX && Math.abs(dy) < START_SLOP_PX) return
        // Upward or sideways: a normal scroll or a swipe through the screenshots.
        if (dy <= 0 || Math.abs(dx) > Math.abs(dy)) {
          state = 'idle'
          return
        }
        // Measure from here, so the sheet doesn't jump by the slop distance.
        startY = touch.clientY
        samples = []
        state = 'dragging'
        dialog.style.transition = 'none'
        dialog.style.willChange = 'translate'
      }
      event.preventDefault()
      offset = Math.max(0, touch.clientY - startY)
      const now = performance.now()
      samples.push({ y: offset, t: now })
      while (samples.length > 2 && now - samples[0].t > 100) samples.shift()
      if (!frame) frame = requestAnimationFrame(paint)
    }

    const onEnd = () => {
      if (state !== 'dragging') {
        if (state === 'pending') state = 'idle'
        return
      }
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      const first = samples[0]
      const last = samples[samples.length - 1]
      const velocity = first && last && last.t > first.t ? (last.y - first.y) / (last.t - first.t) : 0
      const height = dialog.offsetHeight
      if (offset > CLOSE_DISTANCE_PX || velocity > CLOSE_VELOCITY) {
        // Faster flicks finish faster, between 140 and 280 ms.
        const remaining = height - offset
        const duration = Math.round(Math.min(280, Math.max(140, remaining / Math.max(velocity, 1.2))))
        settle(height, duration, () => {
          onCloseRef.current()
          // The dialog is closed and hidden by now; drop the inline styles once its exit is over.
          window.setTimeout(clear, 350)
        })
      } else {
        settle(0, 260, clear)
      }
    }

    dialog.addEventListener('touchstart', onStart, { passive: true })
    dialog.addEventListener('touchmove', onMove, { passive: false })
    dialog.addEventListener('touchend', onEnd)
    dialog.addEventListener('touchcancel', onEnd)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      dialog.removeEventListener('touchstart', onStart)
      dialog.removeEventListener('touchmove', onMove)
      dialog.removeEventListener('touchend', onEnd)
      dialog.removeEventListener('touchcancel', onEnd)
    }
  }, [dialogRef, bodyRef])
}
