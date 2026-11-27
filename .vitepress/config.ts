import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { kitPlugin } from 'kit/vue/vite-plugin'
import { isolateVpDoc } from './isolate-vp-doc'
import { componentPlatform } from './platform'

const mobileSvg =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2z"/><path d="M11 5h2"/><path d="M12 17h.01"/></svg>'
const pcSvg =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8"/><path d="M12 16v4"/></svg>'
const bothSvg =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/><path d="M10 19v-3.96 3.15"/><path d="M7 19h5"/><rect width="6" height="10" x="16" y="12" rx="2"/></svg>'
const mobileOnlyIcon =
  `<span class="k-sidebar-mobile-icon" role="img" aria-label="移动端可用" title="移动端可用">${mobileSvg}</span>`
const pcOnlyIcon =
  `<span class="k-sidebar-pc-icon" role="img" aria-label="PC 端可用" title="PC 端可用">${pcSvg}</span>`
const bothPlatformIcon =
  `<span class="k-sidebar-both-icon" role="img" aria-label="PC 与移动端可用" title="PC 与移动端可用">${bothSvg}</span>`

function platformIcon(link: string) {
  const platform = componentPlatform(link)
  if (platform === 'pc') return pcOnlyIcon
  if (platform === 'mobile') return mobileOnlyIcon
  return bothPlatformIcon
}

/** 组件侧边栏只给一级组件页加端侧图标；表格子页等同组件不重复标。 */
function decorateComponentPlatforms<T extends { text?: unknown; link?: unknown; docFooterText?: unknown; items?: T[] }>(items: T[]): T[] {
  for (const item of items) {
    if (item.items?.length) decorateComponentPlatforms(item.items)
    if (typeof item.link !== 'string' || !item.link.startsWith('/vue/ui/components/')) continue
    const rest = item.link.slice('/vue/ui/components/'.length)
    if (!rest || rest === 'index' || rest.includes('/')) continue
    const plain = typeof item.docFooterText === 'string'
      ? item.docFooterText
      : typeof item.text === 'string'
        ? item.text
        : ''
    if (!plain) continue
    item.docFooterText = plain
    item.text = `${platformIcon(item.link)}${plain}`
  }
  return items
}

/**
 * 扫描 docs/php/api 生成「一个类一篇」的侧边栏
 *
 * 目录层级即分组层级，标题取每个 md 的第一行 `# xxx`。
 */
const directoryLabels: Record<string, string> = {
  foundation: 'Foundation · 框架基础',
  modules: 'Modules · 业务模块',
  facades: '门面 Facades',
  controllers: '控制器 Controllers',
  commands: '命令 Commands',
  crons: '定时任务 Crons',
  middlewares: '中间件 Middlewares',
  discuzx: 'DiscuzX',
  setup: '装配 Setup',
  support: '支撑 Support',
}

// API 侧边栏最大目录深度：第 4 层以上的叶子目录不再建组，平铺合并到第 4 层并加「目录路径 ·」前缀
const MAX_API_DEPTH = 4

function buildApiSidebar(dir: string, urlBase: string, depth = 0): any[] {
  if (!fs.existsSync(dir)) return []

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files: any[] = []
  const groups: any[] = []

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.isDirectory()) {
      const childDepth = depth + 1
      if (childDepth > MAX_API_DEPTH) {
        flattenLeaf(path.join(dir, entry.name), `${urlBase}/${entry.name}`, entry.name, files)
      } else {
        const children = buildApiSidebar(path.join(dir, entry.name), `${urlBase}/${entry.name}`, childDepth)
        if (children.length) {
          const label = directoryLabels[entry.name] ?? entry.name.charAt(0).toUpperCase() + entry.name.slice(1)
          groups.push({ text: label, collapsed: true, items: children })
        }
      }
      continue
    }
    if (!entry.name.endsWith('.md')) continue

    const raw = fs.readFileSync(path.join(dir, entry.name), 'utf-8')
    const matched = raw.match(/^#\s+(.+)$/m)
    const title = matched ? matched[1].trim() : entry.name.replace(/\.md$/, '')
    files.push({ text: title, link: `${urlBase}/${entry.name.replace(/\.md$/, '')}` })
  }

  return [...files, ...groups]
}

