<template>
  <header class="header">
    <!-- Logo横幅 - 文字重叠在图片上方，语言切换在右侧 -->
    <div class="logo-banner">
      <div class="banner-wrapper">
        <!-- 左侧：文字重叠在图片上 -->
        <div class="banner-left">
          <!-- 文字重叠在图片左侧 -->
          <div class="banner-title">
            <h1 class="site-title">
              介质过程强化团队
              <span class="site-title-en">Mater Process Intensification Group</span>
            </h1>
            <p class="site-slogan">
              我们的事业，化工的未来
              <span class="site-slogan-en">Our Specialty, ChEng in Future</span>
            </p>
          </div>
          <!-- 图片 -->
          <img src="/logo.png" alt="Logo" class="logo-banner-image" />
        </div>
        <!-- 右侧：语言切换按钮 -->
        <div class="banner-language">
          <button 
            class="language-btn" 
            :class="{ active: currentLocale === 'en' }"
            @click="switchLanguage('en')"
          >
            EN
          </button>
          <button 
            class="language-btn" 
            :class="{ active: currentLocale === 'zh' }"
            @click="switchLanguage('zh')"
          >
            中
          </button>
        </div>
      </div>
    </div>

    <!-- 导航区域 -->
    <div class="header-content">
      <div class="header-container">
        <nav class="nav">
          <a href="./index.html" class="nav-item" :class="{ active: currentPage === 'home' }">{{ $t('home') }}</a>
          
          <!-- 新闻动态下拉菜单 -->
          <div 
            class="nav-item has-dropdown" 
            :class="{ active: currentPage === 'news' }"
            @mouseenter="showNewsDropdown = true"
            @mouseleave="showNewsDropdown = false"
          >
            <a href="./news.html" class="nav-link">{{ $t('news') }}</a>
            <transition name="dropdown">
              <ul v-show="showNewsDropdown" class="dropdown-menu">
                <li><a href="./news.html" class="dropdown-item">{{ $t('news.latest') }}</a></li>
                <li v-for="year in newsYears" :key="year">
                  <a :href="`./news.html?year=${year}`" class="dropdown-item">{{ year }}{{ $t('news.year') }}</a>
                </li>
              </ul>
            </transition>
          </div>
          
          <!-- 团队成员下拉菜单 -->
          <div
            v-if="translatedMemberRoles.length > 0"
            class="nav-item has-dropdown"
            :class="{ active: currentPage === 'members' }"
            @mouseenter="showMembersDropdown = true"
            @mouseleave="showMembersDropdown = false"
          >
            <a href="./members.html" class="nav-link">{{ $t('members') }}</a>
            <transition name="dropdown">
              <ul v-show="showMembersDropdown" class="dropdown-menu">
                <li v-for="role in translatedMemberRoles" :key="role.id">
                  <a :href="`./members.html?role=${role.id}`" class="dropdown-item">{{ getTranslatedRoleName(role) }}</a>
                </li>
              </ul>
            </transition>
          </div>
          <a v-else href="./members.html" class="nav-item" :class="{ active: currentPage === 'members' }">{{ $t('members') }}</a>
          
          <!-- 研究下拉菜单 -->
          <div
            class="nav-item has-dropdown"
            :class="{ active: currentPage === 'publications' }"
            @mouseenter="showPublicationsDropdown = true"
            @mouseleave="showPublicationsDropdown = false"
          >
            <a href="./publications.html" class="nav-link">{{ $t('publications') }}</a>
            <transition name="dropdown">
              <ul v-show="showPublicationsDropdown" class="dropdown-menu">
                <li><a href="./publications.html" class="dropdown-item">{{ $t('publications.researchDirections') }}</a></li>
                <li><a href="./publications.html?section=projects" class="dropdown-item">{{ $t('publications.projects') }}</a></li>
                <li><a href="./publications.html?section=patents" class="dropdown-item">{{ $t('publications.patents') }}</a></li>
                <li><a href="./publications.html?section=papers" class="dropdown-item">{{ $t('publications.papers') }}</a></li>
              </ul>
            </transition>
          </div>

          <!-- 应用开发下拉菜单 -->
          <div
            class="nav-item has-dropdown"
            :class="{ active: currentPage === 'projects' }"
            @mouseenter="showProjectsDropdown = true"
            @mouseleave="showProjectsDropdown = false"
          >
            <a href="./projects.html" class="nav-link">{{ $t('projects') }}</a>
            <transition name="dropdown">
              <ul v-show="showProjectsDropdown" class="dropdown-menu">
                <li><a href="./projects.html?tab=expertise" class="dropdown-item">{{ $t('projects.expertise') }}</a></li>
                <li><a href="./projects.html?tab=partners" class="dropdown-item">{{ $t('projects.partners') }}</a></li>
              </ul>
            </transition>
          </div>

          <!-- 文化下拉菜单 -->
          <div
            class="nav-item has-dropdown"
            :class="{ active: currentPage === 'culture' || currentPage === 'journey' || currentPage === 'daily' }"
            @mouseenter="showCultureDropdown = true"
            @mouseleave="showCultureDropdown = false"
          >
            <a href="./journey.html" class="nav-link">{{ $t('culture') }}</a>
            <transition name="dropdown">
              <ul v-show="showCultureDropdown" class="dropdown-menu">
                <li><a href="./journey.html" class="dropdown-item">{{ $t('culture.researchJourney') }}</a></li>
                <li><a href="./daily.html" class="dropdown-item">{{ $t('culture.dailyLife') }}</a></li>
                <li><a href="./culture.html" class="dropdown-item">{{ $t('culture.teamStyle') }}</a></li>
              </ul>
            </transition>
          </div>

          <a href="./recruitment.html" class="nav-item" :class="{ active: currentPage === 'recruitment' }">{{ $t('recruitment') }}</a>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import i18n from '../utils/i18n'
