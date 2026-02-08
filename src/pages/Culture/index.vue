<template>
  <div class="culture-page">
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

</style>
