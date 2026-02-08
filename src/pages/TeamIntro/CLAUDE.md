# TeamIntro 模块 - 团队简介

[根目录](../../../CLAUDE.md) > [src](../../) > [pages](../) > **TeamIntro**

> **最后更新**: 2026-02-08
> **模块类型**: 页面模块
> **入口文件**: `team-intro.html` → `/src/pages/TeamIntro/main.js`

---

## 变更记录

### 2026-02-08
- 初始化模块文档

---

## 模块职责

团队简介模块提供以下功能：
1. **团队概况**：团队历史、规模、定位
2. **研究方向**：主要研究领域
3. **科研条件**：实验室、设备
4. **团队文化**：团队精神、价值观

---

## 入口与启动

### HTML 入口
**文件**: `/team-intro.html`（项目根目录）

### JavaScript 入口
**文件**: `/src/pages/TeamIntro/main.js`

---

## 对外接口

### 页面组件

**文件**: `/src/pages/TeamIntro/index.vue`

**主要功能**：
1. **团队概况**
   - 团队介绍
   - 历史沿革

2. **研究方向**
   - 研究领域列表
   - 研究特色

3. **科研条件**
   - 实验室介绍
   - 仪器设备

4. **团队文化**
   - 团队精神
   - 价值观

**关键方法**：
- `loadTeamInfo()`：加载团队信息

---

## 关键依赖与配置

### 依赖模块

| 模块 | 用途 |
|------|------|
| `@/api/leader` | 团队信息 API（复用） |
| `@/utils/i18n` | 国际化 |

### API 调用

1. **获取团队信息**
   ```javascript
   const res = await leaderApi.getTeamInfo()
   ```

---

## 数据模型

### 团队信息

```typescript
interface TeamInfo {
  name: string              // 团队名称
  description: string       // 团队描述
  history: string           // 历史沿革
  researchDirections: string[] // 研究方向
  facilities: string[]      // 科研条件
  culture: string           // 团队文化
}
```

---

## 测试与质量

### 手动测试清单

- [ ] 团队概况正常显示
- [ ] 研究方向正常显示
- [ ] 科研条件正常显示
- [ ] 团队文化正常显示
- [ ] 中英文切换正常

---

## 相关文件清单

```
src/pages/TeamIntro/
├── main.js           # 页面入口
├── App.vue           # 根组件
├── index.vue         # 页面内容组件
├── index.html        # HTML 入口（独立页面）
└── CLAUDE.md         # 本文档
```

---

**文档版本**: 1.0.0
