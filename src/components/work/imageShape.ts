import type { ProjectImage } from '@/types/content'

export type ImageShape = 'wide' | 'square' | 'tall'

/** Covers are laid out by shape: desktop shots, popups, and phone screens each get their own width. */
export function imageShape({ width, height }: ProjectImage): ImageShape {
  const ratio = height / width
  if (ratio > 1.3) return 'tall'
  if (ratio > 0.85) return 'square'
  return 'wide'
}
