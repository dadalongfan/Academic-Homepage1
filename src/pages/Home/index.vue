<template>
  <div class="home-page">
    <!-- 翻译状态 -->
    <div v-if="isTranslating" class="loading-container">
      <el-icon class="is-loading" :size="40"><Loading /></el-icon>
      <p>{{ $t('common.loading') }}</p>
    </div>

    <template v-else>
      <!-- 首页英雄区域：幻灯片 + 图片滚动 -->
      <div class="home-hero-section">
        <!-- 左侧：幻灯片 -->
        <div
          class="slideshow-container"
          @mouseenter="pauseSlideshow"
          @mouseleave="resumeSlideshow"
        >
        <div
          v-for="(img, index) in slides"
          :key="index"
          class="slide"
          :class="{ active: currentSlide === index }"
        >
          <img :src="img" alt="幻灯片" />
        </div>

        <!-- 左箭头 -->
        <button class="slide-arrow slide-arrow-left" @click="prevSlide">
          ‹
        </button>

        <!-- 右箭头 -->
        <button class="slide-arrow slide-arrow-right" @click="nextSlide">
          ›
        </button>
      </div>

      <!-- 右侧：图片滚动轮播 -->
      <ImageScrollCarousel />
    </div>

    <!-- 年度大事件滚动条 -->
    <AnnualEventsCarousel />

    <!-- 最新动态和代表论文 -->
      <div class="home-top-section">
        <!-- 左边：最新动态 -->
        <div class="home-section-left">
          <div class="section-header">
            <h3 class="section-title-small">{{ $t('home.latestNews') }}</h3>
            <a href="./news.html" class="more-link">{{ $t('home.more') }} ></a>
          </div>
          <div class="news-list">
            <a v-for="news in latestNews" :key="news.id" :href="`./news-detail.html?id=${news.id}`" class="news-item">
              <span class="news-title">{{ news.title }}</span>
              <span class="news-date">{{ formatDate(news.publishDate) }}</span>
            </a>
          </div>
        </div>

        <!-- 右边：代表论文 -->
        <div class="home-section-right">
          <div class="section-header">
            <h3 class="section-title-small">{{ $t('home.featuredPapers') }}</h3>
            <a href="./publications.html" class="more-link">{{ $t('home.more') }} ></a>
          </div>
          <div class="papers-list">
            <a v-for="paper in latestPapers" :key="paper.id" :href="`./publications.html`" class="paper-item">
              <span class="paper-title">{{ paper.title }}</span>
              <span class="paper-journal">{{ paper.journal || '' }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- 4个导航卡片 -->
      <div class="nav-cards">
        <!-- 研究方向 -->
        <a href="./publications.html" class="nav-card">
          <div class="nav-icon">
            <el-icon :size="32" color="#fff"><Collection /></el-icon>
          </div>
          <h3 class="nav-title">{{ $t('home.researchDirection') }}</h3>
          <p class="nav-desc">{{ $t('home.researchDirectionDesc') }}</p>
          <span class="nav-link">{{ $t('home.viewAll') }}</span>
        </a>

        <!-- 课题组简介 -->
        <a href="./team-intro.html" class="nav-card">
          <div class="nav-icon">
            <el-icon :size="32" color="#fff"><UserFilled /></el-icon>
          </div>
          <h3 class="nav-title">{{ $t('home.teamIntro') }}</h3>
          <p class="nav-desc">{{ teamIntroBrief || $t('home.teamIntroDesc') }}</p>
          <span class="nav-link">{{ $t('home.viewAll') }}</span>
        </a>

        <!-- 负责人简介 -->
        <a href="./leader-intro.html" class="nav-card">
          <div class="nav-icon">
            <el-icon :size="32" color="#fff"><User /></el-icon>
          </div>
          <h3 class="nav-title">{{ $t('home.leaderIntro') }}</h3>
          <p class="nav-desc">{{ leaderIntroBrief || $t('home.leaderIntroDesc') }}</p>
          <span class="nav-link">{{ $t('home.viewAll') }}</span>
        </a>

        <!-- 招贤纳士 -->
        <a href="./recruitment.html" class="nav-card">
          <div class="nav-icon">
            <el-icon :size="32" color="#fff"><School /></el-icon>
          </div>
          <h3 class="nav-title">{{ $t('home.recruitment') }}</h3>
          <p class="nav-desc">{{ $t('home.recruitmentDesc') }}</p>
          <span class="nav-link">{{ $t('home.viewAll') }}</span>
        </a>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Loading, Collection, UserFilled, User, School } from '@element-plus/icons-vue'
