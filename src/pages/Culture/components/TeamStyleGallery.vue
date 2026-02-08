<template>
  <div class="team-style-page">
    <!-- 翻译状态 -->
    <div v-if="isTranslating" class="loading-container">
      <el-icon class="is-loading" :size="40"><Loading /></el-icon>
      <p>{{ $t('common.loading') }}</p>
    </div>

    <div v-else class="page-layout">
      <!-- 左侧导航栏 -->
      <PageSideNav
        v-if="navItems.length > 0"
        :items="navItems"
        :active-id="activeCategory"
        @item-click="scrollToCategory"
      />

      <!-- 右侧内容区域 -->
      <div class="page-content">
        <!-- 遍历分类显示相册（只显示有图片的分类） -->
        <div v-for="category in categoriesWithImages" :key="category.id" :id="`category-${category.id}`" class="section-card">
      <div class="section-header">
        <h3 class="subsection-title">{{ category.name }}</h3>
        <el-button
          :icon="sectionStates[category.id] ? ArrowUp : ArrowDown"
          circle
          size="small"
          @click="toggleSection(category.id)"
          class="toggle-btn"
        />
      </div>

      <transition name="section-collapse">
        <div v-show="sectionStates[category.id]" class="gallery-grid">
          <el-empty
            v-if="getCategoryImages(category.id).length === 0"
            :description="$t('gallery.noImages')"
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
              <div class="image-date">{{ image.uploadDate || $t('gallery.noDate') }}</div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- 空状态提示 -->
    <div v-if="loading" class="section-card">
      <el-empty :description="$t('gallery.loading')">
        <template #image>
          <div class="loading-icon">🔄</div>
        </template>
      </el-empty>
    </div>

        <div v-else-if="categories.length === 0" class="section-card">
          <el-empty
            :description="$t('gallery.empty')"
          >
            <template #image>
              <div class="empty-icon">📸</div>
            </template>
          </el-empty>
        </div>
      </div>
    </div>

    <!-- 图片查看模态框 -->
    <el-dialog
      v-model="imageModalVisible"
      :title="selectedImage.description || $t('gallery.preview')"
      width="80%"
      :show-close="true"
      :close-on-click-modal="true"
      @closed="closeImageModal"
      class="image-modal"
    >
      <div class="image-modal-content">
        <img
          :src="selectedImage.imageUrl"
          :alt="selectedImage.description || $t('gallery.preview')"
          @error="handleImageError"
          class="modal-image"
        />
      </div>
      <template #footer>
        <div class="modal-footer">
          <div class="image-info">
            <p><strong>{{ $t('gallery.category') }}：</strong>{{ getCategoryInfo(selectedImage.categoryId)?.name || $t('gallery.unknown') }}</p>
            <p v-if="selectedImage.description"><strong>{{ $t('gallery.description') }}：</strong>{{ selectedImage.description }}</p>
            <p v-if="selectedImage.uploadDate"><strong>{{ $t('gallery.uploadDate') }}：</strong>{{ selectedImage.uploadDate }}</p>
          </div>
          <el-button @click="closeImageModal">{{ $t('common.close') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { ArrowUp, ArrowDown, ZoomIn, Loading } from '@element-plus/icons-vue'
import { galleryApi } from '@/api'
import { API_BASE_URL } from '@/config'
import { useTranslation } from '@/utils/i18n/useTranslation'
import PageSideNav from '@/components/PageSideNav.vue'

const loading = ref(false)
const imageModalVisible = ref(false)
const selectedImage = ref({})
const activeCategory = ref('')

// 计算是否正在翻译
const isTranslating = computed(() => isTranslatingCategories.value || isTranslatingImages.value)

// 导航项
const navItems = computed(() => {
  return categoriesWithImages.value.map(category => ({
    id: `category-${category.id}`,
    label: category.name
  }))
})

// 点击导航项滚动到对应分类
const scrollToCategory = (id) => {
  const targetElement = document.getElementById(id)
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    activeCategory.value = id
  }
}

// 监听页面滚动，高亮当前可见分类
let scrollTimer = null
const handleScroll = () => {
  if (scrollTimer) return
  scrollTimer = setTimeout(() => {
    for (const category of categoriesWithImages.value) {
      const element = document.getElementById(`category-${category.id}`)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 150 && rect.bottom >= 150) {
          activeCategory.value = `category-${category.id}`
          break
        }
      }
    }
    scrollTimer = null
  }, 100)
}

// 只返回有图片的分类
const categoriesWithImages = computed(() => {
  return categories.value.filter(category => {
    const categoryImages = images.value[category.id] || []
    return categoryImages.length > 0
  })
})

// 使用通用翻译逻辑处理分类
const {
  originalData: originalCategories,
  displayData: categories,
  updateOriginalData: updateCategories,
  isTranslating: isTranslatingCategories
} = useTranslation([], {
  textFields: ['name']
})

// 图片数据按分类组织
const images = ref({})

// 使用通用翻译逻辑处理所有图片
const {
  originalData: originalImages,
  displayData: allImages,
  updateOriginalData: updateAllImages,
  isTranslating: isTranslatingImages
} = useTranslation([], {
  textFields: ['description']
})

// 加载分类和图片数据
const loadGalleryData = async () => {
  try {
    loading.value = true

    // 并行加载分类和图片数据
    const [categoriesRes, allImagesRes] = await Promise.all([
      galleryApi.getCategories(),
      galleryApi.getImages()
    ])

    // 更新分类数据
    const categoriesData = categoriesRes.data || []
    updateCategories(categoriesData)
    console.log('分类数据:', categoriesData)

    // 更新所有图片数据，等待翻译完成
    const allImagesData = allImagesRes.data || []

    // 处理图片URL，转换为完整URL
    const processedImagesData = allImagesData.map(image => {
      if (image.imageUrl && !image.imageUrl.startsWith('http://') && !image.imageUrl.startsWith('https://')) {
        image.imageUrl = `${API_BASE_URL}${image.imageUrl}`
      }
      return image
    })

    await updateAllImages(processedImagesData)
    console.log('图片数据:', processedImagesData)

    // 按分类组织图片数据
    const imagesByCategory = {}
    categories.value.forEach(category => {
      imagesByCategory[category.id] = []
    })

    // 分配图片到对应分类
    allImages.value.forEach(image => {
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
      // 默认都展开
      if (sectionStates.value[category.id] === undefined) {
        sectionStates.value[category.id] = true
      }
    })
  } catch (error) {
    console.error('加载相册数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 栏目展开/收起状态
const sectionStates = ref({})

// 切换栏目显示状态
const toggleSection = (categoryId) => {
  sectionStates.value[categoryId] = !sectionStates.value[categoryId]
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
  // 添加滚动监听
  window.addEventListener('scroll', handleScroll, { passive: true })
})

// 清理事件监听器
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@import '/src/assets/styles/variables.css';
@import '/src/assets/styles/common.css';

.team-style-page {
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

/* 页面布局 */
.page-layout {
  display: flex;
  gap: 24px;
  position: relative;
}

.page-content {
  flex: 1;
  min-width: 0;
}

/* 响应式 */
@media (max-width: 1024px) {
  .page-layout {
    flex-direction: column;
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
  height: 240px;
  display: flex;
  flex-direction: column;
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.image-caption {
  padding: 8px 12px;
  background: white;
  text-align: center;
  font-size: 13px;
  color: var(--text-secondary);
  border-top: 1px solid var(--border-color);
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.image-date {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: 2px;
}

.image-container {
  position: relative;
  flex: 1;
  overflow: hidden;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  background-color: #f5f5f5;
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
