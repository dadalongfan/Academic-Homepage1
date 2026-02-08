<template>
  <div
    class="image-scroll-carousel"
    @mouseenter="pauseAutoScroll"
    @mouseleave="resumeAutoScroll"
  >
    <!-- 图片网格容器 -->
    <div class="carousel-grid">
      <div
        v-for="image in currentImages"
        :key="image.id"
        class="carousel-item"
        @click="openImageModal(image)"
      >
        <img
          :src="image.imageUrl"
          :alt="image.title"
          loading="lazy"
          @error="handleImageError"
        />
        <div class="item-overlay">
          <el-icon><ZoomIn /></el-icon>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="carousel-loading">
      <el-icon class="is-loading" :size="32"><Loading /></el-icon>
    </div>

    <!-- 空状态 -->
    <div v-if="!loading && allImages.length === 0" class="carousel-empty">
      <el-empty :image-size="80" />
    </div>

    <!-- 图片查看弹窗 -->
    <el-dialog
      v-model="imageModalVisible"
      :title="selectedImage.title"
      width="70%"
      :show-close="true"
      @closed="closeImageModal"
    >
      <img :src="selectedImage.imageUrl" class="modal-image" />
      <template #footer>
        <el-button @click="closeImageModal">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ZoomIn, Loading } from '@element-plus/icons-vue'
import { galleryApi, dailyMomentApi } from '../api'
import { getFullFileUrl } from '../utils/api'

const loading = ref(false)
const imageModalVisible = ref(false)
const selectedImage = ref({})

const allImages = ref([])
const currentImages = ref([])
const currentIndex = ref(0)
const itemsPerPage = 4 // 2列×2行=4张

let scrollInterval = null
const scrollSpeed = 3000

// 获取并合并图片数据
const fetchAndMergeImages = async () => {
  loading.value = true
  try {
    // 并行获取两个API的数据
    const [galleryRes, momentsRes] = await Promise.all([
      galleryApi.getImages(),
      dailyMomentApi.getList()
    ])

    // 统一数据格式
    const galleryImages = (galleryRes.data || []).map(img => ({
      id: `gallery-${img.id}`,
      imageUrl: getFullFileUrl(img.imageUrl),
      title: img.description || '团队风采',
      source: 'gallery'
    }))

    const momentImages = (momentsRes?.data || []).map(img => ({
      id: `moment-${img.id}`,
      imageUrl: getFullFileUrl(img.image),
      title: img.title || '研途趣事',
      source: 'moment'
    }))

    // 合并并随机打乱
    const merged = [...galleryImages, ...momentImages]
    allImages.value = shuffleArray(removeDuplicates(merged))

    // 初始化显示图片
    updateCurrentImages()
  } catch (error) {
    console.error('获取图片数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 去重（基于URL）
const removeDuplicates = (images) => {
  const seen = new Set()
  return images.filter(img => {
    const url = img.imageUrl
    if (seen.has(url)) return false
    seen.add(url)
    return true
  })
}

// 数组随机打乱（Fisher-Yates 算法）
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// 更新当前显示的图片
const updateCurrentImages = () => {
  if (allImages.value.length === 0) return

  const start = currentIndex.value
  const end = start + itemsPerPage

  if (end <= allImages.value.length) {
    currentImages.value = allImages.value.slice(start, end)
  } else {
    // 循环到开头
    const tail = allImages.value.slice(start)
    const head = allImages.value.slice(0, end - allImages.value.length)
    currentImages.value = [...tail, ...head]
  }
}

// 滚动到下一组
const scrollToNext = () => {
  if (allImages.value.length <= itemsPerPage) return
  currentIndex.value = (currentIndex.value + itemsPerPage) % allImages.value.length
  updateCurrentImages()
}

// 自动滚动控制
const startAutoScroll = () => {
  if (scrollInterval) clearInterval(scrollInterval)
  if (allImages.value.length > itemsPerPage) {
    scrollInterval = setInterval(scrollToNext, scrollSpeed)
  }
}

const pauseAutoScroll = () => {
  if (scrollInterval) {
    clearInterval(scrollInterval)
    scrollInterval = null
  }
}

const resumeAutoScroll = () => {
  if (!scrollInterval && allImages.value.length > itemsPerPage) {
    startAutoScroll()
  }
}

// 图片弹窗
const openImageModal = (image) => {
  selectedImage.value = image
  imageModalVisible.value = true
  pauseAutoScroll()
}

// 关闭图片弹窗
const closeImageModal = () => {
  imageModalVisible.value = false
  selectedImage.value = {}
  resumeAutoScroll()
}

// 图片错误处理
const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/300?text=No+Image'
}

// 生命周期
onMounted(() => {
  fetchAndMergeImages()
  startAutoScroll()
})

onUnmounted(() => {
  pauseAutoScroll()
})
</script>

<style scoped>
.image-scroll-carousel {
  height: 500px;
  position: relative;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.carousel-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 8px;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.carousel-item {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-sm);
  cursor: pointer;
  background: var(--bg-light);
  transition: all 0.3s ease;
  aspect-ratio: 1;
}

.carousel-item:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-md);
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.carousel-item:hover img {
  transform: scale(1.1);
}

.item-overlay {
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
}

.carousel-item:hover .item-overlay {
  opacity: 1;
}

.item-overlay .el-icon {
  font-size: 28px;
  color: white;
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
  background: rgba(255, 255, 255, 0.95);
  z-index: 10;
}

.carousel-empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-image {
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
}

/* 响应式 */
@media (max-width: 968px) {
  .image-scroll-carousel {
    height: 300px;
  }

  .carousel-grid {
    gap: 6px;
    padding: 6px;
  }

  .item-overlay .el-icon {
    font-size: 24px;
  }
}

@media (max-width: 576px) {
  .carousel-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
  }
}
</style>
