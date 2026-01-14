<template>
  <div class="projects-page">
    <h2 class="section-title">项目经费</h2>

    <!-- 项目统计 -->
    <div class="stats-overview">
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-info">
          <div class="stat-number">15+</div>
          <div class="stat-label">总项目数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🎯</div>
        <div class="stat-info">
          <div class="stat-number">5</div>
          <div class="stat-label">主持项目</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🤝</div>
        <div class="stat-info">
          <div class="stat-number">10+</div>
          <div class="stat-label">参与项目</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">💰</div>
        <div class="stat-info">
          <div class="stat-number">[占位符]</div>
          <div class="stat-label">总经费</div>
        </div>
      </div>
    </div>

    <!-- 项目列表 -->
    <div class="section-card">
      <h3 class="subsection-title">科研项目</h3>
      <el-table :data="projects" style="width: 100%" stripe>
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="name" label="项目名称" min-width="300" />
        <el-table-column prop="role" label="角色" width="100" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.role === '主持' ? 'danger' : 'primary'" size="small">
              {{ scope.row.role }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="level" label="级别" width="100" align="center">
          <template #default="scope">
            <el-tag :type="getProjectLevelType(scope.row.level)" size="small">
              {{ scope.row.level }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="period" label="起止时间" width="180" />
        <el-table-column prop="funding" label="经费情况" width="120" align="right">
          <template #default>
            <span class="funding-placeholder">[占位符]</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 项目分类统计 -->
    <div class="section-card">
      <h3 class="subsection-title">项目分类统计</h3>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="6">
          <div class="stat-box">
            <div class="stat-box-header">
              <h5>国家级项目</h5>
              <div class="stat-number">4</div>
            </div>
            <el-progress :percentage="40" :stroke-width="12" :color="'#1a3a5c'" />
            <p class="stat-desc">主持3项，参与1项</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6">
          <div class="stat-box">
            <div class="stat-box-header">
              <h5>省部级项目</h5>
              <div class="stat-number">3</div>
            </div>
            <el-progress :percentage="30" :stroke-width="12" :color="'#3b82f6'" />
            <p class="stat-desc">主持1项，参与2项</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6">
          <div class="stat-box">
            <div class="stat-box-header">
              <h5>部委级项目</h5>
              <div class="stat-number">2</div>
            </div>
            <el-progress :percentage="20" :stroke-width="12" :color="'#10b981'" />
            <p class="stat-desc">中科院科技先导专项</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6">
          <div class="stat-box">
            <div class="stat-box-header">
              <h5>其他项目</h5>
              <div class="stat-number">6</div>
            </div>
            <el-progress :percentage="60" :stroke-width="12" :color="'#f59e0b'" />
            <p class="stat-desc">参与各类合作项目</p>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 项目时间轴 -->
    <div class="section-card">
      <h3 class="subsection-title">项目时间轴</h3>
      <el-timeline>
        <el-timeline-item timestamp="2022-至今" placement="top" color="#1a3a5c">
          <el-card>
            <h4>南京工业大学时期</h4>
            <p>继续开展催化反应工程与分离工程研究</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018-2023" placement="top" color="#3b82f6">
          <el-card>
            <h4>钴基费托合成关键技术验证与工业应用</h4>
            <p>中科院科技先导专项B（参与）</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018-2020" placement="top" color="#10b981">
          <el-card>
            <h4>Co/SiC高导热催化剂与径向反应器协同强化研究</h4>
            <p>国家自然科学基金（主持）</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2012-2018" placement="top" color="#f59e0b">
          <el-card>
            <h4>5万吨/年钴基费托固定床合成润滑油基础油和重质蜡技术工业示范</h4>
            <p>中科院科技先导专项A（参与）</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const projects = ref([
  {
    name: '钴基费托煤制油催化剂及工艺技术改进',
    role: '参与',
    level: '省级',
    period: '2015-01 -- 2017-12',
    funding: '[占位符]'
  },
  {
    name: 'Co/SiC高导热催化剂与径向反应器协同强化费托合成传递规律研究',
    role: '主持',
    level: '国家级',
    period: '2018-01 -- 2020-12',
    funding: '[占位符]'
  },
  {
    name: '基质隔离条件下金属氢化物催化H2S绿色转化的实验与理论研究',
    role: '参与',
    level: '国家级',
    period: '2016-01 -- 2018-12',
    funding: '[占位符]'
  },
  {
    name: '铜铝尖晶石缓释催化模型构建和衍变规律研究',
    role: '参与',
    level: '国家级',
    period: '2016-01 -- 2018-12',
    funding: '[占位符]'
  },
  {
    name: '钴锆界面的构建与调控及其在费托合成中的作用机制研究',
    role: '参与',
    level: '省级',
    period: '2017-01 -- 2018-12',
    funding: '[占位符]'
  },
  {
    name: '钴基费托合成关键技术验证与工业应用(中科院科技先导专项B)',
    role: '参与',
    level: '部委级',
    period: '2018-04 -- 2023-05',
    funding: '[占位符]'
  },
  {
    name: 'FeMo基甲醇一步合成甲缩醛双功能催化剂构建及机理研究',
    role: '主持',
    level: '国家级',
    period: '2019-05 -- 2021-06',
    funding: '[占位符]'
  },
  {
    name: '钴基费托合成技术山西省科技创新领军团队（特别项目）',
    role: '参与',
    level: '省级',
    period: '2018-12 -- 2019-12',
    funding: '[占位符]'
  },
  {
    name: '5万吨/年钴基费托固定床合成润滑油基础油和重质蜡技术工业示范(中科院科技先导专项A)',
    role: '参与',
    level: '部委级',
    period: '2012-01 -- 2018-12',
    funding: '[占位符]'
  }
])

const getProjectLevelType = (level) => {
  const typeMap = {
    '国家级': 'danger',
    '省级': 'warning',
    '部委级': 'success'
  }
  return typeMap[level] || 'info'
}
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

.funding-placeholder {
  color: var(--text-tertiary);
  font-style: italic;
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

.stat-box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.stat-box-header h5 {
  font-size: 16px;
  color: var(--primary-color);
  margin: 0;
}

.stat-box-header .stat-number {
  font-size: 28px;
  font-weight: 700;
  color: var(--accent-color);
}

.stat-desc {
  margin-top: 12px;
  font-size: 14px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .stats-overview {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
