export type Meta = {
  name: string
  desc: string
  accepts: string
  example: string
}

const colorExamples = (token: string) => {
  if (token.includes('shadow') || token.includes('outline')) return `box-shadow: var(${token})`
  if (token.includes('-bg') || token.includes('-fill') || token.includes('gray-') || token.includes('neutral-')) return `background: var(${token})`
  if (token.includes('border') || token.includes('split')) return `border-color: var(${token})`
  return `color: var(${token})`
}

const SEED: Record<string, Meta> = {
  'seed-color-primary': { name: '主色', desc: '主色基准，派生整条主色链路（hover/active/bg/border/text）', accepts: '颜色值', example: "seed: { colorPrimary: '#1677ff' }" },
  'seed-color-success': { name: '成功色', desc: '成功语义色基准', accepts: '颜色值', example: "seed: { colorSuccess: '#52c41a' }" },
  'seed-color-warning': { name: '警告色', desc: '警告语义色基准', accepts: '颜色值', example: "seed: { colorWarning: '#faad14' }" },
  'seed-color-error': { name: '错误色', desc: '错误语义色基准（兼 danger）', accepts: '颜色值', example: "seed: { colorError: '#ff4d4f' }" },
  'seed-color-info': { name: '信息色', desc: '信息语义色基准，未设置时跟随主色', accepts: '颜色值', example: "seed: { colorInfo: '#1677ff' }" },
  'seed-color-link': { name: '链接色', desc: '链接语义色基准，未设置时跟随主色', accepts: '颜色值', example: "seed: { colorLink: '#1677ff' }" },
  'seed-color-text-base': { name: '文字基准色', desc: '亮色模式的文字基色，派生文本透明度阶梯', accepts: '颜色值', example: "seed: { colorTextBase: '#000000' }" },
  'seed-color-text-base-dark': { name: '暗色文字基准', desc: '暗色模式的文字基色', accepts: '颜色值', example: "seed: { colorTextBaseDark: '#f5f5f5' }" },
  'seed-color-bg-base': { name: '背景基准色', desc: '亮色模式的容器底色', accepts: '颜色值', example: "seed: { colorBgBase: '#ffffff' }" },
  'seed-color-bg-base-dark': { name: '暗色背景基准', desc: '暗色模式的容器底色', accepts: '颜色值', example: "seed: { colorBgBaseDark: '#141414' }" },
  'seed-font-family': { name: '正文字体', desc: '全局正文与标题的字体族', accepts: '字体族列表', example: "seed: { fontFamily: 'Inter, sans-serif' }" },
  'seed-font-family-code': { name: '等宽字体', desc: '代码、数字等需要等宽的场景', accepts: '字体族列表', example: "seed: { fontFamilyCode: 'monospace' }" },
  'seed-font-size': { name: '基准字号', desc: '全部字号 / 行高阶梯的基数（无单位 px）', accepts: '数值（px）', example: 'seed: { fontSize: 14 }' },
  'seed-line-height': { name: '基准行高', desc: '正文行高倍率', accepts: '数值（倍率）', example: 'seed: { lineHeight: 1.5714 }' },
  'seed-border-radius': { name: '基准圆角', desc: '圆角阶梯的基数（无单位 px）', accepts: '数值（px）', example: 'seed: { borderRadius: 6 }' },
  'seed-line-width': { name: '基准描边', desc: '描边宽度基数（无单位 px）', accepts: '数值（px）', example: 'seed: { lineWidth: 1 }' },
  'seed-size-unit': { name: '间距基数', desc: 'size 阶梯的基数（px）', accepts: '数值（px）', example: 'seed: { sizeUnit: 4 }' },
  'seed-size-step': { name: '间距步长', desc: '与 sizeUnit 组成 step = unit × step / 4', accepts: '数值', example: 'seed: { sizeStep: 4 }' },
  'seed-control-height': { name: '控件基准高', desc: '控件高度阶梯的基数（px）', accepts: '数值（px）', example: 'seed: { controlHeight: 34 }' },
  'seed-motion-unit': { name: '动效基数', desc: '动效时长基数（秒）', accepts: '数值（秒）', example: 'seed: { motionUnit: 0.1 }' },
  'seed-z-index-popup-base': { name: '浮层基数', desc: '全部 z-index 阶梯的基数', accepts: '整数', example: 'seed: { zIndexPopupBase: 1000 }' },
  'seed-neutral-tint': { name: '中性染色比', desc: '灰阶混入主色的比例，0 = 纯灰', accepts: '0–1 数值', example: 'seed: { neutralTint: 0.02 }' },
}

const BASE: Record<string, Meta> = {
  'color-text-base': { name: '文本基色', desc: '随亮暗模式自动切换的文字基准（light-dark）', accepts: '颜色值（light-dark）', example: 'color: var(--k-color-text-base)' },
  'color-bg-base': { name: '背景基色', desc: '随亮暗模式自动切换的容器底色', accepts: '颜色值（light-dark）', example: 'background: var(--k-color-bg-base)' },
  'mix-onto': { name: '淡出基准', desc: '淡色 / 浅底派生时混向的基准色（= 背景基色）', accepts: '颜色值', example: 'color-mix(in oklab, var(--k-color-primary) 10%, var(--k-mix-onto))' },
  'mix-up': { name: '提亮基准', desc: 'hover 提亮时的混版，恒为白色', accepts: '颜色值', example: 'color-mix(in oklab, var(--k-color-primary) 90%, var(--k-mix-up))' },
  'mix-down': { name: '压暗基准', desc: 'active 按压时的混版，暗色下反转为白色', accepts: '颜色值', example: 'color-mix(in oklab, var(--k-color-primary) 75%, var(--k-mix-down))' },
}

