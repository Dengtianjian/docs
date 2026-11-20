<template>
  <main class="page">
    <header class="page__head">
      <h1>试点组件演示</h1>
      <div class="toolbar">
        <span class="toolbar__meta">
          视口 <b>{{ viewport }}px</b> · 断点 <code>{{ current }}</code>
          <em>{{ simulated ? '（模拟）' : '（实际）' }}</em>
        </span>
        <span class="toolbar__buttons">
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
    </header>

    <section class="section">
      <h2>KForm</h2>
      <KForm
        :model="model"
        layout="xs:vertical md:horizontal"
        label-width="xs:72 sm:88 md:100 lg:120"
        label-align="xs:left md:right"
        colon="xs:false md:true"
      >
        <KFormItem label="用户名" name="user">
          <KInput v-model="model.user" />
        </KFormItem>
        <KFormItem label="邮箱" name="mail">
          <KInput v-model="model.mail" placeholder="拖动窗口观察布局/标签宽/对齐/冒号" />
        </KFormItem>
      </KForm>
    </section>

    <section class="section">
      <h2>KButton</h2>
      <KSpace wrap align="center">
        <KButton type="primary" size="xs:xs sm:sm md:md lg:lg">字符串 size</KButton>
        <KButton :size="{ xs: 'xs', md: 'sm', lg: 'lg' }">对象 size</KButton>
        <KButtonGroup size="xs:xs md:md lg:lg">
          <KButton>左</KButton>
          <KButton>中</KButton>
          <KButton>右</KButton>
        </KButtonGroup>
      </KSpace>
    </section>

    <section class="section">
      <h2>KRow</h2>
      <p class="section__hint">列宽由 CSS 媒体查询跟随真实视口，模拟器只影响 gutter；拖动窗口看列宽换行。</p>
      <KRow gutter="xs:8,4 sm:12,8 md:16,12 lg:24,16">
        <KCol v-for="i in 4" :key="i" :span="{ xs: 24, sm: 12, md: 8, lg: 6 }">
          <div class="cell">xs24 / sm12 / md8 / lg6</div>
        </KCol>
      </KRow>
    </section>

    <section class="section">
      <h2>KSpace</h2>
      <div class="stack">
        <KSpace size="xs:8 md:sm lg:lg" wrap>
          <KButton v-for="i in 6" :key="i">字符串 {{ i }}</KButton>
        </KSpace>
        <KSpace :size="{ xs: 'xs', md: 'md' }" wrap>
          <KButton v-for="i in 6" :key="i">对象 {{ i }}</KButton>
        </KSpace>
      </div>
    </section>

    <section class="section">
      <h2>KLayoutSider</h2>
      <KLayout has-sider class="sider-layout">
        <KLayoutSider width="xs:140 sm:180 md:208">Sider</KLayoutSider>
        <KLayoutContent>断点宽度</KLayoutContent>
      </KLayout>
    </section>

    <section class="section">
      <h2>断点变色</h2>
      <p class="section__hint">颜色同样按断点取常量：左为字符串写法，右为对象写法，悬停无特殊效果，只随断点切换。</p>
      <div class="swatches">
        <div class="swatch" :style="{ background: swatch }">
          <strong>字符串</strong>
          <span>{{ swatch }}</span>
        </div>
        <div class="swatch" :style="{ background: swatchObject }">
          <strong>对象</strong>
          <span>{{ swatchObject }}</span>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>useResponsiveValue</h2>
      <div
        class="composable-card"
        :style="{ width: width ? `${width}px` : undefined, padding }"
      >
        <strong>width {{ width ?? '—' }}px</strong>
        <span>padding {{ padding ?? '—' }}</span>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KButtonGroup from 'kit/vue/ui/components/Button/ButtonGroup.vue'
import KForm from 'kit/vue/ui/components/Form/Form.vue'
import KFormItem from 'kit/vue/ui/components/Form/FormItem.vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KRow from 'kit/vue/ui/components/Grid/Row.vue'
import KCol from 'kit/vue/ui/components/Grid/Col.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KLayout from 'kit/vue/ui/components/Layout/Layout.vue'
import KLayoutSider from 'kit/vue/ui/components/Layout/Sider.vue'
import KLayoutContent from 'kit/vue/ui/components/Layout/Content.vue'
import { getSharedBreakpoint, useResponsiveValue } from 'kit/vue/ui'

const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const
const widths: Record<(typeof breakpoints)[number], number> = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1600 }
const current = getSharedBreakpoint().current
const viewport = ref(0)
const simulated = ref(false)

const model = reactive<Record<string, unknown>>({ user: '', mail: '' })

const width = useResponsiveValue<number>(() => ({ xs: 140, sm: 180, md: 240, lg: 300, xl: 340 }))
const padding = useResponsiveValue<string>(() => 'xs:8px sm:12px md:16px lg:24px')

const swatch = useResponsiveValue<string>(
  () => 'xs:#e5484d sm:#f76b15 md:#d97706 lg:#18794e xl:#0d74ce xxl:#7c3aed',
)
const swatchObject = useResponsiveValue<string>(
  () => ({ xs: '#7c3aed', sm: '#0d74ce', md: '#18794e', lg: '#d97706', xl: '#f76b15', xxl: '#e5484d' }),
)

function force(name: (typeof breakpoints)[number]) {
  current.value = name
  simulated.value = true
}

function resetToViewport() {
  let actual: (typeof breakpoints)[number] = 'xs'
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

<style scoped>
.page {
  box-sizing: border-box;
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 24px 64px;
}
.page__head h1 {
  margin: 0 0 16px;
  font-size: 22px;
  font-weight: 600;
}
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid var(--k-color-border, #e5e5e5);
  border-radius: 8px;
  background: var(--k-color-bg-container, #fff);
}
.toolbar__meta {
  font-size: 13px;
  color: var(--k-color-text-secondary, #666);
}
.toolbar__meta em {
  font-style: normal;
  color: var(--k-color-warning, #d97706);
}
.toolbar__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.section {
  margin-top: 32px;
  padding: 20px;
  border: 1px solid var(--k-color-border, #e5e5e5);
  border-radius: 8px;
  background: var(--k-color-bg-container, #fff);
}
.section h2 {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 600;
}
.section h2:has(+ .section__hint) {
  margin-bottom: 4px;
}
.section__hint {
  margin: 0 0 16px;
  font-size: 12px;
  color: var(--k-color-text-secondary, #666);
}
.cell {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 12px;
  color: #fff;
  background: var(--k-color-primary, #1677ff);
  border-radius: var(--k-border-radius, 6px);
}
.stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.sider-layout {
  height: 180px;
  overflow: hidden;
  border-radius: var(--k-border-radius, 6px);
}
.sider-layout :deep(.k-layout-sider) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  background: var(--k-color-primary-bg, #e6f4ff);
}
.sider-layout :deep(.k-layout-content) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  background: var(--k-color-bg-container, #fff);
}
.swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.swatch {
  box-sizing: border-box;
  flex: 1 1 200px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  border-radius: 8px;
  color: #fff;
  font-size: 12px;
  transition: background-color 0.2s ease;
}
.swatch strong {
  font-size: 14px;
}
.swatch span {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  opacity: 0.85;
}
.composable-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-sizing: border-box;
  border: 1px solid var(--k-color-primary, #1677ff);
  border-radius: var(--k-border-radius, 6px);
  background: var(--k-color-primary-bg, #e6f4ff);
  font-size: 12px;
  transition: width 0.2s ease, padding 0.2s ease;
}
</style>