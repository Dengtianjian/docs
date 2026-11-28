<template>
  <div style="display: flex; gap: 16px; align-items: center">
    <!-- #render 插槽通道：label→role=img 语义继承，盒体视觉自绘 -->
    <KIcon :size="20" label="设置">
      <template #render="ctx">
        <span v-bind="ctx.rootAttrs" class="hl-icon-box"><Gear /></span>
      </template>
    </KIcon>

    <KIcon :size="20" label="加载中" spin :render="renderBadge" />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import KIcon from 'kit/vue/ui/components/general/Icon/Icon.vue'
import type { KIconRenderScope } from 'kit/vue/ui/components/general/Icon/Icon.vue'

const Gear = () =>
  h('svg', { viewBox: '0 0 24 24', width: '1em', height: '1em', fill: 'currentColor' }, [
    h('path', {
      d: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm9.4-2.6-1.9-.6a7.6 7.6 0 0 0-.6-1.5l.9-1.8a.8.8 0 0 0-.2-.9l-1.2-1.2a.8.8 0 0 0-.9-.2l-1.8.9a7.6 7.6 0 0 0-1.5-.6l-.6-1.9a.8.8 0 0 0-.8-.6h-1.6a.8.8 0 0 0-.8.6l-.6 1.9c-.5.15-1 .35-1.5.6l-1.8-.9a.8.8 0 0 0-.9.2L4.4 6.6a.8.8 0 0 0-.2.9l.9 1.8c-.25.5-.45 1-.6 1.5l-1.9.6a.8.8 0 0 0-.6.8v1.6c0 .35.25.7.6.8l1.9.6c.15.5.35 1 .6 1.5l-.9 1.8a.8.8 0 0 0 .2.9l1.2 1.2c.25.25.6.3.9.2l1.8-.9c.5.25 1 .45 1.5.6l.6 1.9c.1.35.45.6.8.6h1.6c.35 0 .7-.25.8-.6l.6-1.9c.5-.15 1-.35 1.5-.6l1.8.9c.3.1.65.05.9-.2l1.2-1.2a.8.8 0 0 0 .2-.9l-.9-1.8c.25-.5.45-1 .6-1.5l1.9-.6a.8.8 0 0 0 .6-.8v-1.6a.8.8 0 0 0-.6-.8Z',
    }),
  ])

// render prop 通道：aria 语义 + 数字 size 随 rootAttrs 继承；spin 动画自绘
const renderBadge = (ctx: KIconRenderScope) =>
  h('span', { ...ctx.rootAttrs, class: ['hl-icon-badge', ctx.spin && 'hl-icon-badge--spin'] }, [
    h(Gear),
  ])
</script>

<!-- render prop 闭包产物在子组件作用域渲染，样式须全局（hl- 专属命名）或内联 -->
<style>
.hl-icon-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary);
}
.hl-icon-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--k-color-warning-bg);
  color: var(--k-color-warning);
}
.hl-icon-badge--spin svg {
  animation: hl-icon-spin 1.2s linear infinite;
}
@keyframes hl-icon-spin {
  to { transform: rotate(360deg); }
}
</style>
