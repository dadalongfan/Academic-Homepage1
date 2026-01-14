<template>
  <div class="publications-page">
    <h2 class="section-title">科研成果</h2>

    <!-- 统计概览 -->
    <div class="stats-overview">
      <div class="stat-card">
        <div class="stat-icon">📄</div>
        <div class="stat-info">
          <div class="stat-number">50+</div>
          <div class="stat-label">发表论文</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🔒</div>
        <div class="stat-info">
          <div class="stat-number">10+</div>
          <div class="stat-label">授权专利</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🏆</div>
        <div class="stat-info">
          <div class="stat-number">6</div>
          <div class="stat-label">代表奖励</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-info">
          <div class="stat-number">2000+</div>
          <div class="stat-label">总被引次数</div>
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
            <div class="paper-meta">
              <span class="paper-journal">{{ paper.journal }}</span>
              <span class="paper-date">{{ paper.date }}</span>
            </div>
            <div class="paper-author">{{ paper.author }}</div>
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
    title: '费托合成水相副产物混合醇分离：馏分切割工艺设计及控制',
    journal: '化工进展',
    date: '2022-05',
    author: '通讯作者',
    level: 'EI'
  },
  {
    title: 'Mass Transfer Advantage of Hierarchical Structured Cobalt-based Catalyst Pellet for Fischer-Tropsch Synthesis',
    journal: 'AIChE J.',
    date: '2021-02',
    author: '通讯作者',
    level: 'TOP'
  },
  {
    title: 'Effect of Process Conditions on The Product Distribution of Fischer-Tropsch Synthesis over An Industrial Cobalt-Based Catalyst Using A Fixed-Bed Reactor',
    journal: 'Appl. Catal. A: Gen.',
    date: '2020-05',
    author: '通讯作者',
    level: '2区'
  },
  {
    title: '计算机模拟辅助的催化反应工程研究与工艺技术开发',
    journal: '化工学报',
    date: '2020-01',
    author: '第1作者',
    level: 'EI'
  },
  {
    title: 'The Importance of Pressure-sensitive Pinch/Azeotrope Feature on Economic Distillation Design',
    journal: 'Sep. Purif. Technol.',
    date: '2020-02',
    author: '第1作者',
    level: 'TOP'
  },
  {
    title: 'Two-Stripper/Flash/Distillation Column System Design, Operation, and Control for Separating 2-Pentanone/4-Heptanone/Water Azeotropic Mixture via Navigating Residue Curve Maps and Balancing Total Annual Cost and Product Loss',
    journal: 'Ind. Eng. Chem. Res.',
    date: '2018-01',
    author: '第1作者',
    level: 'TOP'
  },
  {
    title: 'Temperature Control for Extractive Dividing-Wall Column with an Adjustable Vapor Split: Methylal/Methanol Azeotrope Separation',
    journal: 'Ind. Eng. Chem. Res.',
    date: '2013-11',
    author: '第1作者',
    level: 'TOP'
  },
  {
    title: 'Design and Control of Extractive Dividing-Wall Column for Separating Methylal—Methanol Mixture',
    journal: 'Ind. Eng. Chem. Res.',
    date: '2012-12',
    author: '第1作者',
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

.paper-meta,
.patent-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.paper-journal,
.patent-no {
  color: var(--secondary-color);
  font-weight: 600;
}

.paper-date,
.patent-date {
  color: var(--text-tertiary);
  font-size: 14px;
}

.paper-author,
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
}
</style>
