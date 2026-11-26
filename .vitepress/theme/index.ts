// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import KApp from 'kit/vue/ui/components/general/App/App.vue'
import Demo from './Demo.vue'
import CommonProps from './CommonProps.vue'
import MatrixPlayground from './MatrixPlayground.vue'
import ThemeControls from './ThemeControls.vue'
import 'kit/vue/ui/css/index.css'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    // 全站共用一份 KApp 上下文：实例 API（notification/message/modal）在演示间共享同一队列。
    // component=false 不包裹 DOM，避免影响 VitePress 自身排版。
    return h(KApp, { component: false }, {
      default: () =>
        h(DefaultTheme.Layout, null, {
          // https://vitepress.dev/guide/extending-default-theme#layout-slots
          'nav-bar-content-after': () => h(ThemeControls),
        }),
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('Demo', Demo)
    app.component('CommonProps', CommonProps)
    app.component('MatrixPlayground', MatrixPlayground)

    /* 表格文档拆页后，旧 API 锚点跳到对应分类页，避免外链落到已不存在的段落 */
    const legacyTableAnchors: Record<string, string> = {
      props: '/vue/ui/components/table/basic#api',
      ktablecolumn: '/vue/ui/components/table/columns#api',
      ktablerowselection: '/vue/ui/components/table/selection#api',
      slots: '/vue/ui/components/table/slots#api',
      events: '/vue/ui/components/table/basic#api',
      '注意事项': '/vue/ui/components/table/basic#注意事项',
    }
    const previousRouteChanged = router.onAfterRouteChanged
    router.onAfterRouteChanged = (to) => {
      previousRouteChanged?.(to)
      const [rawPath, rawHash] = to.split('#')
      const path = rawPath.replace(/\.html$/, '').replace(/\/$/, '')
      if (path !== '/vue/ui/components/table' || !rawHash) return
      const target = legacyTableAnchors[decodeURIComponent(rawHash)]
      if (target) setTimeout(() => router.go(target), 0)
    }
  }
} satisfies Theme
