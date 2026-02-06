import { createI18n } from 'vue-i18n'
import { getTranslationWithBatch as getTranslation, translateHTML, clearTranslationCache, translationPreloader } from './translationService'

// 初始语言包
const messages = {
  zh: {
    // 基本词汇
    'home': '首页',
    'news': '新闻动态',
    'members': '团队成员',
    'publications': '研究',
    'projects': '应用开发',
    'gallery': '文化',
    'recruitment': '招贤纳士',
    'about': '关于我们',
    'contact': '联系方式',
    // 个人/团队相关
    '团队简介': '团队简介',
    '个人简介': '个人简介',
    '教育经历': '教育经历',
    '工作经历': '工作经历',
    '至今': '至今',
    // 联系方式
    '邮箱': '邮箱',
    '电话': '电话',
    '地址': '地址',
    '邮编': '邮编',
    '暂未设置': '暂未设置',
    // 介质过程强化团队
    '介质过程强化团队': '介质过程强化团队',
    '南京工业大学化工学院 · 材料化学工程全国重点实验室': '南京工业大学化工学院 · 材料化学工程全国重点实验室',
    '材料化学工程全国重点实验室': '材料化学工程全国重点实验室',
    '文化标语': '我们的事业，化工的未来',
    '文化标语英文': 'Our Specialty, ChEng in Future',
    // 通用
    'common.loading': '加载中...',
    'common.close': '关闭',
    'common.index': '序号',
    // 成员相关
    'members.title': '团队成员',
    'members.all': '全部成员',
    'members.supervisors': '指导教师',
    'members.fullTimeTeachers': '专任教师',
    'members.graduates': '研究生',
    'members.alumni': '校友',
    'members.researchDirection': '研究方向',
    'members.noData': '暂无成员数据',
    'members.loading': '加载成员数据中...',
    // 新闻相关
    'news.latest': '最新动态',
    'news.year': '年度',
    // 学术成果相关
    'publications.title': '学术成果',
    'publications.achievements': '阶段成就',
    'publications.papers': '代表论文',
    'publications.patents': '代表专利',
    'publications.honors': '代表奖励',
    'publications.partners': '合作伙伴',
    'publications.partnersIntro': '与国内外知名高校、科研院所及企业建立了长期稳定的合作关系，共同开展前沿科学研究与技术开发。',
    'publications.collaborationUnits': '合作单位',
    'publications.collaborationAreas': '合作领域',
    'publications.area1Title': '钴基费托合成',
    'publications.area1Desc': '开发高性能钴基催化剂及新型反应器技术，实现从实验室研究到工业化应用的技术跨越。',
    'publications.area2Title': '分离工程与精馏技术',
    'publications.area2Desc': '针对复杂混合物分离难题，开发新型精馏技术与分离工艺。',
    'publications.area3Title': '化工过程模拟与优化',
    'publications.area3Desc': '建立完善的化工过程模拟与优化平台，实现化工过程的智能化设计与优化。',
    'publications.area4Title': '催化反应工程',
    'publications.area4Desc': '在AIChE Journal、化工进展等期刊发表高水平论文，获授权发明专利。',
    'publications.stats': '研究成果统计',
    'publications.paperStats': '发表学术论文',
    'publications.paperStatsDesc1': '在AIChE Journal、化工进展等期刊发表学术论文',
    'publications.paperStatsDesc2': '化工TOP、化学2区、EI收录',
    'publications.patentStats': '授权发明专利',
    'publications.patentStatsDesc1': '获授权发明专利',
    'publications.patentStatsDesc2': '部分成果应用于中试及万吨级工程示范',
    'publications.projectStats': '主持科研项目',
    'publications.projectStatsDesc1': '主持国家自然科学基金等科研项目',
    'publications.projectStatsDesc2': '参与中科院科技先导专项等',
    'publications.doiLink': 'DOI链接',
    'publications.pdfDownload': 'PDF下载',
    'publications.patentNumber': '专利号',
    'publications.inventors': '发明人',
    'publications.topJournal': '化工TOP',
    'publications.zone2': '化学2区',
    // 团队风采相关
    'gallery.title': '团队风采',
    'gallery.noImages': '暂无图片',
    'gallery.loading': '加载中...',
    'gallery.empty': '暂无相册数据',
    'gallery.preview': '图片预览',
    'gallery.category': '分类',
    'gallery.description': '描述',
    'gallery.uploadDate': '上传日期',
    'gallery.noDate': '未知日期',
    // 项目相关
    'projects.title': '应用开发',
    'projects.expertise': '专业能力',
    'projects.partners': '合作伙伴',
    'projects.list': '项目列表',
    'projects.name': '项目名称',
    'projects.role': '角色',
    'projects.type': '级别',
    'projects.period': '起止时间',
    'projects.startDate': '开始时间',
    'projects.endDate': '结束时间',
    'projects.duration': '起止时间',
    'projects.noData': '暂无项目数据',
    // 招贤纳士相关
    'recruitment.title': '招贤纳士',
    'recruitment.welcome': '欢迎加入介质过程强化团队',
    'recruitment.subtitle': '我们的事业，化工的未来',
    'recruitment.majors': '招生专业',
    'recruitment.advantages': '课题组优势',
    'recruitment.requirements': '招生要求',
    'recruitment.process': '申请流程',
    'recruitment.contact': '联系我们'
  },
  en: {
    'home': 'Homepage',
    'news': 'News & Events',
    'members': 'Team Members',
    'publications': 'Research',
    'projects': 'Application Development',
    'gallery': 'Culture',
    'recruitment': 'Join Us',
    'about': 'About Us',
    'contact': 'Contact',
    '团队简介': 'Team Profile',
    '个人简介': 'Personal Profile',
    '教育经历': 'Education',
    '工作经历': 'Work Experience',
    '至今': 'Present',
    '邮箱': 'Email',
    '电话': 'Phone',
    '地址': 'Address',
    '邮编': 'Postcode',
    '暂未设置': 'Not Set',
    '介质过程强化团队': 'Mater Process Intensification Group',
    '南京工业大学化工学院 · 材料化学工程全国重点实验室': 'School of Chemistry and Chemical Engineering, Nanjing Tech University · State Key Laboratory of Materials-Oriented Chemical Engineering',
    '材料化学工程全国重点实验室': 'State Key Laboratory of Materials-Oriented Chemical Engineering',
    '文化标语': 'Our Specialty, ChEng in Future',
    '文化标语英文': 'Our Specialty, ChEng in Future',
    'common.loading': 'Loading...',
    'common.close': 'Close',
    'common.index': 'No.',
    'members.title': 'Team Members',
    'members.all': 'All Members',
    'members.supervisors': 'Supervisors',
    'members.fullTimeTeachers': 'Full-time Faculty',
    'members.graduates': 'Graduate Students',
    'members.alumni': 'Alumni',
    'members.researchDirection': 'Research Direction',
    'members.noData': 'No member data',
    'members.loading': 'Loading member data...',
    // 新闻相关
    'news.latest': 'Latest News',
    'news.year': '',
    'publications.title': 'Research Achievements',
    'publications.achievements': 'Phase Achievements',
    'publications.papers': 'Representative Papers',
    'publications.patents': 'Representative Patents',
    'publications.honors': 'Representative Awards',
    'publications.partners': 'Partners',
    'publications.partnersIntro': 'Established long-term and stable partnerships with renowned universities, research institutes, and enterprises at home and abroad to jointly conduct cutting-edge scientific research and technology development.',
    'publications.collaborationUnits': 'Collaboration Units',
    'publications.collaborationAreas': 'Collaboration Areas',
    'publications.area1Title': 'Cobalt-based Fischer-Tropsch Synthesis',
    'publications.area1Desc': 'Develop high-performance cobalt-based catalysts and novel reactor technologies to achieve technological breakthroughs from laboratory research to industrial application.',
    'publications.area2Title': 'Separation Engineering and Distillation Technology',
    'publications.area2Desc': 'Develop novel distillation technologies and separation processes for complex mixture separation challenges.',
    'publications.area3Title': 'Chemical Process Simulation and Optimization',
    'publications.area3Desc': 'Establish a comprehensive chemical process simulation and optimization platform to achieve intelligent design and optimization of chemical processes.',
    'publications.area4Title': 'Catalytic Reaction Engineering',
    'publications.area4Desc': 'Publish high-level papers in AIChE Journal, Chemical Industry Progress, and other journals, and obtain authorized invention patents.',
    'publications.stats': 'Research Statistics',
    'publications.paperStats': 'Academic Papers',
    'publications.paperStatsDesc1': 'Published academic papers in AIChE Journal, Chemical Industry Progress, and other journals',
    'publications.paperStatsDesc2': 'Chemical TOP, Chemistry Zone 2, EI indexed',
    'publications.patentStats': 'Authorized Invention Patents',
    'publications.patentStatsDesc1': 'Obtained authorized invention patents',
    'publications.patentStatsDesc2': 'Some achievements applied to pilot scale and 10,000-ton level engineering demonstrations',
    'publications.projectStats': 'Hosted Research Projects',
    'publications.projectStatsDesc1': 'Hosted National Natural Science Foundation and other research projects',
    'publications.projectStatsDesc2': 'Participated in CAS pilot projects and other initiatives',
    'gallery.title': 'Team Gallery',
    'gallery.noImages': 'No images',
    'gallery.loading': 'Loading...',
    'gallery.empty': 'No album data',
    'gallery.preview': 'Image Preview',
    'gallery.category': 'Category',
    'gallery.description': 'Description',
    'gallery.uploadDate': 'Upload Date',
    'gallery.noDate': 'Unknown date',
    'projects.title': 'Application Development',
    'projects.expertise': 'Professional Expertise',
    'projects.partners': 'Partners',
    'projects.list': 'Project List',
    'projects.name': 'Project Name',
    'projects.role': 'Role',
    'projects.type': 'Level',
    'projects.period': 'Duration',
    'projects.startDate': 'Start Date',
    'projects.endDate': 'End Date',
    'projects.duration': 'Duration',
    'projects.noData': 'No project data',
    'recruitment.title': 'Recruitment',
    'recruitment.welcome': 'Welcome to Join Process Intensification Team',
    'recruitment.subtitle': 'Our Specialty, ChEng in Future',
    'recruitment.majors': 'Recruitment Majors',
    'recruitment.advantages': 'Team Advantages',
    'recruitment.requirements': 'Requirements',
    'recruitment.process': 'Application Process',
    'recruitment.contact': 'Contact Us',
    'publications.doiLink': 'DOI Link',
    'publications.pdfDownload': 'PDF Download',
    'publications.patentNumber': 'Patent Number',
    'publications.inventors': 'Inventors',
    'publications.topJournal': 'Chemical TOP',
    'publications.zone2': 'Chemistry Zone 2'
  }
}

