<template>
  <div class="members-page" :class="{ 'page-loading': loading || isTranslating }">
    <h2 class="section-title">{{ $t('members') }}</h2>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <el-icon class="is-loading" :size="40"><Loading /></el-icon>
      <p>{{ $t('common.loading') }}</p>
    </div>

    <!-- 错误提示 -->
    <el-alert
      v-else-if="error"
      type="error"
      :title="error"
      :closable="false"
      class="error-alert"
    />

    <!-- 翻译状态 -->
    <div v-else-if="isTranslating" class="loading-container">
      <el-icon class="is-loading" :size="40"><Loading /></el-icon>
      <p>{{ $t('common.loading') }}</p>
    </div>

    <template v-else>
      <!-- 左侧固定导航菜单 -->
      <div v-if="membersByRole.length > 0" class="side-nav">
        <div class="side-nav-title">角色分类</div>
        <ul class="side-nav-list">
          <li
            v-for="group in membersByRole"
            :key="group.roleId"
            class="side-nav-item"
            :class="{ active: activeRole === group.roleId }"
          >
            <a
              :href="group.roleId ? `#role-${group.roleId}` : '#role-unassigned'"
              @click.prevent="scrollToRole(group.roleId)"
              class="side-nav-link"
            >
              {{ group.roleName }}
            </a>
          </li>
        </ul>
      </div>

      <!-- 右侧内容区域 -->
      <div class="members-content">
        <!-- 按角色分组展示 -->
        <template v-for="group in membersByRole" :key="group.roleId">
        <div
          v-if="group && group.members && group.members.length > 0"
          class="section-card"
          :id="group.roleId ? `role-${group.roleId}` : 'role-unassigned'"
        >
          <h3 class="subsection-title">{{ group.roleName }}</h3>

          <!-- 指导教师样式 -->
          <div v-if="group.roleName === '指导教师'" class="teacher-card">
            <div v-for="member in group.members" :key="member.id">
              <template v-if="displayMemberById(member.id)">
                <div class="teacher-photo">
                  <img v-if="displayMemberById(member.id).avatarUrl" :src="displayMemberById(member.id).avatarUrl" :alt="displayMemberById(member.id).name" />
                  <div v-else class="avatar-placeholder">{{ displayMemberById(member.id).name?.charAt(0) || '导' }}</div>
                </div>
                <div class="teacher-info">
                  <h4>{{ displayMemberById(member.id).name }}</h4>
                  <p class="teacher-title">{{ displayMemberById(member.id).roleName }}</p>
                  <p v-if="displayMemberById(member.id).bio" class="teacher-desc">{{ displayMemberById(member.id).bio }}</p>
                  <p v-if="displayMemberById(member.id).researchDirection" class="teacher-desc">{{ $t('members.researchDirection') }}：{{ displayMemberById(member.id).researchDirection }}</p>
                  <p v-if="displayMemberById(member.id).email" class="teacher-desc">
                    <el-icon><Message /></el-icon>
                    {{ displayMemberById(member.id).email }}
                  </p>
                </div>
              </template>
            </div>
          </div>

          <!-- 专任教师样式 -->
          <div v-else-if="group.roleName === '专任教师'" class="teachers-grid">
            <div v-for="member in group.members" :key="member.id" class="teacher-card-compact">
              <template v-if="displayMemberById(member.id)">
                <div class="teacher-avatar-small">
                  <img v-if="displayMemberById(member.id).avatarUrl" :src="displayMemberById(member.id).avatarUrl" :alt="displayMemberById(member.id).name" />
                  <div v-else>{{ displayMemberById(member.id).name?.charAt(0) || '教' }}</div>
                </div>
                <div class="teacher-info-compact">
                  <h5>{{ displayMemberById(member.id).name }}</h5>
                  <p class="teacher-role">{{ displayMemberById(member.id).roleName }}</p>
                  <p v-if="displayMemberById(member.id).researchDirection" class="teacher-research">{{ $t('members.researchDirection') }}：{{ displayMemberById(member.id).researchDirection }}</p>
                  <p v-if="displayMemberById(member.id).email" class="teacher-email">
                    <el-icon><Message /></el-icon>
                    {{ displayMemberById(member.id).email }}
                  </p>
                </div>
              </template>
            </div>
          </div>

          <!-- 研究生样式 -->
          <div v-else-if="group.roleName === '研究生'" class="members-grid">
            <div v-for="member in group.members" :key="member.id" class="member-card">
              <template v-if="displayMemberById(member.id)">
                <div class="member-avatar">
                  <img v-if="displayMemberById(member.id).avatarUrl" :src="displayMemberById(member.id).avatarUrl" :alt="displayMemberById(member.id).name" />
                  <div v-else>{{ displayMemberById(member.id).name?.charAt(0) || '研' }}</div>
                </div>
                <div class="member-info">
                  <h5>{{ displayMemberById(member.id).name }}</h5>
                  <p v-if="displayMemberById(member.id).researchDirection" class="member-research">{{ displayMemberById(member.id).researchDirection }}</p>
                  <el-tag v-if="displayMemberById(member.id).honors" size="small" type="success">{{ displayMemberById(member.id).honors }}</el-tag>
                </div>
              </template>
            </div>
          </div>

          <!-- 其他角色默认样式 -->
          <div v-else class="teachers-grid">
            <div v-for="member in group.members" :key="member.id" class="teacher-card-compact">
              <template v-if="displayMemberById(member.id)">
                <div class="teacher-avatar-small">
                  <img v-if="displayMemberById(member.id).avatarUrl" :src="displayMemberById(member.id).avatarUrl" :alt="displayMemberById(member.id).name" />
                  <div v-else>{{ displayMemberById(member.id).name?.charAt(0) || '成' }}</div>
                </div>
                <div class="teacher-info-compact">
                  <h5>{{ displayMemberById(member.id).name }}</h5>
                  <p class="teacher-role">{{ displayMemberById(member.id).roleName }}</p>
                  <p v-if="displayMemberById(member.id).researchDirection" class="teacher-research">{{ $t('members.researchDirection') }}：{{ displayMemberById(member.id).researchDirection }}</p>
                  <p v-if="displayMemberById(member.id).email" class="teacher-email">
                    <el-icon><Message /></el-icon>
                    {{ displayMemberById(member.id).email }}
                  </p>
                </div>
              </template>
            </div>
          </div>
        </div>
        </template>

        <!-- 空状态 -->
        <el-empty
          v-if="membersByRole.length === 0 || membersByRole.every(g => g.members.length === 0)"
          :description="$t('members.noData')"
          :image-size="200"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { Loading, Message } from '@element-plus/icons-vue'
