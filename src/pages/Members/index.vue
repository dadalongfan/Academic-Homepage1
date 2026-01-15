<template>
  <div class="members-page">
    <h2 class="section-title">组内成员</h2>

    <!-- 指导教师 -->
    <div class="section-card">
      <h3 class="subsection-title">指导教师</h3>
      <div class="teacher-card">
        <div class="teacher-photo">
          <img src="/照片.png" alt="夏铭" />
        </div>
        <div class="teacher-info">
          <h4>夏铭 副教授</h4>
          <p class="teacher-title">硕士生导师</p>
          <p class="teacher-desc">南京工业大学化工学院</p>
          <p class="teacher-desc">材料化学工程国家重点实验室</p>
          <div class="teacher-achievements">
            <el-tag type="success">发表论文50余篇（示例）</el-tag>
            <el-tag type="warning">授权专利10余项（示例）</el-tag>
            <el-tag type="primary">主持国家级项目5项（示例）</el-tag>
          </div>
        </div>
      </div>
    </div>

    <!-- 专任教师 -->
    <div class="section-card">
      <h3 class="subsection-title">专任教师</h3>
      <div class="teachers-grid">
        <div class="teacher-card-compact">
          <div class="teacher-avatar-small">李</div>
          <div class="teacher-info-compact">
            <h5>李明华（示例）</h5>
            <p class="teacher-role">讲师</p>
            <p class="teacher-research">研究方向：催化材料、绿色化工</p>
            <div class="teacher-tags">
              <el-tag size="small" type="success">发表论文20余篇</el-tag>
              <el-tag size="small" type="warning">主持省级项目3项</el-tag>
            </div>
          </div>
        </div>

        <div class="teacher-card-compact">
          <div class="teacher-avatar-small" style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%);">王</div>
          <div class="teacher-info-compact">
            <h5>王建国（示例）</h5>
            <p class="teacher-role">副教授</p>
            <p class="teacher-research">研究方向：纳米材料、能源化工</p>
            <div class="teacher-tags">
              <el-tag size="small" type="success">发表论文30余篇</el-tag>
              <el-tag size="small" type="warning">授权专利8项</el-tag>
            </div>
          </div>
        </div>

        <div class="teacher-card-compact">
          <div class="teacher-avatar-small" style="background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);">张</div>
          <div class="teacher-info-compact">
            <h5>张秀英（示例）</h5>
            <p class="teacher-role">讲师</p>
            <p class="teacher-research">研究方向：分离工程、过程强化</p>
            <div class="teacher-tags">
              <el-tag size="small" type="success">发表论文15余篇</el-tag>
              <el-tag size="small" type="primary">参与国家级项目2项</el-tag>
            </div>
          </div>
        </div>

        <div class="teacher-card-compact">
          <div class="teacher-avatar-small" style="background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%);">陈</div>
          <div class="teacher-info-compact">
            <h5>陈思远（示例）</h5>
            <p class="teacher-role">讲师</p>
            <p class="teacher-research">研究方向：化工设计、智能制造</p>
            <div class="teacher-tags">
              <el-tag size="small" type="success">发表论文18余篇</el-tag>
              <el-tag size="small" type="primary">教学成果奖2项</el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 现指导学生 -->
    <div class="section-card">
      <h3 class="subsection-title">研究生</h3>

      <!-- 2025级 -->
      <div class="grade-group">
        <h4 class="grade-title">2025级</h4>
        <div class="students-grid">
          <div class="student-card">
            <div class="student-avatar">高</div>
            <h5>高锟俣</h5>
            <p>硕士研究生</p>
            <el-tag size="small">材料与化工</el-tag>
          </div>
          <div class="student-card">
            <div class="student-avatar">储</div>
            <h5>储金科</h5>
            <p>硕士研究生</p>
            <el-tag size="small">材料与化工</el-tag>
          </div>
        </div>
      </div>

      <!-- 2024级 -->
      <div class="grade-group">
        <h4 class="grade-title">2024级</h4>
        <div class="students-grid">
          <div class="student-card">
            <div class="student-avatar">张</div>
            <h5>张阳光</h5>
            <p>硕士研究生</p>
            <el-tag size="small">材料与化工</el-tag>
          </div>
          <div class="student-card">
            <div class="student-avatar">王</div>
            <h5>王顺</h5>
            <p>硕士研究生</p>
            <el-tag size="small">材料与化工</el-tag>
          </div>
        </div>
      </div>

      <!-- 2023级 -->
      <div class="grade-group">
        <h4 class="grade-title">2023级</h4>
        <div class="students-grid">
          <div class="student-card">
            <div class="student-avatar">刘</div>
            <h5>刘杨</h5>
            <p>硕士研究生</p>
            <el-tag size="small" type="warning">化学工程与技术（24年转入）</el-tag>
          </div>
          <div class="student-card">
            <div class="student-avatar">周</div>
            <h5>周康</h5>
            <p>硕士研究生</p>
            <el-tag size="small">材料与化工</el-tag>
          </div>
          <div class="student-card">
            <div class="student-avatar">赵</div>
            <h5>赵云睿</h5>
            <p>硕士研究生</p>
            <el-tag size="small">化学工程与技术</el-tag>
          </div>
        </div>
      </div>
    </div>

    <!-- 已指导学生 -->
    <div class="section-card">
      <h3 class="subsection-title">毕业生</h3>

      <div class="grade-group">
        <h4 class="grade-title">2022级（2025年毕业）</h4>
        <div class="students-grid">
          <div class="student-card graduate">
            <div class="student-avatar graduated">周</div>
            <h5>周灿</h5>
            <p>硕士研究生</p>
            <el-tag size="small">材料与化工</el-tag>
          </div>
          <div class="student-card graduate">
            <div class="student-avatar graduated">祁</div>
            <h5>祁笑笑</h5>
            <p>硕士研究生</p>
            <el-tag size="small">材料与化工</el-tag>
          </div>
          <div class="student-card graduate">
            <div class="student-avatar graduated">赵</div>
            <h5>赵伟</h5>
            <p>硕士研究生</p>
            <el-tag size="small">化学工程与技术</el-tag>
            <div class="honor-badge">
              <el-icon><Trophy /></el-icon>
              2025年校优秀毕业研究生
            </div>
          </div>
          <div class="student-card graduate">
            <div class="student-avatar graduated">游</div>
            <h5>游晨曦</h5>
            <p>硕士研究生</p>
            <el-tag size="small">材料与化工</el-tag>
            <div class="honor-badge">
              <el-icon><Trophy /></el-icon>
              2024年度研究生国家奖学金
            </div>
          </div>
        </div>
      </div>

      <!-- 已指导博士研究生 -->
      <div class="grade-group">
        <h4 class="grade-title">已指导博士研究生</h4>
        <div class="students-grid">
          <div class="student-card graduate">
            <div class="student-avatar graduated">牛</div>
            <h5>牛丛丛</h5>
            <p>博士研究生</p>
            <el-tag size="small" type="danger">物理化学（070304）</el-tag>
          </div>
        </div>
      </div>
    </div>

    <!-- 团队荣誉 -->
    <div class="section-card">
      <h3 class="subsection-title">团队荣誉</h3>
      <div class="honors-grid">
        <div class="honor-card">
          <div class="honor-icon">🏆</div>
          <h4>第十八届全国大学生化工设计竞赛（示例）</h4>
          <p>国家级特等奖（示例）</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Trophy } from '@element-plus/icons-vue'
