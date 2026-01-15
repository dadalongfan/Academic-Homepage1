<template>
  <div class="publications-page">
    <h2 class="section-title">科研成果</h2>

    <!-- 阶段成就 -->
    <div class="section-card">
      <h3 class="subsection-title">阶段成就</h3>
      <div class="achievements-list">
        <div class="achievement-item">
          <div class="achievement-content">
            <div class="achievement-icon">🎯</div>
            <div class="achievement-text">
              <h4>钴基费托合成催化剂与反应器技术突破</h4>
              <p class="achievement-desc">
                在钴基费托合成领域取得重大突破，开发了系列高性能钴基催化剂及新型反应器技术。
                相关成果已成功应用于中试装置及万吨级工程示范，实现了从实验室研究到工业化应用的技术跨越。
                该技术路线为煤制油产业的发展提供了重要支撑，具有良好的工业应用前景。
              </p>
              <div class="achievement-tags">
                <el-tag type="success">中试验证</el-tag>
                <el-tag type="warning">万吨级示范</el-tag>
                <el-tag type="primary">产业化应用</el-tag>
              </div>
            </div>
          </div>
        </div>

        <div class="achievement-item">
          <div class="achievement-content">
            <div class="achievement-icon" style="filter: hue-rotate(45deg);">🔬</div>
            <div class="achievement-text">
              <h4>分离工程与精馏技术创新</h4>
              <p class="achievement-desc">
                针对复杂混合物分离难题，开发了系列新型精馏技术与分离工艺。
                在萃取精馏、分壁精馏塔设计等方面取得重要进展，提出了多项创新性工艺流程。
                相关技术在丙酮精制、碳酸二甲酯生产等工业过程中得到应用，为化工分离领域提供了高效解决方案。
              </p>
              <div class="achievement-tags">
                <el-tag type="success">工艺创新</el-tag>
                <el-tag type="warning">节能降耗</el-tag>
                <el-tag type="primary">工业应用</el-tag>
              </div>
            </div>
          </div>
        </div>

        <div class="achievement-item">
          <div class="achievement-content">
            <div class="achievement-icon" style="filter: hue-rotate(90deg);">⚙️</div>
            <div class="achievement-text">
              <h4>化工过程模拟与优化平台建设</h4>
              <p class="achievement-desc">
                建立了完善的化工过程模拟与优化平台，将计算机模拟与实验研究紧密结合。
                通过流程模拟、反应器设计优化、操作参数调控等手段，实现了化工过程的智能化设计与优化。
                该平台成功应用于多个工业项目的工艺开发与优化，显著提升了研发效率和工艺水平。
              </p>
              <div class="achievement-tags">
                <el-tag type="success">数字化设计</el-tag>
                <el-tag type="warning">智能优化</el-tag>
                <el-tag type="info">平台建设</el-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 代表论文 -->
    <div class="section-card">
      <h3 class="subsection-title">代表论文</h3>
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
              <el-button size="small" type="primary" link>
                <el-icon><Link /></el-icon>
                DOI链接
              </el-button>
              <el-button size="small" type="success" link>
                <el-icon><Download /></el-icon>
                PDF下载
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 代表专利 -->
    <div class="section-card">
      <h3 class="subsection-title">代表专利</h3>
      <div class="patents-list">
        <div v-for="(patent, index) in patents" :key="index" class="patent-item">
          <div class="patent-number">[{{ index + 1 }}]</div>
          <div class="patent-content">
            <div class="patent-header">
              <h4 class="patent-title">{{ patent.title }}</h4>
              <el-tag v-if="patent.application" type="success" size="small">
                {{ patent.application }}
              </el-tag>
            </div>
            <div class="patent-meta">
              <span class="patent-no">专利号：{{ patent.number }}</span>
              <span class="patent-date">{{ patent.date }}</span>
            </div>
            <div class="patent-inventors">发明人：{{ patent.inventors }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 代表奖励 -->
    <div class="section-card">
      <h3 class="subsection-title">代表奖励</h3>
      <div class="honors-list">
        <div v-for="(honor, index) in honors" :key="index" class="honor-item">
          <div class="honor-rank">
            <el-icon v-if="index < 3" class="trophy-icon"><Trophy /></el-icon>
            <span v-else class="rank-number">{{ index + 1 }}</span>
          </div>
          <div class="honor-content">
            <h4 class="honor-title">{{ honor.name }}</h4>
            <div class="honor-meta">
              <el-tag :type="getHonorTagType(honor.level)" size="small">
                {{ honor.level }}
              </el-tag>
              <span class="honor-year">{{ honor.year }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 合作伙伴 -->
    <div class="section-card">
      <h3 class="subsection-title">合作伙伴</h3>

      <!-- 合作介绍 -->
      <div class="intro-section">
        <p class="intro-text">
          依托中科院山西煤化所及南工大平台，在新型反应器开发、精密精馏塔设计及工艺开发与优化领域，与多家企业、高校及科研机构展开了长期稳定的合作。
        </p>
      </div>

      <!-- 合作单位 -->
      <div class="partners-section">
        <h4 class="section-subtitle">项目协作单位</h4>
        <div class="partners-grid">
          <div v-for="(partner, index) in partners" :key="index" class="partner-card">
            <div class="partner-logo">
              {{ partner.initial }}
            </div>
            <h5 class="partner-name">{{ partner.name }}</h5>
            <el-tag :type="partner.type === '企业' ? 'success' : 'primary'" size="small">
              {{ partner.type }}
            </el-tag>
          </div>
        </div>
      </div>

      <!-- 合作领域 -->
      <div class="areas-section">
        <h4 class="section-subtitle">合作领域</h4>
        <div class="areas-grid">
          <div class="area-item">
            <div class="area-icon">🏭</div>
            <h5>新型反应器开发</h5>
            <p>针对催化反应过程的反应器设计与优化</p>
          </div>
          <div class="area-item">
            <div class="area-icon">🔬</div>
            <h5>精密精馏塔设计</h5>
            <p>高效分离设备的开发与工艺优化</p>
          </div>
          <div class="area-item">
            <div class="area-icon">⚙️</div>
            <h5>工艺开发与优化</h5>
            <p>化工过程的模拟、优化与工业化应用</p>
          </div>
          <div class="area-item">
            <div class="area-icon">🔧</div>
            <h5>工业催化技术</h5>
            <p>催化剂设计与反应工程研究</p>
          </div>
        </div>
      </div>

      <!-- 合作成果 -->
      <div class="achievements-section">
        <h4 class="section-subtitle">合作成果</h4>
        <el-timeline>
          <el-timeline-item timestamp="技术成果转化" placement="top">
            <el-card>
              <h5>中试及万吨级工程示范</h5>
              <p>多项专利技术成功应用于中试装置及万吨级工艺包</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="科研平台建设" placement="top">
            <el-card>
              <h5>材料化学工程国家重点实验室</h5>
              <p>依托国家级科研平台，开展前沿研究</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="产学研合作" placement="top">
            <el-card>
              <h5>长期稳定合作关系</h5>
              <p>与山东能源、泸天化、赛鼎工程等企业建立深度合作</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

    <!-- 发表论文统计 -->
    <div class="section-card">
      <h3 class="subsection-title">研究成果统计</h3>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8">
          <div class="stat-box">
            <h5>论文发表</h5>
            <div class="stat-detail">
              <p>在AIChE Journal、化工进展等期刊发表论文<strong>50余篇</strong></p>
              <p>总被引近<strong>2000次</strong></p>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <div class="stat-box">
            <h5>专利成果</h5>
            <div class="stat-detail">
              <p>获授权发明专利<strong>10余项</strong></p>
              <p>部分成果应用于<strong>中试及万吨级工程示范</strong></p>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <div class="stat-box">
            <h5>科研项目</h5>
            <div class="stat-detail">
              <p>主持国家自然科学基金等科研项目<strong>5项</strong></p>
              <p>参与中科院科技先导专项等<strong>10余项</strong></p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Link, Download, Trophy } from '@element-plus/icons-vue'

const papers = ref([
  {
    authors: '夏铭, 李德宝, 贾丽涛, 等',
    title: '费托合成水相副产物混合醇分离：馏分切割工艺设计及控制',
    journal: '化工进展',
    year: '2022',
    volume: '41',
    issue: '5',
    pages: '待补充',
    level: 'EI'
  },
  {
    authors: 'Ming Xia, Debao Li, Litao Jia, et al.',
    title: 'Mass Transfer Advantage of Hierarchical Structured Cobalt-based Catalyst Pellet for Fischer-Tropsch Synthesis',
    journal: 'AIChE Journal',
    year: '2021',
    volume: '67',
    issue: '2',
    pages: '待补充',
    level: 'TOP'
  },
  {
    authors: 'Ming Xia, Debao Li, Litao Jia, et al.',
    title: 'Effect of Process Conditions on The Product Distribution of Fischer-Tropsch Synthesis over An Industrial Cobalt-Based Catalyst Using A Fixed-Bed Reactor',
    journal: 'Applied Catalysis A: General',
    year: '2020',
    volume: '待补充',
    issue: '待补充',
    pages: '待补充',
    level: '2区'
  },
  {
    authors: '夏铭, 李德宝',
    title: '计算机模拟辅助的催化反应工程研究与工艺技术开发',
    journal: '化工学报',
    year: '2020',
    volume: '71',
    issue: '1',
    pages: '待补充',
    level: 'EI'
  },
  {
    authors: 'Ming Xia',
    title: 'The Importance of Pressure-sensitive Pinch/Azeotrope Feature on Economic Distillation Design',
    journal: 'Separation and Purification Technology',
    year: '2020',
    volume: '待补充',
    issue: '待补充',
    pages: '待补充',
    level: 'TOP'
  },
  {
    authors: 'Ming Xia, et al.',
    title: 'Two-Stripper/Flash/Distillation Column System Design, Operation, and Control for Separating 2-Pentanone/4-Heptanone/Water Azeotropic Mixture via Navigating Residue Curve Maps and Balancing Total Annual Cost and Product Loss',
    journal: 'Industrial & Engineering Chemistry Research',
    year: '2018',
    volume: '57',
    issue: '6',
    pages: '2142-2156',
    level: 'TOP'
  },
  {
    authors: 'Ming Xia, et al.',
    title: 'Temperature Control for Extractive Dividing-Wall Column with an Adjustable Vapor Split: Methylal/Methanol Azeotrope Separation',
    journal: 'Industrial & Engineering Chemistry Research',
    year: '2013',
    volume: '52',
    issue: '44',
    pages: '15226-15237',
    level: 'TOP'
  },
  {
    authors: 'Ming Xia, et al.',
    title: 'Design and Control of Extractive Dividing-Wall Column for Separating Methylal—Methanol Mixture',
    journal: 'Industrial & Engineering Chemistry Research',
    year: '2012',
    volume: '51',
    issue: '49',
    pages: '16028-16037',
    level: 'TOP'
  }
])

const patents = ref([
  {
    title: '一种生产高纯碳酸二甲酯的催化萃取精馏的装置及方法',
    number: 'CN113480430A',
    date: '2021-10-08',
    inventors: '李德宝, 夏铭, 贾丽涛, 侯博, 高用祥, 陈从标, 郭荷芹',
    application: '中试'
  },
  {
    title: '一种分离2－戊酮、4－庚酮、水和二氧化碳混合物的非均相共沸精馏方法',
    number: 'CN109771980B',
    date: '2021-04-13',
    inventors: '李德宝, 夏铭, 贾丽涛, 侯博, 肖勇, 鲁怀乾',
    application: ''
  },
  {
    title: '一种用于费托合成产物分离的精馏工艺',
    number: 'CN107916127B',
    date: '2019-09-10',
    inventors: '李德宝, 夏铭, 贾丽涛, 侯博, 马中义, 陈从标',
    application: '百吨级中试装置'
  },
  {
    title: '一种用于富含二氧化碳/水的丙酮精制纯化工艺',
    number: 'CN109665954A',
    date: '2019-04-23',
    inventors: '李德宝, 夏铭, 肖勇, 鲁怀乾, 贾丽涛, 侯博',
    application: '万吨级工艺包'
  },
  {
    title: '用于强放热反应的列管式固定床反应器',
    number: 'CN207641442U',
    date: '2018-07-24',
    inventors: '李德宝, 刘岩, 贾丽涛, 侯博, 马中义, 夏铭',
    application: ''
  }
])

const honors = ref([
  { name: '中国科学院青年创新促进会会员（提名/未资助）', level: '院级', year: '2022' },
  { name: '"中国颗粒学会－海岸鸿蒙"优秀报告奖', level: '学会级', year: '2020' },
  { name: '钴基费托煤制油催化剂及工艺技术改进', level: '省级', year: '2019' },
  { name: '山西省五一劳动奖状集体奖', level: '省级', year: '2015' },
  { name: '天津大学优秀毕业生奖金', level: '校级', year: '2014' },
  { name: '全国大学生数学建模竞赛（河南赛区）三等奖', level: '国家级', year: '2020' }
])

const partners = ref([
  { name: '山东能源集团有限公司', type: '企业', initial: '山' },
  { name: '泸天化股份有限公司', type: '企业', initial: '泸' },
  { name: '天津大学', type: '高校', initial: '天' },
  { name: '三维工程公司', type: '企业', initial: '三' },
  { name: '赛鼎工程公司', type: '企业', initial: '赛' },
  { name: '潞安矿业（集团）有限公司', type: '企业', initial: '潞' }
])

const getHonorTagType = (level) => {
  const typeMap = {
    '国家级': 'danger',
    '省级': 'warning',
    '院级': 'success',
    '学会级': 'primary',
    '校级': 'info'
  }
  return typeMap[level] || 'info'
}
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
.areas-section,
.achievements-section {
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