import { newsApi, membersApi } from '../api'
import { getBatchTranslation } from '../utils/i18n/translationService'

const currentPage = ref('')
const { locale } = useI18n()
const currentLocale = ref(locale.value)

// 下拉菜单显示状态
const showNewsDropdown = ref(false)
const showMembersDropdown = ref(false)
const showProjectsDropdown = ref(false)
const showCultureDropdown = ref(false)
const showPublicationsDropdown = ref(false)

// 新闻年份列表
const newsYears = ref([])

// 监听语言变化，更新currentLocale
watch(locale, (newValue) => {
  currentLocale.value = newValue
})

const switchLanguage = (lang) => {
  // 使用我们自定义的i18n实例的switchLanguage方法
  i18n.global.switchLanguage(lang)
}

// 加载新闻年份
const loadNewsYears = async () => {
  try {
    const res = await newsApi.getList()
    if (res.code === 200 && res.data) {
      // 提取年份并去重排序
      const years = [...new Set(res.data.map(news => {
        if (news.publishDate) {
          return new Date(news.publishDate).getFullYear()
        }
        return null
      }).filter(year => year !== null))]
      
      // 降序排列（最新的年份在前）
      newsYears.value = years.sort((a, b) => b - a)
    }
  } catch (error) {
    console.error('加载新闻年份失败:', error)
  }
}

// 翻译后的角色列表
const translatedMemberRoles = ref([])

// 加载并翻译成员角色
const loadAndTranslateMemberRoles = async () => {
  try {
    // 先加载所有角色
    const rolesRes = await membersApi.getRoles()
    if (rolesRes.code !== 200 || !rolesRes.data) {
      translatedMemberRoles.value = []
      return
    }

    // 加载所有成员
    const membersRes = await membersApi.getList()
    if (membersRes.code !== 200 || !membersRes.data) {
      translatedMemberRoles.value = []
      return
    }

    // 统计每个角色的成员数量
    const roleCounts = {}
    membersRes.data.forEach(member => {
      if (member.roleId) {
        const roleId = String(member.roleId)
        roleCounts[roleId] = (roleCounts[roleId] || 0) + 1
      }
    })

    // 只保留有成员的角色
    const rolesWithMembers = rolesRes.data
      .filter(role => roleCounts[String(role.id)] > 0)
      .sort((a, b) => a.sortOrder - b.sortOrder)

    // 提取角色名称进行批量翻译
    const roleNames = rolesWithMembers.map(role => role.name)
    // 根据当前语言确定翻译方向
    // 如果当前是中文，源语言是中文，目标语言也是中文（不翻译）
    // 如果当前是英文，源语言是中文，目标语言是英文
    const sourceLang = 'zh'
    const targetLang = currentLocale.value === 'en' ? 'en' : 'zh'
    const translatedNames = await getBatchTranslation(roleNames, sourceLang, targetLang)

    // 合并翻译后的名称
    translatedMemberRoles.value = rolesWithMembers.map((role, index) => ({
      ...role,
      displayName: translatedNames[index] || role.name
    }))
  } catch (error) {
    console.error('加载成员角色失败:', error)
    translatedMemberRoles.value = []
  }
}

