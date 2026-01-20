<template>
  <div class="news-detail">
    <!-- 返回按钮 -->
    <div class="back-section">
      <el-button @click="goBack" type="default" icon="ArrowLeft">返回列表</el-button>
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

    <template v-else-if="news">
      <!-- 新闻详情 -->
      <div class="news-content">
        <h1 class="news-title">{{ news.title }}</h1>
        
        <div class="news-meta">
          <span class="news-date">
            <el-icon><Calendar /></el-icon>
            {{ news.publishDate }}
          </span>
          <el-tag :type="getCategoryType(news.category)">
            {{ news.category || '未分类' }}
          </el-tag>
          <el-tag v-if="news.isImportant" type="danger">重要</el-tag>
        </div>

        <div class="news-body" v-html="news.content"></div>
      </div>
    </template>

    <!-- 新闻不存在 -->
    <el-empty
      v-else
      description="新闻不存在或已删除"
      :image-size="200"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ArrowLeft, Calendar, Loading } from '@element-plus/icons-vue'
import request from '@/utils/api'

// 响应式数据
const loading = ref(true)
const error = ref('')
const news = ref(null)

// 辅助函数
const getCategoryType = (category) => {
  const typeMap = {
    '团队建设': 'success',
    '学术交流': 'primary',
    '科研成果': 'warning',
    '科研项目': 'danger',
    '教学成果': 'info',
    '人才培养': 'success',
    '平台建设': 'primary',
    '产学研合作': 'warning'
  }
  return typeMap[category] || 'default'
}

// 从URL获取参数
const getUrlParam = (name) => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(name)
}

// 返回列表
const goBack = () => {
  window.location.href = '/news.html'
}

// 加载新闻详情
const loadNewsDetail = async () => {
  try {
    loading.value = true
    error.value = ''

    const newsId = getUrlParam('id')
    if (!newsId) {
      throw new Error('新闻ID不存在')
    }

    const res = await request.get(`/news/${newsId}`)

    if (res.code === 200) {
      news.value = res.data
      console.log('新闻详情加载成功:', news.value)
    } else {
      error.value = res.message || '加载新闻详情失败'
    }
  } catch (err) {
    console.error('加载新闻详情失败:', err)
    error.value = err.message || '加载新闻详情失败'
  } finally {
    loading.value = false
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadNewsDetail()
})
</script>

<style scoped>
.news-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.back-section {
  margin-bottom: 30px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: #999;
}

.error-alert {
  margin: 20px 0;
}

.news-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.news-title {
  font-size: 28px;
  color: var(--primary-color);
  margin-bottom: 20px;
  font-weight: 300;
  line-height: 1.4;
}

.news-meta {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #999;
}

.news-date {
  display: flex;
  align-items: center;
  gap: 5px;
}

.news-body {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
}

.news-body p {
  margin-bottom: 15px;
}

.news-body img {
  max-width: 100%;
  height: auto;
  margin: 15px 0;
  border-radius: 4px;
}

.news-body h2, .news-body h3, .news-body h4 {
  color: var(--primary-color);
  margin: 25px 0 15px 0;
}
</style>