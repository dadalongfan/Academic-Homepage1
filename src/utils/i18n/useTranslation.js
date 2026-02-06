import { ref, reactive, watch, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getBatchTranslation, translateHTML, clearInvalidCache } from './translationService'

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
      if (translatedObj[field] !== undefined && translatedObj[field] !== null && translatedObj[field] !== '') {
        // 直接翻译单个文本，而不是使用批量翻译，确保每个文本都能被正确翻译
        const text = translatedObj[field]
        const translatedText = await getBatchTranslation([text], source, target)
        translatedObj[field] = translatedText[0] || text
        console.log(`翻译字段 ${field}:`, { original: text, translated: translatedObj[field] })
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
    
    // 收集所有需要翻译的文本和HTML，一次性发送
    const allTexts = []
    const textMap = new Map() // 存储文本与位置的映射
    const allHTMLs = []
    const htmlMap = new Map() // 存储HTML与位置的映射
    
    // 遍历数组，收集所有需要翻译的文本和HTML
    array.forEach((item, itemIndex) => {
      if (typeof item === 'object' && item !== null) {
        // 收集文本字段
        defaultConfig.textFields.forEach(field => {
          if (item[field] !== undefined && item[field] !== null && item[field] !== '') {
            const text = item[field]
            const key = `${itemIndex}-${field}`
            allTexts.push(text)
            textMap.set(allTexts.length - 1, { itemIndex, field, text })
          }
        })
        
        // 收集HTML字段
        defaultConfig.htmlFields.forEach(field => {
          if (item[field] !== undefined && item[field] !== null && item[field] !== '') {
            const html = item[field]
            const key = `${itemIndex}-${field}`
            allHTMLs.push(html)
            htmlMap.set(allHTMLs.length - 1, { itemIndex, field, html })
          }
        })
      }
    })
    
    // 批量翻译所有文本
    let translatedTexts = []
    if (allTexts.length > 0) {
      translatedTexts = await getBatchTranslation(allTexts, source, target)
      console.log('批量翻译文本结果:', { allTexts, translatedTexts })
    }
    
    // 批量翻译所有HTML
    let translatedHTMLs = []
    if (allHTMLs.length > 0) {
      // 收集HTML中的纯文本内容进行批量翻译
      const htmlTexts = allHTMLs.map(html => {
        const textContent = html.replace(/<[^>]+>/g, '').trim()
        return textContent
      })
      
      if (htmlTexts.some(text => text.length > 0)) {
        translatedHTMLs = await getBatchTranslation(htmlTexts, source, target)
        console.log('批量翻译HTML文本结果:', { htmlTexts, translatedHTMLs })
      }
    }
    
    // 将翻译结果映射回原始数组
    const translatedArray = JSON.parse(JSON.stringify(array))
    
    // 处理文本翻译结果
    textMap.forEach(({ itemIndex, field, text }, textIndex) => {
      const translatedText = translatedTexts[textIndex] || text
      translatedArray[itemIndex][field] = translatedText
      console.log(`数组项 ${itemIndex} 字段 ${field}:`, { original: text, translated: translatedText })
    })
    
    // 处理HTML翻译结果
    htmlMap.forEach(({ itemIndex, field, html }, htmlIndex) => {
      const translatedHTML = translatedHTMLs[htmlIndex]
      if (translatedHTML) {
        // 直接使用翻译后的完整HTML
        translatedArray[itemIndex][field] = translatedHTML
        console.log(`数组项 ${itemIndex} 字段 ${field} (HTML):`, { original: html.substring(0, 50) + '...', translated: translatedHTML.substring(0, 50) + '...' })
      }
    })
    
    // 处理数组字段和嵌套对象
    // 使用Promise.all处理所有异步操作
    const translatedResults = await Promise.all(
      translatedArray.map(async (item) => {
        const translatedItem = { ...item }
        
        // 处理数组字段
        for (const field of defaultConfig.arrayFields) {
          if (Array.isArray(translatedItem[field])) {
            translatedItem[field] = await translateArray(translatedItem[field], source, target)
          }
        }
        
        // 处理嵌套对象
        if (defaultConfig.recursive) {
          for (const key in translatedItem) {
            if (typeof translatedItem[key] === 'object' && translatedItem[key] !== null && 
                !Array.isArray(translatedItem[key]) &&
                !defaultConfig.textFields.includes(key) &&
                !defaultConfig.htmlFields.includes(key) &&
                !defaultConfig.arrayFields.includes(key)) {
              translatedItem[key] = await translateObject(translatedItem[key], source, target)
            }
          }
        }
        
        return translatedItem
      })
    )
    
    return translatedResults
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
      // 中文直接使用原始数据，不翻译
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
    // 清除翻译缓存，确保使用最新的数据
    if (currentLocale.value === 'zh') {
      // 中文模式下，清除可能存在的错误缓存
      clearInvalidCache()
    }
    return handleTranslation()
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
