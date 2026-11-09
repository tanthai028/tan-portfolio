const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

let gliding = false

/** True while a glide is running, so scroll input can be held off until it lands. */
export const isGliding = () => gliding

/** Eased page scroll to `to`. The same motion for the intro glide and nav jumps. */
export function glideTo(to: number, durationMs = 650) {
  const from = window.scrollY
  const start = performance.now()
  gliding = true
  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / durationMs)
    window.scrollTo({ top: from + (to - from) * easeInOutCubic(t), behavior: 'instant' })
    if (t < 1) requestAnimationFrame(frame)
    else gliding = false
  }
  requestAnimationFrame(frame)
}
