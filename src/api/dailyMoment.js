import request from '@/utils/api'

export const dailyMomentApi = {
  // 获取趣事列表
  getList: () => request.get('/daily-moments/list')
}
