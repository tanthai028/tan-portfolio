import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Absolute site URL for link-preview tags, which must not be relative.
 * Set SITE_URL to override; on Vercel it falls back to the production domain.
 */
const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:5173')

function siteUrlPlugin(): Plugin {
  return {
    name: 'site-url',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteUrlPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
