import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

// 从localStorage获取语言设置，默认为中文
const lang = localStorage.getItem('language') || 'zh'

const i18n = createI18n({
  legacy: false, // 使用Composition API必须设置为false
  locale: lang,
  messages: {
    zh,
    en
  }
})

export default i18n