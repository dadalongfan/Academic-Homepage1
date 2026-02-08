# Recruitment 模块 - 招贤纳士

[根目录](../../../CLAUDE.md) > [src](../../) > [pages](../) > **Recruitment**

> **最后更新**: 2026-02-08
> **模块类型**: 页面模块
> **入口文件**: `recruitment.html` → `/src/pages/Recruitment/main.js`

---

## 变更记录

### 2026-02-08
- 初始化模块文档

---

## 模块职责

招贤纳士模块提供以下功能：
1. **招生信息**：招生专业、研究方向
2. **课题组优势**：科研条件、学术氛围
3. **招生要求**：学历要求、专业背景
4. **申请流程**：申请步骤、联系方式

---

## 入口与启动

### HTML 入口
**文件**: `/recruitment.html`（项目根目录）

### JavaScript 入口
**文件**: `/src/pages/Recruitment/main.js`

---

## 对外接口

### 页面组件

**文件**: `/src/pages/Recruitment/index.vue`

**主要功能**：
1. **欢迎区域**
   - 标题和标语

2. **招生专业**
   - 专业列表
   - 研究方向

3. **课题组优势**
   - 科研条件
   - 学术氛围
   - 发展前景

4. **招生要求**
   - 学历要求
   - 专业背景
   - 其他要求

5. **申请流程**
   - 申请步骤
   - 联系方式

**关键方法**：
- `loadRecruitmentInfo()`：加载招生信息

---

## 关键依赖与配置

### 依赖模块

| 模块 | 用途 |
|------|------|
| `@/api/recruitment` | 招聘 API |
| `@/utils/i18n` | 国际化 |

### API 调用

1. **获取招聘信息**
   ```javascript
   const res = await recruitmentApi.getInfo()
   ```

---

## 数据模型

### 招聘信息

```typescript
interface RecruitmentInfo {
  majors: string[]        // 招生专业
  advantages: string[]    // 课题组优势
  requirements: string[]  // 招生要求
  process: string[]       // 申请流程
  contact: {              // 联系方式
    email?: string
    phone?: string
    address?: string
  }
}
```

---

## 测试与质量

### 手动测试清单

- [ ] 招生信息正常显示
- [ ] 课题组优势正常显示
- [ ] 招生要求正常显示
- [ ] 申请流程正常显示
- [ ] 联系方式正确
- [ ] 中英文切换正常

---

## 常见问题 (FAQ)

### Q: 如何修改招生信息？
**A**: 招生信息主要在 `index.vue` 中硬编码，直接修改对应的内容。部分信息从后端 API 获取，可在后台管理系统中编辑。

---

## 相关文件清单

```
src/pages/Recruitment/
├── main.js           # 页面入口
├── App.vue           # 根组件
├── index.vue         # 页面内容组件
└── CLAUDE.md         # 本文档
```

---

**文档版本**: 1.0.0