const COLOR_BASE: Record<string, string> = {
  primary: '主色',
  success: '成功色',
  warning: '警告色',
  error: '错误色',
  info: '信息色',
  link: '链接色',
}

const COLOR_VARIANT: Record<string, [string, string]> = {
  '': ['基准', '语义色基准，暗色下自动提亮'],
  hover: ['悬浮', '悬浮态：向提亮基准混 10%'],
  active: ['按下', '按下态：向压暗基准混 25%'],
  bg: ['浅底', '浅色背景：10% 混入背景'],
  'bg-hover': ['浅底悬浮', '浅色背景悬浮：16% 混入背景'],
  border: ['描边', '浅色描边：30% 混入背景'],
  'border-hover': ['描边悬浮', '浅色描边悬浮：45% 混入背景'],
  text: ['文本', '文本色：90% 混入背景'],
  'text-hover': ['文本悬浮', '文本色悬浮：75% 混入背景'],
  'text-active': ['文本按下', '文本色按下：92% 混向压暗'],
  'text-strong': ['深文本', '深色文本，白底满足 WCAG 4.5'],
}

const TEXT_FILL: Record<string, Meta> = {
  'color-text': { name: '主文本', desc: '正文主色（text-base 88% 不透明）', accepts: '颜色值', example: 'color: var(--k-color-text)' },
  'color-text-secondary': { name: '次级文本', desc: '次级说明文字（65% 不透明）', accepts: '颜色值', example: 'color: var(--k-color-text-secondary)' },
  'color-text-tertiary': { name: '三级文本', desc: '弱提示 / 占位文字（45% 不透明）', accepts: '颜色值', example: 'color: var(--k-color-text-tertiary)' },
  'color-text-quaternary': { name: '四级文本', desc: '禁用态文字（25% 不透明）', accepts: '颜色值', example: 'color: var(--k-color-text-quaternary)' },
  'color-text-light-solid': { name: '深底白字', desc: '深色背景上的纯白文字', accepts: '颜色值', example: 'color: var(--k-color-text-light-solid)' },
  'color-fill': { name: '常规填充', desc: '常规填充底色（15% 不透明）', accepts: '颜色值', example: 'background: var(--k-color-fill)' },
  'color-fill-secondary': { name: '次级填充', desc: '次级填充底色（6% 不透明）', accepts: '颜色值', example: 'background: var(--k-color-fill-secondary)' },
  'color-fill-tertiary': { name: '三级填充', desc: '三级填充底色（4% 不透明）', accepts: '颜色值', example: 'background: var(--k-color-fill-tertiary)' },
  'color-fill-quaternary': { name: '四级填充', desc: '最浅填充底色（2% 不透明）', accepts: '颜色值', example: 'background: var(--k-color-fill-quaternary)' },
  'color-bg-mask': { name: '遮罩底色', desc: '弹窗 / 抽屉遮罩，暗色下 α 上调一档', accepts: '颜色值', example: 'background: var(--k-color-bg-mask)' },
  'color-bg-spotlight': { name: '聚光底色', desc: '高亮 / 聚光遮罩底色', accepts: '颜色值', example: 'background: var(--k-color-bg-spotlight)' },
}

const GRAY_PERCENT: Record<string, number> = { '1': 1, '2': 2, '3': 4, '4': 8, '5': 26, '6': 43, '7': 63, '8': 73, '9': 85, '10': 92 }

const SURFACE: Record<string, Meta> = {
  'color-bg-container': { name: '容器背景', desc: '卡片 / 内容容器的底色', accepts: '颜色值', example: 'background: var(--k-color-bg-container)' },
  'color-bg-elevated': { name: '浮层背景', desc: '弹层 / 下拉等抬升表面的底色', accepts: '颜色值', example: 'background: var(--k-color-bg-elevated)' },
  'color-bg-layout': { name: '布局背景', desc: '页面布局底色（gray-2）', accepts: '颜色值', example: 'background: var(--k-color-bg-layout)' },
  'color-bg-hover': { name: '悬浮背景', desc: '列表项 / 按钮的悬浮底色', accepts: '颜色值', example: 'background: var(--k-color-bg-hover)' },
  'color-border': { name: '默认边框', desc: '常规边框色（gray-4）', accepts: '颜色值', example: 'border-color: var(--k-color-border)' },
  'color-border-secondary': { name: '次级边框', desc: '更浅的次级边框（gray-3）', accepts: '颜色值', example: 'border-color: var(--k-color-border-secondary)' },
  'color-split': { name: '分割线', desc: '列表 / 区块分割线（α 6%）', accepts: '颜色值', example: 'border-top: 1px solid var(--k-color-split)' },
  'box-shadow': { name: '一级阴影', desc: '弹窗 / 浮层的常规阴影', accepts: '阴影值（多段）', example: 'box-shadow: var(--k-box-shadow)' },
  'box-shadow-secondary': { name: '二级阴影', desc: '卡片 / 下拉的轻阴影', accepts: '阴影值（多段）', example: 'box-shadow: var(--k-box-shadow-secondary)' },
  'box-shadow-tertiary': { name: '三级阴影', desc: '轻量提示的极浅阴影', accepts: '阴影值（多段）', example: 'box-shadow: var(--k-box-shadow-tertiary)' },
  'control-outline-width': { name: '聚焦描边宽', desc: '控件聚焦光晕的宽度', accepts: '长度值', example: 'outline-width: var(--k-control-outline-width)' },
  'control-outline': { name: '聚焦光晕色', desc: '控件聚焦外圈颜色（主色 15%）', accepts: '颜色值', example: 'outline-color: var(--k-control-outline)' },
  'box-shadow-primary': { name: '主色光晕', desc: '控件聚焦的主色光晕阴影', accepts: '阴影值', example: 'box-shadow: var(--k-box-shadow-primary)' },
}

