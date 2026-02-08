# News 模块 - 新闻动态

[根目录](../../../CLAUDE.md) > [src](../../) > [pages](../) > **News**

> **最后更新**: 2026-02-08
> **模块类型**: 页面模块
> **入口文件**: `news.html` → `/src/pages/News/main.js`

---

## 变更记录

### 2026-02-08
- 初始化模块文档

---

## 模块职责

新闻动态模块提供以下功能：
1. **新闻列表展示**：显示所有新闻，支持年份筛选
2. **新闻详情**：点击新闻跳转到详情页
3. **分类显示**：显示新闻分类标签
4. **重要新闻标记**：重要新闻突出显示
5. **响应式布局**：适配不同屏幕尺寸

---

## 入口与启动

### HTML 入口
**文件**: `/news.html`（项目根目录）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>新闻动态 - 介质过程强化团队</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/pages/News/main.js"></script>
</body>
</html>
```

### JavaScript 入口
**文件**: `/src/pages/News/main.js`

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

### 列表页组件

**文件**: `/src/pages/News/index.vue`

**主要功能**：
1. **新闻列表渲染**
   - 按时间倒序排列
   - 支持年份筛选
   - 显示发布日期、标题、摘要

2. **重要新闻标记**
   - 红色 "重要" 标签
   - 视觉突出显示

3. **分类标签**
   - 不同类型不同颜色
   - 显示在新闻标题旁

4. **年份筛选**
   - 通过 URL 参数 `?year=2024` 筛选
   - 从 URL 参数获取年份

**关键方法**：
- `loadNews()`：加载新闻列表
- `goToDetail(id)`：跳转到新闻详情
- `getYear(date)`：提取年份
- `getMonth(date)`：提取月份
- `getPlainText(html)`：提取纯文本摘要
- `getCategoryType(category)`：获取分类标签颜色

**计算属性**：
- `filteredNews`：根据年份筛选的新闻列表

### 详情页组件

**文件**: `/src/pages/News/Detail.vue`

**主要功能**：
1. **新闻详情渲染**
   - 标题、发布日期、分类
   - 富文本内容展示

2. **返回列表**
   - 返回按钮

**关键方法**：
- `loadDetail()`：加载新闻详情
- `goBack()`：返回列表页

---

## 关键依赖与配置

### 依赖模块

| 模块 | 用途 |
|------|------|
| `@/components/PageHeader` | 页面头部组件 |
| `@/components/PageFooter` | 页面底部组件 |
| `@/api/news` | 新闻 API |
| `@/utils/i18n` | 国际化 |
| `@/utils/i18n/useTranslation` | 翻译组合式函数 |
| `@element-plus/icons-vue` | Element Plus 图标 |

### API 调用

1. **获取新闻列表**
   ```javascript
   const res = await newsApi.getList()
   ```

2. **获取新闻详情**
   ```javascript
   const res = await newsApi.getDetail(id)
   ```

---

## 数据模型

### 新闻对象

```typescript
interface News {
  id: number
  title: string           // 新闻标题
  content: string         // 新闻内容（HTML）
  publishDate: string     // 发布日期（ISO 8601）
  category?: string       // 分类
  isImportant?: boolean   // 是否重要新闻
  createdAt?: string      // 创建时间
  updatedAt?: string      // 更新时间
}
```

---

## 路由与参数

### URL 参数

**列表页**：
- `?year=2024`：筛选 2024 年的新闻
- `?category=科研`：筛选特定分类

**详情页**：
- `news-detail.html?id=123`：查看 ID 为 123 的新闻详情

---

## 测试与质量

### 手动测试清单

- [ ] 新闻列表正常显示
- [ ] 年份筛选正常工作
- [ ] 点击新闻跳转到详情页
- [ ] 详情页内容正确显示
- [ ] 重要新闻标记正确
- [ ] 分类标签颜色正确
- [ ] 中英文切换正常
- [ ] 返回按钮正常工作

### 已知问题

1. **富文本内容**：详情页的内容为 HTML，需要确保样式正确渲染
2. **图片显示**：新闻内容中的图片需要正确加载

---

## 常见问题 (FAQ)

### Q: 如何添加新闻分类？
**A**: 新闻分类由后端管理，在后台管理系统中添加和配置。

### Q: 如何设置重要新闻？
**A**: 在后台管理系统中编辑新闻，勾选 "重要新闻" 选项。

### Q: 如何修改新闻列表排序？
**A**: 默认按发布日期倒序排列，可在 `index.vue` 的 `filteredNews` 计算属性中修改排序逻辑。

---

## 相关文件清单

```
src/pages/News/
├── main.js           # 页面入口
├── App.vue           # 根组件
├── index.vue         # 列表页组件
├── Detail.vue        # 详情页组件
└── CLAUDE.md         # 本文档
```

---

**文档版本**: 1.0.0
