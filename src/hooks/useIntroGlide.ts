import { useEffect } from 'react'

const DURATION_MS = 650
// Upward glide only kicks in when the target heading is this close to where the glide left it.
const RETURN_RANGE_PX = 120

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

/**
 * On desktop, one wheel scroll down from the intro glides to `targetId`'s heading, and one scroll up
 * from there glides back to the top. Everywhere else the page scrolls normally. Touch and keyboard
 * scrolling are untouched, and reduced-motion users get plain scrolling.
 */
export function useIntroGlide(targetId: string) {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let animating = false

    const targetTop = () => {
      const target = document.getElementById(targetId)
      if (!target) return null
      const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0
      return target.getBoundingClientRect().top + window.scrollY - headerHeight - 32
    }

    const glideTo = (to: number) => {
      const from = window.scrollY
      const start = performance.now()
      animating = true
      const frame = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION_MS)
        window.scrollTo({ top: from + (to - from) * easeInOutCubic(t), behavior: 'instant' })
        if (t < 1) requestAnimationFrame(frame)
        else animating = false
      }
      requestAnimationFrame(frame)
    }

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return // pinch zoom
      if (animating) {
        event.preventDefault()
        return
      }
      const to = targetTop()
      if (to === null) return
      const y = window.scrollY

      if (event.deltaY > 0 && y < to * 0.5) {
        event.preventDefault()
        glideTo(to)
      } else if (event.deltaY < 0 && y > 0 && Math.abs(y - to) < RETURN_RANGE_PX) {
        event.preventDefault()
        glideTo(0)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [targetId])
}
