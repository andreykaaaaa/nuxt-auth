import { sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import pathe from 'pathe';

const currentPath = pathe.resolve(pathe.dirname(fileURLToPath(import.meta.url)));
const joinDir = (path: string) => pathe.join(currentPath, path).replaceAll(sep, '/');

export default defineNuxtConfig({
  ssr: false,
  css: [
    joinDir('./app/styles/main.scss'),
    joinDir('./app/styles/colors.scss'),
    joinDir('./app/styles/transitions.scss'),
    joinDir('./app/styles/animations.scss'),
    joinDir('./app/styles/modify.scss'),
    joinDir('./app/fonts/index.css')
  ],
  plugins: [
    joinDir('./plugins/transitionExpand.ts'),
    joinDir('./plugins/telegram.ts')
  ],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern'
        }
      }
    }
  },
  devServer: {
    port: 80
  }
});
