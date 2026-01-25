<template>
  <div class="publications-page">
    <h2 class="section-title">{{ $t('publications.title') }}</h2>

    <!-- 阶段成就 -->
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

    <!-- 代表论文 -->
    <div class="section-card">
      <h3 class="subsection-title">{{ $t('publications.papers') }}</h3>
      <div class="papers-list">
        <div v-for="(paper, index) in papers" :key="index" class="paper-item">
          <div class="paper-number">[{{ index + 1 }}]</div>
          <div class="paper-content">
            <div class="paper-header">
              <h4 class="paper-title">{{ paper.title }}</h4>
              <div class="paper-tags">
                <el-tag v-if="paper.level === 'TOP'" type="danger" size="small">化工TOP</el-tag>
                <el-tag v-else-if="paper.level === '2区'" type="warning" size="small">化学2区</el-tag>
                <el-tag v-else type="info" size="small">EI</el-tag>
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
                DOI链接
              </a>
              <a 
                v-if="paper.pdfUrl"
                href="#" 
                class="paper-action-link"
                @click.prevent="handlePdfClick(paper.pdfUrl)"
              >
                <el-icon><Download /></el-icon>
                PDF下载
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 代表专利 -->
    <div class="section-card">
      <h3 class="subsection-title">{{ $t('publications.patents') }}</h3>
      <div class="patents-list">
        <div v-for="(patent, index) in patents" :key="patent.id" class="patent-item">
          <div class="patent-number">[{{ index + 1 }}]</div>
          <div class="patent-content">
            <div class="patent-header">
              <h4 class="patent-title">{{ patent.title }}</h4>
            </div>
            <div class="patent-meta">
              <span class="patent-no">专利号：{{ patent.patentNumber }}</span>
              <span class="patent-date">{{ patent.authorizationDate }}</span>
            </div>
            <div class="patent-inventors">发明人：{{ patent.inventors }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 代表奖励 -->
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

    <!-- 合作伙伴 -->
    <div class="section-card">
      <h3 class="subsection-title">{{ $t('publications.partners') }}</h3>

      <!-- 合作介绍 -->
      <div class="intro-section">
        <p class="intro-text">
          {{ $t('publications.partnersIntro') }}
        </p>
      </div>

      <!-- 合作单位 -->
      <div class="partners-section">
        <h4 class="section-subtitle">{{ $t('publications.collaborationUnits') }}</h4>
        <div class="partners-grid">
          <div v-for="(partner, index) in partners" :key="partner.id" class="partner-card">
            <div class="partner-logo">
              {{ partner.name?.charAt(0) || '合' }}
            </div>
            <h5 class="partner-name">{{ partner.name }}</h5>
            <el-tag v-if="partner.cooperationType" :type="partner.cooperationType.includes('企业') ? 'success' : 'primary'" size="small">
              {{ partner.cooperationType }}
            </el-tag>
          </div>
        </div>
      </div>

      <!-- 合作领域 -->
      <div class="areas-section">
        <h4 class="section-subtitle">{{ $t('publications.collaborationAreas') }}</h4>
        <div class="areas-grid">
          <div class="area-item">
            <div class="area-icon">🏭</div>
            <h5>{{ $t('publications.area1Title') }}</h5>
            <p>{{ $t('publications.area1Desc') }}</p>
          </div>
          <div class="area-item">
            <div class="area-icon">🔬</div>
            <h5>{{ $t('publications.area2Title') }}</h5>
            <p>{{ $t('publications.area2Desc') }}</p>
          </div>
          <div class="area-item">
            <div class="area-icon">⚙️</div>
            <h5>{{ $t('publications.area3Title') }}</h5>
            <p>{{ $t('publications.area3Desc') }}</p>
          </div>
          <div class="area-item">
            <div class="area-icon">🔧</div>
            <h5>{{ $t('publications.area4Title') }}</h5>
            <p>{{ $t('publications.area4Desc') }}</p>
          </div>
        </div>
      </div>


    </div>

    <!-- 发表论文统计 -->
    <div class="section-card">
      <h3 class="subsection-title">{{ $t('publications.stats') }}</h3>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8">
          <div class="stat-box">
            <h5>{{ $t('publications.paperStats') }}</h5>
            <div class="stat-detail">
              <p>{{ $t('publications.paperStatsDesc1') }}</p>
              <p>{{ $t('publications.paperStatsDesc2') }}</p>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <div class="stat-box">
            <h5>{{ $t('publications.patentStats') }}</h5>
            <div class="stat-detail">
              <p>{{ $t('publications.patentStatsDesc1') }}</p>
              <p>{{ $t('publications.patentStatsDesc2') }}</p>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <div class="stat-box">
            <h5>{{ $t('publications.projectStats') }}</h5>
            <div class="stat-detail">
              <p>{{ $t('publications.projectStatsDesc1') }}</p>
              <p>{{ $t('publications.projectStatsDesc2') }}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Link, Download, Trophy } from '@element-plus/icons-vue'
import request from '@/utils/api'
import { useTranslation } from '@/utils/i18n/useTranslation'

// 响应式数据
const loading = ref(true)
const error = ref('')

// 阶段成就
const {
  originalData: originalAchievements,
  displayData: achievements,
  updateOriginalData: updateAchievements
} = useTranslation([], {
  textFields: ['title', 'description', 'tags']
})

// 论文
const {
  originalData: originalPapers,
  displayData: papers,
  updateOriginalData: updatePapers
} = useTranslation([], {
  textFields: ['title', 'authors', 'journal']
})

// 专利
const {
  originalData: originalPatents,
  displayData: patents,
  updateOriginalData: updatePatents
} = useTranslation([], {
  textFields: ['title', 'inventors']
})

