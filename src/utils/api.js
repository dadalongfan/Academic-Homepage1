import axios from 'axios'
import { ElMessage } from 'element-plus'
import { API_BASE_URL, config } from '../config'

// 获取完整的文件URL用于访问
const getFullFileUrl = (url) => {
  if (!url) return ''
  // 如果已经是完整URL则直接返回
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  // 否则拼接完整URL
  return `${API_BASE_URL}${url}`
}

// 创建axios实例
const request = axios.create({
  baseURL: API_BASE_URL,
  timeout: config.TIMEOUT
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data

    // 如果返回的状态码不是200，说明接口有问题
    if (res.code !== 200) {
      ElMessage.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message || '请求失败'))
    }

    return res
  },
  error => {
    console.error('响应错误:', error)

    // 处理网络错误
    if (error.message.includes('timeout')) {
      ElMessage.error('请求超时，请重试')
    } else if (error.message.includes('Network Error')) {
      ElMessage.error('网络错误，请检查后端服务是否启动')
    } else {
      ElMessage.error(error.message || '请求失败')
    }

    return Promise.reject(error)
  }
)

export { getFullFileUrl, API_BASE_URL }
export default request
