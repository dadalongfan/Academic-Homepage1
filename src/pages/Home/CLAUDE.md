# Home 模块 - 首页

[根目录](../../../CLAUDE.md) > [src](../../) > [pages](../) > **Home**

> **最后更新**: 2026-02-08
> **模块类型**: 页面模块
> **入口文件**: `index.html` → `/src/pages/Home/main.js`

---

## 变更记录

### 2026-02-08
- 初始化模块文档

---

## 模块职责

首页是网站的入口页面，提供以下功能：
1. **图片幻灯片**：自动轮播展示团队图片，支持手动切换
2. **最新动态**：显示最新 4 条新闻，链接到新闻详情页
3. **代表论文**：展示最新 4 篇论文，链接到科研成果页
4. **导航卡片**：4 个快速导航卡片（研究方向、课题组简介、负责人简介、招贤纳士）
5. **团队简介**：显示团队描述信息

---

## 入口与启动

### HTML 入口
**文件**: `/index.html`（项目根目录）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>夏铭 - 南京工业大学化工学院副教授</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/pages/Home/main.js"></script>
</body>
</html>
```

### JavaScript 入口
**文件**: `/src/pages/Home/main.js`

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

### 应用根组件
**文件**: `/src/pages/Home/App.vue`

```vue
<template>
  <div id="app">
    <PageHeader />
    <main class="main-content">
      <HomePage />
    </main>
    <PageFooter />
  </div>
</template>

<script setup>
import PageHeader from '/src/components/PageHeader.vue'
import PageFooter from '/src/components/PageFooter.vue'
import HomePage from './index.vue'
</script>
```

---

## 对外接口

### 页面组件

**文件**: `/src/pages/Home/index.vue`

**主要功能**：
1. **幻灯片展示**
   - 自动轮播（3秒间隔）
   - 支持鼠标悬停暂停
   - 左右箭头手动切换

2. **最新动态**
   - 显示最新 4 条新闻
   - 点击跳转到新闻详情页

3. **代表论文**
   - 显示最新 4 篇论文
   - 点击跳转到科研成果页

4. **导航卡片**
   - 4 个快速导航入口
   - 链接到对应页面

**关键方法**：
- `nextSlide()`：下一张幻灯片
- `prevSlide()`：上一张幻灯片
- `pauseSlideshow()`：暂停轮播
- `resumeSlideshow()`：恢复轮播
- `formatDate(date)`：格式化日期

---

## 关键依赖与配置

### 依赖模块

| 模块 | 用途 |
|------|------|
| `@/components/PageHeader` | 页面头部组件 |
| `@/components/PageFooter` | 页面底部组件 |
| `@/api/news` | 新闻 API |
| `@/api/publications` | 论文 API |
| `@/api/slideshow` | 幻灯片 API |
| `@/utils/i18n` | 国际化 |
| `@/utils/i18n/useTranslation` | 翻译组合式函数 |

### API 调用

1. **获取幻灯片图片**
   ```javascript
   const res = await slideshowApi.getList()
   ```

2. **获取最新新闻**
   ```javascript
   const res = await newsApi.getList()
   const latestNews = res.data.slice(0, 4)
   ```

3. **获取代表论文**
   ```javascript
   const res = await publicationsApi.getPapers()
   const latestPapers = res.data.slice(0, 4)
   ```

---

## 数据模型

### 幻灯片图片

```typescript
interface SlideshowImage {
  id: number
  imageUrl: string      // 图片 URL
  title?: string        // 标题（可选）
  description?: string  // 描述（可选）
  sortOrder?: number    // 排序
}
```

### 新闻摘要

```typescript
interface NewsSummary {
  id: number
  title: string         // 新闻标题
  publishDate: string   // 发布日期（ISO 8601）
  category?: string     // 分类
}
```

### 论文摘要

```typescript
interface PaperSummary {
  id: number
  title: string         // 论文标题
  journal?: string      // 期刊名称
  publishDate?: string  // 发布日期
}
```

---

## 测试与质量

### 手动测试清单

- [ ] 幻灯片自动轮播正常
- [ ] 幻灯片箭头切换正常
- [ ] 鼠标悬停暂停轮播
- [ ] 最新动态点击跳转正常
- [ ] 代表论文点击跳转正常
- [ ] 导航卡片链接正确
- [ ] 中英文切换正常
- [ ] 响应式布局正常

### 已知问题

1. **幻灯片图片**：目前使用占位符，需要替换为实际图片
2. **团队简介**：数据来自后端 API，如果后端无数据会显示默认文本

---

## 常见问题 (FAQ)

### Q: 如何修改幻灯片图片？
**A**: 幻灯片图片从后端 API 获取，在后台管理系统"轮播图管理"中上传和管理。

### Q: 如何调整幻灯片切换速度？
**A**: 修改 `index.vue` 中的 `slideInterval` 常量（默认 3000ms）。

### Q: 如何修改导航卡片？
**A**: 导航卡片内容在 `index.vue` 的 `nav-cards` 部分，修改对应的文本和链接即可。

---

## 相关文件清单

```
src/pages/Home/
├── main.js           # 页面入口
├── App.vue           # 根组件
├── index.vue         # 页面内容组件
└── CLAUDE.md         # 本文档
```

---

**文档版本**: 1.0.0
