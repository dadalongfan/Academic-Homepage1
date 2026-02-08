# Members 模块 - 团队成员

[根目录](../../../CLAUDE.md) > [src](../../) > [pages](../) > **Members**

> **最后更新**: 2026-02-08
> **模块类型**: 页面模块
> **入口文件**: `members.html` → `/src/pages/Members/main.js`

---

## 变更记录

### 2026-02-08
- 初始化模块文档

---

## 模块职责

团队成员模块提供以下功能：
1. **成员列表展示**：按角色分组显示成员
2. **角色筛选**：支持按角色筛选成员
3. **详细信息展示**：头像、姓名、研究方向、邮箱等
4. **分组布局**：不同角色使用不同的布局样式

---

## 入口与启动

### HTML 入口
**文件**: `/members.html`（项目根目录）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>团队成员 - 介质过程强化团队</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/pages/Members/main.js"></script>
</body>
</html>
```

### JavaScript 入口
**文件**: `/src/pages/Members/main.js`

```javascript
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '/src/assets/styles/variables.css'
import '/src/assets/styles/common.css'
import App from './App.vue'
import i18n from '/src/utils/i18n'

const app = createApp(App)
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
```

---

## 对外接口

### 页面组件

**文件**: `/src/pages/Members/index.vue`

**主要功能**：
1. **按角色分组展示**
   - 指导教师：大卡片布局，左侧头像右侧信息
   - 专任教师：网格卡片布局
   - 研究生：网格卡片布局
   - 校友：网格卡片布局

2. **成员信息显示**
   - 头像（无头像时显示首字母占位符）
   - 姓名
   - 角色
   - 研究方向
   - 邮箱

3. **角色筛选**
   - 从 URL 参数获取角色 ID
   - 仅显示指定角色的成员

**关键方法**：
- `loadMembers()`：加载成员列表
- `loadRoles()`：加载角色列表
- `displayMemberById(id)`：根据 ID 获取成员显示信息

**计算属性**：
- `membersByRole`：按角色分组的成员列表

---

## 关键依赖与配置

### 依赖模块

| 模块 | 用途 |
|------|------|
| `@/components/PageHeader` | 页面头部组件 |
| `@/components/PageFooter` | 页面底部组件 |
| `@/api/members` | 成员 API |
| `@/utils/i18n` | 国际化 |
| `@/utils/i18n/useTranslation` | 翻译组合式函数 |
| `@element-plus/icons-vue` | Element Plus 图标 |

### API 调用

1. **获取成员列表**
   ```javascript
   const res = await membersApi.getList()
   ```

2. **按角色获取成员**
   ```javascript
   const res = await membersApi.getListByRole()
   ```

3. **获取角色列表**
   ```javascript
   const res = await membersApi.getRoles()
   ```

4. **根据角色 ID 获取成员**
   ```javascript
   const res = await membersApi.getByRoleId(roleId)
   ```

---

## 数据模型

### 成员对象

```typescript
interface Member {
  id: number
  name: string              // 姓名
  roleId: number            // 角色ID
  roleName: string          // 角色名称
  avatarUrl?: string        // 头像URL
  bio?: string              // 简介
  researchDirection?: string // 研究方向
  email?: string            // 邮箱
  phone?: string            // 电话
  sortOrder?: number        // 排序
  status?: string           // 状态（在校/毕业等）
}
```

### 角色对象

```typescript
interface MemberRole {
  id: number
  name: string              // 角色名称
  sortOrder: number         // 排序
}
```

---

## 路由与参数

### URL 参数

**列表页**：
- `members.html?role=1`：仅显示角色 ID 为 1 的成员

---

## 布局样式

### 指导教师布局

- 单列大卡片
- 左侧：圆形头像（120px）
- 右侧：姓名、角色、简介、研究方向、邮箱

### 专任教师布局

- 网格卡片（3列）
- 上方：方形头像
- 下方：姓名、角色、研究方向、邮箱

### 研究生/校友布局

- 网格卡片（4列）
- 上方：方形头像
- 下方：姓名、研究方向

---

## 测试与质量

### 手动测试清单

- [ ] 成员列表正常显示
- [ ] 角色分组正确
- [ ] 角色筛选正常工作
- [ ] 头像显示正常
- [ ] 占位符头像正常显示
- [ ] 邮箱链接可点击
- [ ] 中英文切换正常
- [ ] 响应式布局正常

### 已知问题

1. **头像加载失败**：无头像时显示首字母占位符
2. **空状态处理**：某个角色无成员时不显示该角色分组

---

## 常见问题 (FAQ)

### Q: 如何添加新角色？
**A**: 在后台管理系统的"成员角色管理"中添加新角色。

### Q: 如何调整成员排序？
**A**: 在后台管理系统中编辑成员，设置 `sortOrder` 字段。

### Q: 如何修改成员卡片布局？
**A**: 修改 `index.vue` 中的模板部分，调整对应的布局样式。

---

## 相关文件清单

```
src/pages/Members/
├── main.js           # 页面入口
├── App.vue           # 根组件
├── index.vue         # 页面内容组件
└── CLAUDE.md         # 本文档
```

---

**文档版本**: 1.0.0
