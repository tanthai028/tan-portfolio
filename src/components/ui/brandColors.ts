import type { BrandName } from './BrandIcon'

/** Each brand's own color. GE uses a theme token: GE Aerospace navy, or white in dark mode. */
export const brandColors: Record<BrandName, string> = {
  github: '#181717',
  linkedin: '#0A66C2',
  devpost: '#003E54',
  ge: 'var(--brand-ge)',
  chase: '#117ACA',
}
