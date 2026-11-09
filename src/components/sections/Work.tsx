import { useCallback, useEffect, useState } from 'react'
import { projects } from '@/data/projects'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ProjectCard } from '@/components/work/ProjectCard'
import { ProjectDialog } from '@/components/work/ProjectDialog'
import styles from './Work.module.css'

const HASH_PREFIX = '#project-'

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
    >
      <ul className={styles.list}>
        {projects.map((project, i) => (
          <Reveal as="li" key={project.slug}>
            <ProjectCard project={project} eager={i < 2} onOpen={open} />
          </Reveal>
        ))}
      </ul>

      <ProjectDialog project={selected} onClose={close} />
    </Section>
  )
}
