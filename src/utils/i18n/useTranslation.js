import { ref, reactive, watch, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getBatchTranslation, translateHTML } from './translationService'

/**
 * 通用翻译组合式函数
 * @param {*} initialData 初始数据
 * @param {Object} config 翻译配置
 * @param {string[]} config.textFields 需要翻译的文本字段
 * @param {string[]} config.htmlFields 需要翻译的HTML字段
 * @param {string[]} config.arrayFields 需要翻译的数组字段
 * @param {boolean} config.recursive 是否递归翻译
 * @returns {Object} 翻译相关的响应式数据和方法
 */
export function useTranslation(initialData, config = {}) {
  const { locale } = useI18n()
  const currentLocale = ref(locale.value)
  const isTranslating = ref(false)
  
  // 默认配置
  const defaultConfig = {
    textFields: [],
    htmlFields: [],
    arrayFields: [],
    recursive: true,
    ...config
  }
  
  // 原始数据和显示数据
  const originalData = ref(initialData)
  const displayData = ref(JSON.parse(JSON.stringify(initialData)))
  
  // 翻译单个对象
  const translateObject = async (obj, source, target) => {
    if (!obj || typeof obj !== 'object') {
      return obj
    }
    
    const translatedObj = { ...obj }
    
    // 翻译文本字段
    for (const field of defaultConfig.textFields) {
      if (translatedObj[field] !== undefined) {
        translatedObj[field] = await getBatchTranslation([translatedObj[field]], source, target)
        translatedObj[field] = translatedObj[field][0]
      }
    }
    
    // 翻译HTML字段
    for (const field of defaultConfig.htmlFields) {
      if (translatedObj[field] !== undefined) {
        translatedObj[field] = await translateHTML(translatedObj[field], source, target)
      }
    }
    
    // 翻译数组字段
    for (const field of defaultConfig.arrayFields) {
      if (Array.isArray(translatedObj[field])) {
        translatedObj[field] = await Promise.all(
          translatedObj[field].map(item => translateObject(item, source, target))
        )
      }
    }
    
    // 递归翻译嵌套对象
    if (defaultConfig.recursive) {
      for (const key in translatedObj) {
        if (typeof translatedObj[key] === 'object' && translatedObj[key] !== null && 
            !Array.isArray(translatedObj[key]) &&
            !defaultConfig.textFields.includes(key) &&
            !defaultConfig.htmlFields.includes(key) &&
            !defaultConfig.arrayFields.includes(key)) {
          translatedObj[key] = await translateObject(translatedObj[key], source, target)
        }
      }
    }
    
    return translatedObj
  }
  
  // 翻译数组
  const translateArray = async (array, source, target) => {
    if (!Array.isArray(array)) {
      return array
    }
    return Promise.all(
      array.map(item => translateObject(item, source, target))
    )
  }
  
  // 翻译数据
  const translateData = async (data, source, target) => {
    isTranslating.value = true
    try {
      if (Array.isArray(data)) {
        return await translateArray(data, source, target)
      } else {
        return await translateObject(data, source, target)
      }
    } finally {
      isTranslating.value = false
    }
  }
  
  // 处理数据翻译
  const handleTranslation = async () => {
    if (currentLocale.value === 'zh') {
      // 中文直接使用原始数据
      displayData.value = JSON.parse(JSON.stringify(originalData.value))
      return
    }
    
    // 英文翻译
    const translated = await translateData(originalData.value, 'zh', currentLocale.value)
    displayData.value = translated
  }
  
  // 更新原始数据
  const updateOriginalData = (newData) => {
    originalData.value = newData
    handleTranslation()
  }
  
  // 监听语言变化
  watch(() => locale.value, async (newLocale) => {
    currentLocale.value = newLocale
    await handleTranslation()
  })
  
  // 组件挂载时翻译数据
  onMounted(() => {
    handleTranslation()
  })
  
  return {
    originalData,
    displayData,
    isTranslating,
    translateData: handleTranslation,
    updateOriginalData
  }
}
