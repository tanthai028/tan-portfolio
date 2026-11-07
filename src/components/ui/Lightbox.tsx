import { useEffect, useRef } from 'react'
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

/**
 * Full-screen image viewer on a native <dialog>, so it stacks above another open dialog.
 * Arrow keys and the side buttons step through images; Escape or a click outside closes it.
 */
export function Lightbox({ images, index, onIndexChange, onClose }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const open = index !== null
  const image = open ? images[index] : null
  const position = (index ?? 0) + 1
  const multiple = images.length > 1

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const step = (direction: 1 | -1) => {
    if (index === null) return
    onIndexChange((index + direction + images.length) % images.length)
  }

  return (
    <dialog
      ref={ref}
      className={styles.lightbox}
      aria-label={image ? `${image.alt} (full size)` : 'Image viewer'}
      // React bubbles `close` through the component tree; keep it from closing a parent dialog.
      onClose={(event) => {
        event.stopPropagation()
        onClose()
      }}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      onKeyDown={(event) => {
        if (!multiple) return
        if (event.key === 'ArrowRight') step(1)
        if (event.key === 'ArrowLeft') step(-1)
      }}
    >
      {image && (
        <figure className={styles.figure} onClick={(event) => event.target === event.currentTarget && onClose()}>
          <img key={image.src} src={image.src} alt={image.alt} width={image.width} height={image.height} />
          {multiple && (
            <figcaption className={styles.counter}>
              {position} / {images.length}
            </figcaption>
          )}
        </figure>
      )}

      <button type="button" className={`${styles.control} ${styles.close}`} onClick={onClose} aria-label="Close image">
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