const FONT_SIZE_VALUE: Record<string, string> = { '': '14px', sm: '12px', lg: '16px', xl: '20px' }
const HEADING_SIZE: Record<string, string> = { '1': '38px', '2': '30px', '3': '24px', '4': '20px', '5': '16px', '6': '14px' }
const HEADING_LINE_HEIGHT: Record<string, string> = { '1': '1.25', '2': '1.25', '3': '1.25', '4': '1.35', '5': '1.35', '6': '1.35' }

const FONT: Record<string, Meta> = {
  'font-family': { name: '正文字体', desc: '正文与标题字体族', accepts: '字体族列表', example: 'font-family: var(--k-font-family)' },
  'font-family-code': { name: '等宽字体', desc: '代码 / 数值等宽字体', accepts: '字体族列表', example: 'font-family: var(--k-font-family-code)' },
  'font-size-sm': { name: '小字号', desc: '辅助文字字号（12px）', accepts: '长度值', example: 'font-size: var(--k-font-size-sm)' },
  'font-size': { name: '正文字号', desc: '默认正文与控件字号（14px）', accepts: '长度值', example: 'font-size: var(--k-font-size)' },
  'font-size-lg': { name: '大字号', desc: '强调正文 / 大控件字号（16px）', accepts: '长度值', example: 'font-size: var(--k-font-size-lg)' },
  'font-size-xl': { name: '超大字号', desc: '页面内大标题字号（20px）', accepts: '长度值', example: 'font-size: var(--k-font-size-xl)' },
  'line-height': { name: '正文行高', desc: '正文行高倍率（1.5714）', accepts: '数值（倍率）', example: 'line-height: var(--k-line-height)' },
  'font-height': { name: '正文行高值', desc: '字号 × 行高倍率的实际行高（22px）', accepts: '长度值', example: 'line-height: var(--k-font-height)' },
  'font-weight-base': { name: '常规字重', desc: '正文默认字重（400）', accepts: '400 / 500 / 600', example: 'font-weight: var(--k-font-weight-base)' },
  'font-weight-strong': { name: '强调字重', desc: '强调文字字重（500）', accepts: '400 / 500 / 600', example: 'font-weight: var(--k-font-weight-strong)' },
  'font-weight-heading': { name: '标题字重', desc: '标题与弹层标题字重（600）', accepts: '400 / 500 / 600', example: 'font-weight: var(--k-font-weight-heading)' },
  'line-height-heading-1': { name: '一级标题行高', desc: 'H1 行高倍率（1.25）', accepts: '数值（倍率）', example: 'line-height: var(--k-line-height-heading-1)' },
  'line-height-heading-2': { name: '二级标题行高', desc: 'H2 行高倍率（1.25）', accepts: '数值（倍率）', example: 'line-height: var(--k-line-height-heading-2)' },
  'line-height-heading-3': { name: '三级标题行高', desc: 'H3 行高倍率（1.25）', accepts: '数值（倍率）', example: 'line-height: var(--k-line-height-heading-3)' },
  'line-height-heading-4': { name: '四级标题行高', desc: 'H4 行高倍率（1.35）', accepts: '数值（倍率）', example: 'line-height: var(--k-line-height-heading-4)' },
  'line-height-heading-5': { name: '五级标题行高', desc: 'H5 行高倍率（1.35）', accepts: '数值（倍率）', example: 'line-height: var(--k-line-height-heading-5)' },
  'line-height-heading-6': { name: '六级标题行高', desc: 'H6 行高倍率（1.35）', accepts: '数值（倍率）', example: 'line-height: var(--k-line-height-heading-6)' },
}

const SPACE_VALUE: Record<string, string> = {
  xxs: '4px', xs: '8px', sm: '12px', '': '16px', md: '20px', lg: '24px', xl: '32px', xxl: '48px',
}

const RADIUS_VALUE: Record<string, string> = { none: '0px', xs: '3px', sm: '4.5px', '': '6px', lg: '12px', xl: '18px', full: '999px' }
const CONTROL_HEIGHT_VALUE: Record<string, string> = { xs: '26px', sm: '30px', '': '34px', lg: '38px' }

