<template>
  <div class="members-page" :class="{ 'page-loading': loading || isTranslating }">
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
      <div class="members-layout">
        <!-- 左侧固定导航菜单 -->
        <PageSideNav
          v-if="navItems.length > 0"
          :items="navItems"
          :active-id="activeRole ? `role-${activeRole}` : 'role-unassigned'"
          @item-click="handleNavClick"
        />

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
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Loading, Message } from '@element-plus/icons-vue'
import { membersApi } from '@/api'
import { API_BASE_URL } from '@/config'
import { useTranslation } from '@/utils/i18n/useTranslation'
import { getBatchTranslation } from '@/utils/i18n/translationService'
import PageSideNav from '@/components/PageSideNav.vue'

const { locale } = useI18n()

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

// 翻译后的角色名称映射
const translatedRoleNames = ref({})

// 翻译角色名称
const translateRoleNames = async () => {
  const roleNames = membersByRole.value.map(g => g.roleName)
  if (roleNames.length === 0) return
  
  try {
    // 根据当前语言确定翻译方向
    const sourceLang = 'zh'
    const targetLang = locale.value === 'en' ? 'en' : 'zh'
    const translated = await getBatchTranslation(roleNames, sourceLang, targetLang)
    const mapping = {}
    membersByRole.value.forEach((group, index) => {
      mapping[group.roleName] = translated[index] || group.roleName
    })
    translatedRoleNames.value = mapping
  } catch (error) {
    console.error('翻译角色名称失败:', error)
  }
}

// 导航项
const navItems = computed(() => {
  return membersByRole.value.map(group => ({
    id: group.roleId ? `role-${group.roleId}` : 'role-unassigned',
    label: translatedRoleNames.value[group.roleName] || group.roleName
  }))
})

// 处理导航点击
const handleNavClick = (id) => {
  const roleId = id === 'role-unassigned' ? null : parseInt(id.replace('role-', ''))
  scrollToRole(roleId)
}

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
      translateRoleNames() // 翻译角色名称
    })
  })

  // 添加滚动监听
  window.addEventListener('scroll', handleScroll, { passive: true })
})

// 组件卸载时移除滚动监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 监听语言变化，重新翻译角色名称
watch(locale, () => {
  translateRoleNames()
})
</script>

<style scoped>
/* 页面加载状态隐藏内容 */
.page-loading {
  visibility: hidden;
}

/* 布局容器 */
.members-layout {
  display: flex;
  gap: 24px;
  position: relative;
}

/* 右侧内容区域 */
.members-content {
  flex: 1;
  min-width: 0;
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

.section-card {
  background: linear-gradient(145deg, #ffffff 0%, #fafbfc 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 28px;
  border: 1px solid #e8ecf1;
  box-shadow: 0 4px 20px rgba(30, 58, 95, 0.06);
  transition: all 0.3s ease;
}

.section-card:hover {
  box-shadow: 0 8px 30px rgba(30, 58, 95, 0.1);
}

.subsection-title {
  font-size: 22px;
  color: #1e3a5f;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #2c5282;
  font-weight: 600;
  letter-spacing: 1px;
}

/* 指导教师卡片 - 学术风 */
.teacher-card {
  display: flex;
  gap: 28px;
  align-items: flex-start;
  padding: 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.teacher-photo {
  flex-shrink: 0;
  width: 130px;
  height: 160px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(30, 58, 95, 0.15);
  border: 2px solid #fff;
}

.teacher-photo img,
.avatar-placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  font-weight: 600;
}

.teacher-info {
  flex: 1;
}

.teacher-info h4 {
  font-size: 26px;
  color: #1e3a5f;
  margin: 0 0 10px 0;
  font-weight: 600;
}

.teacher-title {
  font-size: 15px;
  color: #2c5282;
  margin: 0 0 16px 0;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.teacher-desc {
  color: #4a5568;
  margin: 6px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  line-height: 1.6;
}

/* 专任教师网格 - 学术风 */
.teachers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.teacher-card-compact {
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  gap: 16px;
  transition: all 0.3s ease;
  border: 1px solid #e8ecf1;
}

.teacher-card-compact:hover {
  box-shadow: 0 8px 24px rgba(30, 58, 95, 0.12);
  transform: translateY(-4px);
  border-color: #d0d7de;
}

.teacher-avatar-small {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(30, 58, 95, 0.2);
  border: 2px solid #fff;
}

.teacher-avatar-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.teacher-info-compact h5 {
  font-size: 18px;
  color: #1e3a5f;
  margin: 0 0 6px 0;
  font-weight: 600;
}

.teacher-role {
  font-size: 13px;
  color: #2c5282;
  margin: 0 0 10px 0;
  font-weight: 500;
}

.teacher-research {
  font-size: 13px;
  color: #4a5568;
  margin: 4px 0;
  line-height: 1.5;
}

.teacher-email {
  font-size: 13px;
  color: #64748b;
  margin: 8px 0 0 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 成员网格 - 学术风 */
.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
}

.member-card {
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 12px;
  padding: 24px 16px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #e8ecf1;
}

.member-card:hover {
  box-shadow: 0 8px 24px rgba(30, 58, 95, 0.12);
  transform: translateY(-4px);
  border-color: #d0d7de;
}

.member-avatar {
  width: 72px;
  height: 72px;
  margin: 0 auto 14px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(30, 58, 95, 0.2);
  border: 2px solid #fff;
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-info h5 {
  font-size: 15px;
  color: #1e3a5f;
  margin: 0 0 6px 0;
  font-weight: 600;
}

.member-research {
  font-size: 12px;
  color: #4a5568;
  margin: 4px 0;
  line-height: 1.4;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .members-layout {
    flex-direction: column;
  }
}

</style>
