import request from '@/utils/api'

export const leaderApi = {
  // 获取负责人信息
  getInfo: () => request.get('/leader/info'),
  
  // 获取教育经历
  getEducation: () => request.get('/leader/education'),
  
  // 获取工作经历
  getWorkExperience: () => request.get('/leader/work-experience')
}
