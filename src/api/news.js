import request from '@/utils/api'

export const newsApi = {
  // 获取新闻列表
  getList: () => request.get('/news/list'),
  
  // 获取新闻详情
  getDetail: (id) => request.get(`/news/${id}`)
}
