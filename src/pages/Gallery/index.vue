<template>
  <div class="gallery-page">
    <h2 class="section-title">电子相册</h2>



    <!-- 遍历分类显示相册 -->
    <div v-for="category in categories" :key="category.id" class="section-card">
      <div class="section-header">
        <h3 class="subsection-title">{{ category.name }}</h3>
        <el-button
          :icon="sectionStates[category.name] ? ArrowUp : ArrowDown"
          circle
          size="small"
          @click="toggleSection(category.name)"
          class="toggle-btn"
        />
      </div>

      <transition name="section-collapse">
        <div v-show="sectionStates[category.name]" class="gallery-grid">
          <el-empty
            v-if="getCategoryImages(category.id).length === 0"
            description="该分类暂无照片"
          />

          <div
            v-for="image in getCategoryImages(category.id)"
            :key="image.id"
            class="gallery-item"
            @click="openImageModal(image)"
          >
            <div class="image-container">
              <img
                :src="image.imageUrl"
                :alt="image.description || category.name"
                @error="handleImageError"
                loading="lazy"
              />
              <div class="image-overlay">
                <el-icon><ZoomIn /></el-icon>
              </div>
            </div>
            <div class="image-caption">
              {{ image.description || category.name }}
              <div class="image-date">{{ image.uploadDate || '未设置日期' }}</div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- 空状态提示 -->
    <div v-if="loading" class="section-card">
      <el-empty description="相册正在加载中...">
        <template #image>
          <div class="loading-icon">🔄</div>
        </template>
      </el-empty>
    </div>

    <div v-else-if="categories.length === 0" class="section-card">
      <el-empty
        description="相册正在整理中，更多精彩内容即将上线..."
      >
        <template #image>
          <div class="empty-icon">📸</div>
        </template>
      </el-empty>
    </div>



    <!-- 图片查看模态框 -->
    <el-dialog
      v-model="imageModalVisible"
      :title="selectedImage.description || '图片预览'"
      width="80%"
      :show-close="true"
      :close-on-click-modal="true"
      @closed="closeImageModal"
      class="image-modal"
    >
      <div class="image-modal-content">
        <img
          :src="selectedImage.imageUrl"
          :alt="selectedImage.description || '图片预览'"
          @error="handleImageError"
          class="modal-image"
        />
      </div>
      <template #footer>
        <div class="modal-footer">
          <div class="image-info">
            <p><strong>分类：</strong>{{ getCategoryInfo(selectedImage.categoryId)?.name || '未知' }}</p>
            <p v-if="selectedImage.description"><strong>描述：</strong>{{ selectedImage.description }}</p>
            <p v-if="selectedImage.uploadDate"><strong>上传日期：</strong>{{ selectedImage.uploadDate }}</p>
          </div>
          <el-button @click="closeImageModal">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Picture, Trophy, User, ArrowUp, ArrowDown, ZoomIn, Close } from '@element-plus/icons-vue'
import request from '../../utils/api'

const categories = ref([])
const images = ref({})
const loading = ref(false)
const imageModalVisible = ref(false)
const selectedImage = ref({})