import { slideshowApi, leaderApi, newsApi, publicationsApi } from '../../api'
import { API_BASE_URL } from '../../config'
import { useTranslation } from '../../utils/i18n/useTranslation'
import ImageScrollCarousel from '@/components/ImageScrollCarousel.vue'
import AnnualEventsCarousel from '@/components/AnnualEventsCarousel.vue'

// 负责人信息翻译
const {
  originalData: originalLeaderInfo,
  displayData: displayLeaderInfo,
  updateOriginalData: updateLeaderInfo,
  isTranslating: isTranslatingLeaderInfo
} = useTranslation({}, {
  textFields: ['name', 'title', 'institution'],
  htmlFields: ['introduction', 'teamIntroduction']
})

// 最新动态翻译
const {
  originalData: originalNewsList,
  displayData: displayNewsList,
  updateOriginalData: updateNewsList,
  isTranslating: isTranslatingNews
} = useTranslation([], {
  textFields: ['title', 'category'],
  htmlFields: ['content']
})

// 代表论文翻译
const {
  originalData: originalPapersList,
  displayData: displayPapersList,
  updateOriginalData: updatePapersList,
  isTranslating: isTranslatingPapers
} = useTranslation([], {
  textFields: ['title', 'journal', 'authors']
})

// 计算是否正在翻译
const isTranslating = computed(() => 
  isTranslatingLeaderInfo.value || isTranslatingNews.value || isTranslatingPapers.value
)

// 团队简介简短描述（取前50个字符）
const teamIntroBrief = computed(() => {
  const text = displayLeaderInfo.value.teamIntroduction || ''
  // 去除HTML标签
  const plainText = text.replace(/<[^>]+>/g, '')
  return plainText.length > 50 ? plainText.substring(0, 50) + '...' : plainText
})

// 负责人简介简短描述（取前50个字符）
const leaderIntroBrief = computed(() => {
  const text = displayLeaderInfo.value.introduction || ''
  // 去除HTML标签
  const plainText = text.replace(/<[^>]+>/g, '')
  return plainText.length > 50 ? plainText.substring(0, 50) + '...' : plainText
})

// 图片幻灯片
const slides = ref([])
const currentSlide = ref(0)
let slideInterval = null

// 最新动态（使用翻译后的数据）
const latestNews = displayNewsList

// 代表论文（使用翻译后的数据）
const latestPapers = displayPapersList

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return dateStr.substring(0, 10)
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

const pauseSlideshow = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = null
  }
}

const resumeSlideshow = () => {
  if (!slideInterval && slides.value.length > 0) {
    slideInterval = setInterval(nextSlide, 3000)
  }
}

// 获取幻灯片数据
const fetchSlideshows = async () => {
  try {
    const res = await slideshowApi.getList()
    const data = res.data || []
    // 将相对路径转换为完整URL
    slides.value = data.map(item => {
      if (item.imageUrl && !item.imageUrl.startsWith('http://') && !item.imageUrl.startsWith('https://')) {
        return `${API_BASE_URL}${item.imageUrl}`
      }
      return item.imageUrl
    })
  } catch (error) {
    console.error('获取幻灯片失败:', error)
  }
}

// 获取负责人基本信息
const fetchLeaderInfo = async () => {
  try {
    const res = await leaderApi.getInfo()
    const data = res.data || {}
    updateLeaderInfo(data)
  } catch (error) {
    console.error('获取负责人信息失败:', error)
  }
}

// 获取最新动态
const fetchLatestNews = async () => {
  try {
    const res = await newsApi.getList()
    const data = res.data || []
    // 按发布时间降序排序，取前5条
    const sortedData = data
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, 5)
    // 更新翻译数据
    await updateNewsList(sortedData)
  } catch (error) {
    console.error('获取最新动态失败:', error)
  }
}

