import { useState } from 'react'
import type { Project } from '@/types/content'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { TagList } from '@/components/ui/Tag'
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
      eyebrow={project ? `${project.year} · ${project.role}` : undefined}
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
        <div className={styles.content}>
          <p className={styles.lead}>{project.problem}</p>

          <DetailBlock title="What I did" items={project.approach} />
          <DetailBlock title="Outcome" items={project.outcome} />

          <div>
            <h3 className={styles.blockTitle}>Stack</h3>
            <TagList items={project.stack} label="Tech stack" />
          </div>
        </div>
      )}
    </Dialog>
  )
}

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <div>
      <h3 className={styles.blockTitle}>{title}</h3>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
