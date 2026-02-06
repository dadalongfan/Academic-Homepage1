import request from '@/utils/api'

export const recruitmentApi = {
  // 获取招贤纳士列表
  getList: () => request.get('/recruitment/list')
}
