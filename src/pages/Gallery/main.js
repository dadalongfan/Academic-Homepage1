import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '/src/assets/styles/variables.css'
import '/src/assets/styles/common.css'
import App from './App.vue'
import i18n from '/src/i18n/index'

const app = createApp(App)
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
