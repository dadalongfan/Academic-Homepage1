import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载当前模式的环境变量
  const env = loadEnv(mode, process.cwd(), '')
  const API_BASE_URL = env.VITE_API_BASE_URL

  if (!API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL 环境变量未设置，请在 .env 文件中配置')
  }

  return {
    base: './',
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
          target: API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path
        }
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          news: resolve(__dirname, 'news.html'),
          'news-detail': resolve(__dirname, 'news-detail.html'),
          members: resolve(__dirname, 'members.html'),
          publications: resolve(__dirname, 'publications.html'),
          projects: resolve(__dirname, 'projects.html'),
          gallery: resolve(__dirname, 'gallery.html'),
          recruitment: resolve(__dirname, 'recruitment.html')
        }
      }
    },
    // 定义全局常量替换
    define: {
      '__API_BASE_URL__': JSON.stringify(API_BASE_URL)
    }
  }
})