const SCALE: Record<string, Meta> = {
  'size-step': { name: '间距步长', desc: '由 seed 派生的阶梯步长（4px）', accepts: '长度值', example: 'gap: var(--k-size-step)' },
  'size-xxs': { name: '间距 xxs', desc: '最小间距档（4px）', accepts: '长度值', example: 'padding: var(--k-size-xxs)' },
  'size-xs': { name: '间距 xs', desc: '小间距档（8px）', accepts: '长度值', example: 'padding: var(--k-size-xs)' },
  'size-sm': { name: '间距 sm', desc: '紧凑间距档（12px）', accepts: '长度值', example: 'padding: var(--k-size-sm)' },
  size: { name: '间距 base', desc: '基础间距档（16px）', accepts: '长度值', example: 'padding: var(--k-size)' },
  'size-md': { name: '间距 md', desc: '常用间距档（20px）', accepts: '长度值', example: 'padding: var(--k-size-md)' },
  'size-lg': { name: '间距 lg', desc: '宽松间距档（24px）', accepts: '长度值', example: 'padding: var(--k-size-lg)' },
  'size-xl': { name: '间距 xl', desc: '大间距档（32px）', accepts: '长度值', example: 'padding: var(--k-size-xl)' },
  'size-xxl': { name: '间距 xxl', desc: '最大间距档（48px）', accepts: '长度值', example: 'padding: var(--k-size-xxl)' },
  'border-radius-none': { name: '无圆角', desc: '直角（0）', accepts: '长度值', example: 'border-radius: var(--k-border-radius-none)' },
  'border-radius-xs': { name: '极小圆角', desc: '极小圆角（约 3px）', accepts: '长度值', example: 'border-radius: var(--k-border-radius-xs)' },
  'border-radius-sm': { name: '小圆角', desc: '小圆角（约 4.5px）', accepts: '长度值', example: 'border-radius: var(--k-border-radius-sm)' },
  'border-radius': { name: '基础圆角', desc: '组件默认圆角（6px）', accepts: '长度值', example: 'border-radius: var(--k-border-radius)' },
  'border-radius-lg': { name: '大圆角', desc: '容器 / 卡片圆角（12px）', accepts: '长度值', example: 'border-radius: var(--k-border-radius-lg)' },
  'border-radius-xl': { name: '超大圆角', desc: '大容器圆角（18px）', accepts: '长度值', example: 'border-radius: var(--k-border-radius-xl)' },
  'border-radius-full': { name: '全圆角', desc: '胶囊 / 圆形（999px）', accepts: '长度值', example: 'border-radius: var(--k-border-radius-full)' },
  'control-height-xs': { name: '控件高 xs', desc: '超小控件高度（26px）', accepts: '长度值', example: 'height: var(--k-control-height-xs)' },
  'control-height-sm': { name: '控件高 sm', desc: '小控件高度（30px）', accepts: '长度值', example: 'height: var(--k-control-height-sm)' },
  'control-height': { name: '控件高 base', desc: '默认控件高度（34px）', accepts: '长度值', example: 'height: var(--k-control-height)' },
  'control-height-lg': { name: '控件高 lg', desc: '大控件高度（38px，移动端 52px）', accepts: '长度值', example: 'height: var(--k-control-height-lg)' },
  'popup-padding': { name: '弹层内边距', desc: '弹层内容边距（4px）', accepts: '长度值', example: 'padding: var(--k-popup-padding)' },
  'popup-item-height-sm': { name: '弹层行高 sm', desc: '紧凑选项行高（28px）', accepts: '长度值', example: 'height: var(--k-popup-item-height-sm)' },
  'popup-item-height': { name: '弹层行高 base', desc: '默认选项行高（32px）', accepts: '长度值', example: 'height: var(--k-popup-item-height)' },
  'popup-item-height-lg': { name: '弹层行高 lg', desc: '宽松选项行高（36px）', accepts: '长度值', example: 'height: var(--k-popup-item-height-lg)' },
  'popup-item-padding-x': { name: '选项横向内边距', desc: '选项左右内边距（8px）', accepts: '长度值', example: 'padding-inline: var(--k-popup-item-padding-x)' },
  'popup-title-size': { name: '弹层标题字号', desc: '弹层标题字号（14px）', accepts: '长度值', example: 'font-size: var(--k-popup-title-size)' },
  'popup-title-weight': { name: '弹层标题字重', desc: '弹层标题字重（600）', accepts: '400 / 500 / 600', example: 'font-weight: var(--k-popup-title-weight)' },
  'popup-description-size': { name: '弹层描述字号', desc: '弹层描述文字字号（12px）', accepts: '长度值', example: 'font-size: var(--k-popup-description-size)' },
  'line-width': { name: '描边宽度', desc: '边框 / 分割线宽度（1px）', accepts: '长度值', example: 'border-width: var(--k-line-width)' },
  'line-type': { name: '描边类型', desc: '边框线型', accepts: 'solid / dashed / dotted', example: 'border-style: var(--k-line-type)' },
  'padding-horizontal': { name: '水平内边距', desc: '按钮 / 控件左右内边距（15px）', accepts: '长度值', example: 'padding-inline: var(--k-padding-horizontal)' },
}

