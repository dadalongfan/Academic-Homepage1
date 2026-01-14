<template>
  <div class="home-page">
    <!-- 个人信息区域 -->
    <div class="profile-section">
      <div class="profile-card">
        <div class="profile-left">
          <div class="photo-wrapper">
            <img src="/照片.png" alt="夏铭" class="profile-photo" />
          </div>
          <div class="basic-info">
            <h2 class="name">夏铭</h2>
            <p class="title">副教授 · 硕士生导师</p>
            <p class="affiliation">南京工业大学化工学院</p>
            <p class="lab">材料化学工程国家重点实验室</p>
          </div>
        </div>
        <div class="profile-right">
          <h3 class="section-title">个人简介</h3>
          <div class="bio-content">
            <p class="bio-text">
              夏铭，男，汉族，1987年6月出生，籍贯陕西汉中，现任南京工业大学化工学院副教授、硕士生导师，并为材料化学工程国家重点实验室成员。
            </p>
            <p class="bio-text">
              2009年9月至2014年6月，在天津大学化学工程专业硕博连读，获工学博士学位。2014年7月至2022年4月，任职于中国科学院山西煤炭化学研究所，历任助理研究员、副研究员，从事催化反应工程与计算机模拟方向研究。
            </p>
            <p class="bio-text">
              主要研究方向包括催化反应工程与计算机模拟、生物质催化转化、传质与分离工程、工业催化及新型反应器开发等。
            </p>
            <p class="bio-text">
              在AIChE Journal、化工进展等期刊发表论文50余篇，总被引近2000次。获授权发明专利10余项，主持国家自然科学基金等科研项目5项，参与中科院科技先导专项等10余项。
            </p>
          </div>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">50+</div>
              <div class="stat-label">发表论文</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">10+</div>
              <div class="stat-label">授权专利</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">2000+</div>
              <div class="stat-label">总被引次数</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">15+</div>
              <div class="stat-label">科研项目</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 教育经历 -->
    <div class="section-card">
      <h3 class="section-title">教育经历</h3>
      <el-timeline class="timeline">
        <el-timeline-item timestamp="2005.09 - 2009.06" placement="top">
          <el-card>
            <h4>郑州大学</h4>
            <p>化学工程与技术（制药工程）专业 · 工学学士</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2009.09 - 2014.06" placement="top">
          <el-card>
            <h4>天津大学</h4>
            <p>化学工程专业 · 工学博士（硕博连读）</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>

    <!-- 工作经历 -->
    <div class="section-card">
      <h3 class="section-title">工作经历</h3>
      <el-timeline class="timeline">
        <el-timeline-item timestamp="2014.07 - 2022.04" placement="top">
          <el-card>
            <h4>中国科学院山西煤炭化学研究所</h4>
            <p>助理研究员 · 副研究员</p>
            <p class="text-secondary">从事催化反应工程与计算机模拟方向研究</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2022.05 - 至今" placement="top">
          <el-card>
            <h4>南京工业大学化工学院</h4>
            <p>副教授 · 硕士生导师</p>
            <p class="text-secondary">材料化学工程国家重点实验室成员</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>

    <!-- 研究方向 -->
    <div class="section-card">
      <h3 class="section-title">研究方向</h3>
      <div class="research-areas">
        <div class="area-card">
          <div class="area-icon">🔬</div>
          <h4>催化反应工程与计算机模拟</h4>
          <p>催化剂设计优化与反应器数值模拟</p>
        </div>
        <div class="area-card">
          <div class="area-icon">🌱</div>
          <h4>生物质催化转化</h4>
          <p>生物质资源化利用与绿色催化</p>
        </div>
        <div class="area-card">
          <div class="area-icon">⚗️</div>
          <h4>传质与分离工程</h4>
          <p>新型分离技术与过程强化</p>
        </div>
        <div class="area-card">
          <div class="area-icon">🏭</div>
          <h4>工业催化及新型反应器开发</h4>
          <p>工业催化剂开发与反应器设计</p>
        </div>
      </div>
    </div>

    <!-- 最新动态 -->
    <div class="section-card">
      <h3 class="section-title">最新动态</h3>
      <div class="news-placeholder">
        <el-empty description="最新动态内容即将更新，敬请期待..." />
      </div>
    </div>

    <!-- 快速导航 -->
    <div class="section-card">
      <h3 class="section-title">快速导航</h3>
      <div class="quick-nav">
        <a href="/publications.html" class="nav-card">
          <div class="nav-icon">📚</div>
          <h4>科研成果</h4>
          <p>查看发表论文、专利和获奖情况</p>
        </a>
        <a href="/members.html" class="nav-card">
          <div class="nav-icon">👥</div>
          <h4>组内成员</h4>
          <p>了解课题组成员和研究团队</p>
        </a>
        <a href="/projects.html" class="nav-card">
          <div class="nav-icon">💰</div>
          <h4>科研项目</h4>
          <p>查看科研项目和经费情况</p>
        </a>
        <a href="/recruitment.html" class="nav-card">
          <div class="nav-icon">🎓</div>
          <h4>招贤纳士</h4>
          <p>欢迎优秀学生加入课题组</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
// 首页无需额外逻辑
</script>

<style scoped>
@import '/src/assets/styles/variables.css';
@import '/src/assets/styles/common.css';

.home-page {
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

.profile-section {
  margin-bottom: var(--spacing-lg);
}

.profile-card {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-lg);
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: var(--spacing-lg);
  transition: all 0.3s ease;
}

.profile-card:hover {
  box-shadow: var(--shadow-lg);
}

.profile-left {
  text-align: center;
}

.photo-wrapper {
  margin-bottom: var(--spacing-md);
}

.profile-photo {
  width: 250px;
  height: 250px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 5px solid var(--primary-color);
  box-shadow: var(--shadow-md);
}

.basic-info .name {
  font-family: var(--font-serif);
  font-size: 32px;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.basic-info .title {
  font-size: 18px;
  color: var(--secondary-color);
  margin-bottom: 8px;
  font-weight: 500;
}

.basic-info .affiliation,
.basic-info .lab {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.profile-right .section-title {
  margin-top: 0;
}

.bio-content {
  margin-bottom: var(--spacing-md);
}

.bio-text {
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 12px;
  color: var(--text-primary);
  text-indent: 2em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
}

.stat-item {
  text-align: center;
  padding: var(--spacing-md);
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  border-radius: var(--radius-md);
  color: white;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
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

.timeline {
  padding-left: 20px;
}

.research-areas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.area-card {
  text-align: center;
  padding: var(--spacing-md);
  background: var(--bg-light);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.area-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.area-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-sm);
}

.area-card h4 {
  color: var(--primary-color);
  margin-bottom: 8px;
  font-size: 18px;
}

.area-card p {
  color: var(--text-secondary);
  font-size: 14px;
}

.news-placeholder {
  padding: var(--spacing-lg) 0;
}

.quick-nav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.nav-card {
  display: block;
  text-align: center;
  padding: var(--spacing-md);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.nav-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.nav-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-sm);
}

.nav-card h4 {
  color: var(--primary-color);
  margin-bottom: 8px;
  font-size: 18px;
}

.nav-card p {
  color: var(--text-secondary);
  font-size: 14px;
}

@media (max-width: 968px) {
  .profile-card {
    grid-template-columns: 1fr;
  }

  .profile-photo {
    width: 200px;
    height: 200px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
