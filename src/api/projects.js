import request from '@/utils/api'

export const projectsApi = {
  // 获取项目列表
  getList: () => request.get('/projects/list')
}
