<template>
  <div class="projects-page">
    <div class="page-layout">
      <!-- 左侧导航栏 -->
      <PageSideNav
        :items="navItems"
        :active-id="activeSection"
        @item-click="scrollToSectionById"
      />

      <!-- 右侧内容区域 -->
      <div class="page-content">
        <!-- 专业能力 -->
        <div id="tab-expertise" class="section-card">
      <h3 class="subsection-title">{{ $t('projects.expertise') }}</h3>

      <!-- 翻译状态 -->
      <div v-if="isTranslating" class="loading-container">
        <el-icon class="is-loading" :size="40"><Loading /></el-icon>
        <p>{{ $t('common.loading') }}</p>
      </div>

      <div v-else class="expertise-grid">
        <div v-for="item in expertise" :key="item.id" class="expertise-card">
          <h4 class="expertise-name">{{ item.name }}</h4>
          <p class="expertise-desc">{{ item.description }}</p>
        </div>
      </div>
    </div>

    <!-- 合作伙伴 -->
    <div id="tab-partners" class="section-card">
      <h3 class="subsection-title">{{ $t('projects.partners') }}</h3>

      <!-- 翻译状态 -->
      <div v-if="isTranslating" class="loading-container">
        <el-icon class="is-loading" :size="40"><Loading /></el-icon>
        <p>{{ $t('common.loading') }}</p>
      </div>

      <template v-else>
        <!-- 合作介绍 -->
        <div class="intro-section">
          <p class="intro-text">
            {{ $t('publications.partnersIntro') }}
          </p>
        </div>

        <!-- 合作单位 -->
        <div class="partners-section">
          <h4 class="section-subtitle">{{ $t('publications.collaborationUnits') }}</h4>
          <div class="partners-grid">
            <div v-for="(partner, index) in partners" :key="partner.id" class="partner-card">
              <div class="partner-logo">
                <img v-if="partner.logoUrl" :src="getFullImageUrl(partner.logoUrl)" :alt="partner.name" class="partner-logo-img" />
                <span v-else>{{ partner.name?.charAt(0) || '合' }}</span>
              </div>
              <h5 class="partner-name">{{ partner.name }}</h5>
              <el-tag v-if="partner.cooperationType" :type="partner.cooperationType.includes('企业') ? 'success' : 'primary'" size="small">
                {{ partner.cooperationType }}
              </el-tag>
            </div>
          </div>
        </div>

        <!-- 合作领域 -->
        <div class="areas-section">
          <h4 class="section-subtitle">{{ $t('publications.collaborationAreas') }}</h4>
          <div class="areas-grid">
            <div class="area-item">
              <div class="area-icon">🏭</div>
              <h5>{{ $t('publications.area1Title') }}</h5>
              <p>{{ $t('publications.area1Desc') }}</p>
            </div>
            <div class="area-item">
              <div class="area-icon">🔬</div>
              <h5>{{ $t('publications.area2Title') }}</h5>
              <p>{{ $t('publications.area2Desc') }}</p>
            </div>
            <div class="area-item">
              <div class="area-icon">⚙️</div>
              <h5>{{ $t('publications.area3Title') }}</h5>
              <p>{{ $t('publications.area3Desc') }}</p>
            </div>
            <div class="area-item">
              <div class="area-icon">🔧</div>
              <h5>{{ $t('publications.area4Title') }}</h5>
              <p>{{ $t('publications.area4Desc') }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, onUnmounted } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import { publicationsApi } from '@/api'
import { API_BASE_URL } from '@/config'
import { useTranslation } from '@/utils/i18n/useTranslation'
import i18n from '@/utils/i18n'
import PageSideNav from '@/components/PageSideNav.vue'

// 专业能力
const {
  originalData: originalExpertise,
  displayData: expertise,
  updateOriginalData: updateExpertise,
  isTranslating: isTranslatingExpertise
} = useTranslation([], {
  textFields: ['name', 'description']
})

// 合作伙伴
const {
  originalData: originalPartners,
  displayData: partners,
  updateOriginalData: updatePartners,
  isTranslating: isTranslatingPartners
} = useTranslation([], {
  textFields: ['name', 'cooperationType']
})

// 计算是否正在翻译
const isTranslating = computed(() =>
  isTranslatingExpertise.value || isTranslatingPartners.value
)

// 导航相关
const activeSection = ref('tab-expertise')

