# 快速开始指南

## 🚀 立即运行项目

### 1. 安装依赖

首次运行需要安装项目依赖：

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 访问网站

开发服务器启动后，在浏览器中访问：

- **首页**: http://localhost:5173/
- **组内成员**: http://localhost:5173/members.html
- **科研成果**: http://localhost:5173/publications.html
- **合作伙伴**: http://localhost:5173/partners.html
- **项目经费**: http://localhost:5173/projects.html
- **电子相册**: http://localhost:5173/gallery.html
- **招贤纳士**: http://localhost:5173/recruitment.html

## 📦 构建生产版本

当开发完成后，可以构建生产版本：

```bash
npm run build
```

构建完成后，在 `dist` 目录中会生成所有静态文件，可以直接部署到任何静态网站托管服务。

## 🌐 部署建议

### 部署到服务器

1. 运行 `npm run build` 构建项目
2. 将 `dist` 目录中的所有文件上传到服务器
3. 确保服务器支持静态文件托管

### 推荐的托管平台

- **GitHub Pages**: 免费托管，适合展示
- **Netlify**: 自动部署，支持自定义域名
- **Vercel**: 快速部署，全球CDN
- **阿里云OSS**: 国内访问速度快

## 🔧 常见问题

### Q: 照片无法显示？
A: 确保 `照片.png` 文件位于项目根目录或 `public` 目录中。

### Q: 样式显示异常？
A: 清除浏览器缓存或重新运行 `npm install`。

### Q: 想修改内容？
A: 直接编辑对应页面的 `.vue` 文件，修改后会自动热更新。

## 📝 内容更新说明

### 需要手动更新的占位符内容

1. **联系方式** - `src/components/PageFooter.vue` (第9-11行)
2. **论文PDF链接** - `src/pages/Publications/index.vue`
3. **项目经费数额** - `src/pages/Projects/index.vue`
4. **相册图片** - `src/pages/Gallery/index.vue`
5. **最新动态** - `src/pages/Home/index.vue`

### 更新步骤

1. 找到对应的 `.vue` 文件
2. 搜索 `[占位符]` 关键字
3. 替换为实际内容
4. 保存后自动更新

## 🎨 自定义样式

如需修改颜色主题，编辑 `src/assets/styles/variables.css`：

```css
:root {
  --primary-color: #1a3a5c;  /* 主题色 */
  --primary-light: #2d5a8a;  /* 浅色主题 */
  --primary-dark: #0f2540;   /* 深色主题 */
}
```

## 📞 技术支持

如有问题，请参考：
- Vue 3文档: https://cn.vuejs.org/
- Element Plus文档: https://element-plus.org/
- Vite文档: https://cn.vitejs.dev/

---

祝使用愉快！🎉
