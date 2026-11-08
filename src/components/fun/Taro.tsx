import { useRef, useState } from 'react'
import { Lottie } from './Lottie'
import styles from './Taro.module.css'

const PURR_MS = 1800

/**
 * Taro, a British Shorthair asleep on the footer line. Click to pet her: a few hearts float up.
 * Animation: "Cat is sleeping and rolling" by Cảnh Ngô (LottieFiles), recolored.
 */
export function Taro() {
  const [purrs, setPurrs] = useState<number[]>([])
  const nextId = useRef(0)

  const pet = () => {
    const id = nextId.current++
    setPurrs((list) => [...list, id])
    window.setTimeout(() => setPurrs((list) => list.filter((p) => p !== id)), PURR_MS)
  }

  return (
    <button type="button" className={styles.taro} onClick={pet} aria-label="Pet Taro, the cat" title="Taro">
      <Lottie src="/taro/taro-sleep.json" className={styles.cat} />
      <span className={styles.zzz} aria-hidden="true">
        z
      </span>
      {purrs.map((id) => (
        <span key={id} className={styles.purr} aria-hidden="true">
          <span>♥</span>
          <span>prrr</span>
          <span>♥</span>
        </span>
      ))}
    </button>
  )
}
