<template>
  <div id="app">
    <PageHeader />
    <main class="main-content">
      <!-- 研究征途列表页 -->
      <JourneyPage v-if="isListPage" />
      <!-- 研究征途详情页 -->
      <JourneyDetail v-else />
    </main>
    <PageFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PageHeader from '/src/components/PageHeader.vue'
import PageFooter from '/src/components/PageFooter.vue'
import JourneyPage from './index.vue'
import JourneyDetail from './Detail.vue'

const isListPage = ref(true)

onMounted(() => {
  // 根据当前HTML文件判断是否为详情页
  const pathname = window.location.pathname
  isListPage.value = !pathname.includes('journey-detail.html')
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
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 40px;
  width: 100%;
}
</style>
