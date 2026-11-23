export type KComponentPlatform = 'pc' | 'mobile' | 'both'

/**
 * 组件文档端侧覆盖。未登记的组件默认双端可用。
 * 只登记例外，避免 120+ 条重复维护。
 */
const PLATFORM_OVERRIDES: Record<string, KComponentPlatform> = {
  // PC 交互依赖
  '/vue/ui/components/context-menu': 'pc',
  '/vue/ui/components/command-palette': 'pc',
  '/vue/ui/components/splitter': 'pc',
  '/vue/ui/components/transfer': 'pc',

  // 触屏 / 设备能力依赖
  '/vue/ui/components/navbar': 'mobile',
  '/vue/ui/components/tabbar': 'mobile',
  '/vue/ui/components/index-bar': 'mobile',
  '/vue/ui/components/side-bar': 'mobile',
  '/vue/ui/components/number-keyboard': 'mobile',
  '/vue/ui/components/safe-area': 'mobile',
  '/vue/ui/components/pull-to-refresh': 'mobile',
  '/vue/ui/components/swipe-cell': 'mobile',
  '/vue/ui/components/submit-bar': 'mobile',
  '/vue/ui/components/signature': 'mobile',
}

export function componentPlatform(link: string): KComponentPlatform {
  return PLATFORM_OVERRIDES[link] ?? 'both'
}