// 荣誉
const {
  originalData: originalHonors,
  displayData: honors,
  updateOriginalData: updateHonors
} = useTranslation([], {
  textFields: ['title']
})

// 合作伙伴
const {
  originalData: originalPartners,
  displayData: partners,
  updateOriginalData: updatePartners
} = useTranslation([], {
  textFields: ['name', 'cooperationType']
})

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
    // 使用location.href代替window.open，避免被浏览器阻止
    location.href = pdfUrl
  }
}

// 加载所有数据
const loadAllData = async () => {
  try {
    loading.value = true
    error.value = ''

    // 并行加载所有数据
    const [achievementsRes, papersRes, patentsRes, honorsRes, partnersRes] = await Promise.all([
      request.get('/achievements/list').catch(() => ({ data: [] })),
      request.get('/papers/list').catch(() => ({ data: [] })),
      request.get('/patents/list').catch(() => ({ data: [] })),
      request.get('/honors/list').catch(() => ({ data: [] })),
      request.get('/partners/list').catch(() => ({ data: [] }))
    ])

    // 设置数据
    updateAchievements(achievementsRes.data || [])
    updatePapers(papersRes.data || [])
    updatePatents(patentsRes.data || [])
    updateHonors(honorsRes.data || [])
    updatePartners(partnersRes.data || [])
    
    // 调试：打印论文数据
    console.log('论文数据:', papers.value)
    // 调试：打印第一篇论文的DOI和PDF字段
    if (papers.value.length > 0) {
      console.log('第一篇论文的DOI:', papers.value[0].doi)
      console.log('第一篇论文的PDFURL:', papers.value[0].pdfUrl)
    }

    // 如果没有数据，使用默认示例数据
    if (achievements.value.length === 0) {
      const exampleAchievements = [
        {
          title: '钴基费托合成催化剂与反应器技术突破',
          description: '在钴基费托合成领域取得重大突破，开发了系列高性能钴基催化剂及新型反应器技术。相关成果已成功应用于中试装置及万吨级工程示范，实现了从实验室研究到工业化应用的技术跨越。该技术路线为煤制油产业的发展提供了重要支撑，具有良好的工业应用前景。',
          icon: '🎯',
          tags: '中试验证,万吨级示范,产业化应用'
        },
        {
          title: '分离工程与精馏技术创新',
          description: '针对复杂混合物分离难题，开发了系列新型精馏技术与分离工艺。在萃取精馏、分壁精馏塔设计等方面取得重要进展，提出了多项创新性工艺流程。相关技术在丙酮精制、碳酸二甲酯生产等工业过程中得到应用，为化工分离领域提供了高效解决方案。',
          icon: '🔬',
          tags: '工艺创新,节能降耗,工业应用'
        },
        {
          title: '化工过程模拟与优化平台建设',
          description: '建立了完善的化工过程模拟与优化平台，将计算机模拟与实验研究紧密结合。通过流程模拟、反应器设计优化、操作参数调控等手段，实现了化工过程的智能化设计与优化。该平台成功应用于多个工业项目的工艺开发与优化，显著提升了研发效率和工艺水平。',
          icon: '⚙️',
          tags: '数字化设计,智能优化,平台建设'
        }
      ]
      updateAchievements(exampleAchievements)
    }

  } catch (err) {
    console.error('加载数据失败:', err)
    error.value = '加载数据失败，请检查后端服务是否启动'
  } finally {
    loading.value = false
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadAllData()
})
</script>

<style scoped>
@import '/src/assets/styles/variables.css';
@import '/src/assets/styles/common.css';

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

.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.stat-card {
  background: white;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  transition: all 0.3s ease;
}

.stat-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 48px;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
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

.stat-box {
  padding: var(--spacing-md);
  background: var(--bg-light);
  border-radius: var(--radius-md);
  border: 2px solid var(--border-color);
  transition: all 0.3s ease;
}

.stat-box:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-sm);
}

.stat-box h5 {
  font-size: 18px;
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
  padding-bottom: 8px;
  border-bottom: 2px solid var(--primary-light);
}

.stat-detail p {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.stat-detail strong {
  color: var(--accent-color);
  font-weight: 700;
}

/* 合作伙伴样式 */
.intro-section {
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-left: 4px solid var(--primary-color);
  border-radius: var(--radius-md);
}

.intro-text {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-primary);
  text-indent: 2em;
}

.section-subtitle {
  font-size: 20px;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  margin-top: var(--spacing-lg);
  padding-left: 12px;
  border-left: 4px solid var(--accent-color);
}

.partners-section,
.areas-section {
  margin-bottom: var(--spacing-lg);
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.partner-card {
  text-align: center;
  padding: var(--spacing-md);
  background: var(--bg-light);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;
}

.partner-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.partner-logo {
  width: 100px;
  height: 100px;
  margin: 0 auto var(--spacing-sm);
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 700;
  color: white;
  box-shadow: var(--shadow-sm);
}

.partner-name {
  font-size: 16px;
  color: var(--text-primary);
  margin-bottom: 8px;
  line-height: 1.4;
  font-weight: 600;
}

.areas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.area-item {
  text-align: center;
  padding: var(--spacing-md);
  background: var(--bg-light);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.area-item:hover {
  background: white;
  box-shadow: var(--shadow-md);
  transform: translateY(-5px);
}

.area-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-sm);
}

.area-item h5 {
  font-size: 18px;
  color: var(--primary-color);
  margin-bottom: 8px;
  font-weight: 600;
}

.area-item p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .stats-overview {
    grid-template-columns: repeat(2, 1fr);
  }

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

  .partners-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .areas-grid {
    grid-template-columns: 1fr;
  }

  .section-subtitle {
    margin-top: var(--spacing-md);
  }
}
</style>
