import { useRef, useState, type CSSProperties, type ReactNode } from 'react'
import type { Project, ProjectImage } from '@/types/content'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { Icon } from '@/components/ui/Icon'
import { Lightbox } from '@/components/ui/Lightbox'
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
      eyebrow={project ? `${project.kind}, ${project.year}` : undefined}
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
          {project.tryLocally && (
            <DetailBlock title="Try it locally">
              <ol className={styles.steps}>
                {project.tryLocally.map((step) => (
                  <li key={step}>
                    <WithCode text={step} />
                  </li>
                ))}
              </ol>
            </DetailBlock>
          )}
          <DetailBlock title="Stack">
            <TagList items={project.stack} label="Tech stack" />
          </DetailBlock>
        </div>
      )}
    </Dialog>
  )
}

/**
 * Swipeable strip of screenshots; the next one peeks in, and arrows step through them.
 * Selecting a screenshot opens it full size in a lightbox.
 */
function Gallery({ images }: { images: ProjectImage[] }) {
  const stripRef = useRef<HTMLDivElement>(null)
  const [viewing, setViewing] = useState<number | null>(null)
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
        aria-label={multiple ? `Screenshots, ${images.length} total` : undefined}
      >
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            className={styles.shot}
            onClick={() => setViewing(i)}
            aria-label={`View full size: ${image.alt}`}
          >
            <img src={image.src} alt="" width={image.width} height={image.height} decoding="async" />
            <span className={styles.expand} aria-hidden="true">
              <Icon name="expand" size={14} />
            </span>
          </button>
        ))}
      </div>
      {multiple && (
        <div className={styles.galleryNav}>
          <button type="button" className={styles.navButton} onClick={() => step(-1)} aria-label="Previous screenshot">
            <Icon name="arrowLeft" size={16} />
          </button>
          <button type="button" className={styles.navButton} onClick={() => step(1)} aria-label="Next screenshot">
            <Icon name="arrowRight" size={16} />
          </button>
        </div>
      )}
      <Lightbox images={images} index={viewing} onIndexChange={setViewing} onClose={() => setViewing(null)} />
    </div>
  )
}

/** Renders `backticked` spans as inline code. */
function WithCode({ text }: { text: string }) {
  return text.split(/(`[^`]+`)/).map((part, i) =>
    part.startsWith('`') ? <code key={i}>{part.slice(1, -1)}</code> : part,
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