// 加载分类和图片数据
const loadGalleryData = async () => {
  try {
    loading.value = true

    // 并行加载分类和图片数据
    const [categoriesRes, allImagesRes] = await Promise.all([
      request.get('/gallery-categories/list'),
      request.get('/gallery-images/list')
    ])

    // 更新分类数据
    categories.value = categoriesRes.data || []
    console.log('分类数据:', categories.value)

    // 按分类组织图片数据
    const imagesByCategory = {}
    categories.value.forEach(category => {
      imagesByCategory[category.id] = []
    })

    // 分配图片到对应分类
    const allImages = allImagesRes.data || []
    console.log('图片数据:', allImages)

    allImages.forEach(image => {
      if (image.categoryId && imagesByCategory[image.categoryId]) {
        imagesByCategory[image.categoryId].push(image)
      } else {
        console.warn('图片分类ID不匹配:', image)
      }
    })

    images.value = imagesByCategory
    console.log('按分类组织的图片:', images.value)

    // 初始化分类展开状态
    categories.value.forEach(category => {
      if (!sectionStates.value[category.name]) {
        sectionStates.value[category.name] = true
      }
    })
  } catch (error) {
    console.error('加载相册数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 栏目展开/收起状态
const sectionStates = ref({
  '学术会议': true,
  '团队活动': true,
  '获奖荣誉': true,
  '毕业留念': true
})

// 切换栏目显示状态
const toggleSection = (section) => {
  sectionStates.value[section] = !sectionStates.value[section]
}

// 获取分类对应的图片
const getCategoryImages = (categoryId) => {
  return images.value[categoryId] || []
}

// 获取分类信息
const getCategoryInfo = (categoryId) => {
  return categories.value.find(c => c.id === categoryId)
}

// 打开图片模态框
const openImageModal = (image) => {
  selectedImage.value = image
  imageModalVisible.value = true
}

// 关闭图片模态框
const closeImageModal = () => {
  imageModalVisible.value = false
  selectedImage.value = {}
}

// 图片加载失败处理
const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=Image+Error'
}

// ESC键关闭模态框
const handleKeydown = (event) => {
  if (event.key === 'Escape' && imageModalVisible.value) {
    closeImageModal()
  }
}

onMounted(() => {
  loadGalleryData()
  document.addEventListener('keydown', handleKeydown)
})

// 清理事件监听器
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
@import '/src/assets/styles/variables.css';
@import '/src/assets/styles/common.css';

.gallery-page {
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

.section-card {
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  transition: all 0.3s ease;
}

.section-card:hover {
  box-shadow: var(--shadow-md);
}



/* 栏目标题栏 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  padding-bottom: 12px;
  border-bottom: 2px solid var(--primary-light);
}

.subsection-title {
  font-family: var(--font-serif);
  font-size: 24px;
  color: var(--primary-color);
  margin: 0;
}

/* 切换按钮 */
.toggle-btn {
  transition: all 0.3s ease;
  color: var(--primary-color);
  border: 1px solid var(--primary-light);
  background: white;
  flex-shrink: 0;
}

.toggle-btn:hover {
  background: var(--primary-color);
  color: white;
  transform: scale(1.1);
  box-shadow: var(--shadow-md);
}

/* 折叠/展开过渡动画 */
.section-collapse-enter-active,
.section-collapse-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.section-collapse-enter-from,
.section-collapse-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
  margin: 0;
}

.section-collapse-enter-to,
.section-collapse-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 2000px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  cursor: pointer;
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.image-placeholder {
  aspect-ratio: 4 / 3;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--text-tertiary);
  font-size: 14px;
}

.image-placeholder.award {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #92400e;
}

.image-placeholder.graduate {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1e40af;
}

.image-caption {
  padding: 12px;
  background: white;
  text-align: center;
  font-size: 14px;
  color: var(--text-secondary);
  border-top: 1px solid var(--border-color);
}

.image-date {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.image-container {
  position: relative;
  padding-top: 75%; /* 4:3 比例 */
  overflow: hidden;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  font-size: 24px;
}

.gallery-item:hover .image-overlay {
  opacity: 1;
}

.gallery-item:hover .image-container img {
  transform: scale(1.05);
}

.modal-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image-info {
  flex: 1;
}

.image-info p {
  margin: 4px 0;
}

.loading-icon, .empty-icon {
  font-size: 96px;
  margin-bottom: var(--spacing-md);
}

/* 模态框样式 */
:deep(.image-modal .el-dialog__header) {
  padding: 20px 20px 10px;
}

:deep(.image-modal .el-dialog__body) {
  padding: 0 20px 20px;
}

:deep(.image-modal .el-dialog__footer) {
  padding: 10px 20px 20px;
}
</style>