import { profile } from '@/data/profile'
import { useIntroGlide } from '@/hooks/useIntroGlide'
import { Button } from '@/components/ui/Button'
import { InfoTip } from '@/components/ui/InfoTip'
import { Reveal } from '@/components/ui/Reveal'
import { ScrollCue } from '@/components/ui/ScrollCue'
import styles from './Hero.module.css'

export function Hero() {
  const { availability } = profile
  useIntroGlide('work-title')

  return (
    <section className={styles.hero} aria-label="Introduction">
      <Reveal index={0}>
        <p className={styles.status}>
          <span className={styles.dot} data-open={availability.open} aria-hidden="true" />
          {availability.label}
          {availability.detail && <InfoTip label="availability">{availability.detail}</InfoTip>}
        </p>
      </Reveal>

      <Reveal as="h1" index={1} className={styles.title}>
        {profile.name}
      </Reveal>

      <Reveal index={2} className={styles.tagline}>
        <p>{profile.tagline}</p>
      </Reveal>

      <Reveal index={3} className={styles.actions}>
        <Button href={profile.resumeUrl} icon="download" download>
          Résumé
        </Button>
      </Reveal>

      <ScrollCue href="#work" label="Projects" />
    </section>
  )
}
