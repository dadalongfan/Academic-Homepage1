import request from '@/utils/api'

export const membersApi = {
  // 获取成员列表
  getList: () => request.get('/members/list'),

  // 按角色排序获取成员列表
  getListByRole: () => request.get('/members/list/by-role'),

  // 获取角色列表
  getRoles: () => request.get('/member-roles/visible'),

  // 根据角色ID获取成员
  getByRoleId: (roleId) => request.get(`/members/role/${roleId}`),

  // 获取指导教师
  getSupervisors: () => request.get('/members/supervisors'),

  // 获取专任教师
  getTeachers: () => request.get('/members/teachers'),

  // 获取在读研究生
  getCurrentGraduates: () => request.get('/members/graduates/current'),

  // 获取毕业生
  getGraduatedStudents: () => request.get('/members/graduates/completed')
}
