import { createI18n } from 'vue-i18n'
import { getTranslationWithBatch as getTranslation, translateHTML, clearTranslationCache, translationPreloader } from './translationService'

// 初始语言包
const messages = {
  zh: {
    // 基本词汇
    'home': '首页',
    'news': '新闻动态',
    'members': '团队成员',
    'publications': '学术成果',
    'projects': '科研项目',
    'gallery': '团队风采',
    'recruitment': '招贤纳士',
    'about': '关于我们',
    'contact': '联系方式',
    // 个人/团队相关
    '团队简介': '团队简介',
    '个人简介': '个人简介',
    '教育经历': '教育经历',
    '工作经历': '工作经历',
    '至今': '至今',
    // 联系方式
    '邮箱': '邮箱',
    '电话': '电话',
    '地址': '地址',
    '邮编': '邮编',
    '暂未设置': '暂未设置',
    // 介质过程强化团队
    '介质过程强化团队': '介质过程强化团队',
    '南京工业大学化工学院 · 材料化学工程国家重点实验室': '南京工业大学化工学院 · 材料化学工程国家重点实验室',
    '材料化学工程国家重点实验室': '材料化学工程国家重点实验室'
  },
  en: {
    // 可以留空，由腾讯翻译API动态生成
  }
}

// 从localStorage获取保存的语言设置
const getSavedLocale = () => {
  try {
    const savedLocale = localStorage.getItem('academic-language')
    return savedLocale || 'zh' // 默认中文
  } catch (error) {
    console.error('读取语言设置失败:', error)
    return 'zh'
  }
}

// 创建i18n实例，使用localStorage保存的语言设置
const i18n = createI18n({
  legacy: false, // 使用Composition API
  locale: getSavedLocale(), // 从localStorage读取语言设置
  fallbackLocale: 'zh', // 回退语言
  messages,
  missing: async (locale, key) => {
    console.log('=== i18n missing 调用 ===')
    console.log('参数:', { locale, key })
    
    if (locale === 'en') {
      // 如果英文翻译不存在，调用腾讯翻译API获取
      console.log('英文翻译不存在，调用API获取:', key)
      const translation = await getTranslation(key, 'zh', 'en')
      // 动态添加到英文语言包
      i18n.global.mergeLocaleMessage('en', { [key]: translation })
      console.log('静态文本翻译结果:', { key, translation })
      console.log('=== i18n missing 结束 ===')
      return translation
    }
    
    console.log('非英文语言，直接返回key:', key)
    console.log('=== i18n missing 结束 ===')
    return key
  }
})

// 保存语言设置到localStorage
const saveLocaleToStorage = (locale) => {
  try {
    localStorage.setItem('academic-language', locale)
    console.log('语言设置已保存到localStorage:', locale)
  } catch (error) {
    console.error('保存语言设置失败:', error)
  }
}

// 语言切换方法，添加预加载功能
i18n.global.switchLanguage = async (locale) => {
  console.log('切换语言:', locale)
  
  // 获取当前语言
  const currentLocale = i18n.global.locale.value
  
  // 如果语言没有变化，直接返回
  if (currentLocale === locale) {
    return
  }
  
  // 设置新语言
  i18n.global.locale.value = locale
  
  // 保存语言设置到localStorage，在页面间共享
  saveLocaleToStorage(locale)
  
  // 如果切换到英文，预加载常用翻译
  if (locale === 'en') {
    console.log('切换到英文，开始预加载常用翻译...')
    try {
      await translationPreloader.preloadAll('zh', 'en')
      console.log('预加载完成')
    } catch (error) {
      console.error('预加载翻译失败:', error)
    }
  }
}

// 将翻译服务方法添加到i18n实例中，方便组件使用
i18n.global.translateHTML = translateHTML
i18n.global.clearTranslationCache = clearTranslationCache
i18n.global.translationPreloader = translationPreloader

export default i18n