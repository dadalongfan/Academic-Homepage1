<template>
  <div class="projects-page">
    <h2 class="section-title">{{ $t('projects.title') }}</h2>

    <!-- 项目列表 -->
    <div class="section-card">
      <h3 class="subsection-title">{{ $t('projects.list') }}</h3>
      <el-table :data="projects" style="width: 100%" stripe>
        <el-table-column type="index" :label="$t('common.index')" width="60" />
        <el-table-column prop="name" :label="$t('projects.name')" min-width="300" />
        <el-table-column prop="role" :label="$t('projects.role')" width="100" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.role === '主持' ? 'danger' : 'primary'" size="small">
              {{ scope.row.role }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="level" :label="$t('projects.level')" width="100" align="center">
          <template #default="scope">
            <el-tag :type="getProjectLevelType(scope.row.level)" size="small">
              {{ scope.row.level }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="period" :label="$t('projects.period')" width="180" />
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import request from '../../utils/api'
import { useTranslation } from '@/utils/i18n/useTranslation'

const loading = ref(false)

// 使用通用翻译逻辑
const {
  originalData: originalProjects,
  displayData: projects,
  updateOriginalData
} = useTranslation([], {
  textFields: ['name']
})

// 从API加载项目数据
const loadProjects = async () => {
  try {
    loading.value = true
    const res = await request.get('/projects/list')
    const processedProjects = (res.data || []).map(project => ({
      ...project,
      period: `${project.startDate} -- ${project.endDate}`
    }))
    updateOriginalData(processedProjects)
  } catch (error) {
    console.error('加载项目数据失败:', error)
  } finally {
    loading.value = false
  }
}

const getProjectLevelType = (level) => {
  const typeMap = {
    '国家级': 'danger',
    '省部级': 'warning',
    '部委级': 'success',
    '省级': 'warning'
  }
  return typeMap[level] || 'info'
}

onMounted(() => {
  loadProjects()
})
</script>

<style scoped>
@import '/src/assets/styles/variables.css';
@import '/src/assets/styles/common.css';

.projects-page {
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

.subsection-title {
  font-family: var(--font-serif);
  font-size: 24px;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  padding-bottom: 12px;
  border-bottom: 2px solid var(--primary-light);
}
</style>
