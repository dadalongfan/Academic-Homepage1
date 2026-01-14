<template>
  <div class="home-page">
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

    <!-- 左右分栏区域：最新动态 + 个人简介大块 -->
    <div class="content-split-section">
      <!-- 左侧：最新动态滚动栏 -->
      <div class="news-sidebar">
        <div class="news-header">
          <h3 class="news-title">📰 组内新闻</h3>
        </div>
        <div
          class="news-scroll-container"
          @mouseenter="pauseScroll"
          @mouseleave="resumeScroll"
        >
          <div class="news-scroll-content" :class="{ 'paused': isPaused }">
            <div
              v-for="(news, index) in newsList"
              :key="index"
              class="news-item"
            >
              <div class="news-date">{{ news.date }}</div>
              <div class="news-content">{{ news.content }}</div>
            </div>
            <!-- 重复一遍实现无缝循环 -->
            <div
              v-for="(news, index) in newsList"
              :key="'duplicate-' + index"
              class="news-item"
            >
              <div class="news-date">{{ news.date }}</div>
              <div class="news-content">{{ news.content }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：个人简介大块（合并为一个卡片） -->
      <div class="section-card bio-card">
        <!-- 头像+职称信息区域 -->
        <div class="bio-header">
          <div class="bio-header-left">
            <img src="/照片.png" alt="夏铭" class="bio-header-photo" />
          </div>
          <div class="bio-header-right">
            <h3 class="bio-header-name">夏铭</h3>
            <p class="bio-header-title">副教授 · 硕士生导师</p>
            <p class="bio-header-affiliation">南京工业大学化工学院</p>
            <p class="bio-header-lab">材料化学工程国家重点实验室</p>
          </div>
        </div>

        <h3 class="section-title">个人简介</h3>
        <div class="bio-content">
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
        </div>

        <div class="bio-divider"></div>

        <h3 class="section-title">教育经历</h3>
        <el-timeline class="timeline">
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
        </el-timeline>

        <div class="bio-divider"></div>

        <h3 class="section-title">工作经历</h3>
        <el-timeline class="timeline">
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
        </el-timeline>
      </div>
    </div>

    <!-- 研究方向 -->
    <div class="section-card">
      <h3 class="section-title">研究方向</h3>
      <div class="research-areas">
        <div class="area-card">
          <div class="area-icon">🔬</div>
          <h4>催化反应工程与计算机模拟</h4>
          <p>催化剂设计优化与反应器数值模拟</p>
        </div>
        <div class="area-card">
          <div class="area-icon">🌱</div>
          <h4>生物质催化转化</h4>
          <p>生物质资源化利用与绿色催化</p>
        </div>
        <div class="area-card">
          <div class="area-icon">⚗️</div>
          <h4>传质与分离工程</h4>
          <p>新型分离技术与过程强化</p>
        </div>
        <div class="area-card">
          <div class="area-icon">🏭</div>
          <h4>工业催化及新型反应器开发</h4>
          <p>工业催化剂开发与反应器设计</p>
        </div>
      </div>
    </div>

    <!-- 快速导航 -->
    <div class="section-card">
      <h3 class="section-title">快速导航</h3>
      <div class="quick-nav">
        <a href="/publications.html" class="nav-card">
          <div class="nav-icon">📚</div>
          <h4>科研成果</h4>
          <p>查看发表论文、专利和获奖情况</p>
        </a>
        <a href="/members.html" class="nav-card">
          <div class="nav-icon">👥</div>
          <h4>组内成员</h4>
          <p>了解课题组成员和研究团队</p>
        </a>
        <a href="/projects.html" class="nav-card">
          <div class="nav-icon">💰</div>
          <h4>科研项目</h4>
          <p>查看科研项目和经费情况</p>
        </a>
        <a href="/recruitment.html" class="nav-card">
          <div class="nav-icon">🎓</div>
          <h4>招贤纳士</h4>
          <p>欢迎优秀学生加入课题组</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 图片幻灯片
const slides = ref(['/1.png', '/2.png', '/3.png', '/4.png'])
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
  if (!slideInterval) {
    slideInterval = setInterval(nextSlide, 3000)
  }
}

onMounted(() => {
  resumeSlideshow()
})

onUnmounted(() => {
  pauseSlideshow()
})