import { membersApi } from '@/api'
import { API_BASE_URL } from '@/config'
import { useTranslation } from '@/utils/i18n/useTranslation'

// 响应式数据
const loading = ref(true)
const error = ref('')
const rolesList = ref([])
const activeRole = ref(null) // 当前激活的角色

// 使用通用翻译逻辑
const {
  originalData: originalMembers,
  displayData: allMembers,
  updateOriginalData,
  isTranslating
} = useTranslation([], {
  textFields: ['name', 'bio', 'researchDirection', 'honors', 'roleName']
})

// 根据ID查找翻译后的成员信息
const displayMemberById = (id) => {
  return allMembers.value.find(m => m.id === id)
}

// 按角色分组的成员
const membersByRole = computed(() => {
  const groups = []

  // 按角色排序顺序遍历
  for (const role of rolesList.value) {
    if (!role) continue
    const roleMembers = originalMembers.value.filter(m => m && m.roleId === role.id)
    if (roleMembers.length > 0) {
      groups.push({
        roleId: role.id,
        roleName: role.name,
        members: roleMembers
      })
    }
  }

  // 添加未分配角色的成员
  const unassignedMembers = originalMembers.value.filter(m => m && !m.roleId)
  if (unassignedMembers.length > 0) {
    groups.push({
      roleId: null,
      roleName: '其他成员',
      members: unassignedMembers
    })
  }

  return groups
})

// 加载角色列表
const loadRoles = async () => {
  try {
    const res = await membersApi.getRoles()
    if (res.code === 200) {
      // 只显示可见的角色
      rolesList.value = (res.data || []).filter(role => role.isVisible !== false)
    }
  } catch (err) {
    console.error('加载角色列表失败:', err)
    // 使用默认角色
    rolesList.value = [
      { id: 1, name: '指导教师' },
      { id: 2, name: '专任教师' },
      { id: 3, name: '研究生' },
      { id: 4, name: '校友' }
    ]
  }
}

