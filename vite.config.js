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
  server: {
    proxy: {
      // 将/uploads/请求转发到后端
      '/uploads': {
        target: 'http://localhost:8082/api',
        changeOrigin: true,
        rewrite: (path) => path
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        news: resolve(__dirname, 'news.html'),
        members: resolve(__dirname, 'members.html'),
        publications: resolve(__dirname, 'publications.html'),
        projects: resolve(__dirname, 'projects.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        recruitment: resolve(__dirname, 'recruitment.html')
      }
    }
  }
})
