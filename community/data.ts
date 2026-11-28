import { ref } from 'vue'

export type TagColor = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'processing'

export interface Post {
  id: number
  title: string
  excerpt: string
  author: string
  color: string
  time: string
  tags: { label: string; color: TagColor }[]
  replies: number
  views: number
  votes: number
  voted: boolean
  pinned?: boolean
  featured?: boolean
  solved?: boolean
  following?: boolean
  body?: string[]
}

export interface Comment {
  id: number
  postId: number
  author: string
  color: string
  time: string
  content: string
  likes: number
  liked: boolean
}

export const currentUser = {
  name: '林舟',
  role: '核心贡献者',
  color: '#7c3aed',
  bio: '前端工程师，关注组件库设计、响应式与工程化。最近在折腾断点 props 和表单性能。',
  joined: '2024 年 3 月加入',
}

export const stats = [
  { label: '主题', value: '12,480' },
  { label: '成员', value: '3,206' },
  { label: '今日新帖', value: '128' },
  { label: '在线', value: '42' },
]

export const navItems = [
  { label: '首页', to: '/', key: 'home' },
  { label: '发布', to: '/publish', key: 'publish' },
  { label: '用户中心', to: '/me', key: 'me' },
]

export const posts = ref<Post[]>([
  {
    id: 8,
    title: '【公告】发帖前必读：提问、分享与社区规范',
    excerpt: '提问请带环境、版本与最小复现；分享请说明适用场景；转载需注明出处。违规内容会被折叠处理。',
    author: '管理员',
    color: '#1677ff',
    time: '2 小时前',
    tags: [{ label: '公告', color: 'error' }, { label: '新手', color: 'default' }],
    replies: 328,
    views: 12400,
    votes: 96,
    voted: false,
    pinned: true,
    following: true,
    body: [
      '欢迎来到如译社区。这里讨论 Vue、组件库、Discuz 迁移与小程序实践，也欢迎一切与工程效率相关的话题。',
      '提问请附上运行环境、版本号与最小复现。能从代码片段直接复现的问题，通常能在几小时内得到回复。',
      '分享帖请说明适用场景与限制条件；转载内容请注明出处与授权方式。重复、广告与攻击性内容会被折叠处理。',
    ],
  },
  {
    id: 7,
    title: 'Vue 3.5 响应式 props 在 1000 字段表单里的性能实测',
    excerpt: '切换一次断点，解析 + 渲染总共 39ms；4 倍降速下 153ms。共享 matchMedia 实例，组件再多也不涨监听数。',
    author: '林舟',
    color: '#7c3aed',
    time: '25 分钟前',
    tags: [{ label: 'Vue', color: 'primary' }, { label: '性能', color: 'warning' }],
    replies: 42,
    views: 1860,
    votes: 58,
    voted: false,
    featured: true,
    following: true,
    body: [
      '给 KForm 的所有非数据 props 加上断点取值之后，最担心的是性能：每次断点变化都会触发全量重算吗？',
      '实测结论：解析本身很便宜。对象写法约 50ns，字符串写法约 250ns；1000 字段的表单整体切换一次断点，Vue 更新与解析合计 p50 约 39ms，4 倍 CPU 降速下约 153ms。',
      '关键在监听器数量：所有组件共享一套 matchMedia，实例从 1 个涨到 100 个，查询数量仍然是 5 个。常量（不写断点前缀）完全不读当前断点，因此不会建立依赖。',
      '如果表单规模更大，建议把 model 与 rules 留在表单外，只让布局相关的 props 走断点；这样重算范围可控，输入时的抖动也几乎测不出来。',
    ],
  },
  {
    id: 6,
    title: 'kit 的 KTable 合并单元格能和虚拟滚动一起用吗？',
    excerpt: '数据量 2 万行，开了虚拟滚动之后合并单元格错位。想问下官方推荐的拆分方式，或者有没有可控的降级方案。',
    author: '阿陶',
    color: '#0d9488',
    time: '1 小时前',
    tags: [{ label: '求助', color: 'error' }, { label: '表格', color: 'default' }],
    replies: 12,
    views: 640,
    votes: 9,
    voted: false,
    following: true,
    body: [
      '场景：2 万行日志表，需要按会话 id 合并首列。开启虚拟滚动后，滚动到中段时合并单元格的行高和占位明显错位。',
      '我尝试过只对可见区域做合并，但滚动时首行经常被裁掉。想确认官方是否支持两者组合；如果不支持，推荐拆分还是降级？',
    ],
  },
  {
    id: 5,
    title: '分享：用 KForm 断点字符串做后台移动端适配',
    excerpt: '一套属性两种布局：横向表单在窄屏自动转纵向，标签宽度和冒号跟着断点走，不需要第二套样式。',
    author: '徐小满',
    color: '#f97316',
    time: '3 小时前',
    tags: [{ label: '经验', color: 'success' }, { label: '表单', color: 'primary' }],
    replies: 27,
    views: 1240,
    votes: 31,
    voted: false,
    featured: true,
    body: [
      '后台表单在桌面是横向布局，到了平板和手机就会挤成一团。以前的做法是写两套 class 或两套组件，维护成本很高。',
      '现在直接把属性写成断点字符串：layout="xs:vertical md:horizontal"，label-width="xs:72 sm:88 md:100 lg:120"。同一份模板，窄屏自动变纵向。',
      '注意两点：标签在纵向布局下不再占固定宽度，别把 labelWidth 当成移动端的对齐手段；另外断点映射里只放常量，动态值在父层算好再传。',
    ],
  },
  {
    id: 4,
    title: 'Discuz 插件迁移到 Vue 前台，路由和权限怎么拆',
    excerpt: '后台还是 PHP，前台想换成 Vue SPA。现在卡在登录态、菜单权限和旧链接兼容，想看看大家的拆分边界。',
    author: '老白',
    color: '#2563eb',
    time: '5 小时前',
    tags: [{ label: 'PHP', color: 'processing' }, { label: 'Discuz', color: 'default' }],
    replies: 19,
    views: 980,
    votes: 14,
    voted: false,
    following: true,
    body: [
      '现状：Discuz 后台继续提供接口，前台帖子列表与详情想用 Vue 重写。难点是登录态、菜单权限与旧链接。',
      '我的初步方案是让 PHP 输出一次性 token，SPA 用同一域名的 cookie 换取会话；旧链接通过 Nginx 规则 301 到新路由。',
      '想听听已经在生产环境跑过的同学：权限判断放在前端路由守卫还是后端下发菜单树？旧链接兼容有哪些坑？',
    ],
  },
  {
    id: 3,
    title: '微信小程序端 KSelect 下拉在 iOS 上位置偏移',
    excerpt: '页面滚动后打开下拉，面板位置比触发器高了约 40px；安卓正常。已确认不是缩放导致，求排查方向。',
    author: '禾木',
    color: '#db2777',
    time: '昨天',
    tags: [{ label: '小程序', color: 'primary' }, { label: 'Bug', color: 'error' }],
    replies: 8,
    views: 530,
    votes: 6,
    voted: false,
    solved: true,
  },
  {
    id: 2,
    title: '本周投票：下一个最想要的 K 组件是？',
    excerpt: '候选：日历、看板、富文本工具栏、代码编辑器。投票最高的进入下个迭代，评论区可以补充理由。',
    author: '晴川',
    color: '#0891b2',
    time: '昨天',
    tags: [{ label: '讨论', color: 'processing' }, { label: '投票', color: 'warning' }],
    replies: 64,
    views: 2210,
    votes: 22,
    voted: false,
  },
  {
    id: 1,
    title: '从 0 搭一个组件库文档站，我用 VitePress 踩过的 6 个坑',
    excerpt: '样式隔离、SSG 下的 Teleport、演示代码热重载、暗色模式变量……逐个给出复现与解决方式。',
    author: '子墨',
    color: '#4f46e5',
    time: '2 天前',
    tags: [{ label: '经验', color: 'success' }, { label: '文档', color: 'default' }],
    replies: 23,
    views: 3150,
    votes: 47,
    voted: false,
  },
])