// 加载成员数据
const loadMembers = async () => {
  try {
    loading.value = true
    error.value = ''

    // 先加载角色
    await loadRoles()

    // 再加载成员
    const res = await membersApi.getListByRole()

    if (res.code === 200) {
      const members = res.data || []

      // 处理成员头像URL，转换为完整URL
      const processedMembers = members.map(member => {
        if (member.avatarUrl && !member.avatarUrl.startsWith('http://') && !member.avatarUrl.startsWith('https://')) {
          member.avatarUrl = `${API_BASE_URL}${member.avatarUrl}`
        }
        return member
      })

      updateOriginalData(processedMembers)
      console.log('成员数据加载成功:', processedMembers.length, '条')
    } else {
      error.value = res.message || '加载成员失败'
    }
  } catch (err) {
    console.error('加载成员失败:', err)
    error.value = '加载成员失败，请检查后端服务是否启动'

    // 如果API调用失败，使用示例数据
    const exampleData = [
      {
        id: 1,
        name: '夏铭',
        roleId: 1,
        roleName: '指导教师',
        avatarUrl: '/照片.png',
        bio: '南京工业大学化工学院',
        researchDirection: '催化反应工程'
      }
    ]
    updateOriginalData(exampleData)
  } finally {
    loading.value = false
  }
}

// 解析URL参数并跳转到指定角色
const scrollToRoleSection = () => {
  setTimeout(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const roleId = urlParams.get('role')
    if (roleId) {
      const targetElement = document.getElementById(`role-${roleId}`)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'auto',
          block: 'start'
        })
        activeRole.value = parseInt(roleId)
        console.log(`跳转到角色: ${roleId}`)
      } else {
        console.warn(`未找到角色卡片: role-${roleId}`)
      }
    }
  }, 300)
}

// 点击侧边栏导航跳转到指定角色
const scrollToRole = (roleId) => {
  const targetId = roleId ? `role-${roleId}` : 'role-unassigned'
  const targetElement = document.getElementById(targetId)
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    activeRole.value = roleId
  }
}

// 监听页面滚动,高亮当前可见的角色卡片
let scrollTimer = null
const handleScroll = () => {
  if (scrollTimer) return

  scrollTimer = setTimeout(() => {
    const sectionCards = document.querySelectorAll('.section-card')
    let currentRoleId = null

    sectionCards.forEach(card => {
      const rect = card.getBoundingClientRect()
      const cardTop = rect.top
      const cardBottom = rect.bottom

      // 如果卡片在视口中间位置,认为是当前激活的
      if (cardTop <= window.innerHeight / 2 && cardBottom >= window.innerHeight / 2) {
        const id = card.id
        if (id.startsWith('role-')) {
          const roleId = id.replace('role-', '')
          currentRoleId = roleId === 'unassigned' ? null : parseInt(roleId)
        }
      }
    })

    if (currentRoleId !== null || currentRoleId === activeRole.value) {
      activeRole.value = currentRoleId
    }

    scrollTimer = null
  }, 100)
}

// 组件挂载时加载数据
onMounted(() => {
  loadMembers().then(() => {
    nextTick(() => {
      scrollToRoleSection()
    })
  })

  // 添加滚动监听
  window.addEventListener('scroll', handleScroll, { passive: true })
})

// 组件卸载时移除滚动监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 页面加载状态隐藏内容 */
.page-loading {
  visibility: hidden;
}

/* 左侧固定导航菜单 */
.side-nav {
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 140px;
  max-height: 70vh;
  overflow-y: auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 16px 0;
  z-index: 100;
}

.side-nav::-webkit-scrollbar {
  width: 4px;
}

.side-nav::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 2px;
}

.side-nav::-webkit-scrollbar-thumb:hover {
  background: #bbb;
}

.side-nav-title {
  font-size: 14px;
  font-weight: 600;
  color: #999;
  padding: 0 16px 12px;
  border-bottom: 1px solid #eee;
  margin-bottom: 8px;
}

.side-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.side-nav-item {
  padding: 0 8px;
  margin: 4px 0;
}

.side-nav-link {
  display: block;
  padding: 10px 12px;
  color: #666;
  text-decoration: none;
  font-size: 14px;
  border-radius: 8px;
  transition: all 0.3s;
  cursor: pointer;
}

.side-nav-link:hover {
  background: #f0f0f0;
  color: var(--primary-color, #10b981);
}

.side-nav-item.active .side-nav-link {
  background: linear-gradient(135deg, var(--primary-color, #10b981) 0%, var(--primary-light, #34d399) 100%);
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

/* 右侧内容区域 */
.members-content {
  margin-left: 160px;
}

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

/* 响应式设计 */
@media (max-width: 1024px) {
  .side-nav {
    display: none;
  }

  .members-content {
    margin-left: 0;
  }
}

</style>
