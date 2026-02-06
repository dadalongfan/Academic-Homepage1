// 全局配置文件
// 修改服务器地址只需修改 .env 文件中的 VITE_API_BASE_URL
// 或在运行构建命令时传入：VITE_API_BASE_URL=http://localhost:8801/api npm run build

// 使用 Vite 注入的全局常量
if (typeof __API_BASE_URL__ === 'undefined') {
  throw new Error('__API_BASE_URL__ 未定义，请检查 vite.config.js 配置')
}

export const API_BASE_URL = __API_BASE_URL__

// 其他配置项
export const config = {
  // 请求超时时间（毫秒）
  TIMEOUT: 30000,

  // 默认语言
  DEFAULT_LOCALE: 'zh',

  // 网站标题
  SITE_TITLE: '介质过程强化团队'
}
