import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import manifest from './manifest.json'
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                app: './src/options/index.html',
            },
        },
    },
    server: {
        port: 5173,
        strictPort: true,
        hmr: {
            port: 5173,
        },
    },
    plugins: [
        vue(),
        Components({
            resolvers: [ PrimeVueResolver() ],
        }),
        crx({ manifest }),
    ],
  })