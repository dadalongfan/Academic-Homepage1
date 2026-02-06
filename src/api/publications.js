import request from '@/utils/api'

export const publicationsApi = {
  // 获取研究方向列表
  getResearchDirections: () => request.get('/research-directions/list').catch(() => ({ data: [] })),

  // 获取专业能力列表
  getExpertise: () => request.get('/expertise/list').catch(() => ({ data: [] })),

  // 获取阶段成就列表
  getAchievements: () => request.get('/achievements/list').catch(() => ({ data: [] })),

  // 获取论文列表
  getPapers: () => request.get('/papers/list').catch(() => ({ data: [] })),

  // 获取专利列表
  getPatents: () => request.get('/patents/list').catch(() => ({ data: [] })),

  // 获取荣誉列表
  getHonors: () => request.get('/honors/list').catch(() => ({ data: [] })),

  // 获取合作伙伴列表
  getPartners: () => request.get('/partners/list').catch(() => ({ data: [] }))
}
