<template>
  <div class="culture-page">
    <h2 class="section-title">{{ $t('culture.teamStyle') }}</h2>
    <TeamStyleGallery />
  </div>
</template>

<script setup>
import TeamStyleGallery from './components/TeamStyleGallery.vue'
</script>

<style scoped>
@import '/src/assets/styles/variables.css';
@import '/src/assets/styles/common.css';

.culture-page {
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
  font-weight: 700;
  color: var(--primary-color);
  text-align: center;
  margin: 0 0 var(--spacing-lg) 0;
  position: relative;
  padding-bottom: 15px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  border-radius: 2px;
}
</style>
