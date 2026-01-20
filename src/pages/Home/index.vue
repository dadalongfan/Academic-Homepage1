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
          <h3 class="section-title">{{ t('home.teamIntroduction') }}</h3>
          <div class="team-content">
            <div v-if="leaderInfo.teamIntroduction" class="team-text" v-html="getLocalizedContent(leaderInfo.teamIntroduction)"></div>
            <template v-else>
              <p class="team-text">
                介质过程强化团队隶属于南京工业大学化工学院材料化学工程国家重点实验室，由夏铭副教授担任负责人。
              </p>
              <p class="team-text">
                团队主要从事催化反应工程与计算机模拟、生物质催化转化、传质与分离工程等领域的基础研究和应用开发。我们致力于将前沿的理论研究与实际的工业应用相结合，解决化工过程中的关键科学技术问题。
              </p>
              <p class="team-text">
                团队注重理论创新与工程实践相结合，在AIChE Journal、Chemical Engineering Journal、化工进展等高水平期刊发表论文50余篇，总被引近2000次。获授权发明专利10余项，承担国家自然科学基金、江苏省自然科学基金等国家级和省部级项目5项，参与中科院科技先导专项等重大科研项目10余项。
              </p>
              <p class="team-text">
                团队秉承"严谨治学、追求卓越"的科研精神，营造积极向上、团结协作的学术氛围。我们欢迎优秀青年学者和学生加入我们，共同探索化学工程领域的前沿科学问题，为推动化工行业的创新发展贡献力量
              </p>
            </template>


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

        <h3 class="section-title">{{ t('home.personalIntroduction') }}</h3>
        <div class="bio-content">
          <div v-if="leaderInfo.introduction" class="bio-text" v-html="getLocalizedContent(leaderInfo.introduction)"></div>
          <template v-else>
            <p class="bio-text">
              夏铭，男，汉族，1987年6月出生，籍贯陕西汉中，现任南京工业大学化工学院副教授、硕士生导师，并为材料化学工程国家重点实验室成员。
            </p>
            <p class="bio-text">
              2009年9月至2014年6月，在天津大学化学工程专业硕博连读，获工学博士学位。2014年7月至2022年4月，任职于中国科学院山西煤炭化学研究所，历任助理研究员、副研究员，从事催化反应工程与计算机模拟方向研究。
            </p>
            <p class="bio-text">
              主要研究方向包括催化反应工程与计算机模拟、生物质催化转化、传质与分离工程、工业催化及新型反应器开发等。
            </p>
            <p class="bio-text">
              在AIChE Journal、化工进展等期刊发表论文50余篇，总被引近2000次。获授权发明专利10余项，主持国家自然科学基金等科研项目5项，参与中科院科技先导专项等10余项。
            </p>
          </template>
        </div>

        <div class="bio-divider"></div>

        <h3 class="section-title">{{ t('home.educationExperience') }}</h3>
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
          <template v-if="leaderEducation.length === 0">
            <el-timeline-item timestamp="2005.09 - 2009.06" placement="top">
              <el-card>
                <h4>郑州大学</h4>
                <p>化学工程与技术（制药工程）专业 · 工学学士</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2009.09 - 2014.06" placement="top">
              <el-card>
                <h4>天津大学</h4>
                <p>化学工程专业 · 工学博士（硕博连读）</p>
              </el-card>
            </el-timeline-item>
          </template>
        </el-timeline>

        <div class="bio-divider"></div>

        <h3 class="section-title">{{ t('home.workExperience') }}</h3>
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
          <template v-if="leaderWorkExperience.length === 0">
            <el-timeline-item timestamp="2014.07 - 2022.04" placement="top">
              <el-card>
                <h4>中国科学院山西煤炭化学研究所</h4>
                <p>助理研究员 · 副研究员</p>
                <p class="text-secondary">从事催化反应工程与计算机模拟方向研究</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2022.05 - 至今" placement="top">
              <el-card>
                <h4>南京工业大学化工学院</h4>
                <p>副教授 · 硕士生导师</p>
                <p class="text-secondary">材料化学工程国家重点实验室成员</p>
              </el-card>
            </el-timeline-item>
          </template>
        </el-timeline>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import request from '/src/utils/api'

const { t } = useI18n()

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
    // 如果API调用失败，使用默认图片
    slides.value = ['/1.png', '/2.png', '/3.png', '/4.png']
  } finally {
    loading.value = false
  }
}

// 根据当前语言提取本地化内容
const { locale } = useI18n()
const getLocalizedContent = (content) => {
  if (!content) return ''
  
  const currentLang = locale.value
  // 检查内容是否包含语言标记
  const zhMatch = content.match(/\[zh\]([\s\S]*?)\[\/zh\]/)
  const enMatch = content.match(/\[en\]([\s\S]*?)\[\/en\]/)
  
  // 如果没有语言标记，直接返回原始内容
  if (!zhMatch && !enMatch) {
    return content
  }
  
  // 根据当前语言返回对应的内容
  if (currentLang === 'en' && enMatch) {
    return enMatch[1]
  } else if (currentLang === 'zh' && zhMatch) {
    return zhMatch[1]
  }
  
  //  fallback to中文
  return zhMatch ? zhMatch[1] : content
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
