import { Analytics } from '@vercel/analytics/react'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Hero } from '@/components/sections/Hero'
import { Work } from '@/components/sections/Work'
import { useAnchorGlide } from '@/hooks/useAnchorGlide'
import styles from './App.module.css'

export function App() {
  useAnchorGlide()

  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to content
      </a>
      <Header />
      <main id="main" className={styles.container}>
        <span id="top" />
        <Hero />
        <Work />
        <About />
        {/* At least a screen tall, so a nav jump to Contact puts it at the top like the other sections. */}
        <div className={styles.end}>
          <Contact />
          <Footer />
        </div>
      </main>
      {/* Visitor counts in the Vercel dashboard. Cookie-free; a no-op outside Vercel. */}
      <Analytics />
    </>
  )
}
