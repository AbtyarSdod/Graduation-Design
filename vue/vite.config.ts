import { fileURLToPath, URL } from 'node:url'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // splitVendorChunkPlugin构建分包策略
  plugins: [vue(), splitVendorChunkPlugin()],
  server: {
    open: true, // 配置项目启动后，自动打开浏览器
    host: '0.0.0.0', // 配置Network 局域网访问
    proxy: {
      '/api': {
        target: 'http://127.0.0.1', // 目标服务器
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, '') // 重写url
      }
    }
  },
  build: {
    sourcemap: true // 构建后生成 source map 文件
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
