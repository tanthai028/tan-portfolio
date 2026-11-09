import { useEffect } from 'react'
import { glideTo } from '@/lib/glide'

// Longer jumps get a little more time, so a trip to Contact doesn't feel rushed.
const MIN_MS = 650
const MAX_MS = 1000
const MS_PER_PX = 0.15

/**
 * Same-page links (nav tabs, the logo, the scroll cue) glide to their section with the intro's
 * eased motion instead of the browser's smooth scroll. The skip link and reduced-motion users
 * keep the native jump.
 */
export function useAnchorGlide() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      const id = link?.hash.slice(1)
      if (!id || id === 'main') return
      const target = document.getElementById(id)
      if (!target) return

      event.preventDefault()
      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const to = id === 'top' ? 0 : Math.min(maxScroll, target.getBoundingClientRect().top + window.scrollY - padding)
      const distance = Math.abs(to - window.scrollY)
      glideTo(to, Math.min(MAX_MS, Math.max(MIN_MS, distance * MS_PER_PX)))
      history.pushState(null, '', `#${id}`)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
