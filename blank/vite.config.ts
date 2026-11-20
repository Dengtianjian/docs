import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { kitPlugin } from 'kit/vue/vite-plugin'

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [kitPlugin(), vue()],
  server: { strictPort: true },
})