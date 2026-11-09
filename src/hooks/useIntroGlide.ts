import { useEffect } from 'react'

const DURATION_MS = 650
// Upward glide only kicks in when the target heading is this close to where the glide left it.
const RETURN_RANGE_PX = 120

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

/**
 * One wheel scroll or one swipe down from the intro glides to `targetId`'s heading, and one scroll
 * up from there glides back to the top. Everywhere else the page scrolls normally. Keyboard
 * scrolling is untouched, and reduced-motion users get plain scrolling.
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

    /** Where a scroll in this direction should glide to, or null to let the page scroll normally. */
    const glideTarget = (down: boolean) => {
      const to = targetTop()
      if (to === null) return null
      const y = window.scrollY
      if (down && y < to * 0.5) return to
      if (!down && y > 0 && Math.abs(y - to) < RETURN_RANGE_PX) return 0
      return null
    }

    // A modal is open: the page is locked, and scrolling belongs to the modal.
    const modalOpen = () => document.querySelector('dialog[open]') !== null

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || modalOpen()) return // ctrlKey: pinch zoom
      if (animating) {
        event.preventDefault()
        return
      }
      const to = glideTarget(event.deltaY > 0)
      if (to === null) return
      event.preventDefault()
      glideTo(to)
    }

    // Touch: the first move decides, because browsers commit to native scrolling on it. A swipe that
    // matches a glide takes over the whole gesture, so native momentum doesn't fight the glide;
    // anything else scrolls as usual.
    let touch: { x: number; y: number; mode: 'pending' | 'glide' | 'native' } | null = null

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1 || modalOpen()) {
        touch = null
        return
      }
      const { clientX, clientY } = event.touches[0]
      touch = { x: clientX, y: clientY, mode: animating ? 'glide' : 'pending' }
    }

    const onTouchMove = (event: TouchEvent) => {
      if (!touch) return
      if (touch.mode === 'glide') {
        event.preventDefault()
        return
      }
      if (touch.mode === 'native') return
      const { clientX, clientY } = event.touches[0]
      const dx = clientX - touch.x
      const dy = clientY - touch.y
      if (dx === 0 && dy === 0) return
      // Finger moving up scrolls the page down.
      const to = Math.abs(dy) > Math.abs(dx) ? glideTarget(dy < 0) : null
      if (to === null) {
        touch.mode = 'native'
        return
      }
      touch.mode = 'glide'
      event.preventDefault()
      glideTo(to)
    }

    const onTouchEnd = () => {
      touch = null
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('touchcancel', onTouchEnd)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [targetId])
}
