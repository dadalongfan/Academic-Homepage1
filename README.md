# 夏铭副教授学术个人网站

## 项目简介

这是一个为南京工业大学化工学院夏铭副教授开发的学术个人网站，采用纯前端技术栈实现，无需后端支持。

## 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5.0
- **UI库**: Element Plus 2.5
- **样式**: CSS3 + CSS变量
- **部署模式**: 多页面应用(MPA)

## 功能模块

网站包含7个独立页面：

1. **首页** (`index.html`) - 个人介绍、教育经历、工作经历、研究方向
2. **组内成员** (`members.html`) - 现指导学生、已毕业学生、团队荣誉
3. **科研成果** (`publications.html`) - 代表论文、专利、获奖情况
4. **合作伙伴** (`partners.html`) - 合作单位、合作领域
5. **项目经费** (`projects.html`) - 科研项目列表、经费统计
6. **电子相册** (`gallery.html`) - 学术会议、团队活动等照片记录
7. **招贤纳士** (`recruitment.html`) - 招生信息、课题组优势

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 `http://localhost:5173` 查看首页
- 首页: http://localhost:5173/
- 组内成员: http://localhost:5173/members.html
- 科研成果: http://localhost:5173/publications.html
- 合作伙伴: http://localhost:5173/partners.html
- 项目经费: http://localhost:5173/projects.html
- 电子相册: http://localhost:5173/gallery.html
- 招贤纳士: http://localhost:5173/recruitment.html

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录中。

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
D:\sx\academic\
├── index.html              # 首页入口
├── members.html            # 组内成员入口
├── publications.html       # 科研成果入口
├── partners.html           # 合作伙伴入口
├── projects.html           # 项目经费入口
├── gallery.html            # 电子相册入口
├── recruitment.html        # 招贤纳士入口
├── package.json            # 项目配置
├── vite.config.js          # Vite配置
├── src/
│   ├── main.js            # 主入口（首页）
│   ├── assets/
│   │   └── styles/        # 全局样式
│   │       ├── variables.css  # CSS变量
│   │       └── common.css     # 通用样式
│   ├── components/        # 公共组件
│   │   ├── PageHeader.vue   # 页面头部
│   │   └── PageFooter.vue   # 页面底部
│   └── pages/            # 各个页面
│       ├── Home/         # 首页
│       ├── Members/      # 组内成员
│       ├── Publications/ # 科研成果
│       ├── Partners/     # 合作伙伴
│       ├── Projects/     # 项目经费
│       ├── Gallery/      # 电子相册
│       └── Recruitment/  # 招贤纳士
└── 资料.md               # 个人资料数据源
```

## 数据说明

- **完整数据**: 从 `资料.md` 中提取的真实数据
  - 个人信息、教育经历、工作经历
  - 8篇代表论文、5项专利、6项奖励
  - 9个科研项目、9个参与会议
  - 6家合作单位、完整的学生名单

- **占位符数据**: 标记为 `[占位符]` 的内容
  - 最新新闻/动态
  - 具体项目经费数额
  - 相册图片
  - 论文PDF链接
  - 具体联系方式（邮箱、电话）

## 样式设计

- **主题色**: 学术蓝 (#1a3a5c)
- **辅助色**: 灰色系、白色
- **字体**: 标题使用衬线字体，正文使用微软雅黑
- **布局**: 响应式设计，适配桌面端和平板
- **动效**: 温和的hover效果和过渡动画

## 注意事项

1. **个人照片**: 需要将 `照片.png` 放置在项目根目录或 `public` 目录中
2. **MPA模式**: 每个页面都是独立的HTML文件，可直接访问
3. **路由**: 使用静态链接而非Vue Router，更适合学术网站SEO
4. **浏览器兼容**: 建议使用现代浏览器（Chrome、Firefox、Edge等）

## 更新内容

### 需要更新的占位符内容

1. 联系方式中的邮箱和电话
2. 相册中的实际图片
3. 论文的PDF链接
4. 项目经费的具体数额
5. 最新新闻和动态内容

### 如何更新

1. **联系方式**: 修改 `src/components/PageFooter.vue` 中的占位符
2. **论文PDF**: 修改 `src/pages/Publications/index.vue` 中的链接
3. **项目经费**: 修改 `src/pages/Projects/index.vue` 中的经费数据
4. **相册图片**: 替换 `src/pages/Gallery/index.vue` 中的占位符为实际图片

## 开发说明

- 遵循 Vue 3 Composition API 最佳实践
- 组件化设计，便于维护和扩展
- 使用CSS变量统一管理样式
- 响应式设计，适配不同屏幕尺寸

## 许可证

MIT License

---

**开发者**: AI Assistant
**最后更新**: 2024年
**版本**: 1.0.0