const MOTION_Z: Record<string, Meta> = {
  'motion-duration-fast': { name: '动效时长 fast', desc: '快速反馈（0.1s）', accepts: '时间值', example: 'transition-duration: var(--k-motion-duration-fast)' },
  'motion-duration-mid': { name: '动效时长 mid', desc: '常规过渡（0.2s）', accepts: '时间值', example: 'transition-duration: var(--k-motion-duration-mid)' },
  'motion-duration-normal': { name: '动效时长 normal', desc: '常规过渡别名（= mid）', accepts: '时间值', example: 'transition-duration: var(--k-motion-duration-normal)' },
  'motion-duration-slow': { name: '动效时长 slow', desc: '慢速过渡（0.3s）', accepts: '时间值', example: 'transition-duration: var(--k-motion-duration-slow)' },
  'motion-duration-spin': { name: '加载旋转时长', desc: 'loading 旋转一圈（1s）', accepts: '时间值', example: 'animation-duration: var(--k-motion-duration-spin)' },
  'motion-duration-wave': { name: '波纹时长', desc: '点击波纹扩散（0.6s）', accepts: '时间值', example: 'animation-duration: var(--k-motion-duration-wave)' },
  'motion-ease-wave': { name: '波纹缓动', desc: '点击波纹的缓动曲线', accepts: '缓动函数', example: 'animation-timing-function: var(--k-motion-ease-wave)' },
  'motion-ease-in-out-cubic': { name: '缓动 in-out-cubic', desc: '进出一体缓动', accepts: '缓动函数', example: 'transition-timing-function: var(--k-motion-ease-in-out-cubic)' },
  'motion-ease-out-cubic': { name: '缓动 out-cubic', desc: '快速出场缓动', accepts: '缓动函数', example: 'transition-timing-function: var(--k-motion-ease-out-cubic)' },
  'motion-ease-in-cubic': { name: '缓动 in-cubic', desc: '平缓入场缓动', accepts: '缓动函数', example: 'transition-timing-function: var(--k-motion-ease-in-cubic)' },
  'motion-ease-out-quint': { name: '缓动 out-quint', desc: '强出场缓动', accepts: '缓动函数', example: 'transition-timing-function: var(--k-motion-ease-out-quint)' },
  'motion-ease-in-quint': { name: '缓动 in-quint', desc: '强入场缓动', accepts: '缓动函数', example: 'transition-timing-function: var(--k-motion-ease-in-quint)' },
  'motion-ease-out-back': { name: '缓动 out-back', desc: '带回弹的出场缓动', accepts: '缓动函数', example: 'transition-timing-function: var(--k-motion-ease-out-back)' },
  'motion-ease-out': { name: '默认出场缓动', desc: '默认出场缓动（= out-quint）', accepts: '缓动函数', example: 'transition-timing-function: var(--k-motion-ease-out)' },
  'z-index-base': { name: '层级 base', desc: '文档流基准（0）', accepts: '整数', example: 'z-index: var(--k-z-index-base)' },
  'z-index-divider': { name: '层级 分割线', desc: '分割线层级（1）', accepts: '整数', example: 'z-index: var(--k-z-index-divider)' },
  'z-index-segment': { name: '层级 分段控件', desc: '分段控件层级（2）', accepts: '整数', example: 'z-index: var(--k-z-index-segment)' },
  'z-index-affix': { name: '层级 吸顶', desc: '吸顶层层级（10）', accepts: '整数', example: 'z-index: var(--k-z-index-affix)' },
  'z-index-popup-base': { name: '层级 浮层基数', desc: '浮层层级基数（1000）', accepts: '整数', example: 'z-index: var(--k-z-index-popup-base)' },
  'z-index-popup': { name: '层级 临时浮层', desc: 'Tooltip/Dropdown 等（1500）', accepts: '整数', example: 'z-index: var(--k-z-index-popup)' },
  'z-index-dropdown': { name: '层级 下拉', desc: '下拉菜单层级（= popup）', accepts: '整数', example: 'z-index: var(--k-z-index-dropdown)' },
  'z-index-sticky': { name: '层级 吸底/吸顶', desc: 'sticky 元素（1200）', accepts: '整数', example: 'z-index: var(--k-z-index-sticky)' },
  'z-index-float-button': { name: '层级 悬浮按钮', desc: '悬浮球 / 回顶（1200）', accepts: '整数', example: 'z-index: var(--k-z-index-float-button)' },
  'z-index-mask': { name: '层级 遮罩', desc: '弹窗遮罩（1300）', accepts: '整数', example: 'z-index: var(--k-z-index-mask)' },
  'z-index-modal': { name: '层级 对话框', desc: 'Modal 层级（1400）', accepts: '整数', example: 'z-index: var(--k-z-index-modal)' },
  'z-index-drawer': { name: '层级 抽屉', desc: 'Drawer 层级（1400）', accepts: '整数', example: 'z-index: var(--k-z-index-drawer)' },
  'z-index-popover': { name: '层级 气泡', desc: 'Popover 层级（= popup）', accepts: '整数', example: 'z-index: var(--k-z-index-popover)' },
  'z-index-message': { name: '层级 消息', desc: '全局提示（1910）', accepts: '整数', example: 'z-index: var(--k-z-index-message)' },
  'z-index-notification': { name: '层级 通知', desc: '通知卡片（1990）', accepts: '整数', example: 'z-index: var(--k-z-index-notification)' },
  'size-icon-xs': { name: '图标 xs', desc: '小图标尺寸（14px）', accepts: '长度值', example: 'width: var(--k-size-icon-xs)' },
  'size-icon-sm': { name: '图标 sm', desc: '常规图标尺寸（16px）', accepts: '长度值', example: 'width: var(--k-size-icon-sm)' },
  'size-icon-md': { name: '图标 md', desc: '大图标尺寸（24px）', accepts: '长度值', example: 'width: var(--k-size-icon-md)' },
  'size-icon-lg': { name: '图标 lg', desc: '超大图标尺寸（32px）', accepts: '长度值', example: 'width: var(--k-size-icon-lg)' },
  'size-popup-base': { name: '弹层基准宽', desc: '双形态弹层宽度基准（520px；移动端 min(94vw, 680px)）', accepts: '长度值', example: 'width: var(--k-size-popup-base)' },
  'screen-sm': { name: '断点 sm', desc: '≥ 576px', accepts: '长度值（px）', example: 'breakpoints: { sm: 576 }' },
  'screen-md': { name: '断点 md', desc: '≥ 768px，也是移动端判定线', accepts: '长度值（px）', example: 'breakpoints: { md: 768 }' },
  'screen-lg': { name: '断点 lg', desc: '≥ 992px', accepts: '长度值（px）', example: 'breakpoints: { lg: 992 }' },
  'screen-xl': { name: '断点 xl', desc: '≥ 1200px', accepts: '长度值（px）', example: 'breakpoints: { xl: 1200 }' },
  'screen-xxl': { name: '断点 xxl', desc: '≥ 1600px', accepts: '长度值（px）', example: 'breakpoints: { xxl: 1600 }' },
  'padding-safe-top': { name: '安全区 上', desc: '刘海 / 状态栏安全区', accepts: 'env() 表达式', example: 'padding-top: var(--k-padding-safe-top)' },
  'padding-safe-bottom': { name: '安全区 下', desc: '底部手势条安全区', accepts: 'env() 表达式', example: 'padding-bottom: var(--k-padding-safe-bottom)' },
  'padding-safe-left': { name: '安全区 左', desc: '左挖孔 / 圆角安全区', accepts: 'env() 表达式', example: 'padding-left: var(--k-padding-safe-left)' },
  'padding-safe-right': { name: '安全区 右', desc: '右挖孔 / 圆角安全区', accepts: 'env() 表达式', example: 'padding-right: var(--k-padding-safe-right)' },
  'input-font-size': { name: '输入字号', desc: '输入类控件字号；移动端 16px 防 iOS 聚焦缩放', accepts: '长度值', example: 'font-size: var(--k-input-font-size)' },
}

