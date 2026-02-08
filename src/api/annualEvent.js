import request from '@/utils/api'

export const annualEventApi = {
  // 获取最新一年的事件（前台）
  getLatest: () => {
    return request.get('/annual-events/latest')
  },

  // 根据年份获取事件
  getByYear: (year) => {
    return request.get(`/annual-events/year/${year}`)
  },

  // 获取所有事件（后台）
  getAdminList: () => {
    return request.get('/annual-events/admin/list')
  },

  // 获取事件详情
  getDetail: (id) => {
    return request.get(`/annual-events/${id}`)
  },

  // 添加事件
  add: (data) => {
    return request.post('/annual-events', data)
  },

  // 更新事件
  update: (id, data) => {
    return request.put(`/annual-events/${id}`, data)
  },

  // 删除事件
  delete: (id) => {
    return request.delete(`/annual-events/${id}`)
  }
}