export const comments = ref<Comment[]>([
  {
    id: 1,
    postId: 7,
    author: '阿陶',
    color: '#0d9488',
    time: '18 分钟前',
    content: '这个数据很有参考价值。想确认一下：共享 matchMedia 是指全库一个单例，还是每个 Vue 应用一份？如果是微前端多实例，会不会重复监听？',
    likes: 6,
    liked: false,
  },
  {
    id: 2,
    postId: 7,
    author: '徐小满',
    color: '#f97316',
    time: '12 分钟前',
    content: '补充一个经验：表单字段很多时，把 labelWidth 这类布局属性集中到容器上，子项只读上下文，切换断点的重渲染范围会小很多。',
    likes: 11,
    liked: false,
  },
  {
    id: 3,
    postId: 7,
    author: '子墨',
    color: '#4f46e5',
    time: '5 分钟前',
    content: '字符串写法解析 250ns 比对象慢 5 倍，但在 1000 次切档里也只有 0.25ms，完全可以接受。真正贵的是布局本身。',
    likes: 4,
    liked: false,
  },
  {
    id: 4,
    postId: 6,
    author: '林舟',
    color: '#7c3aed',
    time: '40 分钟前',
    content: '合并和虚拟滚动目前不承诺组合可用。可以先按会话 id 分组渲染，组内再虚拟化，合并单元格放在分组层，避开行高估算冲突。',
    likes: 9,
    liked: false,
  },
  {
    id: 5,
    postId: 5,
    author: '老白',
    color: '#2563eb',
    time: '2 小时前',
    content: '我们后台也在用同样的写法，唯一的问题是纵向布局下 label 和控件的间距偏紧，后来统一在 FormItem 上加了点间距。',
    likes: 3,
    liked: false,
  },
])