function flattenLeaf(dir: string, urlBase: string, prefix: string, out: any[]) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.isDirectory()) {
      flattenLeaf(path.join(dir, entry.name), `${urlBase}/${entry.name}`, `${prefix}/${entry.name}`, out)
      continue
    }
    if (!entry.name.endsWith('.md')) continue

    const raw = fs.readFileSync(path.join(dir, entry.name), 'utf-8')
    const matched = raw.match(/^#\s+(.+)$/m)
    const title = matched ? matched[1].trim() : entry.name.replace(/\.md$/, '')
    out.push({ text: `${prefix} · ${title}`, link: `${urlBase}/${entry.name.replace(/\.md$/, '')}` })
  }
}

const apiSidebar = buildApiSidebar(fileURLToPath(new URL('../docs/php/api', import.meta.url)), '/php/api')

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "如意技术库文档",
  lang: 'zh-Hans',
  srcExclude: ['**/_api/**'],
  description: "如意技术库文档",
  lastUpdated: true,
  srcDir: "docs",
  ignoreDeadLinks: true,
  vite: {
    plugins: [kitPlugin()],
    css: {
      postcss: {
        plugins: [isolateVpDoc()],
      },
    },
  },
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.png'
      }
    ]
  ],
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    lineNumbers: true,
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true
    },
    // 关闭 markdown-it-attrs：否则 PHPDoc 的 array{...} 类型标注会被解析成 HTML 属性，
    // 导致 Duplicate attribute 构建报错（手写文档未使用 {#id}/{.class} 属性语法）
    attrs: {
      disable: true
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 右侧目录：h2 分节 + h3 模块；Demo 标题默认 h3，长文档可传 title-level=4 不占目录
    outline: [2, 3],
    nav: [
      { text: 'Vue', link: '/vue/index' },
      { text: '组件库', link: '/vue/ui/index' },
      { text: 'PHP', link: '/php/getting-started' },
      { text: '微信小程序', link: '/wechat_miniProgram/token/index.html' }
    ],

    sidebar: {
      '/vue/ui/': decorateComponentPlatforms([
        {
          text: "K UI 组件库",
          items: [
            { text: "文档总览", link: "/vue/ui/index" },
            { text: "headless 自定义渲染", link: "/vue/ui/headless" },
            {
              text: "设计（design）",
              collapsed: false,
              items: [
                { text: "设计语言", link: "/vue/ui/design/language" },
                { text: "主题 Token 规格", link: "/vue/ui/design/theme-tokens" },
                { text: "响应式取值", link: "/vue/ui/design/responsive-values" },
                { text: "原子样式（atoms）", link: "/vue/ui/design/atoms" }
              ]
            },
            {
              text: "playground（矩阵页）",
              collapsed: false,
              items: [
                  { text: "组件矩阵页", link: "/vue/ui/playground/matrix" }
                ]
            },
            {
              text: "组件（components）",
              collapsed: false,
              items: [
                { text: "共同约定与交付顺序", link: "/vue/ui/components/index" },
                {
                  text: "基础与应用（P1）",
                  collapsed: false,
                  items: [
                    { text: "KApp 应用容器", link: "/vue/ui/components/app" },
                    { text: "KConfigProvider 全局配置", link: "/vue/ui/components/config-provider" },
                    { text: "KButton 按钮", link: "/vue/ui/components/button" },
                    { text: "KIcon 图标", link: "/vue/ui/components/icon" },
                    { text: "KFlex 弹性布局", link: "/vue/ui/components/flex" },
                    { text: "KDivider 分割线", link: "/vue/ui/components/divider" },
                    { text: "KGrid 栅格", link: "/vue/ui/components/grid" },
                    { text: "KLayout 布局组", link: "/vue/ui/components/layout" },
                    { text: "KTitle / KParagraph / KText 文字排版", link: "/vue/ui/components/typography" },
                    { text: "KLink 链接", link: "/vue/ui/components/link" }
                  ]
                },
                {
                  text: "表单（P2a）",
                  collapsed: false,
                  items: [
                    { text: "KInput 输入框", link: "/vue/ui/components/input" },
                    { text: "KInputNumber 数值输入", link: "/vue/ui/components/input-number" },
                    { text: "KSelect 选择器", link: "/vue/ui/components/select" },
                    { text: "KControlGroup 控件组", link: "/vue/ui/components/control-group" },
                    { text: "KCheckbox 复选框", link: "/vue/ui/components/checkbox" },
                    { text: "KRadio 单选框", link: "/vue/ui/components/radio" },
                    { text: "KSwitch 开关", link: "/vue/ui/components/switch" },
                    { text: "KForm 表单", link: "/vue/ui/components/form" }
                  ]
                },
                {
                  text: "反馈与浮层（P2b）",
                  collapsed: false,
                  items: [
                    { text: "KTooltip 文字提示", link: "/vue/ui/components/tooltip" },
                    { text: "KPopover 卡片气泡", link: "/vue/ui/components/popover" },
                    { text: "KPopconfirm 确认气泡", link: "/vue/ui/components/popconfirm" },
                    { text: "KModal 对话框", link: "/vue/ui/components/modal" },
                    { text: "KMessage 全局提示", link: "/vue/ui/components/message" },
                    { text: "KNotification 通知", link: "/vue/ui/components/notification" },
                    { text: "KAlert 警告提示", link: "/vue/ui/components/alert" },
                    { text: "KSpin 加载中", link: "/vue/ui/components/spin" }
                  ]
                },
                {
                  text: "数据与交互（P2.5）",
                  collapsed: false,
                  items: [
                    { text: "KDatePicker 日期选择", link: "/vue/ui/components/date-picker" },
                    { text: "KDateRangePicker 日期范围", link: "/vue/ui/components/date-range-picker" },
                    { text: "KUpload 上传", link: "/vue/ui/components/upload" },
                    { text: "KImageCropper 图片裁剪", link: "/vue/ui/components/image-cropper" },
                    { text: "KPreview 预览", link: "/vue/ui/components/preview" },
                    { text: "KSortable 拖拽排序", link: "/vue/ui/components/sortable" }
                  ]
                },
                {
                  text: "数据展示（P3）",
                  collapsed: false,
                  items: [
                    { text: "KTable 表格", link: "/vue/ui/components/table", collapsed: false, items: [
                      { text: "概览", link: "/vue/ui/components/table" },
                      { text: "快速上手", link: "/vue/ui/components/table/quick-start" },
                      { text: "功能地图", link: "/vue/ui/components/table/map" },
                      { text: "Prop / Slot 速查", link: "/vue/ui/components/table/props" },
                      { text: "基础与外观", link: "/vue/ui/components/table/basic" },
                      { text: "表头与列头", link: "/vue/ui/components/table/headers" },
                      { text: "排序与筛选", link: "/vue/ui/components/table/sort-filter" },
                      { text: "分页", link: "/vue/ui/components/table/pagination" },
                      { text: "插槽", link: "/vue/ui/components/table/slots" },
                      { text: "展开与树形", link: "/vue/ui/components/table/rows" },
                      { text: "单元格合并", link: "/vue/ui/components/table/merge" },
                      { text: "固定列", link: "/vue/ui/components/table/fixed-columns" },
                      { text: "固定行", link: "/vue/ui/components/table/fixed-rows" },
                      { text: "表头位置与滚动", link: "/vue/ui/components/table/sticky-scroll" },
                      { text: "虚拟滚动", link: "/vue/ui/components/table/virtual" },
                      { text: "列设置与拖拽", link: "/vue/ui/components/table/columns" },
                      { text: "行选择", link: "/vue/ui/components/table/selection" },
                      { text: "操作与编辑", link: "/vue/ui/components/table/editing" },
                      { text: "响应式卡片", link: "/vue/ui/components/table/stacked" },
                      { text: "边界与组合", link: "/vue/ui/components/table/edge-cases" }
                    ] },
                    { text: "KPagination 分页", link: "/vue/ui/components/pagination" },
                    { text: "KVirtualList 虚拟列表", link: "/vue/ui/components/virtual-list" },
                    { text: "KTag 标签", link: "/vue/ui/components/tag" },
                    { text: "KBadge 徽标", link: "/vue/ui/components/badge" },
                    { text: "KCard 卡片", link: "/vue/ui/components/card" },
                    { text: "KEmpty 空状态", link: "/vue/ui/components/empty" },
                    { text: "KSkeleton 骨架屏", link: "/vue/ui/components/skeleton" }
                  ]
                },
                {
                  text: "导航（P4）",
                  collapsed: false,
                  items: [
                    { text: "KBreadcrumb 面包屑", link: "/vue/ui/components/breadcrumb" },
                    { text: "KSteps 步骤条", link: "/vue/ui/components/steps" },
                    { text: "KTabs 标签页", link: "/vue/ui/components/tabs" },
                    { text: "KDropdown 下拉菜单", link: "/vue/ui/components/dropdown" },
                    { text: "KMenu 导航菜单", link: "/vue/ui/components/menu" },
                    { text: "KAnchor 锚点", link: "/vue/ui/components/anchor" },
                    { text: "KAffix 吸顶", link: "/vue/ui/components/affix" },
                    { text: "KDrawer 抽屉", link: "/vue/ui/components/drawer" },
                    { text: `${mobileOnlyIcon}KNavBar 顶部导航`, docFooterText: "KNavBar 顶部导航", link: "/vue/ui/components/navbar" },
                    { text: `${mobileOnlyIcon}KTabBar 底部导航`, docFooterText: "KTabBar 底部导航", link: "/vue/ui/components/tabbar" }
                  ]
                },
                {
                  text: "反馈补充（P5）",
                  collapsed: false,
                  items: [
                    { text: "KProgress 进度条", link: "/vue/ui/components/progress" },
                    { text: "KResult 结果页", link: "/vue/ui/components/result" }
                  ]
                },
                {
                  text: "表单补充（P5）",
                  collapsed: false,
                  items: [
                    { text: "KRate 评分", link: "/vue/ui/components/rate" },
                    { text: "KSlider 滑动输入", link: "/vue/ui/components/slider" },
                    { text: "KMentions 提及", link: "/vue/ui/components/mentions" },
                    { text: "KAutoComplete 自动完成", link: "/vue/ui/components/autocomplete" },
                    { text: "KTimePicker 时间选择", link: "/vue/ui/components/timepicker" },
                    { text: "KCascader 级联选择", link: "/vue/ui/components/cascader" },
                    { text: "KTreeSelect 树选择", link: "/vue/ui/components/treeselect" },
                    { text: "KTransfer 穿梭框", link: "/vue/ui/components/transfer" },
                    { text: "KColorPicker 颜色选择", link: "/vue/ui/components/colorpicker" }
                  ]
                },
                {
                  text: "基础补齐（P6）",
                  collapsed: false,
                  items: [
                    { text: "KAvatar 头像", link: "/vue/ui/components/avatar" },
                    { text: "KList 列表 / KCell 单元格", link: "/vue/ui/components/list" },
                    { text: "KCollapse 折叠面板", link: "/vue/ui/components/collapse" },
                    { text: "KDescriptions 描述列表", link: "/vue/ui/components/descriptions" },
                    { text: "KSegmented 分段控制器", link: "/vue/ui/components/segmented" },
                    { text: "KFieldGroup 字段组", link: "/vue/ui/components/field-group" },
                    { text: "KTree 树形控件", link: "/vue/ui/components/tree" },
                    { text: "KInputTags 标签输入", link: "/vue/ui/components/input-tags" }
                  ]
                },
                {
                  text: "数据与导航（P7）",
                  collapsed: false,
                  items: [
                    { text: "KTimeline 时间轴", link: "/vue/ui/components/timeline" },
                    { text: "KStatistic 统计数值", link: "/vue/ui/components/statistic" },
                    { text: "KImage 图片", link: "/vue/ui/components/image" },
                    { text: "KChart 图表", link: "/vue/ui/components/chart" },
                    { text: "KCalendar 日历", link: "/vue/ui/components/calendar" },
                    { text: "KCarousel 轮播", link: "/vue/ui/components/carousel" },
                    { text: "KPinInput 验证码/密码输入", link: "/vue/ui/components/pin-input" },
                    { text: "KCommandPalette 命令面板", link: "/vue/ui/components/command-palette" },
                    { text: "KNavigationMenu 导航菜单", link: "/vue/ui/components/navigation-menu" }
                  ]
                },
                {
                  text: "增强件（P8）",
                  collapsed: false,
                  items: [
                    { text: "KContextMenu 右键菜单", link: "/vue/ui/components/context-menu" },
                    { text: "KScrollArea 滚动区域", link: "/vue/ui/components/scroll-area" },
                    { text: "KKbd 键帽", link: "/vue/ui/components/kbd" },
                    { text: "KUser 用户信息", link: "/vue/ui/components/user" },
                    { text: "KMarquee 跑马灯", link: "/vue/ui/components/marquee" },
                    { text: "KSplitter 分隔面板", link: "/vue/ui/components/splitter" },
                    { text: "KQRCode 二维码", link: "/vue/ui/components/qrcode" },
                    { text: "KWatermark 水印", link: "/vue/ui/components/watermark" },
                    { text: "KMasonry 瀑布流", link: "/vue/ui/components/masonry" },
                    { text: "KTour 漫游引导", link: "/vue/ui/components/tour" },
                    { text: "KFloatButton 悬浮按钮", link: "/vue/ui/components/float-button" },
                    { text: "KBorderBeam 边框光束", link: "/vue/ui/components/border-beam" },
                    { text: "KListbox 列表框", link: "/vue/ui/components/listbox" }
                  ]
                },
                {
                  text: "移动端专项（P9）",
                  collapsed: false,
                  items: [
                    { text: `${mobileOnlyIcon}KActionSheet / KShareSheet 操作面板`, docFooterText: "KActionSheet / KShareSheet 操作面板", link: "/vue/ui/components/action-sheet" },
                    { text: `${mobileOnlyIcon}KPicker 选择器`, docFooterText: "KPicker 选择器", link: "/vue/ui/components/picker" },
                    { text: `${mobileOnlyIcon}KPullToRefresh 下拉刷新`, docFooterText: "KPullToRefresh 下拉刷新", link: "/vue/ui/components/pull-to-refresh" },
                    { text: `${mobileOnlyIcon}KInfiniteScroll 无限滚动`, docFooterText: "KInfiniteScroll 无限滚动", link: "/vue/ui/components/infinite-scroll" },
                    { text: `${mobileOnlyIcon}KSwipeCell 滑动单元格`, docFooterText: "KSwipeCell 滑动单元格", link: "/vue/ui/components/swipe-cell" },
                    { text: `${mobileOnlyIcon}KSearchBar 搜索栏`, docFooterText: "KSearchBar 搜索栏", link: "/vue/ui/components/search-bar" },
                    { text: `${mobileOnlyIcon}KNoticeBar 通知栏`, docFooterText: "KNoticeBar 通知栏", link: "/vue/ui/components/notice-bar" },
                    { text: `${mobileOnlyIcon}KIndexBar 索引栏`, docFooterText: "KIndexBar 索引栏", link: "/vue/ui/components/index-bar" },
                    { text: `${mobileOnlyIcon}KSideBar 侧边导航`, docFooterText: "KSideBar 侧边导航", link: "/vue/ui/components/side-bar" },
                    { text: `${mobileOnlyIcon}KNumberKeyboard 数字键盘`, docFooterText: "KNumberKeyboard 数字键盘", link: "/vue/ui/components/number-keyboard" },
                    { text: `${mobileOnlyIcon}KFloatingBubble / KFloatingPanel 悬浮组件`, docFooterText: "KFloatingBubble / KFloatingPanel 悬浮组件", link: "/vue/ui/components/floating" },
                    { text: `${mobileOnlyIcon}KSubmitBar / KActionBar 底部操作`, docFooterText: "KSubmitBar / KActionBar 底部操作", link: "/vue/ui/components/submit-bar" },
                    { text: `${mobileOnlyIcon}KCountDown / KRollingText 倒计时`, docFooterText: "KCountDown / KRollingText 倒计时", link: "/vue/ui/components/count-down" },
                    { text: `${mobileOnlyIcon}KPopup / KCenterPopup 弹层`, docFooterText: "KPopup / KCenterPopup 弹层", link: "/vue/ui/components/popup" },
                    { text: `${mobileOnlyIcon}KSafeArea 安全区`, docFooterText: "KSafeArea 安全区", link: "/vue/ui/components/safe-area" },
                    { text: `${mobileOnlyIcon}KSignature 签名板`, docFooterText: "KSignature 签名板", link: "/vue/ui/components/signature" }
                  ]
                }
              ]
            },
            {
              text: "模板（Templates）",
              collapsed: false,
              items: [
                { text: "模板总览", link: "/vue/ui/templates" },
                {
                  text: "页面（Pages）",
                  collapsed: false,
                  items: [
                    { text: "数据看板", link: "/vue/ui/templates/pages/dashboard" },
                    { text: "成员管理", link: "/vue/ui/templates/pages/members" },
                    { text: `${mobileOnlyIcon}移动端确认订单`, docFooterText: "移动端确认订单", link: "/vue/ui/templates/pages/mobile-order" }
                  ]
                },
                {
                  text: "区块（Blocks）",
                  collapsed: false,
                  items: [
                    { text: "登录", link: "/vue/ui/templates/blocks/login" },
                    { text: "定价方案", link: "/vue/ui/templates/blocks/pricing" },
                    { text: "通知设置", link: "/vue/ui/templates/blocks/settings" },
                    { text: "苹果活动环", link: "/vue/ui/templates/blocks/activity-rings" }
                  ]
                },
                {
                  text: "二次封装（Composed）",
                  collapsed: false,
                  items: [
                    { text: "路由页签（KRouterTabs）", link: "/vue/ui/templates/composed/router-tabs" },
                    { text: "路由菜单（KRouterMenu）", link: "/vue/ui/templates/composed/router-menu" },
                    { text: "胶囊导航（KTabBarCapsule）", link: "/vue/ui/templates/composed/tabbar-capsule" }
                  ]
                }
              ]
            }
          ]
        }
      ]),
      '/vue/': [
        {
          text: "介绍",
          link: "/vue/index"
        },
        {
          text: "接入与构建",
          collapsed: false,
          items: [
            {
              text: "vite 插件",
              link: "/vue/vite-plugin"
            }
          ]
        },
        {
          text: "基础能力（foundation）",
          collapsed: false,
          items: [
            {
              text: "HTTP 请求",
              link: "/vue/foundation/http"
            },
            {
              text: "cookies",
              link: "/vue/foundation/cookies"
            },
            {
              text: "eventBus",
              link: "/vue/foundation/event-bus"
            },
            {
              text: "file",
              link: "/vue/foundation/file"
            },
            {
              text: "helper",
              link: "/vue/foundation/helper"
            },
            {
              text: "naiveUI",
              link: "/vue/foundation/naive-ui"
            }
          ]
        },
        {
          text: "服务（services）",
          collapsed: false,
          items: [
            {
              text: "SettingFormService",
              link: "/vue/services/setting-form"
            },
            {
              text: "commonService",
              link: "/vue/services/common"
            },
            {
              text: "dayjsService",
              link: "/vue/services/dayjs"
            },
            {
              text: "naiveUIService",
              link: "/vue/services/naive-ui"
            },
            {
              text: "generateRouterMenuOptions",
              link: "/vue/services/naive-router-menu"
            },
            {
              text: "DiscuzXSettingFormService",
              link: "/vue/services/discuzx-setting-form"
            }
          ]
        },
        {
          text: "组件（components）",
          collapsed: false,
          items: [
            {
              text: "Base",
              collapsed: false,
              items: [
                {
                  text: "AnthorFloating",
                  link: "/vue/components/base/AnthorFloating"
                },
                {
                  text: "RPanel",
                  link: "/vue/components/base/RPanel"
                },
                {
                  text: "RCopyText",
                  link: "/vue/components/base/RCopyText"
                },
                {
                  text: "RKeepAliveRouterView",
                  link: "/vue/components/base/RKeepAliveRouterView"
                },
                {
                  text: "RRouterMenu",
                  link: "/vue/components/base/RRouterMenu"
                },
                {
                  text: "RSpace",
                  link: "/vue/components/base/RSpace"
                },
                {
                  text: "RStatus",
                  link: "/vue/components/base/RStatus"
                },
                {
                  text: "RCommonFooter",
                  link: "/vue/components/base/RCommonFooter"
                },
                {
                  text: "RTwoColumnLayout",
                  link: "/vue/components/base/RTwoColumnLayout"
                }
              ]
            },
            {
              text: "Naive",
              collapsed: false,
              items: [
                {
                  text: "NaiveUIProvider",
                  link: "/vue/components/naive/NaiveUIProvider"
                },
                {
                  text: "NaiveUIMenu",
                  link: "/vue/components/naive/NaiveUIMenu"
                },
                {
                  text: "NaiveUIMenuLink",
                  link: "/vue/components/naive/NaiveUIMenuLink"
                },
                {
                  text: "RNaiveConfig",
                  link: "/vue/components/naive/RNaiveConfig"
                },
                {
                  text: "RNaiveFormItem",
                  link: "/vue/components/naive/RNaiveFormItem"
                },
                {
                  text: "RNaiveRouterMenu",
                  link: "/vue/components/naive/RNaiveRouterMenu"
                },
                {
                  text: "RNaiveRouterTabs",
                  link: "/vue/components/naive/RNaiveRouterTabs"
                },
                {
                  text: "RNaiveUpload",
                  link: "/vue/components/naive/RNaiveUpload"
                },
                {
                  text: "RCenterPagination",
                  link: "/vue/components/naive/RCenterPagination"
                }
              ]
            },
            {
              text: "DiscuzX",
              collapsed: false,
              items: [
                {
                  text: "RDiscuzXUploadAttachment",
                  link: "/vue/components/discuzx/RDiscuzXUploadAttachment"
                },
                {
                  text: "RDiscuzXUploadFile",
                  link: "/vue/components/discuzx/RDiscuzXUploadFile"
                }
              ]
            }
          ]
        },
        {
          text: "接口（api）",
          collapsed: false,
          items: [
            {
              text: "common",
              link: "/vue/api/index"
            },
            {
              text: "DiscuzX",
              link: "/vue/api/discuzx"
            }
          ]
        },
        {
          text: "类型（types）",
          collapsed: false,
          items: [
            {
              text: "类型一览",
              link: "/vue/types/index"
            }
          ]
        }
      ],
      '/php/': [
        {
          text: "开始",
          collapsed: false,
          items: [
            { text: "简介", link: "/php/" },
            { text: "快速开始", link: "/php/getting-started" }
          ]
        },
        {
          text: "核心概念",
          collapsed: false,
          items: [
            { text: "应用与装配", link: "/php/guide/app" },
            { text: "容器", link: "/php/guide/container" },
            { text: "模块机制", link: "/php/guide/modules" }
          ]
        },
        {
          text: "框架功能",
          collapsed: false,
          items: [
            { text: "门面", link: "/php/framework/facade" },
            { text: "配置", link: "/php/framework/config" },
            { text: "缓存", link: "/php/framework/cache" },
            { text: "日志", link: "/php/framework/log" },
            { text: "事件", link: "/php/framework/event" },
            { text: "生命周期", link: "/php/framework/lifecycle" },
            { text: "路由", link: "/php/framework/router" },
            { text: "控制器", link: "/php/framework/controller" },
            { text: "中间件", link: "/php/framework/middleware" },
            { text: "验证", link: "/php/framework/validation" },
            { text: "文件系统", link: "/php/framework/filesystem" },
            { text: "数据工具", link: "/php/framework/data" },
            { text: "对象基类", link: "/php/framework/object" }
          ]
        },
        {
          text: "模块",
          collapsed: false,
          items: [
            { text: "认证", link: "/php/modules/auth" },
            { text: "设置", link: "/php/modules/setting" },
            { text: "存储", link: "/php/modules/storage" },
            { text: "Redis", link: "/php/modules/redis" },
            { text: "云服务", link: "/php/modules/cloud" },
            { text: "微信", link: "/php/modules/wechat" }
          ]
        },
        {
          text: "基础",
          collapsed: false,
          items: [
            { text: "HTTP", link: "/php/basics/http" },
            { text: "数据库", link: "/php/basics/database" },
            { text: "控制台与计划任务", link: "/php/basics/console" }
          ]
        },
        {
          text: "运维",
          collapsed: false,
          items: [
            { text: "安装 / 升级 / 卸载", link: "/php/ops/deploy" },
            { text: "异常与错误", link: "/php/ops/errors" }
          ]
        },
        {
          text: "API 参考（按类）",
          collapsed: true,
          items: apiSidebar
        }
      ],
      '/wechat_miniProgram/': [
        {
          text: "开发指南",
          items: [
            {
              text: "设计变量",
              link: "/wechat_miniProgram/token/index"
            },
            {
              text: "图标",
              link: "/wechat_miniProgram/icons/index"
            },
            {
              text: "组件",
              items: [
                {
                  text: "面板",
                  collapsed: false,
                  items: [
                    {
                      text: "面板列表",
                      link: "/wechat_miniProgram/components/panel/panelList"
                    },
                    {
                      text: "普通面板",
                      link: "/wechat_miniProgram/components/panel/panel"
                    },
                    {
                      text: "内嵌面板",
                      link: "/wechat_miniProgram/components/panel/innerPanel"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    }
  }
})