const SCROLLBAR: Record<string, Meta> = {
  'scrollbar-size': { name: '滚动条粗细', desc: '自定义滚动条的宽 / 高', accepts: '长度值', example: '.k-scrollbar { --k-scrollbar-size: 4px; }' },
  'scrollbar-thumb': { name: '滚动条滑块', desc: '滑块颜色', accepts: '颜色值', example: '.k-scrollbar { --k-scrollbar-thumb: var(--k-color-fill-secondary); }' },
  'scrollbar-thumb-hover': { name: '滚动条滑块悬浮', desc: '滑块悬浮颜色', accepts: '颜色值', example: '.k-scrollbar { --k-scrollbar-thumb-hover: var(--k-color-fill); }' },
  'scrollbar-track': { name: '滚动条轨道', desc: '轨道颜色', accepts: '颜色值', example: '.k-scrollbar { --k-scrollbar-track: transparent; }' },
}

const FALLBACK: Record<string, Meta> = {
  default: { name: '主题 token', desc: '主题派生值', accepts: '—', example: '—' },
}

function mapColorToken(name: string): Meta | null {
  const rest = name.replace(/^color-/, '')
  const bases = Object.keys(COLOR_BASE).sort((a, b) => b.length - a.length)
  const base = bases.find(b => rest === b || rest.startsWith(`${b}-`))
  if (!base) return null
  const variant = rest.slice(base.length + (rest === base ? 0 : 1))
  const [variantName, variantDesc] = COLOR_VARIANT[variant] ?? ['派生', '语义色派生值']
  return {
    name: `${COLOR_BASE[base]}·${variantName}`,
    desc: variantDesc,
    accepts: '颜色值（可覆盖同名 alias 钉住）',
    example: colorExamples(`--k-color-${base}${variant ? `-${variant}` : ''}`),
  }
}

export function tokenMeta(token: string): Meta {
  const name = token.slice('--k-'.length)
  if (SEED[name]) return SEED[name]
  if (BASE[name]) return BASE[name]
  if (TEXT_FILL[name]) return TEXT_FILL[name]
  if (SURFACE[name]) return SURFACE[name]
  if (FONT[name]) return FONT[name]
  if (SCALE[name]) return SCALE[name]
  if (MOTION_Z[name]) return MOTION_Z[name]
  if (SCROLLBAR[name]) return SCROLLBAR[name]

  if (name.startsWith('gray-')) {
    const n = name.slice(5)
    return {
      name: `灰阶 ${n}`,
      desc: `中性灰阶 ${n}（text-base 混入 bg-base ${GRAY_PERCENT[n] ?? ''}%）`,
      accepts: '颜色值',
      example: `background: var(${token})`,
    }
  }
  if (name === 'neutral-tint') {
    return { name: '染色比例', desc: '中性色混入主色的比例（0 = 纯灰）', accepts: '0–1 数值', example: 'neutralTint: 0.02' }
  }
  if (name.startsWith('neutral-')) {
    const n = name.slice(8)
    return {
      name: `染色中性 ${n}`,
      desc: `灰阶 ${n} 混入主色（neutralTint）`,
      accepts: '颜色值',
      example: `background: var(${token})`,
    }
  }
  if (name === 'color-danger') {
    return { name: '错误色别名', desc: '与 color-error 同值，type="danger" 直读', accepts: '颜色值', example: 'color: var(--k-color-danger)' }
  }

  const headingSize = name.match(/^font-size-heading-(\d)$/)
  if (headingSize) {
    const n = headingSize[1]
    return {
      name: `${n} 级标题字号`,
      desc: `H${n} 字号（${HEADING_SIZE[n]}）`,
      accepts: '长度值',
      example: `font-size: var(${token})`,
    }
  }

  if (name === 'padding' || name === 'margin' || name.startsWith('padding-') || name.startsWith('margin-')) {
    if (name === 'padding-horizontal') return FALLBACK.default // 已在 SCALE 命中，防御
    const [, suffix = ''] = name.split(/-(.+)/)
    const value = SPACE_VALUE[suffix] ?? ''
    const isPadding = name.startsWith('padding')
    return {
      name: `${isPadding ? '内边距' : '外边距'} ${suffix || 'base'}`,
      desc: `${isPadding ? '内' : '外'}边距档${value ? `（${value}）` : ''}`,
      accepts: '长度值',
      example: `${isPadding ? 'padding' : 'margin'}: var(${token})`,
    }
  }

  if (name.startsWith('border-radius')) {
    const suffix = name.slice('border-radius'.length + 1)
    return {
      name: `圆角 ${suffix || 'base'}`,
      desc: `圆角档${RADIUS_VALUE[suffix] ? `（${RADIUS_VALUE[suffix]}）` : ''}`,
      accepts: '长度值',
      example: `border-radius: var(${token})`,
    }
  }

  if (name.startsWith('color-')) {
    const color = mapColorToken(name)
    if (color) return color
  }

  return FALLBACK.default
}

