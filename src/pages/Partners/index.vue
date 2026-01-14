<template>
  <div class="partners-page">
    <h2 class="section-title">合作伙伴</h2>

    <!-- 合作介绍 -->
    <div class="section-card intro-card">
      <h3 class="subsection-title">合作情况介绍</h3>
      <p class="intro-text">
        依托中科院山西煤化所及南工大平台，在新型反应器开发、精密精馏塔设计及工艺开发与优化领域，与多家企业、高校及科研机构展开了长期稳定的合作。
      </p>
    </div>

    <!-- 合作单位 -->
    <div class="section-card">
      <h3 class="subsection-title">项目协作单位</h3>
      <div class="partners-grid">
        <div v-for="(partner, index) in partners" :key="index" class="partner-card">
          <div class="partner-logo">
            {{ partner.initial }}
          </div>
          <h4 class="partner-name">{{ partner.name }}</h4>
          <el-tag :type="partner.type === '企业' ? 'success' : 'primary'" size="small">
            {{ partner.type }}
          </el-tag>
        </div>
      </div>
    </div>

    <!-- 合作领域 -->
    <div class="section-card">
      <h3 class="subsection-title">合作领域</h3>
      <div class="areas-grid">
        <div class="area-item">
          <div class="area-icon">🏭</div>
          <h4>新型反应器开发</h4>
          <p>针对催化反应过程的反应器设计与优化</p>
        </div>
        <div class="area-item">
          <div class="area-icon">🔬</div>
          <h4>精密精馏塔设计</h4>
          <p>高效分离设备的开发与工艺优化</p>
        </div>
        <div class="area-item">
          <div class="area-icon">⚙️</div>
          <h4>工艺开发与优化</h4>
          <p>化工过程的模拟、优化与工业化应用</p>
        </div>
        <div class="area-item">
          <div class="area-icon">🔧</div>
          <h4>工业催化技术</h4>
          <p>催化剂设计与反应工程研究</p>
        </div>
      </div>
    </div>

    <!-- 合作成果 -->
    <div class="section-card">
      <h3 class="subsection-title">合作成果</h3>
      <el-timeline>
        <el-timeline-item timestamp="技术成果转化" placement="top">
          <el-card>
            <h4>中试及万吨级工程示范</h4>
            <p>多项专利技术成功应用于中试装置及万吨级工艺包</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="科研平台建设" placement="top">
          <el-card>
            <h4>材料化学工程国家重点实验室</h4>
            <p>依托国家级科研平台，开展前沿研究</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="产学研合作" placement="top">
          <el-card>
            <h4>长期稳定合作关系</h4>
            <p>与山东能源、泸天化、赛鼎工程等企业建立深度合作</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const partners = ref([
  { name: '山东能源集团有限公司', type: '企业', initial: '山' },
  { name: '泸天化股份有限公司', type: '企业', initial: '泸' },
  { name: '天津大学', type: '高校', initial: '天' },
  { name: '三维工程公司', type: '企业', initial: '三' },
  { name: '赛鼎工程公司', type: '企业', initial: '赛' },
  { name: '潞安矿业（集团）有限公司', type: '企业', initial: '潞' }
])
</script>

<style scoped>
@import '/src/assets/styles/variables.css';
@import '/src/assets/styles/common.css';

.partners-page {
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

.intro-card {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-left: 4px solid var(--primary-color);
}

.intro-text {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-primary);
  text-indent: 2em;
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

.area-item h4 {
  font-size: 18px;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.area-item p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}
</style>