</script>

<style scoped>
@import '/src/assets/styles/variables.css';
@import '/src/assets/styles/common.css';

.members-page {
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

.teacher-card {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: var(--radius-md);
}

.teacher-photo {
  flex-shrink: 0;
}

.teacher-photo img {
  width: 200px;
  height: 200px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 4px solid var(--primary-color);
  box-shadow: var(--shadow-md);
}

.teacher-info h4 {
  font-family: var(--font-serif);
  font-size: 28px;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.teacher-title {
  font-size: 18px;
  color: var(--secondary-color);
  margin-bottom: 8px;
  font-weight: 500;
}

.teacher-desc {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.teacher-achievements {
  margin-top: var(--spacing-sm);
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.teachers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-md);
}

.teacher-card-compact {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.teacher-card-compact:hover {
  border-color: var(--primary-color);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.teacher-avatar-small {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  color: white;
  box-shadow: var(--shadow-sm);
}

.teacher-info-compact {
  flex: 1;
}

.teacher-info-compact h5 {
  font-family: var(--font-serif);
  font-size: 20px;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.teacher-role {
  font-size: 16px;
  color: var(--secondary-color);
  margin-bottom: 8px;
  font-weight: 500;
}

.teacher-research {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 12px;
  line-height: 1.5;
}

.teacher-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.grade-group {
  margin-bottom: var(--spacing-lg);
}

.grade-group:last-child {
  margin-bottom: 0;
}

.grade-title {
  font-size: 20px;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  padding-left: 12px;
  border-left: 4px solid var(--accent-color);
}

.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.student-card {
  text-align: center;
  padding: var(--spacing-md);
  background: var(--bg-light);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
}

.student-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.student-card.graduate {
  opacity: 0.85;
}

.student-avatar {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-sm);
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  color: white;
  box-shadow: var(--shadow-sm);
}

.student-avatar.graduated {
  background: linear-gradient(135deg, #64748b 0%, #94a3b8 100%);
}

.student-card h5 {
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.student-card p {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.honor-badge {
  margin-top: 12px;
  padding: 8px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: var(--radius-sm);
  font-size: 12px;
  color: #92400e;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.honors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.honor-card {
  text-align: center;
  padding: var(--spacing-md);
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: var(--radius-md);
  border: 2px solid #fbbf24;
}

.honor-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-sm);
}

.honor-card h4 {
  font-size: 18px;
  color: #92400e;
  margin-bottom: 8px;
}

.honor-card p {
  font-size: 14px;
  color: #78350f;
  font-weight: 600;
}

@media (max-width: 768px) {
  .teacher-card {
    flex-direction: column;
    text-align: center;
  }

  .teacher-photo img {
    width: 150px;
    height: 150px;
  }

  .teachers-grid {
    grid-template-columns: 1fr;
  }

  .teacher-card-compact {
    flex-direction: column;
    text-align: center;
  }

  .teacher-avatar-small {
    margin: 0 auto;
  }

  .students-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
