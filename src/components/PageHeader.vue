<template>
  <header class="header">
    <!-- Logo横幅 -->
    <div class="logo-banner">
      <img src="/logo.png" alt="Logo" class="logo-banner-image" />
    </div>

    <!-- 标题和导航区域 -->
    <div class="header-content">
      <div class="header-container">
        <div class="header-left">
          <h1 class="site-title">{{ $t('介质过程强化团队') }}</h1>
          <p class="site-subtitle">{{ $t('南京工业大学化工学院 · 材料化学工程国家重点实验室') }}</p>
        </div>
        <div class="header-right">
          <nav class="nav">
            <a href="/index.html" class="nav-item" :class="{ active: currentPage === 'home' }">{{ $t('home') }}</a>
            <a href="/news.html" class="nav-item" :class="{ active: currentPage === 'news' }">{{ $t('news') }}</a>
            <a href="/members.html" class="nav-item" :class="{ active: currentPage === 'members' }">{{ $t('members') }}</a>
            <a href="/publications.html" class="nav-item" :class="{ active: currentPage === 'publications' }">{{ $t('publications') }}</a>
            <!-- <a href="/partners.html" class="nav-item" :class="{ active: currentPage === 'partners' }">合作伙伴</a>-->
            <a href="/projects.html" class="nav-item" :class="{ active: currentPage === 'projects' }">{{ $t('projects') }}</a>
            <a href="/gallery.html" class="nav-item" :class="{ active: currentPage === 'gallery' }">{{ $t('gallery') }}</a>
            <a href="/recruitment.html" class="nav-item" :class="{ active: currentPage === 'recruitment' }">{{ $t('recruitment') }}</a>
          </nav>
          <div class="language-switcher">
            <button 
              class="language-btn" 
              :class="{ active: currentLocale === 'zh' }"
              @click="switchLanguage('zh')"
            >
              中文
            </button>
            <button 
              class="language-btn" 
              :class="{ active: currentLocale === 'en' }"
              @click="switchLanguage('en')"
            >
              English
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import i18n from '../utils/i18n'

const currentPage = ref('')
const { locale } = useI18n()
const currentLocale = ref(locale.value)

// 监听语言变化，更新currentLocale
watch(locale, (newValue) => {
  currentLocale.value = newValue
})

const switchLanguage = (lang) => {
  // 使用我们自定义的i18n实例的switchLanguage方法
  i18n.global.switchLanguage(lang)
}

onMounted(() => {
  // 获取当前页面路径
  const path = window.location.pathname

  // 根据路径判断当前页面
  if (path === '/' || path === '/index.html' || path.endsWith('/index.html')) {
    currentPage.value = 'home'
  } else if (path.includes('news.html')) {
    currentPage.value = 'news'
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
  background: white;
  box-shadow: var(--shadow-md);
}

/* Logo横幅 - 核心修改：添加水平居中样式 */
.logo-banner {
  max-width: 1200px;
  background: white;
  display: flex;
  justify-content: center; /* 让内部图片水平居中 */
  align-items: center;     /* 让内部图片垂直居中 */
  padding: 0;
  /* 以下是新增的居中核心样式 */
  margin: 0 auto;          /* 关键：让容器自身水平居中 */
  width: 100%;             /* 让容器先占满父级宽度，再通过max-width限制最大宽度 */
}

.logo-banner-image {
  max-width: 100%;         /* 修改：图片宽度适配容器，避免超出1200px */
  height: auto;
  display: block;
  object-fit: cover;
}

/* 标题和导航区域 */
.header-content {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  color: white;
  padding: var(--spacing-md) 0;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.language-switcher {
  display: flex;
  gap: 8px;
}

.language-btn {
  padding: 6px 12px;
  border: none;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.language-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.language-btn.active {
  background: rgba(255, 255, 255, 0.4);
  font-weight: 600;
}

.header-left {
  flex: 1;
}

.site-title {
  font-family: var(--font-serif);
  font-size: 28px;
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
  font-size: 17px;
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
