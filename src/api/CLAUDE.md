# API 模块 - 后端接口客户端

[根目录](../../CLAUDE.md) > [src](../) > **api**

> **最后更新**: 2026-02-08
> **模块类型**: API 客户端模块

---

## 变更记录

### 2026-02-08
- 初始化模块文档

---

## 模块职责

API 模块提供所有后端接口的客户端封装：
1. **HTTP 客户端**：统一的 Axios 实例和拦截器
2. **接口封装**：各业务模块的 API 方法
3. **错误处理**：统一的错误提示和处理
4. **文件 URL**：完整的文件访问 URL 生成

---

## HTTP 客户端

### 配置文件

**文件**: `/src/utils/api.js`

**功能**：
- 创建 Axios 实例
- 请求拦截器
- 响应拦截器
- 错误处理
- 文件 URL 生成

**配置项**：
```javascript
{
  baseURL: API_BASE_URL,      // 从环境变量获取
  timeout: 30000              // 30秒超时
}
```

**请求拦截器**：
```javascript
request.interceptors.request.use(config => {
  // 可以在这里添加 token 等
  return config
})
```

**响应拦截器**：
```javascript
request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      ElMessage.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message))
    }
    return res
  },
  error => {
    // 处理网络错误、超时等
    if (error.message.includes('timeout')) {
      ElMessage.error('请求超时，请重试')
    } else if (error.message.includes('Network Error')) {
      ElMessage.error('网络错误，请检查后端服务是否启动')
    } else {
      ElMessage.error(error.message || '请求失败')
    }
    return Promise.reject(error)
  }
)
```

**工具函数**：
- `getFullFileUrl(url)`：生成完整的文件访问 URL
  ```javascript
  getFullFileUrl('/uploads/image.jpg')
  // 返回: 'http://api-server:8801/api/uploads/image.jpg'
  ```

---

## API 模块列表

### news - 新闻 API

**文件**: `/src/api/news.js`

```javascript
export const newsApi = {
  // 获取新闻列表
  getList: () => request.get('/news/list'),

  // 获取新闻详情
  getDetail: (id) => request.get(`/news/${id}`)
}
```

**接口说明**：
- `GET /news/list`：获取所有新闻
- `GET /news/{id}`：获取指定 ID 的新闻详情

---

### members - 成员 API

**文件**: `/src/api/members.js`

```javascript
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
```

**接口说明**：
- `GET /members/list`：获取所有成员
- `GET /members/list/by-role`：按角色分组获取成员
- `GET /member-roles/visible`：获取可见的角色列表
- `GET /members/role/{roleId}`：获取指定角色的成员
- `GET /members/supervisors`：获取指导教师
- `GET /members/teachers`：获取专任教师
- `GET /members/graduates/current`：获取在读研究生
- `GET /members/graduates/completed`：获取毕业生

---

### publications - 成果 API

**文件**: `/src/api/publications.js`

```javascript
export const publicationsApi = {
  // 获取研究方向
  getResearchDirections: () => request.get('/research-directions/list'),

  // 获取论文列表
  getPapers: () => request.get('/papers/list'),

  // 获取专利列表
  getPatents: () => request.get('/patents/list'),

  // 获取奖励列表
  getHonors: () => request.get('/honors/list'),

  // 获取合作伙伴
  getPartners: () => request.get('/partners/list')
}
```

**接口说明**：
- `GET /research-directions/list`：获取研究方向列表
- `GET /papers/list`：获取论文列表
- `GET /patents/list`：获取专利列表
- `GET /honors/list`：获取奖励列表
- `GET /partners/list`：获取合作伙伴列表

---

### projects - 项目 API

**文件**: `/src/api/projects.js`

```javascript
export const projectsApi = {
  // 获取项目列表
  getList: () => request.get('/projects/list'),

  // 获取合作伙伴
  getPartners: () => request.get('/project-partners/list')
}
```

**接口说明**：
- `GET /projects/list`：获取项目列表
- `GET /project-partners/list`：获取项目合作伙伴列表

---

### gallery - 相册 API

**文件**: `/src/api/gallery.js`

```javascript
export const galleryApi = {
  // 获取图片列表
  getImages: () => request.get('/gallery/list'),

  // 获取分类列表
  getCategories: () => request.get('/gallery-categories/list')
}
```

**接口说明**：
- `GET /gallery/list`：获取相册图片列表
- `GET /gallery-categories/list`：获取相册分类列表

---

### recruitment - 招聘 API

**文件**: `/src/api/recruitment.js`

```javascript
export const recruitmentApi = {
  // 获取招聘信息
  getInfo: () => request.get('/recruitment/info')
}
```

**接口说明**：
- `GET /recruitment/info`：获取招聘信息

---

### leader - 负责人 API

**文件**: `/src/api/leader.js`

```javascript
export const leaderApi = {
  // 获取负责人信息
  getInfo: () => request.get('/leader/info'),

  // 获取团队信息
  getTeamInfo: () => request.get('/leader/team-info')
}
```

**接口说明**：
- `GET /leader/info`：获取负责人信息
- `GET /leader/team-info`：获取团队信息

---

### slideshow - 幻灯片 API

**文件**: `/src/api/slideshow.js`

```javascript
export const slideshowApi = {
  // 获取幻灯片列表
  getList: () => request.get('/slideshow/list')
}
```

**接口说明**：
- `GET /slideshow/list`：获取幻灯片图片列表

---

## 统一导出

**文件**: `/src/api/index.js`

```javascript
export { newsApi } from './news'
export { leaderApi } from './leader'
export { membersApi } from './members'
export { publicationsApi } from './publications'
export { projectsApi } from './projects'
export { galleryApi } from './gallery'
export { recruitmentApi } from './recruitment'
export { slideshowApi } from './slideshow'
```

**使用示例**：
```javascript
import { newsApi, membersApi } from '@/api'

const news = await newsApi.getList()
const members = await membersApi.getList()
```

---

## 响应格式

### 成功响应

```javascript
{
  code: 200,
  message: 'success',
  data: {
    // 实际数据
  }
}
```

### 错误响应

```javascript
{
  code: 400/401/404/500,
  message: '错误信息',
  data: null
}
```

---

## 错误处理

所有 API 调用都应该使用 try-catch 捕获错误：

```javascript
try {
  const res = await newsApi.getList()
  if (res.code === 200) {
    // 处理数据
    newsList.value = res.data
  }
} catch (error) {
  console.error('加载新闻失败:', error)
  // 错误已在响应拦截器中处理并显示
}
```

---

## 相关文件清单

```
src/api/
├── index.js           # 统一导出
├── news.js            # 新闻 API
├── members.js         # 成员 API
├── publications.js    # 成果 API
├── projects.js        # 项目 API
├── gallery.js         # 相册 API
├── recruitment.js     # 招聘 API
├── leader.js          # 负责人 API
├── slideshow.js       # 幻灯片 API
└── CLAUDE.md          # 本文档
```

---

**文档版本**: 1.0.0
