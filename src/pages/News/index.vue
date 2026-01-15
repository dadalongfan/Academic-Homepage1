<template>
  <div class="news-page">
    <h2 class="page-title">新闻动态</h2>

    <!-- 年份筛选 -->
    <div class="filter-section">
      <div class="year-filter">
        <el-button
          v-for="year in years"
          :key="year"
          :type="selectedYear === year ? 'primary' : 'default'"
          @click="filterByYear(year)"
          size="large"
        >
          {{ year }}年
        </el-button>
      </div>
    </div>

    <!-- 新闻列表 -->
    <div class="news-list">
      <div
        v-for="(news, index) in filteredNews"
        :key="index"
        class="news-item"
        :class="{ featured: news.featured }"
      >
        <div class="news-date-box">
          <div class="news-month">{{ news.month }}</div>
          <div class="news-year">{{ news.year }}</div>
        </div>

        <div class="news-content-wrapper">
          <div class="news-header">
            <h3 class="news-title">
              <el-tag v-if="news.featured" type="danger" size="small" class="featured-tag">重要</el-tag>
              {{ news.title }}
            </h3>
            <el-tag :type="getCategoryType(news.category)" size="small">
              {{ news.category }}
            </el-tag>
          </div>

          <p class="news-description">{{ news.description }}</p>

          <div class="news-meta">
            <span class="news-category">
              <el-icon><FolderOpened /></el-icon>
              {{ news.category }}
            </span>
            <span v-if="news.link" class="news-link">
              <el-icon><Link /></el-icon>
              <a :href="news.link" target="_blank">查看详情</a>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 新闻统计 -->
    <div class="news-stats">
      <div class="stat-card">
        <div class="stat-number">{{ totalNews }}</div>
        <div class="stat-label">总新闻数</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ currentYearNews }}</div>
        <div class="stat-label">{{ new Date().getFullYear() }}年新闻</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ featuredNews }}</div>
        <div class="stat-label">重要新闻</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { FolderOpened, Link } from '@element-plus/icons-vue'

const selectedYear = ref('全部')

const years = ['全部', '2024', '2023', '2022', '2021']

const newsList = ref([
  {
    year: '2024',
    month: '12',
    title: '课题组迎来2025级新成员',
    description: '高锟俣、储金科正式加入课题组，开始他们的研究生学习生涯。',
    category: '团队建设',
    featured: false
  },
  {
    year: '2024',
    month: '11',
    title: '夏铭老师参加第三届能源绿色转化与碳减排国际论坛',
    description: '受邀担任分会主席并作学术报告，与国内外专家深入交流。',
    category: '学术交流',
    featured: true
  },
  {
    year: '2024',
    month: '10',
    title: '课题组论文在AIChE Journal期刊发表',
    description: '影响因子3.8，这是课题组在催化反应工程领域的重要研究成果。',
    category: '科研成果',
    featured: true
  },
  {
    year: '2024',
    month: '09',
    title: '祝贺！课题组获得国家自然科学基金面上项目资助',
    description: '项目名称：钴基费托合成催化剂的多尺度设计与优化研究。',
    category: '科研项目',
    featured: true
  },
  {
    year: '2024',
    month: '08',
    title: '课题组举办夏季学术研讨会',
    description: '全体成员汇报最新研究进展，讨论下一步工作计划。',
    category: '团队建设',
    featured: false
  },
  {
    year: '2024',
    month: '07',
    title: '指导学生荣获第十八届全国大学生化工设计竞赛国家级特等奖',
    description: '团队成员在全国大赛中表现优异，为学校争光添彩。',
    category: '教学成果',
    featured: true
  },
  {
    year: '2024',
    month: '06',
    title: '实验室购置新型催化剂表征设备',
    description: '科研平台进一步升级，为高质量研究提供有力支撑。',
    category: '平台建设',
    featured: false
  },
  {
    year: '2024',
    month: '05',
    title: '2024届毕业生顺利签约知名企业',
    description: '游晨曦、赵伟等同学成功入职行业领先企业。',
    category: '人才培养',
    featured: false
  },
  {
    year: '2024',
    month: '04',
    title: '夏铭老师受邀参加中英C1过程催化化学和工艺研讨会',
    description: '与国际同行深入探讨C1化学领域的前沿问题。',
    category: '学术交流',
    featured: false
  },
  {
    year: '2024',
    month: '03',
    title: '课题组在国际催化大会作口头报告',
    description: '研究成果获得国际同行广泛关注和认可。',
    category: '学术交流',
    featured: true
  },
  {
    year: '2024',
    month: '02',
    title: '与合作企业召开技术交流会',
    description: '就催化剂工业化应用进行深入探讨。',
    category: '产学研合作',
    featured: false
  },
  {
    year: '2024',
    month: '01',
    title: '新学期课题组会议顺利召开',
    description: '制定新学期研究计划和目标。',
    category: '团队建设',
    featured: false
  },
  {
    year: '2023',
    month: '12',
    title: '课题组年终总结大会圆满举行',
    description: '回顾年度成果，展望未来发展方向。',
    category: '团队建设',
    featured: false
  },
  {
    year: '2023',
    month: '11',
    title: '多篇论文被化工领域顶级期刊接收',
    description: '课题组在分离工程领域取得重要进展。',
    category: '科研成果',
    featured: true
  },
  {
    year: '2023',
    month: '10',
    title: '夏铭老师赴山西煤化所访问交流',
    description: '与老同事、老朋友深入交流科研心得。',
    category: '学术交流',
    featured: false
  },
  {
    year: '2023',
    month: '09',
    title: '课题组新生入学教育顺利完成',
    description: '欢迎2023级研究生加入大家庭。',
    category: '团队建设',
    featured: false
  },
  {
    year: '2022',
    month: '12',
    title: '祝贺周灿、祁笑笑等同学顺利毕业',
    description: '完成硕士学位论文答辩，开启新的职业征程。',
    category: '人才培养',
    featured: false
  },
  {
    year: '2021',
    month: '11',
    title: '课题组加入南京工业大学材料化学工程国家重点实验室',
    description: '新的平台，新的起点，新的征程。',
    category: '平台建设',
    featured: true
  }
])

