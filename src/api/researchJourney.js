import request from '@/utils/api'

export const researchJourneyApi = {
  // 获取征途列表（分页）
  getList: (params) => request.get('/research-journeys/page', { params }),

  // 获取征途详情
  getDetail: (id) => request.get(`/research-journeys/${id}`)
}
