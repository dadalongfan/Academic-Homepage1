<template>
  <div class="members-page">
    <h2 class="section-title">组内成员</h2>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <el-icon class="is-loading" :size="40"><Loading /></el-icon>
      <p>加载中...</p>
    </div>

    <!-- 错误提示 -->
    <el-alert
      v-else-if="error"
      type="error"
      :title="error"
      :closable="false"
      class="error-alert"
    />

    <template v-else>
      <!-- 指导教师 -->
      <div v-if="supervisors.length > 0" class="section-card">
        <h3 class="subsection-title">指导教师</h3>
        <div v-for="member in supervisors" :key="member.id" class="teacher-card">
          <div class="teacher-photo">
            <img v-if="member.avatarUrl" :src="member.avatarUrl" :alt="member.name" />
            <div v-else class="avatar-placeholder">{{ member.name?.charAt(0) || '导' }}</div>
          </div>
          <div class="teacher-info">
            <h4>{{ member.name }}</h4>
            <p class="teacher-title">{{ member.role }}</p>
            <p v-if="member.bio" class="teacher-desc">{{ member.bio }}</p>
            <p v-if="member.researchDirection" class="teacher-desc">研究方向：{{ member.researchDirection }}</p>
            <p v-if="member.email" class="teacher-desc">
              <el-icon><Message /></el-icon>
              {{ member.email }}
            </p>
          </div>
        </div>
      </div>

      <!-- 专任教师 -->
      <div v-if="fullTimeTeachers.length > 0" class="section-card">
        <h3 class="subsection-title">专任教师</h3>
        <div class="teachers-grid">
          <div v-for="member in fullTimeTeachers" :key="member.id" class="teacher-card-compact">
            <div class="teacher-avatar-small">
              <img v-if="member.avatarUrl" :src="member.avatarUrl" :alt="member.name" />
              <div v-else>{{ member.name?.charAt(0) || '教' }}</div>
            </div>
            <div class="teacher-info-compact">
              <h5>{{ member.name }}</h5>
              <p class="teacher-role">{{ member.role }}</p>
              <p v-if="member.researchDirection" class="teacher-research">研究方向：{{ member.researchDirection }}</p>
              <p v-if="member.email" class="teacher-email">
                <el-icon><Message /></el-icon>
                {{ member.email }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 研究生 -->
      <div v-if="currentGraduates.length > 0" class="section-card">
        <h3 class="subsection-title">研究生</h3>
        <div class="members-grid">
          <div v-for="member in currentGraduates" :key="member.id" class="member-card">
            <div class="member-avatar">
              <img v-if="member.avatarUrl" :src="member.avatarUrl" :alt="member.name" />
              <div v-else>{{ member.name?.charAt(0) || '研' }}</div>
            </div>
            <div class="member-info">
              <h5>{{ member.name }}</h5>
              <p v-if="member.researchDirection" class="member-research">{{ member.researchDirection }}</p>
              <el-tag v-if="member.honors" size="small" type="success">{{ member.honors }}</el-tag>
            </div>
          </div>
        </div>
      </div>



      <!-- 校友 -->
      <div v-if="alumni.length > 0" class="section-card">
        <h3 class="subsection-title">校友</h3>
        <div class="teachers-grid">
          <div v-for="member in alumni" :key="member.id" class="teacher-card-compact">
            <div class="teacher-avatar-small">
              <img v-if="member.avatarUrl" :src="member.avatarUrl" :alt="member.name" />
              <div v-else>{{ member.name?.charAt(0) || '校' }}</div>
            </div>
            <div class="teacher-info-compact">
              <h5>{{ member.name }}</h5>
              <p class="teacher-role">{{ member.role }}</p>
              <p v-if="member.researchDirection" class="teacher-research">研究方向：{{ member.researchDirection }}</p>
              <p v-if="member.email" class="teacher-email">
                <el-icon><Message /></el-icon>
                {{ member.email }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <el-empty
        v-if="supervisors.length === 0 && fullTimeTeachers.length === 0 && currentGraduates.length === 0 && alumni.length === 0"
        description="暂无成员数据"
        :image-size="200"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Loading, Message } from '@element-plus/icons-vue'
import request from '@/utils/api'

// 响应式数据
const loading = ref(true)
const error = ref('')
const allMembers = ref([])

// 分类数据
const supervisors = computed(() => allMembers.value.filter(m => m.role === '指导教师'))
const fullTimeTeachers = computed(() => allMembers.value.filter(m => m.role === '专任教师'))
const currentGraduates = computed(() =>
  allMembers.value.filter(m => m.role === '研究生')
)
const alumni = computed(() =>
  allMembers.value.filter(m => m.role === '校友')
)

// 加载成员数据
const loadMembers = async () => {
  try {
    loading.value = true
    error.value = ''

    const res = await request.get('/members/list')

    if (res.code === 200) {
      allMembers.value = res.data || []
      console.log('成员数据加载成功:', allMembers.value.length, '条')
    } else {
      error.value = res.message || '加载成员失败'
    }
  } catch (err) {
    console.error('加载成员失败:', err)
    error.value = '加载成员失败，请检查后端服务是否启动'

    // 如果API调用失败，使用示例数据
    allMembers.value = [
      {
        id: 1,
        name: '夏铭',
        role: '指导教师',
        avatarUrl: '/照片.png',
        bio: '南京工业大学化工学院',
        researchDirection: '催化反应工程'
      }
    ]
  } finally {
    loading.value = false
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadMembers()
})
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: #999;
}

.error-alert {
  margin: 20px 0;
}

.section-title {
  text-align: center;
  font-size: 36px;
  color: var(--primary-color);
  margin-bottom: 40px;
  font-weight: 300;
}

.section-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.subsection-title {
  font-size: 24px;
  color: var(--primary-color);
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--accent-color);
}

/* 指导教师卡片 */
.teacher-card {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.teacher-photo {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
}

.teacher-photo img,
.avatar-placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  font-weight: bold;
}

.teacher-info {
  flex: 1;
}

.teacher-info h4 {
  font-size: 24px;
  color: #333;
  margin: 0 0 8px 0;
}

.teacher-title {
  font-size: 16px;
  color: var(--accent-color);
  margin: 0 0 12px 0;
}

.teacher-desc {
  color: #666;
  margin: 4px 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 专任教师网格 */
.teachers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.teacher-card-compact {
  background: #f9fafb;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  gap: 16px;
  transition: all 0.3s;
}

.teacher-card-compact:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.teacher-avatar-small {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: linear-gradient(135deg, var(--accent-color), #60a5fa);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}

.teacher-avatar-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.teacher-info-compact h5 {
  font-size: 18px;
  color: #333;
  margin: 0 0 6px 0;
}

.teacher-role {
  font-size: 14px;
  color: var(--accent-color);
  margin: 0 0 8px 0;
}

.teacher-research {
  font-size: 13px;
  color: #666;
  margin: 4px 0;
  line-height: 1.5;
}

.teacher-email {
  font-size: 13px;
  color: #666;
  margin: 8px 0 0 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 成员网格 */
.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

.member-card {
  background: #f9fafb;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s;
}

.member-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.member-avatar {
  width: 80px;
  height: 80px;
  margin: 0 auto 12px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #10b981, #34d399);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-info h5 {
  font-size: 16px;
  color: #333;
  margin: 0 0 4px 0;
}

.member-research {
  font-size: 13px;
  color: #666;
  margin: 4px 0;
  line-height: 1.4;
}


</style>
