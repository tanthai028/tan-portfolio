import { useRef, useState, type CSSProperties, type ReactNode } from 'react'
import type { Project, ProjectImage } from '@/types/content'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { Icon } from '@/components/ui/Icon'
import { TagList } from '@/components/ui/Tag'
import { StatusBadge } from './StatusBadge'
import styles from './ProjectDialog.module.css'

interface ProjectDialogProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDialog({ project: current, onClose }: ProjectDialogProps) {
  // Keep showing the last project while the dialog animates closed.
  const [project, setProject] = useState(current)
  if (current && current !== project) setProject(current)

  return (
    <Dialog
      open={current !== null}
      onClose={onClose}
      title={project?.title ?? ''}
      eyebrow={project ? `${project.kind} · ${project.year} · ${project.role}` : undefined}
      footer={
        project && project.links.length > 0
          ? project.links.map((link, i) => (
              <Button key={link.href} href={link.href} variant={i === 0 ? 'primary' : 'ghost'} icon="arrowUpRight">
                {link.label}
              </Button>
            ))
          : undefined
      }
    >
      {project && (
        <div className={styles.content} style={{ '--swatch': project.swatch } as CSSProperties}>
          {project.images.length > 0 && <Gallery images={project.images} />}
          {project.status && <StatusBadge status={project.status} className={styles.status} />}

          <DetailBlock title="The problem">
            <p className={styles.lead}>{project.problem}</p>
          </DetailBlock>
          <DetailList title="What I did" items={project.approach} />
          <DetailList title="Outcome" items={project.outcome} />
          <DetailBlock title="Stack">
            <TagList items={project.stack} label="Tech stack" />
          </DetailBlock>
        </div>
      )}
    </Dialog>
  )
}

/** Swipeable strip of screenshots; the next one peeks in, and arrows step through them. */
function Gallery({ images }: { images: ProjectImage[] }) {
  const stripRef = useRef<HTMLDivElement>(null)
  const multiple = images.length > 1

  const step = (direction: 1 | -1) => {
    const strip = stripRef.current
    if (strip) strip.scrollBy({ left: direction * strip.clientWidth * 0.88, behavior: 'smooth' })
  }

  return (
    <div className={styles.galleryWrap}>
      <div
        ref={stripRef}
        className={styles.gallery}
        data-single={!multiple}
        tabIndex={multiple ? 0 : undefined}
        aria-label={multiple ? `Screenshots, ${images.length} total` : undefined}
      >
        {images.map((image) => (
          <figure key={image.src} className={styles.shot}>
            <img src={image.src} alt={image.alt} width={image.width} height={image.height} decoding="async" />
          </figure>
        ))}
      </div>
      {multiple && (
        <div className={styles.galleryNav}>
          <button type="button" className={styles.navButton} onClick={() => step(-1)} aria-label="Previous screenshot">
            <Icon name="arrowRight" size={16} className={styles.flip} />
          </button>
          <button type="button" className={styles.navButton} onClick={() => step(1)} aria-label="Next screenshot">
            <Icon name="arrowRight" size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

function DetailBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className={styles.blockTitle}>{title}</h3>
      {children}
    </section>
  )
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <DetailBlock title={title}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </DetailBlock>
  )
}
