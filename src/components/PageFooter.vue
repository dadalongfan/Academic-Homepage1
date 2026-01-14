<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>联系方式</h3>
          <p><i class="icon">📧</i> 邮箱：[占位符] @njtech.edu.cn</p>
          <p><i class="icon">📱</i> 电话：[占位符]</p>
          <p><i class="icon">📍</i> 地址：江苏省南京市江北新区浦珠南路30号</p>
        </div>
        <div class="footer-section">
          <h3>快速链接</h3>
          <ul>
            <li><a href="/">首页</a></li>
            <li><a href="/publications.html">科研成果</a></li>
            <li><a href="/recruitment.html">招贤纳士</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>相关机构</h3>
          <p>南京工业大学</p>
          <p>化工学院</p>
          <p>材料化学工程国家重点实验室</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 夏铭课题组. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 无需额外逻辑
</script>

<style scoped>
.footer {
  background: var(--primary-dark);
  color: white;
  margin-top: var(--spacing-xl);
  padding: var(--spacing-lg) 0 var(--spacing-md);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.footer-section h3 {
  font-size: 18px;
  margin-bottom: var(--spacing-sm);
  color: var(--accent-color);
}

.footer-section p,
.footer-section li {
  font-size: 14px;
  line-height: 1.8;
  margin-bottom: 8px;
  opacity: 0.9;
}

.footer-section ul {
  list-style: none;
}

.footer-section a {
  color: white;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.footer-section a:hover {
  opacity: 0.7;
}

.icon {
  margin-right: 8px;
}

.footer-bottom {
  text-align: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
  opacity: 0.8;
}
</style>
