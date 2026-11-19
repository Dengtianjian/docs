<template>
  <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start">
    <!-- #render 插槽通道：separator 子项包装逻辑换成自绘菱形分隔，间距仍走 size 解析 -->
    <KSpace size="lg" separator>
      <template #render="ctx">
        <div v-bind="ctx.rootAttrs" class="hl-space-bar">
          <template v-for="(child, i) in ctx.children" :key="i">
            <span class="hl-space-bar__item"><component :is="child" /></span>
            <span v-if="i < ctx.children.length - 1" class="hl-space-bar__sep" aria-hidden="true">◆</span>
          </template>
        </div>
      </template>
      <KButton size="sm">复制</KButton>
      <KButton size="sm">粘贴</KButton>
      <KButton size="sm">删除</KButton>
    </KSpace>

    <KSpace size="md" :render="renderRow">
      <span>甲</span>
      <span>乙</span>
      <span>丙</span>
    </KSpace>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import type { KSpaceRenderScope } from 'kit/vue/ui/components/Space/Space.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'

// render prop 通道：间距变量随 rootAttrs 带走，display/方向自绘；children 已拍平
const renderRow = (ctx: KSpaceRenderScope) =>
  h(
    'div',
    { ...ctx.rootAttrs, class: 'hl-space-row' },
    ctx.children.map((child, i) => h('span', { key: i, class: 'hl-space-row__cell' }, [child])),
  )
</script>

<!-- render prop 闭包产物在子组件作用域渲染，样式须全局（hl- 专属命名）或内联 -->
<style>
.hl-space-bar {
  display: inline-flex;
  align-items: center;
  gap: var(--k-space-gap-row) var(--k-space-gap-column);
  padding: 8px 12px;
  border: 1px dashed var(--k-color-border);
  border-radius: 10px;
}
.hl-space-bar__item {
  display: inline-flex;
}
.hl-space-bar__sep {
  color: var(--k-color-warning);
  font-size: 10px;
}
.hl-space-row {
  display: flex;
  gap: var(--k-space-gap-row) var(--k-space-gap-column);
}
.hl-space-row__cell {
  padding: 4px 14px;
  border-radius: 999px;
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary);
  font-size: 13px;
}
</style>
