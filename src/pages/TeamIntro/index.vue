<template>
  <div class="team-intro-page">
    <!-- 翻译状态 -->
    <div v-if="isTranslating" class="loading-container">
      <el-icon class="is-loading" :size="40"><Loading /></el-icon>
      <p>{{ $t('common.loading') }}</p>
    </div>

    <!-- 内容区域 -->
    <div v-else class="section-card">
      <div v-if="displayLeaderInfo.teamIntroduction" class="team-content" v-html="displayLeaderInfo.teamIntroduction"></div>
      <div v-else class="empty-content">
        <el-empty :description="$t('暂无内容')" :image-size="200" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import { leaderApi } from '../../api'
import { useTranslation } from '../../utils/i18n/useTranslation'

// 负责人信息翻译
const {
  originalData: originalLeaderInfo,
  displayData: displayLeaderInfo,
  updateOriginalData: updateLeaderInfo,
  isTranslating: isTranslatingLeaderInfo
} = useTranslation({}, {
  textFields: ['name', 'title', 'institution'],
  htmlFields: ['teamIntroduction']
})

// 计算是否正在翻译
const isTranslating = computed(() => isTranslatingLeaderInfo.value)

// 获取负责人信息
const fetchLeaderInfo = async () => {
  try {
    const res = await leaderApi.getInfo()
    const data = res.data || {}
    updateLeaderInfo(data)
  } catch (error) {
    console.error('获取负责人信息失败:', error)
  }
}

onMounted(() => {
  fetchLeaderInfo()
})
</script>

<style scoped>
@import '../../assets/styles/variables.css';
@import '../../assets/styles/common.css';

.team-intro-page {
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

.team-content {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-primary);
}

.team-content :deep(p) {
  margin-bottom: 1em;
  text-indent: 2em;
}

.empty-content {
  padding: 40px 0;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: #999;
}
</style>