// 获取翻译后的角色名称
const getTranslatedRoleName = (role) => {
  return role.displayName || role.name
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
  } else if (path.includes('culture.html')) {
    currentPage.value = 'culture'
  } else if (path.includes('journey.html')) {
    currentPage.value = 'journey'
  } else if (path.includes('journey-detail.html')) {
    currentPage.value = 'journey'
  } else if (path.includes('recruitment.html')) {
    currentPage.value = 'recruitment'
  } else if (path.includes('daily.html')) {
    currentPage.value = 'daily'
  }

  // 加载数据
  loadNewsYears()
  loadAndTranslateMemberRoles()
})

// 监听语言变化，重新翻译成员角色
watch(locale, () => {
  loadAndTranslateMemberRoles()
})
</script>

<style scoped>
.header {
  background: white;
  box-shadow: var(--shadow-md);
  position: relative;
  z-index: 100;
}

/* Logo横幅 - 相对定位容器 */
.logo-banner {
  background: white;
  padding: 0;
  position: relative;
}

.banner-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: stretch;
}

/* 左侧容器 */
.banner-left {
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
}

/* 图片 */
.logo-banner-image {
  max-width: 100%;
  height: auto;
  max-height: 200px;
  display: block;
  object-fit: contain;
}

/* 文字重叠在图片上方 - 绝对定位左侧 */
.banner-title {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  padding: 20px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 8px;
  backdrop-filter: blur(5px);
}

.site-title {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
  letter-spacing: 1px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.site-title-en {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
}

.site-subtitle {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 400;
  line-height: 1.4;
}

.site-slogan {
  font-size: 14px;
  color: var(--primary-color);
  font-weight: 600;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  font-style: italic;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.site-slogan-en {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 500;
  font-style: italic;
}

/* 语言切换在图片右侧 */
.banner-language {
  display: flex;
  flex-direction: row;
  width: 120px;
  align-self: stretch;
}

.language-btn {
  flex: 1;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
}

.language-btn:first-child {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.language-btn:hover {
  background: rgba(255, 255, 255, 1);
}

.language-btn.active {
  background: var(--primary-color);
  color: white;
  font-weight: 600;
}

/* 导航区域 */
.header-content {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  color: white;
  padding: var(--spacing-sm) 0;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav {
  display: flex;
  gap: 0;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.nav-item {
  color: white;
  text-decoration: none;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex: 1;
  text-align: center;
  min-width: 120px;
  max-width: 200px;
  position: relative;
}

.nav-link {
  color: white;
  text-decoration: none;
  display: block;
}

.nav-item:hover,
.nav-item.active {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

/* 下拉菜单基础样式 - 可复用 */
.has-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 160px;
  z-index: 1000;
  overflow: hidden;
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-item {
  display: block;
  padding: 12px 16px;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  border-bottom: 1px solid #f0f0f0;
  text-align: center;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: var(--primary-light);
  color: white;
}

/* 下拉菜单动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-10px);
}

@media (max-width: 968px) {
  .banner-title {
    left: 10px;
    padding: 15px;
    max-width: 50%;
  }

  .banner-language {
    right: 10px;
  }

  .site-title {
    font-size: 20px;
  }

  .site-subtitle {
    font-size: 11px;
  }

  .nav-item {
    padding: 10px 12px;
    font-size: 14px;
    min-width: auto;
    max-width: none;
  }
  
  .dropdown-menu {
    min-width: 140px;
  }
  
  .dropdown-item {
    padding: 10px 12px;
    font-size: 13px;
  }
}

@media (max-width: 640px) {
  .banner-container {
    flex-direction: column;
  }

  .banner-title {
    position: relative;
    left: auto;
    top: auto;
    transform: none;
    background: white;
    text-align: center;
    width: 100%;
    max-width: 100%;
  }

  .banner-language {
    position: relative;
    right: auto;
    top: auto;
    transform: none;
    margin-top: 10px;
  }
}
</style>
