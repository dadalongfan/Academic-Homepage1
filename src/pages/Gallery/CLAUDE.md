# Gallery 模块 - 团队相册

[根目录](../../../CLAUDE.md) > [src](../../) > [pages](../) > **Gallery**

> **最后更新**: 2026-02-08
> **模块类型**: 页面模块
> **入口文件**: `gallery.html` → `/src/pages/Gallery/main.js`

---

## 变更记录

### 2026-02-08
- 初始化模块文档

---

## 模块职责

团队相册模块提供以下功能：
1. **图片展示**：网格布局展示团队照片
2. **分类筛选**：按分类筛选图片
3. **图片预览**：点击放大查看
4. **图片信息**：显示上传日期、描述

---

## 入口与启动

### HTML 入口
**文件**: `/gallery.html`（项目根目录）

### JavaScript 入口
**文件**: `/src/pages/Gallery/main.js`

---

## 对外接口

### 页面组件

**文件**: `/src/pages/Gallery/index.vue`

**主要功能**：
1. **图片网格展示**
   - 响应式网格布局
   - 悬停效果

2. **分类筛选**
   - 从 URL 参数获取分类 ID
   - 显示所有分类选项

3. **图片预览**
   - 点击放大
   - 关闭按钮

**关键方法**：
- `loadImages()`：加载图片列表
- `loadCategories()`：加载分类列表
- `previewImage(image)`：预览图片
- `closePreview()`：关闭预览

---

## 关键依赖与配置

### 依赖模块

| 模块 | 用途 |
|------|------|
| `@/api/gallery` | 相册 API |
| `@/utils/i18n` | 国际化 |

### API 调用

1. **获取图片列表**
   ```javascript
   const res = await galleryApi.getImages()
   ```

2. **获取分类列表**
   ```javascript
   const res = await galleryApi.getCategories()
   ```

---

## 数据模型

### 图片对象

```typescript
interface GalleryImage {
  id: number
  imageUrl: string        // 图片URL
  categoryId?: number     // 分类ID
  categoryName?: string   // 分类名称
  description?: string    // 描述
  uploadDate?: string     // 上传日期
}
```

### 分类对象

```typescript
interface GalleryCategory {
  id: number
  name: string            // 分类名称
  sortOrder?: number      // 排序
}
```

---

## 路由与参数

### URL 参数

**列表页**：
- `gallery.html?category=1`：仅显示分类 ID 为 1 的图片

---

## 测试与质量

### 手动测试清单

- [ ] 图片列表正常显示
- [ ] 分类筛选正常工作
- [ ] 图片预览正常
- [ ] 图片描述正常显示
- [ ] 中英文切换正常

### 已知问题

1. **图片加载**：大图加载可能较慢
2. **图片质量**：需要压缩优化

---

## 相关文件清单

```
src/pages/Gallery/
├── main.js           # 页面入口
├── App.vue           # 根组件
├── index.vue         # 页面内容组件
└── CLAUDE.md         # 本文档
```

---

**文档版本**: 1.0.0
