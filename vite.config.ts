import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import postCssPresetEnv from 'postcss-preset-env'

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/base.scss";`
      }
    },
    postcss: {
      plugins: [autoprefixer({}), postCssPresetEnv({})]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
