/* 热门网站 · 单一事实源（sites.js）
 * 主台 index.html 用全量：HOT_SITES = window.SITES_DB
 * 双线台 zk-ky.html 只取学习相关：cat ∈ study / academic / dev / read / search
 * cat 分类：study=泛学习知识  academic=学术文献/高校课程  dev=开发技术  read=阅读书影  search=搜索  ent=泛娱乐/工具  social=社交
 * 增删站点：在本数组加/删一行 {n,t,c,d,u,cat} 即可，两页自动同步，无需改两处
 * 双线"学习网站导航"聚焦学术/高校/图书馆向；百度、少数派等偏泛工具归入 ent，仅主台全量版出现
 */
window.SITES_DB = [
  {n:'知乎',t:'知',c:'#0066FF',d:'问答与深度讨论社区',u:'https://www.zhihu.com/',cat:'study'},
  {n:'GitHub',t:'GH',c:'#181717',d:'全球最大代码托管与开源社区',u:'https://github.com/',cat:'dev'},
  {n:'中国大学MOOC',t:'M',c:'#2B8A3E',d:'名校公开课免费学',u:'https://www.icourse163.org/',cat:'study'},
  {n:'arXiv',t:'aX',c:'#B31B1B',d:'论文预印本，科研必备',u:'https://arxiv.org/',cat:'academic'},
  {n:'Google 学术',t:'G',c:'#4285F4',d:'文献检索与引用追踪',u:'https://scholar.google.com/',cat:'academic'},
  {n:'百度学术',t:'学',c:'#2932E1',d:'中文文献聚合检索',u:'https://xueshu.baidu.com/',cat:'academic'},
  {n:'Coursera',t:'C',c:'#0056D2',d:'全球名校在线课程（含证书）',u:'https://www.coursera.org/',cat:'academic'},
  {n:'edX',t:'eX',c:'#02262B',d:'MIT / 哈佛等高校开放课程',u:'https://www.edx.org/',cat:'academic'},
  {n:'Khan Academy',t:'K',c:'#14BF96',d:'免费基础教育到大学预科全覆盖',u:'https://www.khanacademy.org/',cat:'academic'},
  {n:'MIT OpenCourseWare',t:'MIT',c:'#A31F34',d:'MIT 全部课程免费开放',u:'https://ocw.mit.edu/',cat:'academic'},
  {n:'Stanford Online',t:'S',c:'#8C1515',d:'斯坦福公开课程与证书项目',u:'https://online.stanford.edu/',cat:'academic'},
  {n:'Open Yale Courses',t:'Y',c:'#00356B',d:'耶鲁免费开放课程',u:'https://oyc.yale.edu/',cat:'academic'},
  {n:'国家开放大学',t:'国',c:'#C8102E',d:'国家开放教育与终身学习',u:'http://www.ouchn.edu.cn/',cat:'academic'},
  {n:'中国知网',t:'CN',c:'#D7000F',d:'中文学术文献库与论文检索',u:'https://www.cnki.net/',cat:'academic'},
  {n:'豆瓣',t:'豆',c:'#007722',d:'书影音评分与书单',u:'https://www.douban.com/',cat:'read'},
  {n:'微信读书',t:'读',c:'#07C160',d:'电子书与读书笔记',u:'https://weread.qq.com/',cat:'read'},
  {n:'上海图书馆',t:'图',c:'#8A1E1E',d:'馆藏检索与数字资源（上海）',u:'https://www.library.sh.cn/',cat:'read'},
  {n:'掘金',t:'掘',c:'#1E80FF',d:'前端 / 开发技术社区',u:'https://juejin.cn/',cat:'dev'},
  {n:'维基百科',t:'维',c:'#000000',d:'自由的百科全书',u:'https://zh.wikipedia.org/',cat:'study'},
  {n:'全国图书馆参考咨询联盟',t:'盟',c:'#1A5276',d:'跨馆文献传递与检索',u:'https://ucdrs.superlib.net/',cat:'search'},
  {n:'哔哩哔哩',t:'B',c:'#FB7299',d:'学习 / 教程 / 纪录片视频站',u:'https://www.bilibili.com/',cat:'ent'},
  {n:'百度',t:'百',c:'#2932E1',d:'综合搜索入口',u:'https://www.baidu.com/',cat:'ent'},
  {n:'少数派',t:'派',c:'#2D2D2D',d:'效率工具与数字生活',u:'https://sspai.com/',cat:'ent'},
  {n:'12306 分流抢票',t:'BP',c:'#E60012',d:'免费 Windows 抢票工具 · 官方站(永远最新)',u:'https://www.bypass.cn/',cat:'ent'},
  {n:'微博',t:'微',c:'#E6162D',d:'热点资讯与话题',u:'https://weibo.com/',cat:'social'},
  {n:'Reddit',t:'R',c:'#FF4500',d:'全球兴趣社区与讨论',u:'https://www.reddit.com/',cat:'social'},
  {n:'X',t:'X',c:'#0F1419',d:'实时资讯与社交平台',u:'https://x.com/',cat:'social'},
  {n:'小红书',t:'红',c:'#FF2442',d:'生活方式 / 种草 / 攻略社区',u:'https://www.xiaohongshu.com/',cat:'social'}
];
