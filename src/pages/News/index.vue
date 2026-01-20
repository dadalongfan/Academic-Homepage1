<template>
  <div class="news-page">
    <h2 class="page-title">新闻动态</h2>

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

    <template v-else>


      <!-- 新闻列表 -->
      <div class="news-list">
        <div
          v-for="news in filteredNews"
          :key="news.id"
          class="news-item"
          :class="{ featured: news.isImportant }"
          @click="goToDetail(news.id)"
        >
          <div class="news-date-box">
            <div class="news-month">{{ getMonth(news.publishDate) }}</div>
            <div class="news-year">{{ getYear(news.publishDate) }}</div>
          </div>

          <div class="news-content-wrapper">
            <div class="news-header">
              <h3 class="news-title">
                <el-tag v-if="news.isImportant" type="danger" size="small" class="featured-tag">重要</el-tag>
                {{ news.title }}
              </h3>
              <el-tag :type="getCategoryType(news.category)" size="small">
                {{ news.category || '未分类' }}
              </el-tag>
            </div>

            <p class="news-description">{{ getPlainText(news.content) }}</p>

            <div class="news-meta">
              <span class="news-category">
                <el-icon><FolderOpened /></el-icon>
                {{ news.category || '未分类' }}
              </span>
              <span class="news-more">查看详情 <el-icon><ArrowRight /></el-icon></span>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <el-empty
          v-if="filteredNews.length === 0"
          description="暂无新闻数据"
          :image-size="200"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ArrowRight, FolderOpened, Loading } from '@element-plus/icons-vue'
import request from '@/utils/api'

// 响应式数据
const loading = ref(true)
const error = ref('')
const newsList = ref([])

// 新闻列表
const filteredNews = computed(() => newsList.value)

// 辅助函数
const getYear = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).getFullYear().toString()
}

const getMonth = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return (date.getMonth() + 1).toString().padStart(2, '0')
}

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

// 跳转到详情页
const goToDetail = (id) => {
  window.location.href = `/news-detail.html?id=${id}`
}

// 获取纯文本并截断
const getPlainText = (html) => {
  if (!html) return ''
  // 移除HTML标签
  let plainText = html.replace(/<[^>]+>/g, '')
  // 替换HTML实体
  plainText = plainText
    .replace(/&nbsp;/g, ' ')  // 替换空格实体
    .replace(/&amp;/g, '&')    // 替换&符号
    .replace(/&lt;/g, '<')     // 替换<符号
    .replace(/&gt;/g, '>')     // 替换>符号
    .replace(/&quot;/g, '"')  // 替换"符号
    .replace(/&#39;/g, "'")     // 替换'符号
  // 截断文本，保留150个字符
  return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText
}



// 加载新闻数据
const loadNews = async () => {
  try {
    loading.value = true
    error.value = ''

    const res = await request.get('/news/list')

    if (res.code === 200) {
      newsList.value = res.data || []
      console.log('新闻数据加载成功:', newsList.value.length, '条')
    } else {
      error.value = res.message || '加载新闻失败'
    }
  } catch (err) {
    console.error('加载新闻失败:', err)
    error.value = '加载新闻失败，请检查后端服务是否启动'

    // 如果API调用失败，使用示例数据
    newsList.value = [
      {
        id: 1,
        title: '欢迎使用学术主页管理系统',
        content: '这是一个示例新闻。请在后台管理系统中添加真实新闻数据。',
        category: '团队建设',
        isImportant: true,
        publishDate: new Date().toISOString().split('T')[0]
      }
    ]
  } finally {
    loading.value = false
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadNews()
})
</script>

<style scoped>
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

.page-title {
  text-align: center;
  font-size: 36px;
  color: var(--primary-color);
  margin-bottom: 40px;
  font-weight: 300;
}

.news-list {
  max-width: 900px;
  margin: 0 auto;
}

.news-item {
  display: flex;
  gap: 20px;
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  transition: all 0.3s;
  border-left: 3px solid transparent;
  cursor: pointer;
  height: 180px;
  overflow: hidden;
}

.news-item:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.news-item.featured {
  border-left-color: var(--accent-color);
  background: linear-gradient(to right, rgba(59, 130, 246, 0.05), transparent);
}

.news-date-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 70px;
  height: 70px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: white;
  border-radius: 8px;
  font-weight: bold;
}

.news-month {
  font-size: 18px;
}

.news-year {
  font-size: 14px;
  opacity: 0.9;
}

.news-content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
}

.news-title {
  font-size: 18px;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.featured-tag {
  flex-shrink: 0;
}

.news-description {
  color: #666;
  line-height: 1.6;
  margin: 0 0 12px 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  flex: 1;
  min-height: 0;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #999;
  margin-top: auto;
}

.news-category {
  display: flex;
  align-items: center;
  gap: 4px;
}

.news-more {
  color: var(--accent-color);
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
}

.news-more:hover {
  text-decoration: underline;
}

.news-link a {
  color: var(--accent-color);
  text-decoration: none;
}

.news-link a:hover {
  text-decoration: underline;
}
</style>
