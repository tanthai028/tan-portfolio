import { useEffect, useRef } from 'react'

interface LottieProps {
  /** Path to a Lottie JSON file under `public/`. */
  src: string
  className?: string
  loop?: boolean
}

/**
 * Plays a Lottie animation. The player and the JSON load only when the element nears the
 * viewport, so they cost nothing on first paint. Reduced-motion visitors see the first frame.
 */
export function Lottie({ src, className, loop = true }: LottieProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    let destroyed = false
    let cleanup = () => {}

    const load = async () => {
      const [{ default: lottie }, animationData] = await Promise.all([
        import('lottie-web/build/player/lottie_light'),
        fetch(src).then((response) => response.json()),
      ])
      if (destroyed) return
      const still = matchMedia('(prefers-reduced-motion: reduce)').matches
      const animation = lottie.loadAnimation({
        container,
        renderer: 'svg',
        loop,
        autoplay: !still,
        animationData,
        rendererSettings: { preserveAspectRatio: 'xMidYMax meet' },
      })
      if (still) animation.goToAndStop(0, true)
      cleanup = () => animation.destroy()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        void load()
      },
      { rootMargin: '300px 0px' },
    )
    observer.observe(container)

    return () => {
      destroyed = true
      observer.disconnect()
      cleanup()
    }
  }, [src, loop])

  return <div ref={ref} className={className} aria-hidden="true" />
}
