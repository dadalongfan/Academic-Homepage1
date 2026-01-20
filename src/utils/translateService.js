import { useI18n } from 'vue-i18n'

// 翻译服务配置
const translateConfig = {
  // 是否启用自动翻译
  autoTranslate: true,
  // 翻译缓存，提高性能
  cache: new Map()
}

/**
 * 动态内容翻译服务
 * @param {string} content - 原始内容
 * @param {string} key - 内容唯一标识符
 * @returns {string} - 翻译后的内容
 */
export const translateDynamicContent = (content, key) => {
  const { locale, t } = useI18n()
  
  // 如果是中文，直接返回原始内容
  if (locale.value === 'zh') {
    return content
  }
  
  // 生成缓存键
  const cacheKey = `${locale.value}:${key}:${content}`
  
  // 检查缓存
  if (translateConfig.cache.has(cacheKey)) {
    return translateConfig.cache.get(cacheKey)
  }
  
  // 尝试从i18n配置中获取翻译
  let translatedContent
  try {
    translatedContent = t(`dynamic.${key}`, { default: content })
  } catch (error) {
    translatedContent = content
  }
  
  // 缓存翻译结果
  translateConfig.cache.set(cacheKey, translatedContent)
  
  return translatedContent
}

/**
 * 清空翻译缓存
 */
export const clearTranslationCache = () => {
  translateConfig.cache.clear()
}

/**
 * 更新翻译配置
 * @param {object} config - 新的配置
 */
export const updateTranslationConfig = (config) => {
  Object.assign(translateConfig, config)
}