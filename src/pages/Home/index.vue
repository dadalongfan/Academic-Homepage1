<template>
  <div class="home-page" v-loading="loading">
    <!-- 主容器：幻灯片 + 团队简介（左） + 个人简介（右） -->
    <div class="home-hero">
      <!-- 左侧列：幻灯片 + 团队简介 (70%) -->
      <div class="left-column">
        <!-- 图片幻灯片 -->
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

        <!-- 团队简介 -->
        <div class="section-card team-card">
          <h3 class="section-title">团队简介</h3>
          <div class="team-content">
            <div v-if="leaderInfo.teamIntroduction" class="team-text" v-html="leaderInfo.teamIntroduction"></div>
          </div>
        </div>
      </div>

      <!-- 右侧列：个人简介 (30%) -->
      <div class="right-column">
        <div class="bio-sidebar">
        <!-- 头像+职称信息区域 -->
        <div class="bio-header">
          <div class="bio-header-left">
            <img :src="leaderInfo.avatarUrl || '/照片.png'" :alt="leaderInfo.name || '夏铭'" class="bio-header-photo" />
          </div>
          <div class="bio-header-right">
            <h3 class="bio-header-name">{{ leaderInfo.name || '夏铭' }}</h3>
            <p class="bio-header-title">{{ leaderInfo.title || '副教授 · 硕士生导师' }}</p>
            <p class="bio-header-affiliation">{{ leaderInfo.institution || '南京工业大学化工学院' }}</p>
            <p class="bio-header-lab">材料化学工程国家重点实验室</p>
          </div>
        </div>

        <h3 class="section-title">个人简介</h3>
        <div class="bio-content">
          <div v-if="leaderInfo.introduction" class="bio-text" v-html="leaderInfo.introduction"></div>
        </div>

        <div class="bio-divider"></div>

        <h3 class="section-title">教育经历</h3>
        <el-timeline class="timeline">
          <el-timeline-item
            v-for="(edu, index) in leaderEducation"
            :key="index"
            :timestamp="`${edu.startDate ? edu.startDate : ''} - ${edu.endDate ? edu.endDate : '至今'}`"
            placement="top"
          >
            <el-card>
              <h4>{{ edu.institution }}</h4>
              <p>{{ edu.degree }} · {{ edu.major }}</p>
              <p v-if="edu.description" class="text-secondary">{{ edu.description }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>

        <div class="bio-divider"></div>

        <h3 class="section-title">工作经历</h3>
        <el-timeline class="timeline">
          <el-timeline-item
            v-for="(work, index) in leaderWorkExperience"
            :key="index"
            :timestamp="`${work.startDate ? work.startDate : ''} - ${work.endDate ? work.endDate : '至今'}`"
            placement="top"
          >
            <el-card>
              <h4>{{ work.company }}</h4>
              <p>{{ work.position }}</p>
              <p v-if="work.description" class="text-secondary">{{ work.description }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import request from '/src/utils/api'

// 负责人基本信息
const leaderInfo = reactive({
  id: null,
  name: '',
  title: '',
  institution: '',
  email: '',
  phone: '',
  introduction: '',
  teamIntroduction: '',
  avatarUrl: ''
})

// 负责人教育经历
const leaderEducation = ref([])

// 负责人工作经历
const leaderWorkExperience = ref([])

// 图片幻灯片
const slides = ref([])
const loading = ref(false)
const currentSlide = ref(0)
let slideInterval = null

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
    loading.value = true
    const res = await request.get('/slideshow/list')
    const data = res.data || []
    // 将相对路径转换为完整URL
    slides.value = data.map(item => {
      if (item.imageUrl && !item.imageUrl.startsWith('http://') && !item.imageUrl.startsWith('https://')) {
        return `${request.defaults.baseURL}${item.imageUrl}`
      }
      return item.imageUrl
    })
  } catch (error) {
    console.error('获取幻灯片失败:', error)
  } finally {
    loading.value = false
  }
}

// 获取负责人基本信息
const fetchLeaderInfo = async () => {
  try {
    const res = await request.get('/leader/info')
    const data = res.data || {}
    
    // 将数据赋值给leaderInfo
    Object.keys(leaderInfo).forEach(key => {
      if (data[key] !== undefined) {
        leaderInfo[key] = data[key]
      }
    })
  } catch (error) {
    console.error('获取负责人信息失败:', error)
  }
}

// 获取负责人教育经历
const fetchLeaderEducation = async () => {
  try {
    const res = await request.get('/leader/education')
    leaderEducation.value = res.data || []
  } catch (error) {
    console.error('获取负责人教育经历失败:', error)
  }
}

