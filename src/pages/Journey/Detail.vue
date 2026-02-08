<template>
  <div class="journey-detail">
    <!-- 返回按钮 -->
    <div class="back-section">
      <el-button @click="goBack" type="default" icon="ArrowLeft">{{ backButtonText }}</el-button>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <el-icon class="is-loading" :size="40"><Loading /></el-icon>
      <p>加载中...</p>
    </div>

    <!-- 错误提示 -->
    <el-alert
      v-else-if="error"
      type="error"
      :title="error"
      :closable="false"
      class="error-alert"
    />

    <template v-else-if="translatedJourney">
      <!-- 征途详情 -->
      <div class="journey-content">
        <!-- 封面图 -->
        <div v-if="translatedJourney.coverImage" class="detail-cover">
          <img :src="getFullImageUrl(translatedJourney.coverImage)" :alt="translatedJourney.title" />
        </div>

        <h1 class="journey-title">{{ translatedJourney.title }}</h1>

        <div class="journey-meta">
          <span class="journey-date">
            <el-icon><Calendar /></el-icon>
            {{ formatDate(translatedJourney.createdAt) }}
          </span>
          <el-tag v-if="translatedJourney.status === 1" type="success">上架</el-tag>
          <el-tag v-else type="info">下架</el-tag>
        </div>

        <!-- 摘要 -->
        <div v-if="translatedJourney.summary" class="journey-summary">
          <p>{{ translatedJourney.summary }}</p>
        </div>

        <!-- 富文本内容 -->
        <div class="journey-body" v-html="translatedJourney.content"></div>
      </div>
    </template>

    <!-- 征途不存在 -->
    <el-empty
      v-else
      description="征途不存在或已删除"
      :image-size="200"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { ArrowLeft, Calendar, Loading } from '@element-plus/icons-vue'
import { researchJourneyApi } from '@/api'
import { API_BASE_URL } from '@/config'
import i18n from '/src/utils/i18n'
import { useTranslation } from '/src/utils/i18n/useTranslation'

// 响应式数据
const loading = ref(true)
const error = ref('')
const journey = ref(null)
const backButtonText = ref('返回列表')

// 监听语言变化
watch(() => i18n.global.locale.value, (newLocale) => {
  backButtonText.value = newLocale === 'en' ? 'Back to List' : '返回列表'
}, { immediate: true })

// 使用通用翻译逻辑
const {
  originalData: originalJourney,
  displayData: translatedJourney,
  updateOriginalData,
  isTranslating
} = useTranslation({}, {
  textFields: ['title', 'summary'],
  htmlFields: ['content'],
  arrayFields: []
})

// 监听征途数据变化，更新原始数据以触发翻译
watch(journey, (newJourney) => {
  if (newJourney) {
    updateOriginalData(newJourney)
  }
}, { immediate: true })

// 从URL获取参数
const getUrlParam = (name) => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(name)
}

// 返回列表
const goBack = () => {
  window.location.href = '/journey.html'
}

// 获取完整图片URL
const getFullImageUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `${API_BASE_URL}${url}`
}

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '--'
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}

// 加载征途详情
const loadJourneyDetail = async () => {
  try {
    loading.value = true
    error.value = ''

    const journeyId = getUrlParam('id')
    if (!journeyId) {
      throw new Error('征途ID不存在')
    }

    const res = await researchJourneyApi.getDetail(journeyId)

    if (res.code === 200) {
      journey.value = res.data
      console.log('征途详情加载成功:', journey.value)
    } else {
      error.value = res.message || '加载征途详情失败'
    }
  } catch (err) {
    console.error('加载征途详情失败:', err)
    error.value = err.message || '加载征途详情失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadJourneyDetail()
})
</script>

<style scoped>
@import '/src/assets/styles/variables.css';
@import '/src/assets/styles/common.css';

.journey-detail {
  max-width: 900px;
  margin: 0 auto;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.back-section {
  margin-bottom: 20px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--text-secondary);
}

.error-alert {
  margin: 20px 0;
}

.journey-content {
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: 40px;
}

.detail-cover {
  margin-bottom: var(--spacing-lg);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.detail-cover img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
}

.journey-title {
  font-family: var(--font-serif);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-md) 0;
  line-height: 1.4;
}

.journey-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
}

.journey-date {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 14px;
}

.journey-summary {
  background: var(--bg-color);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
}

.journey-summary p {
  margin: 0;
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.8;
}

.journey-body {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-primary);
}

.journey-body :deep(img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 20px 0;
}

.journey-body :deep(p) {
  margin-bottom: 1em;
}

.journey-body :deep(h1),
.journey-body :deep(h2),
.journey-body :deep(h3),
.journey-body :deep(h4) {
  color: var(--primary-color);
  margin-top: 2em;
  margin-bottom: 1em;
  font-weight: 600;
}

.journey-body :deep(h1) {
  font-size: 28px;
}

.journey-body :deep(h2) {
  font-size: 24px;
}

.journey-body :deep(h3) {
  font-size: 20px;
}

.journey-body :deep(ul),
.journey-body :deep(ol) {
  margin-left: 2em;
  margin-bottom: 1em;
}

.journey-body :deep(blockquote) {
  margin: 20px 0;
  padding: 10px 20px;
  background: var(--bg-color);
  border-left: 4px solid var(--primary-color);
  color: var(--text-secondary);
}

.journey-body :deep(code) {
  background: var(--bg-color);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
}

.journey-body :deep(pre) {
  background: var(--bg-color);
  padding: 15px;
  border-radius: var(--radius-md);
  overflow-x: auto;
  margin: 20px 0;
}

.journey-body :deep(pre code) {
  background: transparent;
  padding: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .journey-content {
    padding: 20px;
  }

  .journey-title {
    font-size: 24px;
  }

  .detail-cover img {
    max-height: 250px;
  }

  .journey-meta {
    flex-wrap: wrap;
  }
}
</style>
