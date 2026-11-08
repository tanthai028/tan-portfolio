import { profile } from '@/data/profile'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { Toast } from '@/components/ui/Toast'
import styles from './Contact.module.css'

export function Contact() {
  const { copied, copy } = useCopyToClipboard()

  return (
    <Section id="contact" title="Contact">
      <Reveal className={styles.card}>
        <p className={styles.prompt}>
          <a href="mailto:tanthai028@gmail.com">tanthai028@gmail.com</a>
        </p>

        <div className={styles.emailRow}>
          <a href={`mailto:${profile.email}`} className={styles.email}>
            {profile.email}
          </a>
          <button
            type="button"
            className={styles.copy}
            onClick={() => copy(profile.email)}
            aria-label="Copy email address"
            title="Copy email"
          >
            <Icon name={copied ? 'check' : 'copy'} />
          </button>
        </div>

        <div className={styles.links}>
          {profile.socials.map((link) => (
            <Button key={link.href} href={link.href} variant="ghost" icon="arrowUpRight">
              {link.label}
            </Button>
          ))}
          <Button href={profile.resumeUrl} variant="ghost" icon="download" download>
            Résumé
          </Button>
        </div>
      </Reveal>

      <Toast message={copied ? 'Email copied' : null} />
    </Section>
  )
}
