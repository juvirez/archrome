import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import manifest from './manifest.json'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                app: './src/options/index.html',
            },
        },
    },
    plugins: [
        vue(),
        crx({ manifest }),
    ],
  })