<template>
  <div class="publications-page">
    <!-- 翻译状态 -->
    <div v-if="isTranslating" class="loading-container">
      <el-icon class="is-loading" :size="40"><Loading /></el-icon>
      <p>{{ $t('common.loading') }}</p>
    </div>

    <div v-else class="page-layout">
      <!-- 左侧导航栏 -->
      <PageSideNav
        :items="navItems"
        :active-id="activeSection"
        @item-click="scrollToSectionById"
      />

      <!-- 右侧内容区域 -->
      <div class="page-content">
        <!-- 研究方向 -->
        <div id="section-research" class="section-card">
      <h3 class="subsection-title">{{ $t('publications.researchDirections') }}</h3>
      <div class="research-directions">
        <div v-for="direction in researchDirections" :key="direction.id" class="direction-card">
          <h4 class="direction-name">{{ direction.name }}</h4>
          <p class="direction-desc">{{ direction.description }}</p>
        </div>
      </div>
    </div>

    <!-- 阶段成就（暂时隐藏）
    <div class="section-card">
      <h3 class="subsection-title">{{ $t('publications.achievements') }}</h3>
      <div class="achievements-list">
        <div v-for="achievement in achievements" :key="achievement.id" class="achievement-item">
          <div class="achievement-content">
            <div class="achievement-icon">{{ achievement.icon || '🎯' }}</div>
            <div class="achievement-text">
              <h4>{{ achievement.title }}</h4>
              <p class="achievement-desc">{{ achievement.description }}</p>
              <div v-if="achievement.tags" class="achievement-tags">
                <el-tag
                  v-for="tag in achievement.tags.split(',')"
                  :key="tag"
                  type="success"
                  size="small"
                  style="margin-right: 5px"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    -->

    <!-- 科研项目 -->
    <div id="section-projects" class="section-card">
      <h3 class="subsection-title">{{ $t('publications.projects') }}</h3>
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
        <el-table-column prop="type" :label="$t('projects.type')" width="100" align="center">
          <template #default="scope">
            <el-tag :type="getProjectLevelType(scope.row.type)" size="small">
              {{ scope.row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="period" :label="$t('projects.period')" width="180" />
      </el-table>
    </div>

    <!-- 代表论文 -->
    <div id="section-papers" class="section-card">
      <h3 class="subsection-title">{{ $t('publications.papers') }}</h3>
      <div class="papers-list">
        <div v-for="(paper, index) in papers" :key="index" class="paper-item">
          <div class="paper-number">[{{ index + 1 }}]</div>
          <div class="paper-content">
            <div class="paper-header">
              <h4 class="paper-title">{{ paper.title }}</h4>
              <div class="paper-tags">
              <el-tag v-if="paper.level === 'TOP'" type="danger" size="small">{{ $t('publications.topJournal') }}</el-tag>
              <el-tag v-else-if="paper.level === '2区'" type="warning" size="small">{{ $t('publications.zone2') }}</el-tag>
              <el-tag v-else type="info" size="small">{{ paper.level || 'EI' }}</el-tag>
            </div>
            </div>
            <div class="paper-author">{{ paper.authors }}</div>
            <div class="paper-journal">
              <strong>{{ paper.journal }}</strong>
              <span v-if="paper.year">, {{ paper.year }}</span>
              <span v-if="paper.volume">, <strong>{{ paper.volume }}</strong></span>
              <span v-if="paper.issue">({{ paper.issue }})</span>
              <span v-if="paper.pages">: {{ paper.pages }}</span>
            </div>
            <div class="paper-actions">
              <a 
                v-if="paper.doi"
                href="#" 
                class="paper-action-link"
                @click.prevent="handleDoiClick(paper.doi)"
              >
                <el-icon><Link /></el-icon>
                {{ $t('publications.doiLink') }}
              </a>
              <a 
                v-if="paper.pdfUrl"
                href="#" 
                class="paper-action-link"
                @click.prevent="handlePdfClick(paper.pdfUrl)"
              >
                <el-icon><Download /></el-icon>
                {{ $t('publications.pdfDownload') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 代表专利 -->
    <div id="section-patents" class="section-card">
      <h3 class="subsection-title">{{ $t('publications.patents') }}</h3>
      <div class="patents-list">
        <div v-for="(patent, index) in patents" :key="patent.id" class="patent-item">
          <div class="patent-number">[{{ index + 1 }}]</div>
          <div class="patent-content">
            <div class="patent-header">
              <h4 class="patent-title">{{ patent.title }}</h4>
            </div>
            <div class="patent-meta">
              <span class="patent-no">{{ $t('publications.patentNumber') }}：{{ patent.patentNumber }}</span>
              <span class="patent-date">{{ patent.authorizationDate }}</span>
            </div>
            <div class="patent-inventors">{{ $t('publications.inventors') }}：{{ patent.inventors }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 代表奖励（暂时隐藏）
    <div class="section-card">
      <h3 class="subsection-title">{{ $t('publications.honors') }}</h3>
      <div class="honors-list">
        <div v-for="(honor, index) in honors" :key="honor.id" class="honor-item">
          <div class="honor-rank">
            <el-icon v-if="index < 3" class="trophy-icon"><Trophy /></el-icon>
            <span v-else class="rank-number">{{ index + 1 }}</span>
          </div>
          <div class="honor-content">
            <h4 class="honor-title">{{ honor.title }}</h4>
            <div class="honor-meta">
              <el-tag :type="getHonorTagType(honor.awardLevel)" size="small">
                {{ honor.awardLevel }}
              </el-tag>
              <span class="honor-year">{{ honor.awardDate ? honor.awardDate.substring(0, 4) : '' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, onUnmounted, watch } from 'vue'
import { Link, Download, Trophy, Loading } from '@element-plus/icons-vue'
import { getFullFileUrl } from '@/utils/api'
import { publicationsApi, projectsApi } from '@/api'
import { useTranslation } from '@/utils/i18n/useTranslation'
import i18n from '@/utils/i18n'
import PageSideNav from '@/components/PageSideNav.vue'

// 响应式数据
const loading = ref(true)
const error = ref('')
const activeSection = ref('section-research')

// 导航项（使用计算属性支持动态翻译）
const navItems = computed(() => [
  { id: 'section-research', label: i18n.global.t('publications.researchDirections') },
  { id: 'section-projects', label: i18n.global.t('publications.projects') },
  { id: 'section-papers', label: i18n.global.t('publications.papers') },
  { id: 'section-patents', label: i18n.global.t('publications.patents') }
])

// 点击导航项滚动到对应区块
const scrollToSectionById = (id) => {
  const targetElement = document.getElementById(id)
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    activeSection.value = id
  }
}

// 监听页面滚动，高亮当前可见区块
let scrollTimer = null
const handleScroll = () => {
  if (scrollTimer) return
  scrollTimer = setTimeout(() => {
    const sections = ['section-research', 'section-projects', 'section-papers', 'section-patents']
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 150 && rect.bottom >= 150) {
          activeSection.value = sectionId
          break
        }
      }
    }
    scrollTimer = null
  }, 100)
}

// 阶段成就
const {
  originalData: originalAchievements,
  displayData: achievements,
  updateOriginalData: updateAchievements,
  isTranslating: isTranslatingAchievements
} = useTranslation([], {
  textFields: ['title', 'description', 'tags']
})

// 论文
const {
  originalData: originalPapers,
  displayData: papers,
  updateOriginalData: updatePapers,
  isTranslating: isTranslatingPapers
} = useTranslation([], {
  textFields: ['title', 'authors', 'journal']
})

// 专利
const {
  originalData: originalPatents,
  displayData: patents,
  updateOriginalData: updatePatents,
  isTranslating: isTranslatingPatents
} = useTranslation([], {
  textFields: ['title', 'inventors']
})

// 荣誉
const {
  originalData: originalHonors,
  displayData: honors,
  updateOriginalData: updateHonors,
  isTranslating: isTranslatingHonors
} = useTranslation([], {
  textFields: ['title', 'awardLevel']
})

// 科研项目
const {
  originalData: originalProjects,
  displayData: projects,
  updateOriginalData: updateProjects,
  isTranslating: isTranslatingProjects
} = useTranslation([], {
  textFields: ['name', 'role', 'type']
})

// 研究方向
const {
  originalData: originalResearchDirections,
  displayData: researchDirections,
  updateOriginalData: updateResearchDirections,
  isTranslating: isTranslatingResearchDirections
} = useTranslation([], {
  textFields: ['name', 'description']
})

// 计算是否正在翻译
const isTranslating = computed(() =>
  isTranslatingAchievements.value ||
  isTranslatingPapers.value ||
  isTranslatingPatents.value ||
  isTranslatingHonors.value ||
  isTranslatingProjects.value ||
  isTranslatingResearchDirections.value
)

// 获取项目级别标签类型
const getProjectLevelType = (type) => {
  const typeMap = {
    '国家级': 'danger',
    '省部级': 'warning',
    '部委级': 'success',
    '省级': 'warning'
  }
  return typeMap[type] || 'info'
}

// 获取荣誉标签类型
const getHonorTagType = (level) => {
  const typeMap = {
    '国家级': 'danger',
    '省部级': 'warning',
    '省级': 'warning',
    '院级': 'success',
    '学会级': 'primary',
    '校级': 'info'
  }
  return typeMap[level] || 'info'
}

// 处理DOI点击
const handleDoiClick = (doi) => {
  if (doi) {
    // 使用location.href代替window.open，避免被浏览器阻止
    location.href = `https://doi.org/${doi}`
  }
}

// 处理PDF点击
const handlePdfClick = (pdfUrl) => {
  if (pdfUrl) {
    // 使用getFullFileUrl处理PDF链接，确保路径正确
    const fullPdfUrl = getFullFileUrl(pdfUrl)
    // 使用location.href代替window.open，避免被浏览器阻止
    location.href = fullPdfUrl
  }
}

// 加载所有数据
const loadAllData = async () => {
  try {
    loading.value = true
    error.value = ''

    // 并行加载所有数据
    const [directionsRes, achievementsRes, papersRes, patentsRes, honorsRes, projectsRes] = await Promise.all([
      publicationsApi.getResearchDirections(),
      publicationsApi.getAchievements(),
      publicationsApi.getPapers(),
      publicationsApi.getPatents(),
      publicationsApi.getHonors(),
      projectsApi.getList()
    ])

    // 设置数据
    updateResearchDirections(directionsRes.data || [])
    updateAchievements(achievementsRes.data || [])
    updatePapers(papersRes.data || [])
    updatePatents(patentsRes.data || [])
    updateHonors(honorsRes.data || [])

    // 处理项目数据
    const processedProjects = (projectsRes.data || []).map(project => ({
      ...project,
      period: `${project.startDate} -- ${project.endDate}`
    }))
    updateProjects(processedProjects)
    
  } catch (err) {
    console.error('加载数据失败:', err)
    error.value = '加载数据失败，请检查后端服务是否启动'
  } finally {
    loading.value = false
  }
}

// 解析URL参数并跳转到指定区块
const scrollToSection = () => {
  setTimeout(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const section = urlParams.get('section')
    if (section) {
      const targetElement = document.getElementById(`section-${section}`)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'auto',
          block: 'start'
        })
        console.log(`跳转到区块: ${section}`)
      } else {
        console.warn(`未找到区块: section-${section}`)
      }
    }
  }, 300)
}

