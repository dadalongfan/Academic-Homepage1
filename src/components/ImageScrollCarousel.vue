<template>
  <div
    class="image-scroll-carousel"
    @mouseenter="pauseAutoScroll"
    @mouseleave="resumeAutoScroll"
  >
    <!-- 上面：团队风采 - 2秒切换 -->
    <div class="carousel-section">
      <div class="carousel-header">
        <h3 class="carousel-title">{{ $t('home.teamStyle') }}</h3>
        <a href="./gallery.html" class="carousel-more">{{ $t('home.more') }} ></a>
      </div>
      <div class="carousel-grid single-row">
        <div
          v-for="image in currentGalleryImages"
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
    </div>

    <!-- 下面：研途趣事 - 横向滚动 -->
    <div class="carousel-section">
      <div class="carousel-header">
        <h3 class="carousel-title">{{ $t('home.dailyLife') }}</h3>
        <a href="./daily.html" class="carousel-more">{{ $t('home.more') }} ></a>
      </div>
      <div class="scroll-container" ref="scrollContainer">
        <div class="scroll-track" :style="scrollTrackStyle">
          <div
            v-for="image in scrollImages"
            :key="image.id"
            class="scroll-item"
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
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="carousel-loading">
      <el-icon class="is-loading" :size="32"><Loading /></el-icon>
    </div>

    <!-- 空状态 -->
    <div v-if="!loading && galleryImages.length === 0 && momentImages.length === 0" class="carousel-empty">
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ZoomIn, Loading } from '@element-plus/icons-vue'
import { galleryApi, dailyMomentApi } from '../api'
import { getFullFileUrl } from '../utils/api'

const loading = ref(false)
const imageModalVisible = ref(false)
const selectedImage = ref({})

const galleryImages = ref([])
const momentImages = ref([])

// 团队风采自动切换
const galleryIndex = ref(0)
let galleryInterval = null
const gallerySwitchSpeed = 2000 // 2秒切换一次

// 当前显示的团队风采图片（2张）
const currentGalleryImages = computed(() => {
  if (galleryImages.value.length <= 2) return galleryImages.value
  const start = galleryIndex.value
  const end = start + 2
  if (end <= galleryImages.value.length) {
    return galleryImages.value.slice(start, end)
  } else {
    // 循环到开头
    const tail = galleryImages.value.slice(start)
    const head = galleryImages.value.slice(0, end - galleryImages.value.length)
    return [...tail, ...head]
  }
})

// 启动团队风采自动切换
const startGallerySwitch = () => {
  if (galleryInterval) clearInterval(galleryInterval)
  if (galleryImages.value.length > 2) {
    galleryInterval = setInterval(() => {
      if (!isPaused) {
        galleryIndex.value = (galleryIndex.value + 2) % galleryImages.value.length
      }
    }, gallerySwitchSpeed)
  }
}

// 滚动相关
const scrollContainer = ref(null)
const scrollPosition = ref(0)
const scrollSpeed = 1 // 像素/帧
let scrollAnimationId = null
let isPaused = false

// 计算滚动图片（复制一份实现无缝循环）
const scrollImages = computed(() => {
  // 如果图片少于2张，直接返回
  if (momentImages.value.length < 2) return momentImages.value
  // 复制一份实现无缝循环
  return [...momentImages.value, ...momentImages.value]
})

