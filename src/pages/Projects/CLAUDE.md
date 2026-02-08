# Projects 模块 - 应用开发

[根目录](../../../CLAUDE.md) > [src](../../) > [pages](../) > **Projects**

> **最后更新**: 2026-02-08
> **模块类型**: 页面模块
> **入口文件**: `projects.html` → `/src/pages/Projects/main.js`

---

## 变更记录

### 2026-02-08
- 初始化模块文档

---

## 模块职责

应用开发模块提供以下功能：
1. **专业能力展示**：团队的技术专长和领域
2. **项目列表展示**：参与的科研项目
3. **合作伙伴展示**：合作单位信息
4. **项目统计**：项目数量、经费统计

---

## 入口与启动

### HTML 入口
**文件**: `/projects.html`（项目根目录）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>应用开发 - 介质过程强化团队</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/pages/Projects/main.js"></script>
</body>
</html>
```

### JavaScript 入口
**文件**: `/src/pages/Projects/main.js`

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

**文件**: `/src/pages/Projects/index.vue`

**主要功能**：
1. **专业能力**
   - 技术领域介绍
   - 专业特长展示

2. **项目列表**
   - 项目名称
   - 项目级别（国家级/省部级/企业委托）
   - 担任角色（主持/参与）
   - 起止时间

3. **合作伙伴**
   - 合作单位列表
   - 合作类型
   - 合作成果

**关键方法**：
- `loadProjects()`：加载项目列表
- `loadPartners()`：加载合作伙伴

---

## 关键依赖与配置

### 依赖模块

| 模块 | 用途 |
|------|------|
| `@/components/PageHeader` | 页面头部组件 |
| `@/components/PageFooter` | 页面底部组件 |
| `@/api/projects` | 项目 API |
| `@/utils/i18n` | 国际化 |
| `@/utils/i18n/useTranslation` | 翻译组合式函数 |
| `@element-plus/icons-vue` | Element Plus 图标 |

### API 调用

1. **获取项目列表**
   ```javascript
   const res = await projectsApi.getList()
   ```

2. **获取合作伙伴**
   ```javascript
   const res = await projectsApi.getPartners()
   ```

---

## 数据模型

### 项目对象

```typescript
interface Project {
  id: number
  name: string            // 项目名称
  type: string            // 项目级别
  role: string            // 担任角色
  startDate: string       // 开始时间
  endDate?: string        // 结束时间
  funding?: number        // 经费（万元）
  description?: string    // 项目描述
}
```

### 合作伙伴

```typescript
interface ProjectPartner {
  id: number
  name: string            // 合作单位
  type: string            // 合作类型
  description?: string    // 合作描述
  achievements?: string   // 合作成果
}
```

---

## 路由与参数

### URL 参数

**列表页**：
- `projects.html?tab=expertise`：显示专业能力部分
- `projects.html?tab=partners`：显示合作伙伴部分

---

## 测试与质量

### 手动测试清单

- [ ] 专业能力正常显示
- [ ] 项目列表正常显示
- [ ] 项目时间正确显示
- [ ] 合作伙伴正常显示
- [ ] Tab 切换正常工作
- [ ] 中英文切换正常

### 已知问题

1. **项目经费**：部分项目可能没有经费数据
2. **结束时间**：进行中的项目没有结束时间

---

## 常见问题 (FAQ)

### Q: 如何添加新项目？
**A**: 在后台管理系统的"项目管理"中添加。

### Q: 如何修改专业能力内容？
**A**: 专业能力内容在 `index.vue` 中硬编码，直接修改对应的内容。

### Q: 项目如何排序？
**A**: 默认按开始时间倒序排列，可在代码中修改排序逻辑。

---

## 相关文件清单

```
src/pages/Projects/
├── main.js           # 页面入口
├── App.vue           # 根组件
├── index.vue         # 页面内容组件
└── CLAUDE.md         # 本文档
```

---

**文档版本**: 1.0.0