const DURATION_VALUE: Record<string, string> = { fast: '0.1s', mid: '0.2s', normal: '0.2s', slow: '0.3s', spin: '1s', wave: '0.6s' }
const Z_VALUE: Record<string, string> = {
  base: '0', divider: '1', segment: '2', affix: '10', 'popup-base': '1000', popup: '1500', dropdown: '1500',
  sticky: '1200', 'float-button': '1200', mask: '1300', modal: '1400', drawer: '1400', popover: '1500',
  message: '1910', notification: '1990',
}
const ICON_VALUE: Record<string, string> = { xs: '14px', sm: '16px', md: '24px', lg: '32px' }
const POPUP_ITEM_VALUE: Record<string, string> = { sm: '28px', '': '32px', lg: '36px' }

/** 供表格显示更友好的默认值（表达式类保留原值） */
export function displayDefault(token: string, raw: string): string {
  const name = token.slice('--k-'.length)
  if (name === 'size-step') return '4px'
  if (name.startsWith('size-') || name === 'size') {
    const suffix = name === 'size' ? '' : name.slice(5)
    if (suffix in SPACE_VALUE) return SPACE_VALUE[suffix]
  }
  if (name.startsWith('border-radius')) {
    const suffix = name.slice('border-radius'.length + 1)
    if (suffix in RADIUS_VALUE) return RADIUS_VALUE[suffix]
  }
  if (name.startsWith('control-height')) {
    const suffix = name.slice('control-height'.length + 1)
    if (suffix in CONTROL_HEIGHT_VALUE) return CONTROL_HEIGHT_VALUE[suffix]
  }
  if (name.startsWith('padding') || name.startsWith('margin')) {
    const suffix = name.split(/-(.+)/)[1] ?? ''
    if (suffix in SPACE_VALUE) return SPACE_VALUE[suffix]
  }
  if (name.startsWith('font-size-')) {
    const suffix = name.slice('font-size-'.length)
    if (suffix in FONT_SIZE_VALUE) return FONT_SIZE_VALUE[suffix]
  }
  if (name === 'font-size') return '14px'
  if (name === 'font-height') return '22px'
  if (name.startsWith('motion-duration-')) {
    const suffix = name.slice('motion-duration-'.length)
    if (suffix in DURATION_VALUE) return DURATION_VALUE[suffix]
  }
  if (name.startsWith('z-index-')) {
    const suffix = name.slice('z-index-'.length)
    if (suffix in Z_VALUE) return Z_VALUE[suffix]
  }
  if (name.startsWith('size-icon-')) {
    const suffix = name.slice('size-icon-'.length)
    if (suffix in ICON_VALUE) return ICON_VALUE[suffix]
  }
  if (name.startsWith('popup-item-height')) {
    const suffix = name.slice('popup-item-height'.length + 1)
    if (suffix in POPUP_ITEM_VALUE) return POPUP_ITEM_VALUE[suffix]
  }
  return raw
}

