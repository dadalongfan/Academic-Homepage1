import CryptoJS from 'crypto-js'
import { API_BASE_URL } from '../../config'

// 腾讯翻译API配置 - 从环境变量读取
const tencentConfig = {
  SecretId: import.meta.env.VITE_TENCENT_SECRET_ID || '',
  SecretKey: import.meta.env.VITE_TENCENT_SECRET_KEY || '',
  Endpoint: 'tmt.tencentcloudapi.com',
  Region: 'ap-guangzhou',
  Version: '2018-03-21'
}

// 翻译缓存 - 使用localStorage持久化
const CACHE_STORAGE_KEY = 'academic-translation-cache'
const MAX_CACHE_SIZE = 1000 // 最大缓存条目数
const CACHE_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000 // 缓存有效期：7天

// 初始化缓存，从localStorage加载并清除无效条目
const loadCacheFromStorage = () => {
  try {
    const stored = localStorage.getItem(CACHE_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      const now = Date.now()
      // 清除过期条目
      Object.keys(parsed).forEach(key => {
        if (parsed[key].timestamp && (now - parsed[key].timestamp > CACHE_EXPIRY_TIME)) {
          delete parsed[key]
        }
      })
      return parsed
    }
  } catch (e) {
    console.warn('加载翻译缓存失败:', e)
  }
  return {}
}

// 保存缓存到localStorage
const saveCacheToStorage = (cache) => {
  try {
    // 如果缓存太大，清除最旧的条目
    const keys = Object.keys(cache)
    if (keys.length > MAX_CACHE_SIZE) {
      const sortedKeys = keys.sort((a, b) => (cache[a].timestamp || 0) - (cache[b].timestamp || 0))
      const keysToRemove = sortedKeys.slice(0, keys.length - MAX_CACHE_SIZE)
      keysToRemove.forEach(key => delete cache[key])
    }
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(cache))
  } catch (e) {
    console.warn('保存翻译缓存失败:', e)
  }
}

// 翻译缓存
const translationCache = loadCacheFromStorage()

// 性能监控
const performanceMonitor = {
  requestCount: 0,
  cacheHitCount: 0,
  totalRequestTime: 0,
  batchRequestCount: 0,
  batchSavedCount: 0,

  recordRequest() {
    this.requestCount++
  },

  recordCacheHit() {
    this.cacheHitCount++
  },

  recordBatchRequest(count) {
    this.batchRequestCount++
    this.batchSavedCount += count - 1 // 批量请求节省的请求数
  },

  startRequest() {
    return performance.now()
  },

  endRequest(startTime) {
    const duration = performance.now() - startTime
    this.totalRequestTime += duration
  },

  getStats() {
    const total = this.requestCount + this.cacheHitCount
    return {
      totalRequests: total,
      cacheHitRate: total > 0 ? (this.cacheHitCount / total * 100).toFixed(2) + '%' : '0%',
      avgRequestTime: this.requestCount > 0 ? (this.totalRequestTime / this.requestCount).toFixed(2) + 'ms' : '0ms',
      batchEfficiency: this.batchRequestCount > 0 ? (this.batchSavedCount / (this.batchSavedCount + this.batchRequestCount) * 100).toFixed(2) + '%' : '0%'
    }
  }
}

// 重试机制
const MAX_RETRIES = 3
const INITIAL_RETRY_DELAY = 1000 // 初始重试延迟1秒

/**
 * 带重试机制的异步操作
 * @param {Function} operation - 要执行的操作
 * @param {string} operationName - 操作名称（用于日志）
 * @param {number} retries - 剩余重试次数
 * @param {number} delay - 当前重试延迟
 */
const retryOperation = async (operation, operationName, retries = MAX_RETRIES, delay = INITIAL_RETRY_DELAY) => {
  try {
    return await operation()
  } catch (error) {
    if (retries <= 1) {
      console.error(`${operationName} 失败，已重试${MAX_RETRIES}次:`, error)
      throw error
    }
    console.warn(`${operationName} 失败，${delay}ms后重试，剩余${retries - 1}次:`, error.message)
    await new Promise(resolve => setTimeout(resolve, delay))
    // 指数退避，下次重试间隔翻倍
    return retryOperation(operation, operationName, retries - 1, delay * 2)
  }
}

