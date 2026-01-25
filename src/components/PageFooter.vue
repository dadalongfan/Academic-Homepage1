<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>{{ $t('联系方式') }}</h3>
          <div class="contact-info">
            <p><i class="icon">📧</i> {{ $t('邮箱') }}：{{ leaderInfo.email || $t('暂未设置') }}</p>
            <p><i class="icon">📱</i> {{ $t('电话') }}：{{ leaderInfo.phone || $t('暂未设置') }}</p>
            <p><i class="icon">📍</i> {{ $t('地址') }}：{{ leaderInfo.address || $t('暂未设置') }}</p>
            <p><i class="icon">📮</i> {{ $t('邮编') }}：{{ leaderInfo.postcode || $t('暂未设置') }}</p>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 {{ $t('介质过程强化团队') }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import request from '../utils/api'

const leaderInfo = ref({})

// 加载负责人信息
const loadLeaderInfo = async () => {
  try {
    const res = await request.get('/leader/info')
    if (res.data) {
      leaderInfo.value = res.data
    }
  } catch (error) {
    console.error('加载负责人信息失败:', error)
  }
}

onMounted(() => {
  loadLeaderInfo()
})
</script>

<style scoped>
.footer {
  background: var(--primary-dark);
  color: white;
  margin-top: var(--spacing-xl);
  padding: var(--spacing-lg) 0 var(--spacing-md);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-md);
}

.footer-section {
  text-align: center;
  width: 100%;
}

.footer-section h3 {
  font-size: 18px;
  margin-bottom: var(--spacing-sm);
  color: var(--accent-color);
}

.footer-section .contact-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-md);
  margin: 0 auto;
  max-width: 900px;
}

.footer-section p {
  font-size: 14px;
  line-height: 1.8;
  margin: 0;
  opacity: 0.9;
  white-space: nowrap;
}

.icon {
  margin-right: 8px;
}

.footer-bottom {
  text-align: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
  opacity: 0.8;
}
</style>
