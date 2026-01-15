<template>
  <div class="recruitment-page">
    <h2 class="section-title">招贤纳士</h2>

    <!-- 欢迎标语 -->
    <div class="hero-banner">
      <div class="banner-content">
        <h2>欢迎加入介质过程强化团队</h2>
        <p>探索催化反应工程的奥秘，共创绿色化工的未来</p>
      </div>
    </div>

    <!-- 招生专业 -->
    <div class="section-card">
      <h3 class="subsection-title">
        <el-icon><Reading /></el-icon>
        招生专业
      </h3>
      <div class="majors-grid">
        <div class="major-card">
          <div class="major-icon">🧪</div>
          <h4>材料与化工</h4>
          <p>专业硕士学位</p>
          <el-tag type="primary" size="small">招收中</el-tag>
        </div>
        <div class="major-card">
          <div class="major-icon">⚗️</div>
          <h4>化学工程与技术</h4>
          <p>学术硕士学位</p>
          <el-tag type="success" size="small">招收中</el-tag>
        </div>
      </div>
    </div>

    <!-- 课题组优势 -->
    <div class="section-card">
      <h3 class="subsection-title">
        <el-icon><Star /></el-icon>
        课题组优势
      </h3>
      <div class="advantages-grid">
        <div class="advantage-item">
          <div class="advantage-number">01</div>
          <h4>国家级科研平台</h4>
          <p>材料化学工程国家重点实验室，拥有先进的实验设备和研究条件</p>
        </div>
        <div class="advantage-item">
          <div class="advantage-number">02</div>
          <h4>丰硕的科研成果</h4>
          <p>在AIChE Journal等顶级期刊发表论文50余篇，授权专利10余项</p>
        </div>
        <div class="advantage-item">
          <div class="advantage-number">03</div>
          <h4>丰富的项目资源</h4>
          <p>主持国家级项目5项，参与中科院科技先导专项等10余项</p>
        </div>
        <div class="advantage-item">
          <div class="advantage-number">04</div>
          <h4>优秀的指导团队</h4>
          <p>指导学生获国家级特等奖、国家奖学金等荣誉</p>
        </div>
      </div>
    </div>

    <!-- 招生要求 -->
    <div class="section-card">
      <h3 class="subsection-title">
        <el-icon><Document /></el-icon>
        招生要求
      </h3>
      <div class="requirements-list">
        <div class="requirement-item">
          <el-icon color="#67C23A"><CircleCheck /></el-icon>
          <span>化学工程与工艺、材料化学、应用化学等相关专业背景</span>
        </div>
        <div class="requirement-item">
          <el-icon color="#67C23A"><CircleCheck /></el-icon>
          <span>具备良好的科研素养和创新精神</span>
        </div>
        <div class="requirement-item">
          <el-icon color="#67C23A"><CircleCheck /></el-icon>
          <span>有扎实的化学、化工基础知识</span>
        </div>
        <div class="requirement-item">
          <el-icon color="#67C23A"><CircleCheck /></el-icon>
          <span>英语四级及以上，具备良好的英文文献阅读能力</span>
        </div>
        <div class="requirement-item">
          <el-icon color="#67C23A"><CircleCheck /></el-icon>
          <span>工作踏实认真，有较强的团队合作意识</span>
        </div>
      </div>
    </div>

    <!-- 学生荣誉 -->
    <div class="section-card">
      <h3 class="subsection-title">
        <el-icon><Trophy /></el-icon>
        学生荣誉
      </h3>
      <div class="honors-showcase">
        <div class="honor-highlight">
          <div class="honor-icon">🏆</div>
          <div class="honor-content">
            <h4>第十八届全国大学生化工设计竞赛</h4>
            <p>国家级特等奖</p>
          </div>
        </div>
        <div class="honor-grid">
          <div class="honor-card">
            <div class="honor-tag">国家奖学金</div>
            <p>游晨曦（2024年）</p>
          </div>
          <div class="honor-card">
            <div class="honor-tag">优秀毕业生</div>
            <p>赵伟（2025年）</p>
          </div>
          <div class="honor-card">
            <div class="honor-tag">优秀报告奖</div>
            <p>中国颗粒学会</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 联系方式 -->
    <div class="section-card contact-card">
      <h3 class="subsection-title">
        <el-icon><Message /></el-icon>
        联系我们
      </h3>
      <div class="contact-info">
        <div class="contact-item">
          <div class="contact-icon">📧</div>
          <div class="contact-details">
            <h4>邮箱</h4>
            <p>[占位符]@njtech.edu.cn</p>
          </div>
        </div>
        <div class="contact-item">
          <div class="contact-icon">📍</div>
          <div class="contact-details">
            <h4>地址</h4>
            <p>江苏省南京市江北新区浦珠南路30号</p>
            <p>南京工业大学化工学院</p>
          </div>
        </div>
        <div class="contact-item">
          <div class="contact-icon">🔬</div>
          <div class="contact-details">
            <h4>实验室</h4>
            <p>材料化学工程国家重点实验室</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 申请流程 -->
    <div class="section-card">
      <h3 class="subsection-title">
        <el-icon><Operation /></el-icon>
        申请流程
      </h3>
      <el-steps :active="3" finish-status="success" align-center>
        <el-step title="提交申请" description="发送个人简历到邮箱" />
        <el-step title="面试考核" description="与导师面谈交流" />
        <el-step title="确定意向" description="双向选择达成共识" />
        <el-step title="加入团队" description="正式成为课题组成员" />
      </el-steps>
    </div>
  </div>
