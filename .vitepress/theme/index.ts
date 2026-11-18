// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Demo from './Demo.vue'
import CommonProps from './CommonProps.vue'
import MatrixPlayground from './MatrixPlayground.vue'
import ThemeControls from './ThemeControls.vue'
import 'kit/vue/ui/css/index.css'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'nav-bar-content-after': () => h(ThemeControls),
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('Demo', Demo)
    app.component('CommonProps', CommonProps)
    app.component('MatrixPlayground', MatrixPlayground)
  }
} satisfies Theme