// 获取负责人工作经历
const fetchLeaderWorkExperience = async () => {
  try {
    const res = await request.get('/leader/work-experience')
    leaderWorkExperience.value = res.data || []
  } catch (error) {
    console.error('获取负责人工作经历失败:', error)
  }
}

onMounted(() => {
  fetchSlideshows()
  fetchLeaderInfo()
  fetchLeaderEducation()
  fetchLeaderWorkExperience()
  resumeSlideshow()
})

onUnmounted(() => {
  pauseSlideshow()
})
</script>

<style scoped>
@import '/src/assets/styles/variables.css';
@import '/src/assets/styles/common.css';

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

/* 主容器：使用 Grid 布局 */
.home-hero {
  display: grid;
  grid-template-columns: 7fr 3fr; /* 70% : 30% */
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  align-items: start;
}

/* 左侧列：幻灯片 + 团队简介 */
.left-column {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* 右侧列：个人简介 */
.right-column {
  /* 个人简介会自然延伸 */
}

/* 图片幻灯片 */
.slideshow-container {
  height: auto;
  min-height: 500px;
  max-height: 700px;
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

/* 个人简介侧边栏 - 移除高度限制 */
.bio-sidebar {
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
  height: auto;
  overflow-y: visible;
  transition: box-shadow 0.3s ease;
}

.bio-sidebar:hover {
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
  object-fit: cover;
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

/* 头像+职称信息区域 */
.bio-sidebar .bio-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding-bottom: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--border-color);
  text-align: center;
}

.bio-header-left {
  flex-shrink: 0;
}

.bio-header-photo {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 3px solid var(--primary-color);
  box-shadow: var(--shadow-md);
}

.bio-header-right {
  flex: 1;
}

.bio-header-name {
  font-family: var(--font-serif);
  font-size: 22px;
  color: var(--primary-color);
  margin: 0 0 6px 0;
  font-weight: 700;
}

.bio-header-title {
  font-size: 16px;
  color: var(--secondary-color);
  margin: 0 0 6px 0;
  font-weight: 500;
}

.bio-header-affiliation,
.bio-header-lab {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0 0 3px 0;
}

.bio-text {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 10px;
  color: var(--text-primary);
  text-indent: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
}

.stat-item {
  text-align: center;
  padding: var(--spacing-md);
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  border-radius: var(--radius-md);
  color: white;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
}

.content-wrapper {
  margin-bottom: var(--spacing-lg);
}

.bio-card {
  padding: var(--spacing-lg);
}

.bio-divider {
  height: 1px;
  background: var(--border-color);
  margin: var(--spacing-md) 0;
}

/* 简介侧边栏的标题 */
.bio-sidebar .section-title {
  font-size: 18px;
  margin-bottom: var(--spacing-sm);
  padding-bottom: 8px;
  margin-top: var(--spacing-md);
}

.bio-sidebar .section-title:first-of-type {
  margin-top: 0;
}

/* 团队简介样式 */
.team-card {
  padding: var(--spacing-lg);
}

.team-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.team-text {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-primary);
  text-indent: 2em;
  margin: 0;
}

.section-card {
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-md);
  transition: all 0.3s ease;
}

.section-card:hover {
  box-shadow: var(--shadow-md);
}

.section-title {
  font-family: var(--font-serif);
  font-size: 24px;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  padding-bottom: 12px;
  border-bottom: 3px solid var(--primary-color);
}

.bio-card .section-title {
  margin-top: 0;
}

.bio-card .section-title:not(:first-of-type) {
  margin-top: var(--spacing-lg);
}

.timeline {
  padding-left: 20px;
}

/* 响应式设计 */
@media (max-width: 968px) {
  .home-hero {
    grid-template-columns: 1fr; /* 单列布局 */
  }

  .slideshow-container {
    min-height: 250px;
    max-height: 400px;
  }

  /* 移动端个人简介保持自然延伸 */
  .bio-sidebar {
    overflow-y: visible;
  }

  .bio-sidebar .bio-header {
    flex-direction: column;
    text-align: center;
  }

  .bio-header-photo {
    width: 150px;
    height: 150px;
  }

  .bio-header-name {
    font-size: 24px;
  }

  .bio-header-title {
    font-size: 17px;
  }

  .bio-sidebar .section-title {
    font-size: 20px;
  }

  .bio-text {
    font-size: 15px;
    text-indent: 2em;
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

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }


}
</style>