// 组内新闻数据
const newsList = ref([
  { date: '2024-12', content: '课题组迎来2025级新成员高锟俣、储金科加入' },
  { date: '2024-11', content: '夏铭老师参加第三届能源绿色转化与碳减排国际论坛并作分会主席报告' },
  { date: '2024-10', content: '课题组论文在AIChE Journal期刊发表，影响因子3.8' },
  { date: '2024-09', content: '祝贺！课题组获得国家自然科学基金面上项目资助' },
  { date: '2024-08', content: '课题组举办夏季学术研讨会，汇报最新研究进展' },
  { date: '2024-07', content: '指导学生荣获第十八届全国大学生化工设计竞赛国家级特等奖' },
  { date: '2024-06', content: '实验室购置新型催化剂表征设备，科研平台进一步升级' },
  { date: '2024-05', content: '2024届毕业生游晨曦、赵伟等顺利签约知名企业' },
  { date: '2024-04', content: '夏铭老师受邀参加中英C1过程催化化学和工艺研讨会' },
  { date: '2024-03', content: '课题组在国际催化大会作口头报告，获广泛关注' }
])

// 滚动控制
const isPaused = ref(false)

const pauseScroll = () => {
  isPaused.value = true
}

const resumeScroll = () => {
  isPaused.value = false
}
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

/* 图片幻灯片 */
.slideshow-container {
  width: 100%;
  height: 800px;
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-lg);
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
.bio-header {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
  padding-bottom: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  border-bottom: 2px solid var(--border-color);
}

.bio-header-left {
  flex-shrink: 0;
}

.bio-header-photo {
  width: 200px;
  height: 200px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 4px solid var(--primary-color);
  box-shadow: var(--shadow-md);
}

.bio-header-right {
  flex: 1;
}

.bio-header-name {
  font-family: var(--font-serif);
  font-size: 28px;
  color: var(--primary-color);
  margin: 0 0 8px 0;
  font-weight: 700;
}

.bio-header-title {
  font-size: 18px;
  color: var(--secondary-color);
  margin: 0 0 8px 0;
  font-weight: 500;
}

.bio-header-affiliation,
.bio-header-lab {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 4px 0;
}

.bio-text {
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 12px;
  color: var(--text-primary);
  text-indent: 2em;
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

/* 左右分栏区域 */
.content-split-section {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  align-items: start;
}

/* 左侧：最新动态滚动栏 */
.news-sidebar {
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all 0.3s ease;
  position: sticky;
  top: 20px;
}

.news-sidebar:hover {
  box-shadow: var(--shadow-md);
}

.news-header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  padding: var(--spacing-md);
  text-align: center;
}

.news-title {
  font-size: 18px;
  color: white;
  margin: 0;
  font-weight: 600;
}

.news-scroll-container {
  height: 1200px;
  overflow: hidden;
  background: var(--bg-light);
  position: relative;
}

.news-scroll-content {
  animation: scroll-up 30s linear infinite;
}

.news-scroll-content.paused {
  animation-play-state: paused;
}

@keyframes scroll-up {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

.news-item {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  background: white;
  transition: all 0.3s ease;
}

.news-item:hover {
  background: var(--bg-light);
  transform: translateX(5px);
}

.news-date {
  font-size: 12px;
  color: var(--accent-color);
  font-weight: 600;
  margin-bottom: 6px;
  display: inline-block;
  padding: 2px 8px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: var(--radius-sm);
}

.news-content {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.6;
}

/* 右侧：个人简介大块 */
.bio-card {
  padding: var(--spacing-lg);
}

.bio-divider {
  height: 1px;
  background: var(--border-color);
  margin: var(--spacing-lg) 0;
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

.research-areas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.area-card {
  text-align: center;
  padding: var(--spacing-md);
  background: var(--bg-light);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.area-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.area-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-sm);
}

.area-card h4 {
  color: var(--primary-color);
  margin-bottom: 8px;
  font-size: 18px;
}

.area-card p {
  color: var(--text-secondary);
  font-size: 14px;
}

.quick-nav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.nav-card {
  display: block;
  text-align: center;
  padding: var(--spacing-md);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.nav-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.nav-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-sm);
}

.nav-card h4 {
  color: var(--primary-color);
  margin-bottom: 8px;
  font-size: 18px;
}

.nav-card p {
  color: var(--text-secondary);
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .content-split-section {
    grid-template-columns: 280px 1fr;
  }
}

@media (max-width: 968px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .content-split-section {
    grid-template-columns: 1fr;
  }

  .news-sidebar {
    position: static;
  }

  .news-scroll-container {
    height: 400px;
  }

  .bio-header {
    flex-direction: column;
    text-align: center;
  }

  .bio-header-photo {
    width: 150px;
    height: 150px;
  }

  .slideshow-container {
    height: 250px;
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
</style>
