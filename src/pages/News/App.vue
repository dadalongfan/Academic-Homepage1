<template>
  <div id="app">
    <PageHeader />
    <main class="main-content">
      <!-- 新闻列表页 -->
      <NewsPage v-if="isListPage" />
      <!-- 新闻详情页 -->
      <NewsDetail v-else />
    </main>
    <PageFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PageHeader from '/src/components/PageHeader.vue'
import PageFooter from '/src/components/PageFooter.vue'
import NewsPage from './index.vue'
import NewsDetail from './Detail.vue'

const isListPage = ref(true)

onMounted(() => {
  // 根据当前HTML文件判断是否为详情页
  const pathname = window.location.pathname
  isListPage.value = !pathname.includes('news-detail.html')
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  font-size: 14px;
  color: #333;
  background-color: #f5f7fa;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  width: 100%;
}
</style>