// 获取图片数据
const fetchImages = async () => {
  loading.value = true
  try {
    // 并行获取两个API的数据
    const [galleryRes, momentsRes] = await Promise.all([
      galleryApi.getImages(),
      dailyMomentApi.getList()
    ])

    // 处理团队风采图片
    const galleryData = (galleryRes.data || []).map(img => ({
      id: `gallery-${img.id}`,
      imageUrl: getFullFileUrl(img.imageUrl),
      title: img.description || '团队风采'
    }))

    // 处理研途趣事图片
    const momentData = (momentsRes?.data || []).map(img => ({
      id: `moment-${img.id}`,
      imageUrl: getFullFileUrl(img.image),
      title: img.title || '研途趣事'
    }))

    // 分别存储，各取前10个用于循环
    galleryImages.value = removeDuplicates(galleryData).slice(0, 10)
    momentImages.value = removeDuplicates(momentData).slice(0, 10)

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

// 滚动轨道样式
const scrollTrackStyle = computed(() => ({
  transform: `translateX(-${scrollPosition.value}px)`
}))

// 开始滚动动画
const startScroll = () => {
  if (scrollAnimationId || isPaused) return
  
  const animate = () => {
    if (isPaused || !momentImages.value.length) return
    
    // 获取单张图片宽度（假设每张图片宽度相同）
    const itemWidth = scrollContainer.value?.offsetWidth / 2 || 150
    const totalWidth = itemWidth * momentImages.value.length
    
    // 更新位置
    scrollPosition.value += scrollSpeed
    
    // 当滚动超过一半时，重置到开头（实现无缝循环）
    if (scrollPosition.value >= totalWidth) {
      scrollPosition.value = 0
    }
    
    scrollAnimationId = requestAnimationFrame(animate)
  }
  
  scrollAnimationId = requestAnimationFrame(animate)
}

// 暂停滚动
const pauseAutoScroll = () => {
  isPaused = true
  if (scrollAnimationId) {
    cancelAnimationFrame(scrollAnimationId)
    scrollAnimationId = null
  }
}

// 恢复滚动
const resumeAutoScroll = () => {
  isPaused = false
  startScroll()
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
  fetchImages().then(() => {
    // 数据加载完成后启动动画
    setTimeout(() => {
      startGallerySwitch()
      startScroll()
    }, 500)
  })
})

onUnmounted(() => {
  if (scrollAnimationId) {
    cancelAnimationFrame(scrollAnimationId)
  }
  if (galleryInterval) {
    clearInterval(galleryInterval)
  }
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
  display: flex;
  flex-direction: column;
}

/* 分区块 */
.carousel-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.carousel-section:first-child {
  border-bottom: 1px solid #e8ecf1;
}

/* 标题栏 */
.carousel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 12px;
  border-bottom: 2px solid #2c5282;
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
}

.carousel-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e3a5f;
  margin: 0;
  letter-spacing: 1px;
}

.carousel-more {
  font-size: 13px;
  color: #2c5282;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.carousel-more:hover {
  color: #1e3a5f;
  transform: translateX(2px);
}

.carousel-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  gap: 10px;
  flex: 1;
  padding: 8px 12px 12px;
  box-sizing: border-box;
}

.carousel-grid.single-row {
  grid-template-rows: 1fr;
}

/* 横向滚动容器 */
.scroll-container {
  flex: 1;
  overflow: hidden;
  padding: 8px 12px 12px;
  position: relative;
}

.scroll-track {
  display: flex;
  gap: 10px;
  height: 100%;
  will-change: transform;
}

.scroll-item {
  flex-shrink: 0;
  width: calc(50% - 5px);
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  background: #f5f7fa;
  border: 1px solid #e8ecf1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-item img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.scroll-item:hover img {
  transform: scale(1.05);
}

.carousel-item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  background: #f5f7fa;
  transition: all 0.3s ease;
  border: 1px solid #e8ecf1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-item img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.carousel-item:hover {
  box-shadow: var(--shadow-md);
}

.carousel-item:hover img {
  transform: scale(1.05);
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

.carousel-item:hover .item-overlay,
.scroll-item:hover .item-overlay {
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
    height: 400px;
  }

  .carousel-header {
    padding: 10px 12px 6px;
  }

  .carousel-title {
    font-size: 15px;
  }

  .carousel-grid {
    gap: 8px;
    padding: 6px 10px 10px;
  }

  .item-overlay .el-icon {
    font-size: 22px;
  }
}

@media (max-width: 576px) {
  .image-scroll-carousel {
    height: 320px;
  }

  .carousel-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
}
</style>
