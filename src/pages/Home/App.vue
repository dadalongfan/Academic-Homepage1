<template>
  <div id="app">
    <PageHeader />
    <main class="main-content">
      <HomePage />
    </main>
    <PageFooter />
  </div>
</template>

<script setup>
import PageHeader from '/src/components/PageHeader.vue'
import PageFooter from '/src/components/PageFooter.vue'
import HomePage from './index.vue'
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