// 从localStorage获取保存的语言设置
const getSavedLocale = () => {
  try {
    const savedLocale = localStorage.getItem('academic-language')
    return savedLocale || 'zh' // 默认中文
  } catch (error) {
    console.error('读取语言设置失败:', error)
    return 'zh'
  }
}

// 创建i18n实例，使用localStorage保存的语言设置
const i18n = createI18n({
  legacy: false, // 使用Composition API
  locale: getSavedLocale(), // 从localStorage读取语言设置
  fallbackLocale: 'zh', // 回退语言
  messages,
  missing: async (locale, key) => {
    console.log('=== i18n missing 调用 ===')
    console.log('参数:', { locale, key })
    
    if (locale === 'en') {
      // 如果英文翻译不存在，调用腾讯翻译API获取
      console.log('英文翻译不存在，调用API获取:', key)
      try {
        // 直接从messages.zh中获取中文值，避免递归调用t函数
        const chineseValue = messages.zh[key] || key
        console.log('获取中文值:', { key, chineseValue })
        // 翻译中文值为英文
        const translation = await getTranslation(chineseValue, 'zh', 'en')
        // 动态添加到英文语言包
        i18n.global.mergeLocaleMessage('en', { [key]: translation })
        console.log('静态文本翻译结果:', { key, chineseValue, translation })
        console.log('=== i18n missing 结束 ===')
        return translation
      } catch (error) {
        console.error('翻译处理失败:', error)
        console.log('=== i18n missing 结束 ===')
        return key
      }
    }
    
    console.log('非英文语言，直接返回key:', key)
    console.log('=== i18n missing 结束 ===')
    return key
  }
})

