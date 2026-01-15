import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        news: resolve(__dirname, 'news.html'),
        members: resolve(__dirname, 'members.html'),
        publications: resolve(__dirname, 'publications.html'),
        partners: resolve(__dirname, 'partners.html'),
        projects: resolve(__dirname, 'projects.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        recruitment: resolve(__dirname, 'recruitment.html')
      }
    }
  }
})
