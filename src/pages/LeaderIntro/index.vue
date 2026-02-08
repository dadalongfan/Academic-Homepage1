<template>
  <div class="leader-intro-page">
    <!-- 翻译状态 -->
    <div v-if="isTranslating" class="loading-container">
      <el-icon class="is-loading" :size="40"><Loading /></el-icon>
      <p>{{ $t('common.loading') }}</p>
    </div>

    <template v-else>
      <!-- 负责人基本信息 -->
      <div class="section-card leader-header">
        <div class="leader-avatar">
          <img :src="displayLeaderInfo.avatarUrl || '/照片.png'" :alt="displayLeaderInfo.name || '负责人'" />
        </div>
        <div class="leader-info">
          <h3 class="leader-name">{{ displayLeaderInfo.name || '负责人' }}</h3>
          <p class="leader-title">{{ displayLeaderInfo.title || '' }}</p>
          <p class="leader-institution">{{ displayLeaderInfo.institution || '' }}</p>
        </div>
      </div>

      <!-- 个人简介 -->
      <div v-if="displayLeaderInfo.introduction" class="section-card">
        <h3 class="subsection-title">{{ $t('个人简介') }}</h3>
        <div class="intro-content" v-html="displayLeaderInfo.introduction"></div>
      </div>

      <!-- 教育经历 -->
      <div v-if="educationList.length > 0" class="section-card">
        <h3 class="subsection-title">{{ $t('教育经历') }}</h3>
        <el-timeline class="timeline">
          <el-timeline-item
            v-for="(edu, index) in educationList"
            :key="index"
            :timestamp="`${edu.startDate || ''} - ${edu.endDate || $t('至今')}`"
            placement="top"
          >
            <el-card>
              <h4>{{ edu.institution }}</h4>
              <p>{{ edu.degree }} · {{ edu.major }}</p>
              <p v-if="edu.description" class="text-secondary">{{ edu.description }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>

      <!-- 工作经历 -->
      <div v-if="workList.length > 0" class="section-card">
        <h3 class="subsection-title">{{ $t('工作经历') }}</h3>
        <el-timeline class="timeline">
          <el-timeline-item
            v-for="(work, index) in workList"
            :key="index"
            :timestamp="`${work.startDate || ''} - ${work.endDate || $t('至今')}`"
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
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import { leaderApi } from '../../api'
import { API_BASE_URL } from '../../config'
import { useTranslation } from '../../utils/i18n/useTranslation'

// 负责人信息翻译
const {
  originalData: originalLeaderInfo,
  displayData: displayLeaderInfo,
  updateOriginalData: updateLeaderInfo,
  isTranslating: isTranslatingLeaderInfo
} = useTranslation({}, {
  textFields: ['name', 'title', 'institution'],
  htmlFields: ['introduction']
})

// 教育经历翻译
const {
  originalData: originalEducation,
  displayData: educationList,
  updateOriginalData: updateEducation,
  isTranslating: isTranslatingEducation
} = useTranslation([], {
  textFields: ['institution', 'degree', 'major', 'description']
})

// 工作经历翻译
const {
  originalData: originalWork,
  displayData: workList,
  updateOriginalData: updateWork,
  isTranslating: isTranslatingWork
} = useTranslation([], {
  textFields: ['company', 'position', 'description']
})

// 计算是否正在翻译
const isTranslating = computed(() =>
  isTranslatingLeaderInfo.value ||
  isTranslatingEducation.value ||
  isTranslatingWork.value
)

// 获取负责人信息
const fetchLeaderInfo = async () => {
  try {
    const res = await leaderApi.getInfo()
    const data = res.data || {}

    // 处理头像URL
    if (data.avatarUrl && !data.avatarUrl.startsWith('http://') && !data.avatarUrl.startsWith('https://')) {
      data.avatarUrl = `${API_BASE_URL}${data.avatarUrl}`
    }

    updateLeaderInfo(data)
  } catch (error) {
    console.error('获取负责人信息失败:', error)
  }
}

// 获取教育经历
const fetchEducation = async () => {
  try {
    const res = await leaderApi.getEducation()
    const data = res.data || []
    updateEducation(data)
  } catch (error) {
    console.error('获取教育经历失败:', error)
  }
}

// 获取工作经历
const fetchWorkExperience = async () => {
  try {
    const res = await leaderApi.getWorkExperience()
    const data = res.data || []
    updateWork(data)
  } catch (error) {
    console.error('获取工作经历失败:', error)
  }
}

onMounted(() => {
  fetchLeaderInfo()
  fetchEducation()
  fetchWorkExperience()
})
</script>

<style scoped>
@import '../../assets/styles/variables.css';
@import '../../assets/styles/common.css';

.leader-intro-page {
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

/* 负责人头部信息 */
.leader-header {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.leader-avatar {
  flex-shrink: 0;
}

.leader-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-color);
  box-shadow: var(--shadow-md);
}

.leader-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.leader-name {
  font-family: var(--font-serif);
  font-size: 24px;
  color: var(--primary-color);
  margin: 0 0 var(--spacing-sm) 0;
}

.leader-title {
  font-size: 16px;
  color: var(--secondary-color);
  margin: 0 0 var(--spacing-xs) 0;
}

.leader-institution {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

/* 个人简介内容 */
.intro-content {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-primary);
}

.intro-content :deep(p) {
  margin-bottom: 1em;
  text-indent: 2em;
}

/* 时间线样式 */
.timeline {
  padding-left: 20px;
}

.text-secondary {
  color: var(--text-secondary);
  font-size: 14px;
  margin-top: 8px;
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
@media (max-width: 768px) {
  .leader-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .leader-avatar img {
    width: 100px;
    height: 100px;
  }

  .leader-name {
    font-size: 20px;
  }
}
</style>