const CLASS_DESC: Record<string, [string, string]> = {
  'k-scrollbar': ['统一滚动条', '细轨、圆角滑块、悬浮加深'],
  'k-text-sm': ['小字号', '辅助文字字号（12px）'],
  'k-text-base': ['正文字号', '默认正文字号（14px）'],
  'k-text-lg': ['大字号', '强调正文字号（16px）'],
  'k-text-xl': ['超大字号', '页面内大标题字号（20px）'],
  'k-text-primary': ['主文本颜色', '正文主色'],
  'k-text-secondary': ['次级文本颜色', '次级说明文字'],
  'k-text-tertiary': ['三级文本颜色', '弱提示 / 占位文字'],
  'k-text-quaternary': ['四级文本颜色', '禁用态文字'],
  'k-text-success': ['成功色文本', '成功语义的文字色'],
  'k-text-warning': ['警告色文本', '警告语义的文字色'],
  'k-text-error': ['错误色文本', '错误语义的文字色'],
  'k-text-info': ['信息色文本', '信息语义的文字色'],
  'k-text-link': ['链接色文本', '链接语义的文字色'],
  'k-text-light': ['深底白字', '深色背景上的纯白文字'],
  'k-font-strong': ['强调字重', 'font-weight: 500'],
  'k-bg-container': ['容器背景', '卡片 / 内容容器底色'],
  'k-bg-elevated': ['浮层背景', '弹层 / 下拉等抬升表面底色'],
  'k-bg-layout': ['布局背景', '页面布局底色'],
  'k-bg-fill': ['常规填充', '常规填充底色'],
  'k-bg-fill-secondary': ['次级填充', '次级填充底色'],
  'k-bg-fill-tertiary': ['三级填充', '三级填充底色'],
  'k-border': ['边框', '1px 默认边框'],
  'k-rounded-none': ['无圆角', 'border-radius: 0'],
  'k-rounded-xs': ['极小圆角', '极小圆角（约 3px）'],
  'k-rounded-sm': ['小圆角', '小圆角（约 4.5px）'],
  'k-rounded': ['基础圆角', '组件默认圆角（6px）'],
  'k-rounded-lg': ['大圆角', '容器 / 卡片圆角（12px）'],
  'k-rounded-xl': ['超大圆角', '大容器圆角（18px）'],
  'k-rounded-full': ['全圆角', '胶囊 / 圆形（999px）'],
  'k-flex': ['弹性布局', 'display: flex'],
  'k-inline-flex': ['行内弹性布局', 'display: inline-flex'],
  'k-grid': ['网格布局', 'display: grid'],
  'k-block': ['块级元素', 'display: block'],
  'k-inline-block': ['行内块元素', 'display: inline-block'],
  'k-inline': ['行内元素', 'display: inline'],
  'k-hidden': ['隐藏元素', 'display: none !important'],
  'k-flex-row': ['主轴水平', 'flex-direction: row'],
  'k-flex-col': ['主轴垂直', 'flex-direction: column'],
  'k-flex-row-reverse': ['主轴水平反向', 'flex-direction: row-reverse'],
  'k-flex-col-reverse': ['主轴垂直反向', 'flex-direction: column-reverse'],
  'k-flex-wrap': ['允许换行', 'flex-wrap: wrap'],
  'k-flex-nowrap': ['禁止换行', 'flex-wrap: nowrap'],
  'k-flex-1': ['等分伸缩', 'flex: 1 1 0%'],
  'k-flex-auto': ['自动伸缩', 'flex: 1 1 auto'],
  'k-flex-none': ['不伸缩', 'flex: none'],
  'k-items-start': ['交叉轴起点对齐', 'align-items: flex-start'],
  'k-items-center': ['交叉轴居中', 'align-items: center'],
  'k-items-end': ['交叉轴终点对齐', 'align-items: flex-end'],
  'k-items-baseline': ['基线对齐', 'align-items: baseline'],
  'k-items-stretch': ['交叉轴拉伸', 'align-items: stretch'],
  'k-justify-start': ['主轴起点对齐', 'justify-content: flex-start'],
  'k-justify-center': ['主轴居中', 'justify-content: center'],
  'k-justify-end': ['主轴终点对齐', 'justify-content: flex-end'],
  'k-justify-between': ['主轴两端对齐', 'justify-content: space-between'],
  'k-self-start': ['单项靠起点', 'align-self: flex-start'],
  'k-self-center': ['单项居中', 'align-self: center'],
  'k-self-end': ['单项靠终点', 'align-self: flex-end'],
  'k-self-stretch': ['单项拉伸', 'align-self: stretch'],
  'k-min-w-0': ['允许收缩', 'min-width: 0，flex 子项防撑破'],
  'k-w-full': ['满宽', 'width: 100%'],
  'k-scrollbar-none': ['隐藏滚动条', '隐藏滚动条，仍可滚动'],
  'k-ellipsis': ['单行省略', '超长文本单行省略'],
  'k-ellipsis-2': ['两行省略', '超长文本两行省略'],
  'k-tabular-nums': ['等宽数字', '数字等宽对齐（tabular-nums）'],
}

export function classMeta(cls: string): Meta {
  if (CLASS_DESC[cls]) return { name: CLASS_DESC[cls][0], desc: CLASS_DESC[cls][1], accepts: '', example: `class="${cls}"` }

  const spacing = cls.match(/^k-(p|m|px|py|mx|my|pt|pr|pb|pl|mt|mr|mb|ml|gap|gap-x|gap-y)-(0|auto|xxs|xs|sm|md|lg|xl|xxl)$/)
  if (spacing) {
    const area: Record<string, string> = {
      p: '内边距', m: '外边距', px: '水平内边距', py: '垂直内边距', mx: '水平外边距', my: '垂直外边距',
      pt: '上内边距', pr: '右内边距', pb: '下内边距', pl: '左内边距',
      mt: '上外边距', mr: '右外边距', mb: '下外边距', ml: '左外边距',
      gap: '行列间距', 'gap-x': '列间距', 'gap-y': '行间距',
    }
    const value = spacing[2]
    const auto = value === 'auto'
    const px = SPACE_VALUE[value] ?? (value === '0' ? '0' : '')
    return {
      name: `${area[spacing[1]]} ${auto ? '自动' : value}`,
      desc: auto ? '自动外边距：用于居中或靠边' : `${area[spacing[1]]}${px ? `（${px}）` : '置 0'}`,
      accepts: '',
      example: `class="${cls}"`,
    }
  }

  return { name: '原子类', desc: '无 token 的原子类', accepts: '', example: `class="${cls}"` }
}