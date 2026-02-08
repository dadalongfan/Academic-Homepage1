<template>
  <div
    class="annual-events-carousel"
    @mouseenter="pauseScroll"
    @mouseleave="resumeScroll"
  >
    <!-- 左侧装饰 -->
    <div class="carousel-header">
      <span class="header-icon">📅</span>
      <span class="header-title">{{ currentYear }}{{ $t('home.annualEvents') }}</span>
    </div>

    <!-- 滚动容器 -->
    <div class="events-scroll-container">
      <div
        class="events-track"
        :style="{ animationPlayState: isPaused ? 'paused' : 'running' }"
      >
        <!-- 复制内容以实现无缝循环 -->
        <div
          v-for="i in 2"
          :key="i"
          class="event-content-wrapper"
          v-html="displayContent"
        ></div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="carousel-loading">
      <el-icon class="is-loading" :size="24"><Loading /></el-icon>
    </div>

    <!-- 空状态 -->
    <div v-if="!loading && !eventData" class="carousel-empty">
      <span>暂无年度大事件</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import { annualEventApi } from '../api'
import { useTranslation } from '../utils/i18n/useTranslation'

const loading = ref(false)
const isPaused = ref(false)

// 翻译支持 - 只处理 content 字段的富文本
const {
  originalData: eventData,
  displayData: translatedData,
  updateOriginalData: updateEventData,
  isTranslating
} = useTranslation({}, {
  htmlFields: ['content']
})

const currentYear = computed(() => eventData.value?.year || new Date().getFullYear())

// 显示内容（优先翻译后的）
const displayContent = computed(() => {
  const content = translatedData.value?.content || eventData.value?.content || ''
  return content
})

// 获取最新一年的大事件
const fetchLatestEvent = async () => {
  loading.value = true
  try {
    const res = await annualEventApi.getLatest()
    if (res.code === 200 && res.data) {
      updateEventData(res.data)
    }
  } catch (error) {
    console.error('获取年度大事件失败:', error)
  } finally {
    loading.value = false
  }
}

// 暂停滚动
const pauseScroll = () => {
  isPaused.value = true
}

// 恢复滚动
const resumeScroll = () => {
  isPaused.value = false
}

onMounted(() => {
  fetchLatestEvent()
})
</script>

<style scoped>
.annual-events-carousel {
  position: relative;
  background: linear-gradient(135deg, #1a3a5c 0%, #2d5a8a 100%);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-lg);
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-md);
  height: 100px;
}

.carousel-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-shrink: 0;
  padding-right: var(--spacing-md);
  border-right: 2px solid rgba(255, 255, 255, 0.3);
  margin-right: var(--spacing-md);
}

.header-icon {
  font-size: 28px;
}

.header-title {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 600;
  color: white;
  white-space: nowrap;
}

.events-scroll-container {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.events-track {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  animation: scroll-left 40s linear infinite;
}

@keyframes scroll-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.event-content-wrapper {
  display: inline-flex;
  align-items: center;
  padding-right: var(--spacing-xl);
}

/* 富文本内容样式 */
.event-content-wrapper :deep(*) {
  display: inline;
  color: white;
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
}

.event-content-wrapper :deep(h2),
.event-content-wrapper :deep(h3),
.event-content-wrapper :deep(h4) {
  font-weight: 600;
  margin-right: var(--spacing-sm);
  color: #ffd700;
}

.event-content-wrapper :deep(ul),
.event-content-wrapper :deep(ol) {
  display: inline-flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.event-content-wrapper :deep(li) {
  display: inline;
  margin-right: var(--spacing-md);
}

.event-content-wrapper :deep(li::after) {
  content: '|';
  margin-left: var(--spacing-md);
  color: rgba(255, 255, 255, 0.5);
}

.event-content-wrapper :deep(li:last-child::after) {
  content: '';
}

.event-content-wrapper :deep(p) {
  display: inline;
  margin-right: var(--spacing-sm);
}

.carousel-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 58, 92, 0.9);
  color: white;
  z-index: 10;
}

.carousel-empty {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

/* 响应式 */
@media (max-width: 968px) {
  .annual-events-carousel {
    height: 80px;
    padding: 0 var(--spacing-sm);
  }

  .header-title {
    font-size: 16px;
  }

  .event-content-wrapper :deep(*) {
    font-size: 14px;
  }

  .events-track {
    animation-duration: 30s;
  }
}

@media (max-width: 576px) {
  .annual-events-carousel {
    height: 70px;
    flex-direction: column;
    padding: var(--spacing-sm);
  }

  .carousel-header {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    margin-right: 0;
    margin-bottom: var(--spacing-sm);
    padding-right: 0;
    padding-bottom: var(--spacing-xs);
    width: 100%;
  }

  .header-title {
    font-size: 14px;
  }

  .event-content-wrapper :deep(*) {
    font-size: 12px;
  }
}
</style>
