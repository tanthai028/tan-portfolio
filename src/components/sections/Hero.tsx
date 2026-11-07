import { profile } from '@/data/profile'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { InfoTip } from '@/components/ui/InfoTip'
import { Reveal } from '@/components/ui/Reveal'
import styles from './Hero.module.css'

export function Hero() {
  const { availability } = profile

  return (
    <section className={styles.hero} aria-label="Introduction">
      <Reveal index={0} className={styles.status}>
        <span className={styles.dot} data-open={availability.open} aria-hidden="true" />
        {availability.label}
        {availability.detail && <InfoTip label="availability">{availability.detail}</InfoTip>}
      </Reveal>

      <Reveal as="h1" index={1} className={styles.title}>
        Hi, I’m {profile.name}.
        <span className={styles.role}>{profile.role}.</span>
      </Reveal>

      <Reveal index={2} className={styles.tagline}>
        <p>
          {profile.tagline}
          {profile.taglineDetail && <InfoTip label="my focus">{profile.taglineDetail}</InfoTip>}
        </p>
      </Reveal>

      <Reveal index={3} className={styles.actions}>
        <Button href="#work" icon="arrowDown">
          View work
        </Button>
        <Button href={profile.resumeUrl} variant="ghost" icon="download" download>
          Résumé
        </Button>
      </Reveal>

      <a href="#work" className={styles.scrollCue} aria-label="Scroll to work">
        <Icon name="arrowDown" size={16} />
      </a>
    </section>
  )
}