export const hotTopics = [
  { title: '响应式 props 到底值不值得上', heat: '2.1k' },
  { title: '表格合并单元格的最佳实践', heat: '1.8k' },
  { title: '移动端表单适配的一次完整复盘', heat: '1.4k' },
  { title: 'Discuz 迁移：路由方案对比', heat: '1.1k' },
  { title: '小程序下拉定位偏移汇总', heat: '860' },
]

export const members = ref([
  { name: '林舟', role: '核心贡献者', color: '#7c3aed', followed: true },
  { name: '徐小满', role: '组件维护', color: '#f97316', followed: false },
  { name: '阿陶', role: '活跃答主', color: '#0d9488', followed: false },
  { name: '晴川', role: '社区运营', color: '#0891b2', followed: true },
])

export const tagCloud: { label: string; color: TagColor }[] = [
  { label: 'Vue', color: 'primary' },
  { label: '响应式', color: 'processing' },
  { label: '表单', color: 'success' },
  { label: '表格', color: 'default' },
  { label: 'Discuz', color: 'default' },
  { label: '小程序', color: 'primary' },
  { label: '性能', color: 'warning' },
  { label: '设计', color: 'processing' },
]

export const searchQuery = ref('')

export function findPost(id: number) {
  return posts.value.find(post => post.id === id)
}

export function addPost(title: string, body: string, tags: { label: string; color: TagColor }[]) {
  const id = Math.max(...posts.value.map(post => post.id)) + 1
  posts.value.unshift({
    id,
    title,
    excerpt: body.slice(0, 90),
    author: currentUser.name,
    color: currentUser.color,
    time: '刚刚',
    tags,
    replies: 0,
    views: 1,
    votes: 0,
    voted: false,
    body: body.split(/\n{2,}/).filter(Boolean),
  })
  return id
}

export function formatNum(value: number) {
  return value >= 1000 ? `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k` : `${value}`
}