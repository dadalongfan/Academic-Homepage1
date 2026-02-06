import request from '@/utils/api'

export const slideshowApi = {
  // 获取轮播图列表
  getList: () => request.get('/slideshow/list')
}
