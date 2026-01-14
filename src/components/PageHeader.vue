<template>
  <header class="header">
    <div class="header-container">
      <div class="header-left">
        <h1 class="site-title">夏铭副教授</h1>
        <p class="site-subtitle">南京工业大学化工学院 · 材料化学工程国家重点实验室</p>
      </div>
      <nav class="nav">
        <a href="/index.html" class="nav-item" :class="{ active: currentPage === 'home' }">首页</a>
        <a href="/members.html" class="nav-item" :class="{ active: currentPage === 'members' }">组内成员</a>
        <a href="/publications.html" class="nav-item" :class="{ active: currentPage === 'publications' }">科研成果</a>
        <a href="/partners.html" class="nav-item" :class="{ active: currentPage === 'partners' }">合作伙伴</a>
        <a href="/projects.html" class="nav-item" :class="{ active: currentPage === 'projects' }">项目经费</a>
        <a href="/gallery.html" class="nav-item" :class="{ active: currentPage === 'gallery' }">电子相册</a>
        <a href="/recruitment.html" class="nav-item" :class="{ active: currentPage === 'recruitment' }">招贤纳士</a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentPage = ref('')

onMounted(() => {
  // 获取当前页面路径
  const path = window.location.pathname

  // 根据路径判断当前页面
  if (path === '/' || path === '/index.html' || path.endsWith('/index.html')) {
    currentPage.value = 'home'
  } else if (path.includes('members.html')) {
    currentPage.value = 'members'
  } else if (path.includes('publications.html')) {
    currentPage.value = 'publications'
  } else if (path.includes('partners.html')) {
    currentPage.value = 'partners'
  } else if (path.includes('projects.html')) {
    currentPage.value = 'projects'
  } else if (path.includes('gallery.html')) {
    currentPage.value = 'gallery'
  } else if (path.includes('recruitment.html')) {
    currentPage.value = 'recruitment'
  }
})
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  color: white;
  padding: var(--spacing-md) 0;
  box-shadow: var(--shadow-md);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  flex: 1;
}

.site-title {
  font-family: var(--font-serif);
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.site-subtitle {
  font-size: 14px;
  opacity: 0.9;
  font-weight: 300;
}

.nav {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.nav-item {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.nav-item:hover,
.nav-item.active {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

@media (max-width: 968px) {
  .header-container {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }

  .site-title {
    font-size: 28px;
  }

  .nav {
    justify-content: center;
  }
}
</style>
