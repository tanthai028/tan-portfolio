import { Analytics } from '@vercel/analytics/react'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Hero } from '@/components/sections/Hero'
import { Work } from '@/components/sections/Work'
import styles from './App.module.css'

export function App() {
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
        <Contact />
        <Footer />
      </main>
      {/* Visitor counts in the Vercel dashboard. Cookie-free; a no-op outside Vercel. */}
      <Analytics />
    </>
  )
}
