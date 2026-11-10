import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import styles from './Lightbox.module.css'

export interface LightboxImage {
  src: string
  alt: string
  width: number
  height: number
}

interface LightboxProps {
  images: LightboxImage[]
  /** Index of the image on show, or null when closed. */
  index: number | null
  onIndexChange: (index: number) => void
  onClose: () => void
}

// A sideways drag past this, or a quick flick, moves to the next or previous image.
const SWIPE_DISTANCE_PX = 60
const SWIPE_VELOCITY = 0.4 // px per ms

/**
 * Full-screen image viewer on a native <dialog>, so it stacks above another open dialog.
 * Arrow keys, the side buttons and a sideways swipe step through images; Escape or a click
 * outside closes it.
 */
export function Lightbox({ images, index, onIndexChange, onClose }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const open = index !== null
  const image = open ? images[index] : null
  const position = (index ?? 0) + 1
  const multiple = images.length > 1
  const figureRef = useRef<HTMLElement>(null)
  // Which side the new image slides in from, so a swipe or arrow press reads as moving along.
  const [enter, setEnter] = useState<'next' | 'prev' | null>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const step = (direction: 1 | -1) => {
    if (index === null) return
    setEnter(direction === 1 ? 'next' : 'prev')
    onIndexChange((index + direction + images.length) % images.length)
  }
  // Reopening should zoom in fresh, not slide in from the last swipe's side.
  const close = () => {
    setEnter(null)
    onClose()
  }
  const stepRef = useRef(step)
  useEffect(() => {
    stepRef.current = step
  })

  // Swipe: the image follows the finger sideways, then moves on or springs back on release.
  useEffect(() => {
    const figure = figureRef.current
    if (!open || !multiple || !figure) return
    let start: { x: number; y: number; t: number } | null = null
    let dx = 0
    let horizontal: boolean | null = null

    const image = () => figure.querySelector('img')
    const onStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return
      const touch = event.touches[0]
      start = { x: touch.clientX, y: touch.clientY, t: performance.now() }
      dx = 0
      horizontal = null
    }
    const onMove = (event: TouchEvent) => {
      if (!start) return
      const touch = event.touches[0]
      dx = touch.clientX - start.x
      const dy = touch.clientY - start.y
      if (horizontal === null && Math.abs(dx) + Math.abs(dy) > 6) horizontal = Math.abs(dx) > Math.abs(dy)
      if (!horizontal) return
      event.preventDefault()
      const img = image()
      if (img) {
        img.style.transition = 'none'
        img.style.translate = `${dx}px 0`
      }
    }
    const onEnd = () => {
      if (!start) return
      const speed = Math.abs(dx) / Math.max(1, performance.now() - start.t)
      const img = image()
      start = null
      if (!horizontal || !img) return
      img.style.transition = ''
      img.style.translate = ''
      if (Math.abs(dx) > SWIPE_DISTANCE_PX || speed > SWIPE_VELOCITY) stepRef.current(dx < 0 ? 1 : -1)
    }

    figure.addEventListener('touchstart', onStart, { passive: true })
    figure.addEventListener('touchmove', onMove, { passive: false })
    figure.addEventListener('touchend', onEnd)
    figure.addEventListener('touchcancel', onEnd)
    return () => {
      figure.removeEventListener('touchstart', onStart)
      figure.removeEventListener('touchmove', onMove)
      figure.removeEventListener('touchend', onEnd)
      figure.removeEventListener('touchcancel', onEnd)
    }
  }, [open, multiple])

  return (
    <dialog
      ref={ref}
      className={styles.lightbox}
      aria-label={image ? `${image.alt} (full size)` : 'Image viewer'}
      // React bubbles `close` through the component tree; keep it from closing a parent dialog.
      onClose={(event) => {
        event.stopPropagation()
        close()
      }}
      onClick={(event) => event.target === event.currentTarget && close()}
      onKeyDown={(event) => {
        if (!multiple) return
        if (event.key === 'ArrowRight') step(1)
        if (event.key === 'ArrowLeft') step(-1)
      }}
    >
      {image && (
        <figure
          ref={figureRef}
          className={styles.figure}
          onClick={(event) => event.target === event.currentTarget && close()}
        >
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            data-enter={enter ?? undefined}
          />
          {multiple && (
            <figcaption className={styles.counter}>
              {position} / {images.length}
            </figcaption>
          )}
        </figure>
      )}

      <button type="button" className={`${styles.control} ${styles.close}`} onClick={close} aria-label="Close image">
        <Icon name="close" />
      </button>
      {multiple && (
        <>
          <button
            type="button"
            className={`${styles.control} ${styles.prev}`}
            onClick={() => step(-1)}
            aria-label="Previous image"
          >
            <Icon name="arrowLeft" />
          </button>
          <button
            type="button"
            className={`${styles.control} ${styles.next}`}
            onClick={() => step(1)}
            aria-label="Next image"
          >
            <Icon name="arrowRight" />
          </button>
        </>
      )}
    </dialog>
  )
}
