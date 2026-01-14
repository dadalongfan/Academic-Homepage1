<template>
  <div class="gallery-page">
    <h2 class="section-title">电子相册</h2>

    <!-- 说明 -->
    <div class="section-card intro-card">
      <el-alert
        title="相册说明"
        type="info"
        description="记录课题组重要时刻，包括学术会议、团队活动、获奖留念等精彩瞬间"
        :closable="false"
        show-icon
      />
    </div>

    <!-- 学术会议 -->
    <div class="section-card">
      <h3 class="subsection-title">学术会议</h3>
      <div class="gallery-grid">
        <div v-for="i in 4" :key="i" class="gallery-item">
          <div class="image-placeholder">
            <el-icon size="64"><Picture /></el-icon>
            <span>会议照片 {{ i }}</span>
          </div>
          <div class="image-caption">参加学术会议照片</div>
        </div>
      </div>
    </div>

    <!-- 课题组活动 -->
    <div class="section-card">
      <h3 class="subsection-title">课题组活动</h3>
      <div class="gallery-grid">
        <div v-for="i in 6" :key="i" class="gallery-item">
          <div class="image-placeholder">
            <el-icon size="64"><Picture /></el-icon>
            <span>活动照片 {{ i }}</span>
          </div>
          <div class="image-caption">课题组团建活动</div>
        </div>
      </div>
    </div>

    <!-- 获奖时刻 -->
    <div class="section-card">
      <h3 class="subsection-title">获奖时刻</h3>
      <div class="gallery-grid">
        <div v-for="i in 3" :key="i" class="gallery-item">
          <div class="image-placeholder award">
            <el-icon size="64"><Trophy /></el-icon>
            <span>获奖照片 {{ i }}</span>
          </div>
          <div class="image-caption">荣誉获奖留念</div>
        </div>
      </div>
    </div>

    <!-- 毕业合影 -->
    <div class="section-card">
      <h3 class="subsection-title">毕业合影</h3>
      <div class="gallery-grid">
        <div v-for="i in 5" :key="i" class="gallery-item">
          <div class="image-placeholder graduate">
            <el-icon size="64"><User /></el-icon>
            <span>毕业照片 {{ i }}</span>
          </div>
          <div class="image-caption">毕业生合影留念</div>
        </div>
      </div>
    </div>

    <!-- 空状态提示 -->
    <div class="section-card">
      <el-empty
        description="相册图片正在整理中，更多精彩内容即将上线..."
      >
        <template #image>
          <div class="empty-icon">📸</div>
        </template>
      </el-empty>
    </div>
  </div>
</template>

<script setup>
import { Picture, Trophy, User } from '@element-plus/icons-vue'
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

.intro-card {
  background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
  border-left: 4px solid var(--primary-color);
}

.subsection-title {
  font-family: var(--font-serif);
  font-size: 24px;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  padding-bottom: 12px;
  border-bottom: 2px solid var(--primary-light);
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

.empty-icon {
  font-size: 96px;
  margin-bottom: var(--spacing-md);
}
</style>
