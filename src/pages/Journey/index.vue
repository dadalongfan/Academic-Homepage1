<template>
  <div class="research-journey-timeline">
    <!-- 翻译状态 -->
    <div v-if="isTranslating" class="loading-container">
      <el-icon class="is-loading" :size="40"><Loading /></el-icon>
      <p>{{ $t('common.loading') }}</p>
    </div>

    <!-- 征途列表 -->
    <div v-else class="journey-list">
      <div
        v-for="journey in translatedJourneys"
        :key="journey.id"
        class="journey-item"
        @click="goToDetail(journey.id)"
      >
        <!-- 左侧日期盒子 -->
        <div class="journey-date-box">
          <div class="journey-day">{{ getDay(journey.createdAt) }}</div>
          <div class="journey-month-year">{{ getYearMonth(journey.createdAt) }}</div>
        </div>

        <!-- 右侧内容 -->
        <div class="journey-content">
          <!-- 封面图 -->
          <div v-if="journey.coverImage" class="journey-cover">
            <img :src="journey.coverImage" :alt="journey.title" @error="handleCoverError" />
          </div>

          <!-- 文本内容 -->
          <div class="journey-text">
            <h3 class="journey-title">{{ journey.title }}</h3>
            <p v-if="journey.summary" class="journey-summary">{{ journey.summary }}</p>
            <div class="journey-meta">
              <span class="journey-action">{{ $t('journey.viewDetail') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="!loading && journeys.length === 0" class="section-card">
      <el-empty :description="$t('journey.empty')">
        <template #image>
          <div class="empty-icon">📅</div>
        </template>
      </el-empty>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import { researchJourneyApi } from '@/api'
import { useTranslation } from '@/utils/i18n/useTranslation'

const loading = ref(false)

// 使用通用翻译逻辑处理征途列表
const {
  originalData: journeys,
  displayData: translatedJourneys,
  updateOriginalData: updateJourneys,
  isTranslating
} = useTranslation([], {
  textFields: ['title', 'summary']
})

// 加载征途列表
const loadJourneys = async () => {
  try {
    loading.value = true
    const res = await researchJourneyApi.getList({ page: 1, pageSize: 100 })
    if (res.code === 200 && res.data) {
      const journeysData = res.data.records || []
      await updateJourneys(journeysData)
      console.log('征途数据:', journeysData)
    }
  } catch (error) {
    console.error('加载征途数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 跳转到详情页
const goToDetail = (id) => {
  window.location.href = `/journey-detail.html?id=${id}`
}

// 获取日期（日）
const getDay = (dateString) => {
  if (!dateString) return '--'
  const date = new Date(dateString)
  return String(date.getDate()).padStart(2, '0')
}

// 获取年月
const getYearMonth = (dateString) => {
  if (!dateString) return '----'
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

// 封面图加载失败处理
const handleCoverError = (event) => {
  event.target.style.display = 'none'
}

onMounted(() => {
  loadJourneys()
})
</script>

<style scoped>
@import '/src/assets/styles/variables.css';
@import '/src/assets/styles/common.css';

.research-journey-timeline {
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

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--text-secondary);
}

.journey-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.journey-item {
  display: flex;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 160px;
}

.journey-item:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* 左侧日期盒子 */
.journey-date-box {
  min-width: 80px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  text-align: center;
}

.journey-day {
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
}

.journey-month-year {
  font-size: 12px;
  margin-top: 4px;
  opacity: 0.9;
}

/* 右侧内容 */
.journey-content {
  flex: 1;
  display: flex;
  padding: var(--spacing-md);
  gap: var(--spacing-md);
}

/* 封面图 */
.journey-cover {
  width: 160px;
  height: 100%;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.journey-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 文本内容 */
.journey-text {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.journey-title {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 12px 0;
}

.journey-summary {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 45px;
}

.journey-meta {
  margin-top: auto;
  padding-top: 8px;
}

.journey-action {
  color: var(--primary-color);
  font-size: 14px;
  font-weight: 500;
}

.empty-icon {
  font-size: 96px;
  margin-bottom: var(--spacing-md);
}

/* 响应式 */
@media (max-width: 768px) {
  .journey-content {
    flex-direction: column;
  }

  .journey-cover {
    width: 100%;
    height: 150px;
  }

  .journey-date-box {
    min-width: 60px;
    padding: 10px;
  }

  .journey-month {
    font-size: 20px;
  }

  .journey-year {
    font-size: 12px;
  }

  .journey-title {
    font-size: 18px;
  }
}
</style>