// 批量获取翻译
export async function getBatchTranslation(texts, source, target) {
  console.log('=== getBatchTranslation 调用 ===')
  console.log('参数:', { texts, source, target })
  
  // 如果源语言和目标语言相同，直接返回原文
  if (source === target) {
    console.log('源语言和目标语言相同，直接返回原文')
    return [...texts]
  }
  
  // 记录批量请求，计算请求减少率
  performanceMonitor.recordBatchRequest(texts.length)
  
  // 检查哪些文本需要翻译（未命中缓存的）
  const textsToTranslate = []
  const results = new Array(texts.length)
  
  // 先检查缓存
  for (let i = 0; i < texts.length; i++) {
    const text = texts[i]
    const cacheKey = `${source}-${target}-${text}`
    if (translationCache.has(cacheKey)) {
      results[i] = translationCache.get(cacheKey)
      performanceMonitor.recordCacheHit()
      console.log('批量翻译缓存命中:', { text, result: results[i] })
    } else {
      textsToTranslate.push({ index: i, text })
    }
  }
  
  // 如果所有文本都在缓存中，直接返回结果
  if (textsToTranslate.length === 0) {
    console.log('批量翻译全部命中缓存')
    return results
  }
  
  console.log('批量翻译需要请求API的文本数量:', textsToTranslate.length)
  
  // 记录请求开始时间
  const startTime = performanceMonitor.startRequest()
  
  try {
    // 调用本地后端批量翻译API，应用频率限制和重试机制
    const response = await rateLimit(() => retryOperation(async () => {
      return fetch(`${API_BASE_URL}/translate/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          texts: textsToTranslate.map(item => item.text),
          source,
          target
        })
      })
    }, '批量翻译API请求'))
    console.log('本地代理批量翻译API请求状态:', response.status, response.statusText)
    
    const data = await response.json()
    console.log('本地代理批量翻译API响应:', data)
    
    // 记录请求结束时间
    performanceMonitor.endRequest(startTime)
    
    if (data.code === 200 && data.data) {
      const translatedTexts = data.data
      // 更新结果和缓存
      for (let i = 0; i < textsToTranslate.length; i++) {
        const { index, text } = textsToTranslate[i]
        const translatedText = translatedTexts[i] || text
        results[index] = translatedText
        
        // 只有当翻译结果与原文不同时，才存入缓存
        if (translatedText !== text) {
          const cacheKey = `${source}-${target}-${text}`
          translationCache.set(cacheKey, translatedText)
          console.log('批量翻译成功，缓存已更新:', { text, translatedText })
        } else {
          console.log('批量翻译成功，但结果与原文相同，不存入缓存:', text)
        }
      }
      console.log('批量翻译成功')
    } else {
      console.error('批量翻译失败:', data.message || '未知错误')
      // 抛出错误，让重试机制处理
      throw new Error(data.message || '批量翻译失败')
    }
  } catch (error) {
    console.error('批量翻译请求失败:', error)
    // 对于失败的文本，使用原文
    for (const { index, text } of textsToTranslate) {
      results[index] = text
    }
  }
  
  // 保存缓存到localStorage
  saveCacheToStorage(translationCache)
  
  return results
}

// 频率限制器 - 令牌桶算法
class RateLimiter {
  constructor(maxRequests = 5, interval = 1000) {
    this.maxRequests = maxRequests
    this.interval = interval
    this.tokens = maxRequests
    this.lastRefill = Date.now()
    this.queue = []
    this.processing = false
  }

  refill() {
    const now = Date.now()
    const timePassed = now - this.lastRefill
    const tokensToAdd = Math.floor((timePassed / this.interval) * this.maxRequests)
    
    if (tokensToAdd > 0) {
      this.tokens = Math.min(this.maxRequests, this.tokens + tokensToAdd)
      this.lastRefill = now
    }
  }

  async acquire() {
    this.refill()
    
    if (this.tokens > 0) {
      this.tokens--
      return true
    }
    
    // 等待下一个令牌
    const waitTime = this.interval / this.maxRequests
    await new Promise(resolve => setTimeout(resolve, waitTime))
    return this.acquire()
  }

  async execute(fn) {
    await this.acquire()
    return fn()
  }
}

// 创建频率限制器实例 - 5次/秒
const rateLimiter = new RateLimiter(5, 1000)

// 带频率限制的请求包装器
const rateLimit = async (fn) => {
  return rateLimiter.execute(fn)
}

// 批量请求队列
let batchRequestQueue = []
let isBatchRequesting = false
const BATCH_REQUEST_DELAY = 50 // 50ms内收集请求

// 处理批量请求队列
async function processBatchRequests() {
  if (batchRequestQueue.length === 0) {
    isBatchRequesting = false
    return
  }
  
  // 取出队列中的所有请求
  const requests = [...batchRequestQueue]
  batchRequestQueue = []
  
  // 按目标语言分组
  const groups = {}
  requests.forEach(req => {
    const key = `${req.source}-${req.target}`
    if (!groups[key]) {
      groups[key] = {
        source: req.source,
        target: req.target,
        items: []
      }
    }
    groups[key].items.push(req)
  })
  
  // 并行处理不同语言对的批量请求
  await Promise.all(Object.values(groups).map(async group => {
    try {
      const texts = group.items.map(item => item.text)
      const results = await getBatchTranslation(texts, group.source, group.target)
      
      // 分发结果
      group.items.forEach((item, index) => {
        item.resolve(results[index])
      })
    } catch (error) {
      // 批量请求失败，使用原文
      group.items.forEach(item => {
        item.resolve(item.text)
      })
    }
  }))
  
  isBatchRequesting = false
}

// 带批量处理的翻译函数
export async function getTranslationWithBatch(text, source, target) {
  return new Promise((resolve) => {
    // 将请求添加到队列
    batchRequestQueue.push({
      text,
      source,
      target,
      resolve
    })
    
    // 如果当前没有批量请求正在处理，启动一个
    if (!isBatchRequesting) {
      isBatchRequesting = true
      setTimeout(processBatchRequests, BATCH_REQUEST_DELAY)
    }
  })
}

// 清空翻译缓存
export const clearTranslationCache = () => {
  translationCache.clear()
  try {
    localStorage.removeItem(CACHE_STORAGE_KEY)
  } catch (e) {
    console.warn('清空翻译缓存失败:', e)
  }
  console.log('翻译缓存已清空')
}

// 获取性能统计
export const getTranslationStats = () => {
  return performanceMonitor.getStats()
}

// 翻译HTML内容（保留标签）
export const translateHTML = async (html, source, target) => {
  if (!html || source === target) return html
  
  // 提取文本节点进行翻译
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  
  const textNodes = []
  const walker = document.createTreeWalker(
    doc.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  )
  
  let node
  while (node = walker.nextNode()) {
    if (node.textContent.trim()) {
      textNodes.push(node)
    }
  }
  
  // 批量翻译文本节点
  const texts = textNodes.map(node => node.textContent)
  const translatedTexts = await getBatchTranslation(texts, source, target)
  
  // 更新文本节点
  textNodes.forEach((node, index) => {
    node.textContent = translatedTexts[index]
  })
  
  return doc.body.innerHTML
}

// 预加载翻译缓存
export const translationPreloader = {
  // 预加载常用文本的翻译
  async preloadCommonTranslations(source, target) {
    const commonTexts = [
      '首页',
      '新闻动态',
      '团队成员',
      '研究',
      '应用开发',
      '相册',
      '文化',
      '招贤纳士',
      '关于我们',
      '联系方式'
    ]
    
    try {
      await getBatchTranslation(commonTexts, source, target)
      console.log('常用翻译预加载完成')
    } catch (error) {
      console.warn('常用翻译预加载失败:', error)
    }
  }
}
