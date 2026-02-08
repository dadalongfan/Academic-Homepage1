# LeaderIntro 模块 - 负责人简介

[根目录](../../../CLAUDE.md) > [src](../../) > [pages](../) > **LeaderIntro**

> **最后更新**: 2026-02-08
> **模块类型**: 页面模块
> **入口文件**: `leader-intro.html` → `/src/pages/LeaderIntro/main.js`

---

## 变更记录

### 2026-02-08
- 初始化模块文档

---

## 模块职责

负责人简介模块提供以下功能：
1. **个人信息**：姓名、职称、职务
2. **教育经历**：学历、学位、毕业院校
3. **工作经历**：工作单位、职位、时间
4. **研究方向**：主要研究领域
5. **学术成果**：论文、专利、项目

---

## 入口与启动

### HTML 入口
**文件**: `/leader-intro.html`（项目根目录）

### JavaScript 入口
**文件**: `/src/pages/LeaderIntro/main.js`

---

## 对外接口

### 页面组件

**文件**: `/src/pages/LeaderIntro/index.vue`

**主要功能**：
1. **个人信息展示**
   - 头像
   - 姓名
   - 职称
   - 职务

2. **教育经历**
   - 时间线展示
   - 学校、专业、学位

3. **工作经历**
   - 时间线展示
   - 单位、职位

4. **研究方向**
   - 研究领域列表

**关键方法**：
- `loadLeaderInfo()`：加载负责人信息

---

## 关键依赖与配置

### 依赖模块

| 模块 | 用途 |
|------|------|
| `@/api/leader` | 负责人 API |
| `@/utils/i18n` | 国际化 |

### API 调用

1. **获取负责人信息**
   ```javascript
   const res = await leaderApi.getInfo()
   ```

---

## 数据模型

### 负责人信息

```typescript
interface LeaderInfo {
  name: string              // 姓名
  title: string             // 职称
  position: string          // 职务
  avatarUrl?: string        // 头像URL
  education: Education[]    // 教育经历
  workExperience: Work[]    // 工作经历
  researchDirection: string // 研究方向
}

interface Education {
  school: string            // 学校
  major: string             // 专业
  degree: string            // 学位
  startDate: string         // 开始时间
  endDate?: string          // 结束时间
}

interface Work {
  unit: string              // 单位
  position: string          // 职位
  startDate: string         // 开始时间
  endDate?: string          // 结束时间
}
```

---

## 测试与质量

### 手动测试清单

- [ ] 个人信息正常显示
- [ ] 教育经历正常显示
- [ ] 工作经历正常显示
- [ ] 研究方向正常显示
- [ ] 中英文切换正常

---

## 相关文件清单

```
src/pages/LeaderIntro/
├── main.js           # 页面入口
├── App.vue           # 根组件
├── index.vue         # 页面内容组件
├── index.html        # HTML 入口（独立页面）
└── CLAUDE.md         # 本文档
```

---

**文档版本**: 1.0.0
