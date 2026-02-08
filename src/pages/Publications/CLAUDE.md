# Publications 模块 - 研究成果

[根目录](../../../CLAUDE.md) > [src](../../) > [pages](../) > **Publications**

> **最后更新**: 2026-02-08
> **模块类型**: 页面模块
> **入口文件**: `publications.html` → `/src/pages/Publications/main.js`

---

## 变更记录

### 2026-02-08
- 初始化模块文档

---

## 模块职责

研究成果模块提供以下功能：
1. **研究方向展示**：课题组主要研究方向介绍
2. **代表论文**：发表的高水平学术论文
3. **代表专利**：授权发明专利
4. **代表奖励**：获得的科研奖励
5. **合作伙伴**：合作单位与合作领域
6. **研究成果统计**：论文、专利、项目数量统计

---

## 入口与启动

### HTML 入口
**文件**: `/publications.html`（项目根目录）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>研究成果 - 介质过程强化团队</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/pages/Publications/main.js"></script>
</body>
</html>
```

### JavaScript 入口
**文件**: `/src/pages/Publications/main.js`

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

**文件**: `/src/pages/Publications/index.vue`

**主要功能**：
1. **研究方向**
   - 4 个主要研究方向卡片
   - 图标、标题、描述

2. **代表论文**
   - 论文列表展示
   - DOI 链接
   - PDF 下载（可选）
   - 期刊信息

3. **代表专利**
   - 专利号
   - 专利名称
   - 发明人

4. **代表奖励**
   - 奖励名称
   - 获奖时间
   - 授予单位

5. **合作伙伴**
   - 合作单位列表
   - 合作领域介绍

6. **研究成果统计**
   - 论文数量
   - 专利数量
   - 项目数量

**关键方法**：
- `loadResearchDirections()`：加载研究方向
- `loadPapers()`：加载论文列表
- `loadPatents()`：加载专利列表
- `loadHonors()`：加载奖励列表
- `loadPartners()`：加载合作伙伴

---

## 关键依赖与配置

### 依赖模块

| 模块 | 用途 |
|------|------|
| `@/components/PageHeader` | 页面头部组件 |
| `@/components/PageFooter` | 页面底部组件 |
| `@/api/publications` | 成果 API |
| `@/utils/i18n` | 国际化 |
| `@/utils/i18n/useTranslation` | 翻译组合式函数 |
| `@element-plus/icons-vue` | Element Plus 图标 |

### API 调用

1. **获取研究方向**
   ```javascript
   const res = await publicationsApi.getResearchDirections()
   ```

2. **获取论文列表**
   ```javascript
   const res = await publicationsApi.getPapers()
   ```

3. **获取专利列表**
   ```javascript
   const res = await publicationsApi.getPatents()
   ```

4. **获取奖励列表**
   ```javascript
   const res = await publicationsApi.getHonors()
   ```

5. **获取合作伙伴**
   ```javascript
   const res = await publicationsApi.getPartners()
   ```

---

## 数据模型

### 研究方向

```typescript
interface ResearchDirection {
  id: number
  title: string           // 标题
  description: string     // 描述
  icon?: string           // 图标
  sortOrder?: number      // 排序
}
```

### 论文对象

```typescript
interface Paper {
  id: number
  title: string           // 论文标题
  authors: string         // 全体作者
  journal: string         // 期刊名称
  year: number            // 年份
  volume?: string         // 卷
  issue?: string          // 期
  pages?: string          // 页码
  doi?: string            // DOI
  pdfUrl?: string         // PDF 文件URL
}
```

### 专利对象

```typescript
interface Patent {
  id: number
  patentNumber: string    // 专利号
  title: string           // 专利名称
  inventors: string       // 发明人
  authorizationDate?: string // 授权日期
}
```

### 奖励对象

```typescript
interface Honor {
  id: number
  title: string           // 奖励名称
  awardingUnit?: string   // 授予单位
  awardDate?: string      // 获奖日期
}
```

### 合作伙伴

```typescript
interface Partner {
  id: number
  name: string            // 合作单位
  type?: string           // 类型（高校/企业/科研院所）
  description?: string    // 合作描述
  logoUrl?: string        // 单位logo
}
```

---

## 路由与参数

### URL 参数

**列表页**：
- `publications.html?section=papers`：直接定位到论文部分
- `publications.html?section=patents`：直接定位到专利部分

---

## 测试与质量

### 手动测试清单

- [ ] 研究方向正常显示
- [ ] 论文列表正常显示
- [ ] DOI 链接可点击
- [ ] PDF 下载正常工作
- [ ] 专利列表正常显示
- [ ] 奖励列表正常显示
- [ ] 合作伙伴正常显示
- [ ] 统计数据正确
- [ ] 中英文切换正常

### 已知问题

1. **PDF 文件**：需要后端提供 PDF 文件服务
2. **DOI 链接**：部分论文可能没有 DOI

---

## 常见问题 (FAQ)

### Q: 如何添加新论文？
**A**: 在后台管理系统的"论文管理"中添加。

### Q: 如何修改研究方向？
**A**: 研究方向在 `index.vue` 中硬编码，直接修改对应的内容。

### Q: 如何上传 PDF 文件？
**A**: 在后台管理系统编辑论文时，上传 PDF 文件。

---

## 相关文件清单

```
src/pages/Publications/
├── main.js           # 页面入口
├── App.vue           # 根组件
├── index.vue         # 页面内容组件
└── CLAUDE.md         # 本文档
```

---

**文档版本**: 1.0.0