</template>

<script setup>
import { Reading, Star, Document, Trophy, Message, Operation, CircleCheck } from '@element-plus/icons-vue'
</script>

<style scoped>
@import '/src/assets/styles/variables.css';
@import '/src/assets/styles/common.css';

.recruitment-page {
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

.hero-banner {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
  text-align: center;
  color: white;
  box-shadow: var(--shadow-lg);
}

.banner-content h2 {
  font-family: var(--font-serif);
  font-size: 36px;
  margin-bottom: var(--spacing-md);
}

.banner-content p {
  font-size: 18px;
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

.subsection-title {
  font-family: var(--font-serif);
  font-size: 24px;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  padding-bottom: 12px;
  border-bottom: 2px solid var(--primary-light);
  display: flex;
  align-items: center;
  gap: 8px;
}

.majors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.major-card {
  text-align: center;
  padding: var(--spacing-lg);
  background: var(--bg-light);
  border-radius: var(--radius-md);
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.major-card:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
  transform: translateY(-5px);
}

.major-icon {
  font-size: 64px;
  margin-bottom: var(--spacing-md);
}

.major-card h4 {
  font-size: 20px;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.major-card p {
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.advantage-item {
  padding: var(--spacing-md);
  background: var(--bg-light);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--accent-color);
  transition: all 0.3s ease;
}

.advantage-item:hover {
  background: white;
  box-shadow: var(--shadow-sm);
  transform: translateX(5px);
}

.advantage-number {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 8px;
  opacity: 0.3;
}

.advantage-item h4 {
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.advantage-item p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.requirements-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.requirement-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: var(--spacing-sm);
  background: var(--bg-light);
  border-radius: var(--radius-sm);
  transition: all 0.3s ease;
}

.requirement-item:hover {
  background: white;
  box-shadow: var(--shadow-sm);
}

.requirement-item span {
  font-size: 16px;
  color: var(--text-primary);
}

.honors-showcase {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.honor-highlight {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: var(--radius-md);
  border: 2px solid #fbbf24;
  align-items: center;
}

.honor-icon {
  font-size: 64px;
  flex-shrink: 0;
}

.honor-content h4 {
  font-size: 20px;
  color: #92400e;
  margin-bottom: 8px;
}

.honor-content p {
  font-size: 16px;
  color: #78350f;
  font-weight: 600;
}

.honor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.honor-card {
  text-align: center;
  padding: var(--spacing-md);
  background: var(--bg-light);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.honor-card:hover {
  background: white;
  box-shadow: var(--shadow-sm);
  transform: translateY(-3px);
}

.honor-tag {
  display: inline-block;
  padding: 4px 12px;
  background: var(--primary-color);
  color: white;
  border-radius: var(--radius-full);
  font-size: 12px;
  margin-bottom: 8px;
}

.honor-card p {
  font-size: 14px;
  color: var(--text-secondary);
}

.contact-card {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 2px solid var(--primary-color);
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.contact-item {
  display: flex;
  gap: var(--spacing-md);
  align-items: flex-start;
}

.contact-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.contact-details h4 {
  font-size: 18px;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.contact-details p {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}
</style>