// 获取代表论文
const fetchLatestPapers = async () => {
  try {
    const res = await publicationsApi.getPapers()
    const data = res.data || []
    // 取前5条
    const slicedData = data.slice(0, 5)
    // 更新翻译数据
    await updatePapersList(slicedData)
  } catch (error) {
    console.error('获取代表论文失败:', error)
  }
}

onMounted(() => {
  fetchSlideshows()
  fetchLeaderInfo()
  fetchLatestNews()
  fetchLatestPapers()
  resumeSlideshow()
})

onUnmounted(() => {
  pauseSlideshow()
})
</script>

<style scoped>
@import '../../assets/styles/variables.css';
@import '../../assets/styles/common.css';

.home-page {
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

/* 首页英雄区域 */
.home-hero-section {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

/* 图片幻灯片 */
.slideshow-container {
  height: 500px;
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.slide.active {
  opacity: 1;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #f5f5f5;
}

/* 幻灯片箭头 */
.slide-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  padding: 0;
  line-height: 1;
}

.slide-arrow:hover {
  background: rgba(0, 0, 0, 0.6);
  transform: translateY(-50%) scale(1.1);
}

.slide-arrow-left {
  left: 20px;
}

.slide-arrow-right {
  right: 20px;
}

/* 最新动态和代表论文 */
.home-top-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.home-section-left,
.home-section-right {
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-md);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--primary-color);
  margin-bottom: var(--spacing-md);
}

.section-title-small {
  font-family: var(--font-serif);
  font-size: 20px;
  color: var(--primary-color);
  margin: 0;
}

.more-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.more-link:hover {
  color: var(--primary-color);
}

.news-list,
.papers-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.news-item,
.paper-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm);
  background: var(--bg-light);
  border-radius: var(--radius-sm);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.news-item:hover,
.paper-item:hover {
  background: white;
  box-shadow: var(--shadow-sm);
  transform: translateX(5px);
}

.news-title,
.paper-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: var(--text-primary);
}

.news-date,
.paper-journal {
  color: var(--text-secondary);
  font-size: 12px;
  margin-left: var(--spacing-sm);
  flex-shrink: 0;
}

/* 导航卡片 - 学术风格 */
.nav-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: var(--spacing-lg);
  padding: 0 10px;
}

.nav-card {
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.nav-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #1e3a5f 0%, #2c5282 50%, #3182ce 100%);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.nav-card:hover {
  box-shadow: 0 20px 40px rgba(30, 58, 95, 0.15);
  transform: translateY(-8px);
  border-color: #d0d7de;
}

.nav-card:hover::before {
  transform: scaleX(1);
}

.nav-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 8px 24px rgba(30, 58, 95, 0.3);
  position: relative;
}

.nav-icon::before {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
}

.nav-icon .el-icon {
  position: relative;
  z-index: 1;
}

.nav-title {
  font-family: var(--font-serif);
  font-size: 18px;
  color: #1e3a5f;
  margin-bottom: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.nav-desc {
  font-size: 13px;
  color: #4a5568;
  line-height: 1.8;
  margin-bottom: 20px;
  flex: 1;
  text-align: justify;
  text-align-last: center;
}

.nav-link {
  color: #2c5282;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.5px;
  padding: 8px 20px;
  border: 1.5px solid #2c5282;
  border-radius: 20px;
  transition: all 0.3s ease;
  background: transparent;
}

.nav-card:hover .nav-link {
  background: #2c5282;
  color: white;
  border-color: #2c5282;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: #999;
}

/* 响应式设计 */
@media (max-width: 968px) {
  .home-hero-section {
    grid-template-columns: 1fr;
  }

  .slideshow-container {
    min-height: 250px;
    max-height: 400px;
  }

  .home-top-section {
    grid-template-columns: 1fr;
  }

  .nav-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .slide-arrow {
    width: 40px;
    height: 40px;
    font-size: 24px;
  }

  .slide-arrow-left {
    left: 10px;
  }

  .slide-arrow-right {
    right: 10px;
  }
}

@media (max-width: 576px) {
  .nav-cards {
    grid-template-columns: 1fr;
  }
}
</style>