// 组件挂载时加载数据
onMounted(() => {
  loadAllData().then(() => {
    nextTick(() => {
      scrollToSection()
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
@import '../../assets/styles/variables.css';
@import '../../assets/styles/common.css';

.publications-page {
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

.subsection-title {
  font-family: var(--font-serif);
  font-size: 24px;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  padding-bottom: 12px;
  border-bottom: 2px solid var(--primary-light);
}

/* 阶段成就样式 */
.achievements-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.achievement-item {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #fbbf24;
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  transition: all 0.3s ease;
}

.achievement-item:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

.achievement-content {
  display: flex;
  gap: var(--spacing-md);
  align-items: flex-start;
}

.achievement-icon {
  font-size: 64px;
  flex-shrink: 0;
}

.achievement-text {
  flex: 1;
}

.achievement-text h4 {
  font-size: 22px;
  color: #92400e;
  margin-bottom: var(--spacing-sm);
  font-family: var(--font-serif);
}

.achievement-desc {
  font-size: 16px;
  line-height: 1.8;
  color: #78350f;
  margin-bottom: var(--spacing-sm);
}

.achievement-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: var(--spacing-sm);
}

/* 研究方向样式 */
.research-directions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.direction-card {
  padding: var(--spacing-md);
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--primary-color);
  transition: all 0.3s ease;
}

.direction-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

.direction-name {
  font-size: 20px;
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
  font-family: var(--font-serif);
  font-weight: 600;
}

.direction-desc {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.papers-list,
.patents-list,
.honors-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.paper-item,
.patent-item,
.honor-item {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--bg-light);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--primary-color);
  transition: all 0.3s ease;
}

.paper-item:hover,
.patent-item:hover,
.honor-item:hover {
  box-shadow: var(--shadow-md);
  transform: translateX(5px);
}

.paper-number,
.patent-number {
  flex-shrink: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
  min-width: 50px;
}

.paper-content,
.patent-content,
.honor-content {
  flex: 1;
}

.paper-header,
.patent-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 12px;
}

.paper-title,
.patent-title {
  font-size: 18px;
  color: var(--text-primary);
  margin: 0;
  flex: 1;
  line-height: 1.5;
}

.paper-author {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 8px;
  font-style: italic;
}

.paper-journal {
  color: var(--primary-color);
  font-size: 15px;
  margin-bottom: 8px;
  line-height: 1.6;
}

.paper-meta,
.patent-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.patent-no {
  color: var(--secondary-color);
  font-weight: 600;
}

.patent-date,
.paper-date {
  color: var(--text-tertiary);
  font-size: 14px;
}

.patent-inventors {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 8px;
}

.paper-actions {
  display: flex;
  gap: 12px;
}

.paper-action-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;
}

.paper-action-link:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

.paper-action-link svg {
  font-size: 14px;
}

.honor-rank {
  flex-shrink: 0;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.trophy-icon {
  font-size: 32px;
  color: #fbbf24;
}

.rank-number {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
}

.honor-title {
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.honor-meta {
  display: flex;
  gap: 12px;
  align-items: center;
}

.honor-year {
  color: var(--text-tertiary);
  font-size: 14px;
}

@media (max-width: 768px) {
  .paper-header,
  .patent-header {
    flex-direction: column;
  }

  .paper-number,
  .patent-number {
    font-size: 16px;
    min-width: 40px;
  }

  .achievement-content {
    flex-direction: column;
    text-align: center;
  }

  .achievement-icon {
    margin: 0 auto var(--spacing-sm);
  }

  .achievement-text h4 {
    font-size: 20px;
  }

  .achievement-desc {
    font-size: 15px;
  }
}
</style>
