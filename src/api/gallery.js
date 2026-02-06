import request from '@/utils/api'

export const galleryApi = {
  // 获取相册分类列表
  getCategories: () => request.get('/gallery-categories/list'),
  
  // 获取相册图片列表
  getImages: () => request.get('/gallery-images/list')
}
