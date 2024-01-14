// 引入app组件
import App from './App.vue'
// 引入状态管理pinia
import pinia from './stores'
// 引入Vue-Ruoter
import router from './router'
// 引入初始化全局样式
import './assets/css/reset.css'
// 引入scss全局变量
import './scss/var.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
