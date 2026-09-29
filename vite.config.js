import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // listen on all interfaces so the dev server is reachable via LAN IP
  server: { host: true },
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
})