// 保存语言设置到localStorage
const saveLocaleToStorage = (locale) => {
  try {
    localStorage.setItem('academic-language', locale)
    console.log('语言设置已保存到localStorage:', locale)
  } catch (error) {
    console.error('保存语言设置失败:', error)
  }
}

// 语言切换方法，添加预加载功能
i18n.global.switchLanguage = async (locale) => {
  console.log('切换语言:', locale)
  
  // 获取当前语言
  const currentLocale = i18n.global.locale.value
  
  // 如果语言没有变化，直接返回
  if (currentLocale === locale) {
    return
  }
  
  // 设置新语言
  i18n.global.locale.value = locale
  
  // 保存语言设置到localStorage，在页面间共享
  saveLocaleToStorage(locale)
  
  // 如果切换到英文，预加载常用翻译
  if (locale === 'en') {
    console.log('切换到英文，开始预加载常用翻译...')
    try {
      await translationPreloader.preloadAll('zh', 'en')
      console.log('预加载完成')
    } catch (error) {
      console.error('预加载翻译失败:', error)
    }
  }
}

// 将翻译服务方法添加到i18n实例中，方便组件使用
i18n.global.translateHTML = translateHTML
i18n.global.clearTranslationCache = clearTranslationCache
i18n.global.translationPreloader = translationPreloader

export default i18n