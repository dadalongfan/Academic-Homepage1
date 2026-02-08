<template>
  <div class="daily-page">
    <h2 class="section-title">{{ $t('daily.title') }}</h2>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <el-icon class="is-loading" :size="40"><Loading /></el-icon>
      <p>{{ $t('common.loading') }}</p>
    </div>

    <!-- 图片墙 - 一行两张 -->
    <div v-else class="moments-grid">
      <el-empty
        v-if="moments.length === 0"
        :description="$t('daily.empty')"
      >
        <template #image>
          <div class="empty-icon">📷</div>
        </template>
      </el-empty>

      <div
        v-for="moment in moments"
        :key="moment.id"
        class="moment-item"
        @click="openImageModal(moment)"
      >
        <div class="image-container">
          <img
            :src="moment.image"
            :alt="moment.title"
            @error="handleImageError"
            loading="lazy"
          />
          <div class="image-overlay">
            <el-icon><ZoomIn /></el-icon>
          </div>
        </div>
        <div class="image-caption">
          {{ moment.title }}
        </div>
      </div>
    </div>

    <!-- 图片查看弹窗 -->
    <el-dialog
      v-model="imageModalVisible"
      :title="selectedMoment.title"
      width="80%"
      :show-close="true"
      :close-on-click-modal="true"
      @closed="closeImageModal"
      class="image-modal"
    >
      <div class="image-modal-content">
        <img
          :src="selectedMoment.image"
          :alt="selectedMoment.title"
          @error="handleImageError"
          class="modal-image"
        />
      </div>
      <template #footer>
        <el-button @click="closeImageModal">{{ $t('common.close') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ZoomIn, Loading } from '@element-plus/icons-vue'
import { dailyMomentApi } from '../../api/dailyMoment'
import { API_BASE_URL } from '../../config'
import { useTranslation } from '@/utils/i18n/useTranslation'

const loading = ref(false)
const imageModalVisible = ref(false)
const selectedMoment = ref({})

// 使用通用翻译逻辑处理趣事数据
const {
  originalData: originalMoments,
  displayData: moments,
  updateOriginalData: updateMoments,
  isTranslating
} = useTranslation([], {
  textFields: ['title']
})

// 加载趣事数据
const loadMoments = async () => {
  try {
    loading.value = true

    const res = await dailyMomentApi.getList()
    const momentsData = res.data || []

    // 处理图片URL，转换为完整URL
    const processedData = momentsData.map(moment => {
      if (moment.image && !moment.image.startsWith('http://') && !moment.image.startsWith('https://')) {
        moment.image = `${API_BASE_URL}${moment.image}`
      }
      return moment
    })

    // 更新数据并翻译
    await updateMoments(processedData)
  } catch (error) {
    console.error('加载趣事数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 打开图片弹窗
const openImageModal = (moment) => {
  selectedMoment.value = moment
  imageModalVisible.value = true
}

// 关闭图片弹窗
const closeImageModal = () => {
  imageModalVisible.value = false
  selectedMoment.value = {}
}

// 图片加载失败处理
const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/600x400/cccccc/666666?text=Image+Error'
}

// ESC键关闭弹窗
const handleKeydown = (event) => {
  if (event.key === 'Escape' && imageModalVisible.value) {
    closeImageModal()
  }
}

onMounted(() => {
  loadMoments()
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
@import '/src/assets/styles/variables.css';
@import '/src/assets/styles/common.css';

.daily-page {
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

.section-title {
  font-family: var(--font-serif);
  font-size: 32px;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: var(--spacing-lg);
  position: relative;
  padding-bottom: 16px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  border-radius: 2px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--text-secondary);
}

/* 图片墙 - 一行两张 */
.moments-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.moment-item {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  cursor: pointer;
  background: white;
}

.moment-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.image-container {
  position: relative;
  padding-top: 66.67%; /* 3:2 比例 */
  overflow: hidden;
  background: #f5f5f5;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  font-size: 32px;
}

.moment-item:hover .image-overlay {
  opacity: 1;
}

.moment-item:hover .image-container img {
  transform: scale(1.02);
}

.image-caption {
  padding: 16px;
  text-align: center;
  font-size: 16px;
  color: var(--text-primary);
  border-top: 1px solid var(--border-color);
  background: white;
}

.empty-icon {
  font-size: 96px;
  margin-bottom: var(--spacing-md);
}

/* 弹窗样式 */
.modal-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
}

/* 模态框样式 */
:deep(.image-modal .el-dialog__header) {
  padding: 20px 20px 10px;
}

:deep(.image-modal .el-dialog__body) {
  padding: 0 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.image-modal .el-dialog__footer) {
  padding: 10px 20px 20px;
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .moments-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .section-title {
    font-size: 24px;
  }

  .image-caption {
    padding: 12px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .moments-grid {
    grid-template-columns: 1fr;
  }
}
</style>
