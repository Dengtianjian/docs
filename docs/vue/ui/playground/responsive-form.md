<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import { getSharedBreakpoint } from 'kit/vue/ui'

const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
const widths = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1600 }
const current = getSharedBreakpoint().current
const viewport = ref(0)
const simulated = ref(false)

function force(name) {
  current.value = name
  simulated.value = true
}

function resetToViewport() {
  let actual = 'xs'
  for (const name of breakpoints) {
    if (window.matchMedia(`(min-width: ${widths[name]}px)`).matches) actual = name
  }
  current.value = actual
  simulated.value = false
}

function onResize() {
  viewport.value = window.innerWidth
}

onMounted(() => {
  onResize()
  window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  resetToViewport()
})
</script>

# 响应式取值演示（临时页）

> 断点对象 / 字符串语法在五个试点组件上的联动演示：KForm、KButton、KRow、KSpace、KLayoutSider。实现与约定见 [响应式取值](../design/responsive-values.md)。

<div class="bp-toolbar">
  <span class="bp-toolbar__meta">
    视口 <b>{{ viewport }}px</b> · 当前断点 <code>{{ current }}</code>
    <em>{{ simulated ? '（模拟）' : '（实际）' }}</em>
  </span>
  <span class="bp-toolbar__buttons">
    <KButton
      v-for="name in breakpoints"
      :key="name"
      size="sm"
      :type="current === name ? 'primary' : 'default'"
      @click="force(name)"
    >{{ name }}</KButton>
    <KButton size="sm" @click="resetToViewport">恢复实际</KButton>
  </span>
</div>

<div class="responsive-bp-note">
断点：xs &lt; 576 ≤ sm &lt; 768 ≤ md &lt; 992 ≤ lg &lt; 1200 ≤ xl &lt; 1600 ≤ xxl。可点上方按钮模拟断点，或直接拖动浏览器窗口。
</div>

## KForm

`layout` / `labelWidth` / `labelAlign` / `colon` 四属性同时响应式；当前断点读数在演示内。

<Demo path="form/responsive-label" title="KForm 四属性响应式" desc="字符串写法：`layout=&quot;xs:vertical md:horizontal&quot;`、`labelWidth=&quot;xs:72 sm:88 md:100 lg:120&quot;`、`labelAlign=&quot;xs:left md:right&quot;`、`colon=&quot;xs:false md:true&quot;`。" />

对象写法等价：

```vue
<KForm
  :layout="{ xs: 'vertical', md: 'horizontal' }"
  :label-width="{ xs: 72, sm: 88, md: 100, lg: 120 }"
  :label-align="{ xs: 'left', md: 'right' }"
  :colon="{ xs: false, md: true }"
>
  ...
</KForm>
```

## KForm 对象写法

与上面字符串写法等价，类型完整，推荐业务使用（当前断点由顶部模拟器控制）。

<Demo path="form/responsive-label-object" title="KForm 四属性响应式（对象）" desc="`:layout=&quot;{ xs: 'vertical', md: 'horizontal' }&quot;` 等对象写法，与字符串解析结果一致。" />

## 业务组件：useResponsiveValue

props 之外的自由取值场景，直接用组合式函数：

```ts
import { useResponsiveValue } from 'kit/vue/ui'

const width = useResponsiveValue<number>(() => ({ xs: 140, md: 240, lg: 300 }))
const padding = useResponsiveValue<string>(() => 'xs:8px md:16px lg:24px')
```

<Demo path="responsive/composable" title="组合式函数取值" desc="卡片宽度/内边距走 useResponsiveValue；返回值为 ComputedRef，已按当前断点缓存。" />

## KButton

`size` 支持断点对象/字符串；KButtonGroup 的 `size` 同样可响应式，并下发给组内按钮（子级自传优先）。

<Demo path="button/responsive-size" title="按钮尺寸响应式" desc="单个按钮字符串/对象写法 + 按钮组统一下发；当前断点由顶部模拟器控制。" />

## KRow

列宽走 CSS 预生成断点 class；`gutter` 支持字符串/对象，二元组用逗号：`"xs:8,4 sm:12,8 md:16,12 lg:24,16"`。

<Demo path="grid/responsive" title="栅格响应式" desc="拖动窗口观察列宽与 gutter：gutter 为当前档定值，列宽仍由 CSS 断点 class 驱动。" />

## KSpace

`size` 支持 token 名、数字、二元组，以及断点对象/字符串。

<Demo path="space/responsive" title="间距响应式" desc="同时演示字符串与对象两种写法：`xs:8 md:sm lg:lg` 与 `{ xs: 'xs', md: 'md' }`。" />

## KLayoutSider

`width` 支持断点对象/字符串，宽度直接注入 `--k-layout-sider-width`。

<Demo path="layout/responsive-sider" title="Sider 宽度响应式" desc="`width=&quot;xs:140 sm:180 md:208&quot;`，窄屏收窄、宽屏恢复 208px。" />

## 低层工具

需要自己控制解析时机时，入口还导出 `parseResponsiveString` / `resolveResponsiveValue` / `isResponsiveString` / `isResponsiveMap`：

```ts
import { parseResponsiveString, resolveResponsiveValue } from 'kit/vue/ui'

parseResponsiveString('xs:8px md:16px', Number) // { xs: 8, md: 16 }
resolveResponsiveValue({ xs: 8, md: 16 }, 'md') // 16
```

## 约定

- 缺档按 mobile-first 向低档回退；低档全缺时回落到组件默认值。
- 只收常量：断点映射里不传函数、不传 ref；动态值在父层 `computed` 解出后传。
- 全库共享一套断点监听，组件实例增多不会增加 `matchMedia` 数量。
- KForm 的 `model` / `rules` 是数据源，不做断点解析。

<style>
.bp-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 16px 0 8px;
  padding: 12px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}
.bp-toolbar__meta { font-size: 13px; color: var(--vp-c-text-2); }
.bp-toolbar__meta em { font-style: normal; color: var(--vp-c-warning-1); }
.bp-toolbar__buttons { display: flex; flex-wrap: wrap; gap: 6px; }
.responsive-bp-note { margin: 0 0 16px; font-size: 12px; color: var(--vp-c-text-3); }
</style>
