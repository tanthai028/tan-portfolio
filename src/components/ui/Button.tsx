import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon, type IconName } from './Icon'
import styles from './Button.module.css'

type Variant = 'primary' | 'ghost'

interface BaseProps {
  variant?: Variant
  icon?: IconName
  /** Shown before the label, e.g. a brand mark. */
  leading?: ReactNode
  children: ReactNode
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/** Renders an <a> when given `href`, otherwise a <button>. External links open in a new tab. */
export function Button(props: ButtonProps | LinkProps) {
  const { variant = 'primary', icon, leading, children, className = '', ...rest } = props
  const classes = `${styles.button} ${styles[variant]} ${className}`
  const content = (
    <>
      {leading}
      <span>{children}</span>
      {icon && <Icon name={icon} size={16} className={styles.icon} />}
    </>
  )

  if ('href' in rest && rest.href) {
    const external = /^https?:\/\//.test(rest.href)
    return (
      <a
        className={classes}
        {...(external && { target: '_blank', rel: 'noreferrer' })}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}
