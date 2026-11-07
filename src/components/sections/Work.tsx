import { useCallback, useEffect, useState } from 'react'
import { projects } from '@/data/projects'
import { Section } from '@/components/layout/Section'
import { InfoTip } from '@/components/ui/InfoTip'
import { Reveal } from '@/components/ui/Reveal'
import { ProjectCard } from '@/components/work/ProjectCard'
import { ProjectDialog } from '@/components/work/ProjectDialog'
import styles from './Work.module.css'

const HASH_PREFIX = '#project-'

/**
 * The first card is wide. The rest sit two to a row, so with an odd number left over
 * the last card would be alone: make it wide too.
 */
function isWide(index: number, count: number) {
  const last = index === count - 1
  return index === 0 || (last && (count - 1) % 2 === 1)
}

/** Projects are deep-linkable: `/#project-<slug>` opens that project's dialog. */
export function Work() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  useEffect(() => {
    const syncFromHash = () => {
      const { hash } = window.location
      setOpenSlug(hash.startsWith(HASH_PREFIX) ? hash.slice(HASH_PREFIX.length) : null)
    }
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  const open = useCallback((slug: string) => {
    history.replaceState(null, '', `${HASH_PREFIX}${slug}`)
    setOpenSlug(slug)
  }, [])

  const close = useCallback(() => {
    history.replaceState(null, '', window.location.pathname)
    setOpenSlug(null)
  }, [])

  const selected = projects.find((p) => p.slug === openSlug) ?? null

  return (
    <Section
      id="work"
      title="Projects"
      aside={<InfoTip label="projects">Open a project for screenshots and details.</InfoTip>}
    >
      <ul className={styles.grid}>
        {projects.map((project, i) => {
          const wide = isWide(i, projects.length)
          return (
            <Reveal as="li" key={project.slug} index={wide ? 0 : (i - 1) % 2} className={wide ? styles.featured : ''}>
              <ProjectCard project={project} featured={wide} onOpen={open} />
            </Reveal>
          )
        })}
      </ul>

      <ProjectDialog project={selected} onClose={close} />
    </Section>
  )
}