const filteredNews = computed(() => {
  if (selectedYear.value === '全部') {
    return newsList.value
  }
  return newsList.value.filter(news => news.year === selectedYear.value)
})

const totalNews = computed(() => newsList.value.length)

const currentYearNews = computed(() => {
  const currentYear = new Date().getFullYear().toString()
  return newsList.value.filter(news => news.year === currentYear).length
})

const featuredNews = computed(() => {
  return newsList.value.filter(news => news.featured).length
})

const filterByYear = (year) => {
  selectedYear.value = year
}

const getCategoryType = (category) => {
  const typeMap = {
    '团队建设': 'primary',
    '学术交流': 'success',
    '科研成果': 'danger',
    '科研项目': 'warning',
    '教学成果': 'success',
    '平台建设': 'info',
    '人才培养': 'primary',
    '产学研合作': 'warning'
  }
  return typeMap[category] || 'default'
}
</script>

<style scoped>
@import '/src/assets/styles/variables.css';
@import '/src/assets/styles/common.css';

.news-page {
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

.page-title {
  font-family: var(--font-serif);
  font-size: 36px;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: var(--spacing-lg);
  font-weight: 700;
}

.filter-section {
  margin-bottom: var(--spacing-lg);
}

.year-filter {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
  flex-wrap: wrap;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.news-item {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  border-left: 4px solid var(--primary-color);
}

.news-item:hover {
  box-shadow: var(--shadow-md);
  transform: translateX(5px);
}

.news-item.featured {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-left: 4px solid #f59e0b;
}

.news-date-box {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: var(--shadow-sm);
}

.news-month {
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
}

.news-year {
  font-size: 14px;
  margin-top: 4px;
  opacity: 0.9;
}

.news-content-wrapper {
  flex: 1;
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-sm);
  gap: var(--spacing-sm);
}

.news-title {
  font-size: 20px;
  color: var(--text-primary);
  margin: 0;
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: 600;
}

.featured-tag {
  flex-shrink: 0;
}

.news-description {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-sm);
}

.news-meta {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.news-category,
.news-link {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: var(--text-tertiary);
}

.news-link a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.news-link a:hover {
  color: var(--primary-dark);
}

.news-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.stat-card {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  color: white;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.stat-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-5px);
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }

  .news-item {
    flex-direction: column;
  }

  .news-date-box {
    width: 100%;
    height: 60px;
    flex-direction: row;
    gap: var(--spacing-sm);
  }

  .news-month {
    font-size: 20px;
  }

  .news-year {
    margin-top: 0;
  }

  .news-header {
    flex-direction: column;
  }

  .news-title {
    font-size: 18px;
  }

  .year-filter {
    gap: 8px;
  }
}
</style>
