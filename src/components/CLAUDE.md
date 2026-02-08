# Components 模块 - 公共组件

[根目录](../../CLAUDE.md) > [src](../) > **components**

> **最后更新**: 2026-02-08
> **模块类型**: 公共组件模块

---

## 变更记录

### 2026-02-08
- 初始化模块文档

---

## 模块职责

公共组件模块提供所有页面共享的 UI 组件：
1. **PageHeader**：页面头部，包含 Logo、导航、语言切换
2. **PageFooter**：页面底部，包含联系方式、版权信息

---

## 组件列表

### PageHeader - 页面头部

**文件**: `/src/components/PageHeader.vue`

**功能**：
- Logo 横幅展示
- 导航菜单（支持下拉菜单）
- 语言切换（中/英）
- 当前页面高亮

**Props**：无

**Emits**：无

**特性**：
- 响应式设计
- 动态加载下拉菜单内容（新闻年份、成员角色、相册分类）
- 页面路由识别与高亮

**关键方法**：
- `switchLanguage(lang)`：切换语言
- `loadNewsYears()`：加载新闻年份
- `loadMemberRoles()`：加载成员角色
- `loadGalleryCategories()`：加载相册分类

**导航结构**：
```
首页
新闻动态 (下拉：最新动态、年份筛选)
团队成员 (下拉：全部成员、按角色筛选)
研究 (下拉：研究方向、代表项目、代表专利、代表论文)
应用开发 (下拉：专业能力、合作伙伴)
相册 (下拉：全部、按分类筛选)
招贤纳士
```

---

### PageFooter - 页面底部

**文件**: `/src/components/PageFooter.vue`

**功能**：
- 联系方式展示
- 版权信息
- 备案信息

**Props**：无

**Emits**：无

**显示内容**：
- 团队名称
- 联系邮箱
- 联系电话
- 地址
- 邮编
- 版权信息

---

## 使用示例

### 在页面中使用

```vue
<template>
  <div id="app">
    <PageHeader />
    <main class="main-content">
      <!-- 页面内容 -->
    </main>
    <PageFooter />
  </div>
</template>

<script setup>
import PageHeader from '/src/components/PageHeader.vue'
import PageFooter from '/src/components/PageFooter.vue'
</script>
```

---

## 样式规范

### PageHeader 样式

- **Logo 横幅**：
  - 高度：200px（最大）
  - 背景色：白色
  - 文字重叠在图片上

- **导航栏**：
  - 背景色：主题色渐变
  - 文字色：白色
  - 悬停效果：半透明白色背景
  - 当前页面：高亮显示

- **下拉菜单**：
  - 背景色：白色
  - 文字色：深色
  - 悬停效果：主题色背景
  - 动画：淡入淡出 + 上移

### PageFooter 样式

- **背景色**：主题色
- **文字色**：白色
- **布局**：居中对齐
- **间距**：较大的内边距

---

## 国际化

PageHeader 组件使用 Vue I18n 进行国际化：

```vue
<template>
  <a href="./index.html" class="nav-item">{{ $t('home') }}</a>
  <a href="./news.html" class="nav-item">{{ $t('news') }}</a>
</template>
```

语言切换功能：
- 调用 `i18n.global.switchLanguage(lang)`
- 保存到 localStorage
- 所有页面共享语言设置

---

## 相关文件清单

```
src/components/
├── PageHeader.vue    # 页面头部组件
├── PageFooter.vue    # 页面底部组件
└── CLAUDE.md         # 本文档
```

---

**文档版本**: 1.0.0
