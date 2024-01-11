import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

const autoImportPath = resolve(__dirname, 'src')

export default defineConfig({
  // splitVendorChunkPlugin构建分包策略
  plugins: [
    vue(),
    splitVendorChunkPlugin(),
    AutoImport({
      // 自动导入 Vue Vue-Router 相关函数，如：ref, reactive, toRef 等
      imports: ['vue', 'vue-router'],
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [ElementPlusResolver()],
      // d.ts 声明文件生成位置 src/auto-imports.d.ts 默认根目录 但无效果
      dts: resolve(autoImportPath, 'auto-imports.d.ts')
    }),
    Components({
      // 自动导入 Element Plus 组件
      resolvers: [ElementPlusResolver()],
      // d.ts 声明文件生成位置 src/components.d.ts 默认根目录 但无效果
      dts: resolve(autoImportPath, 'components.d.ts')
    })
  ],
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
