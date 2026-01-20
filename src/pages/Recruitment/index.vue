<template>
  <div class="recruitment-page" v-loading="loading">
    <h2 class="section-title">招贤纳士</h2>

    <!-- 欢迎标语 -->
    <div class="hero-banner">
      <div class="banner-content">
        <h2>欢迎加入介质过程强化团队</h2>
        <p>探索催化反应工程的奥秘，共创绿色化工的未来</p>
      </div>
    </div>

    <!-- 招生专业 -->
    <div v-if="recruitmentData['招生专业'] && recruitmentData['招生专业'].length > 0" class="section-card">
      <h3 class="subsection-title">
        <el-icon><Reading /></el-icon>
        招生专业
      </h3>
      <div class="majors-grid">
        <div v-for="(item, index) in recruitmentData['招生专业']" :key="index" class="major-card">
          <div class="major-icon">🧪</div>
          <h4 v-html="item.title"></h4>
          <div v-html="item.content"></div>
        </div>
      </div>
    </div>

    <!-- 课题组优势 -->
    <div v-if="recruitmentData['课题组优势'] && recruitmentData['课题组优势'].length > 0" class="section-card">
      <h3 class="subsection-title">
        <el-icon><Star /></el-icon>
        课题组优势
      </h3>
      <div class="advantages-grid">
        <div v-for="(item, index) in recruitmentData['课题组优势']" :key="index" class="advantage-item">
          <div class="advantage-number">{{ (index + 1).toString().padStart(2, '0') }}</div>
          <h4 v-html="item.title"></h4>
          <div v-html="item.content"></div>
        </div>
      </div>
    </div>

    <!-- 招生要求 -->
    <div v-if="recruitmentData['招生要求'] && recruitmentData['招生要求'].length > 0" class="section-card">
      <h3 class="subsection-title">
        <el-icon><Document /></el-icon>
        招生要求
      </h3>
      <div class="requirements-list">
        <div v-for="(item, index) in recruitmentData['招生要求']" :key="index" class="requirement-item">
          <el-icon color="#67C23A"><CircleCheck /></el-icon>
          <span v-html="item.content"></span>
        </div>
      </div>
    </div>

    <!-- 申请流程 -->
    <div v-if="recruitmentData['申请流程'] && recruitmentData['申请流程'].length > 0" class="section-card">
      <h3 class="subsection-title">
        <el-icon><Operation /></el-icon>
        申请流程
      </h3>
      <el-steps align-center>
        <el-step v-for="(item, index) in recruitmentData['申请流程']" :key="index" :title="item.title" :description="item.content" status="process" />
      </el-steps>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Reading, Star, Document, Operation, CircleCheck } from '@element-plus/icons-vue'
import request from '/src/utils/api'

const loading = ref(false)
const recruitmentData = reactive({
  '招生专业': [],
  '课题组优势': [],
  '招生要求': [],
  '申请流程': []
})

// 获取招聘信息
const fetchRecruitmentData = async () => {
  try {
    loading.value = true
    const res = await request.get('/recruitment/list')
    const data = res.data || []
    
    // 按类别分组
    data.forEach(item => {
      if (recruitmentData[item.category]) {
        recruitmentData[item.category].push(item)
      }
    })
  } catch (error) {
    console.error('获取招聘信息失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchRecruitmentData()
})
</script>

<style scoped>
@import '/src/assets/styles/variables.css';
@import '/src/assets/styles/common.css';

.recruitment-page {
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

.hero-banner {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
  text-align: center;
  color: white;
  box-shadow: var(--shadow-lg);
}

.banner-content h2 {
  font-family: var(--font-serif);
  font-size: 36px;
  margin-bottom: var(--spacing-md);
}

.banner-content p {
  font-size: 18px;
  opacity: 0.9;
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
  display: flex;
  align-items: center;
  gap: 8px;
}

.majors-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

.major-card {
  text-align: center;
  padding: var(--spacing-lg);
  background: var(--bg-light);
  border-radius: var(--radius-md);
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.major-card:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
  transform: translateY(-5px);
}

.major-icon {
  font-size: 32px;
  margin-bottom: var(--spacing-md);
}

.major-card h4 {
  font-size: 20px;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.major-card p {
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.advantages-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

.advantage-item {
  padding: var(--spacing-md);
  background: var(--bg-light);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--accent-color);
  transition: all 0.3s ease;
}

.advantage-item:hover {
  background: white;
  box-shadow: var(--shadow-sm);
  transform: translateX(5px);
}

.advantage-number {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 8px;
  opacity: 0.3;
}

.advantage-item h4 {
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.advantage-item p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.requirements-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.requirement-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: var(--spacing-sm);
  background: var(--bg-light);
  border-radius: var(--radius-sm);
  transition: all 0.3s ease;
}

.requirement-item:hover {
  background: white;
  box-shadow: var(--shadow-sm);
}

.requirement-item span {
  font-size: 16px;
  color: var(--text-primary);
}




</style>
