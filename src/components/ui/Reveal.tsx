import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'
import styles from './Reveal.module.css'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  /** Stagger index; each step adds a short delay. */
  index?: number
  className?: string
}

/** Fades content up once when it first scrolls into view. */
export function Reveal({ children, as: Tag = 'div', index = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = 'true'
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${className}`}
      style={{ '--reveal-index': index } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
