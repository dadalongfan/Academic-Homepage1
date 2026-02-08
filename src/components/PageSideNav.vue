<template>
  <div class="page-side-nav">
    <ul class="side-nav-list">
      <li
        v-for="item in items"
        :key="item.id"
        class="side-nav-item"
        :class="{ active: activeId === item.id }"
      >
        <a
          :href="`#${item.id}`"
          @click.prevent="handleClick(item.id)"
          class="side-nav-link"
        >
          {{ item.label }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  activeId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['item-click'])

const handleClick = (id) => {
  emit('item-click', id)
}
</script>

<style scoped>
/* 左侧固定导航菜单 - 学术风 */
.page-side-nav {
  position: sticky;
  top: 20px;
  width: 130px;
  height: fit-content;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 16px 0;
  flex-shrink: 0;
  box-shadow: 0 4px 20px rgba(30, 58, 95, 0.08);
}

.page-side-nav::-webkit-scrollbar {
  width: 3px;
}

.page-side-nav::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.page-side-nav::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.side-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.side-nav-item {
  padding: 0 12px;
  margin: 6px 0;
}

.side-nav-link {
  display: block;
  padding: 10px 14px;
  color: #475569;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
  letter-spacing: 0.5px;
}

.side-nav-link:hover {
  background: #f1f5f9;
  color: #1e3a5f;
}

.side-nav-item.active .side-nav-link {
  background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(30, 58, 95, 0.25);
}

/* 响应式 */
@media (max-width: 1024px) {
  .page-side-nav {
    position: relative;
    top: 0;
    width: 100%;
    max-height: none;
    display: flex;
    padding: 12px;
    margin-bottom: 20px;
  }

  .side-nav-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;
  }

  .side-nav-item {
    padding: 0;
    margin: 0;
  }

  .side-nav-link {
    padding: 8px 16px;
    white-space: nowrap;
  }
}
</style>
