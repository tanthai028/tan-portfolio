import type { ProjectImage } from '@/types/content'

/** Phone and popup screenshots are laid out differently from wide desktop ones. */
export function isTall(image: ProjectImage) {
  return image.height > image.width * 0.9
}