const navItems = computed(() => [
  { id: 'tab-expertise', label: i18n.global.t('projects.expertise') },
  { id: 'tab-partners', label: i18n.global.t('projects.partners') }
])

const scrollToSectionById = (id) => {
  const targetElement = document.getElementById(id)
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    activeSection.value = id
  }
}

let scrollTimer = null
const handleScroll = () => {
  if (scrollTimer) return
  scrollTimer = setTimeout(() => {
    const sections = ['tab-expertise', 'tab-partners']
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 150 && rect.bottom >= 150) {
          activeSection.value = sectionId
          break
        }
      }
    }
    scrollTimer = null
  }, 100)
}

// 获取完整图片URL
const getFullImageUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `${API_BASE_URL}${url}`
}

// 加载专业能力数据
const loadExpertise = async () => {
  try {
    const res = await publicationsApi.getExpertise()
    updateExpertise(res.data || [])
  } catch (error) {
    console.error('加载专业能力数据失败:', error)
  }
}

// 加载合作伙伴数据
const loadPartners = async () => {
  try {
    const res = await publicationsApi.getPartners()
    updatePartners(res.data || [])
  } catch (error) {
    console.error('加载合作伙伴数据失败:', error)
  }
}

// 解析URL参数并跳转到指定区块
const scrollToTab = () => {
  setTimeout(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tab = urlParams.get('tab')
    if (tab) {
      const targetElement = document.getElementById(`tab-${tab}`)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'auto',
          block: 'start'
        })
        console.log(`跳转到区块: ${tab}`)
      } else {
        console.warn(`未找到区块: tab-${tab}`)
      }
    }
  }, 300)
}

onMounted(() => {
  loadExpertise()
  loadPartners()

  nextTick(() => {
    scrollToTab()
  })
  // 添加滚动监听
  window.addEventListener('scroll', handleScroll, { passive: true })
})

// 组件卸载时移除滚动监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@import '../../assets/styles/variables.css';
@import '../../assets/styles/common.css';

.projects-page {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 页面布局 */
.page-layout {
  display: flex;
  gap: 24px;
  position: relative;
}

.page-content {
  flex: 1;
  min-width: 0;
}

/* 响应式 */
@media (max-width: 1024px) {
  .page-layout {
    flex-direction: column;
  }
}

.section-card {
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  transition: all 0.3s ease;
}

.section-card:hover {
  box-shadow: var(--shadow-md);
}

.subsection-title {
  font-family: var(--font-serif);
  font-size: 24px;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  padding-bottom: 12px;
  border-bottom: 2px solid var(--primary-light);
}

/* 专业能力样式 */
.expertise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.expertise-card {
  padding: var(--spacing-md);
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border-radius: var(--radius-md);
  border-left: 4px solid #22c55e;
  transition: all 0.3s ease;
}

.expertise-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

.expertise-name {
  font-size: 20px;
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
  font-family: var(--font-serif);
  font-weight: 600;
}

.expertise-desc {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: #999;
}

/* 合作伙伴样式 */
.intro-section {
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-left: 4px solid var(--primary-color);
  border-radius: var(--radius-md);
}

.intro-text {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-primary);
  text-indent: 2em;
}

.section-subtitle {
  font-size: 20px;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  margin-top: var(--spacing-lg);
  padding-left: 12px;
  border-left: 4px solid var(--accent-color);
}

.partners-section,
.areas-section {
  margin-bottom: var(--spacing-lg);
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.partner-card {
  text-align: center;
  padding: var(--spacing-md);
  background: var(--bg-light);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;
}

.partner-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.partner-logo {
  width: 100px;
  height: 100px;
  margin: 0 auto var(--spacing-sm);
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 700;
  color: white;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.partner-logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.partner-name {
  font-size: 16px;
  color: var(--text-primary);
  margin-bottom: 8px;
  line-height: 1.4;
  font-weight: 600;
}

.areas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.area-item {
  text-align: center;
  padding: var(--spacing-md);
  background: var(--bg-light);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.area-item:hover {
  background: white;
  box-shadow: var(--shadow-md);
  transform: translateY(-5px);
}

.area-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-sm);
}

.area-item h5 {
  font-size: 18px;
  color: var(--primary-color);
  margin-bottom: 8px;
  font-weight: 600;
}

.area-item p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .partners-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .areas-grid {
    grid-template-columns: 1fr;
  }

  .section-subtitle {
    margin-top: var(--spacing-md);
  }
}
</style>
