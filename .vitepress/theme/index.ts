// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import KApp from 'kit/vue/ui/components/App/App.vue'
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
  }
} satisfies Theme
