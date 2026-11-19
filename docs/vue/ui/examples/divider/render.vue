<template>
  <div style="max-width: 420px">
    <p style="margin: 0">上文：逻辑照跑，外观整件自绘。</p>

    <!-- #render 插槽通道：整件输出替换，默认线/文字结构不再渲染 -->
    <KDivider dashed orientation="start">
      <template #render="{ dashed, rootAttrs }">
        <div v-bind="rootAttrs" class="hl-gradient" :data-dashed="dashed || undefined">
          <span class="hl-gradient__label">渐变分割 · dashed={{ dashed }}</span>
        </div>
      </template>
    </KDivider>

    <p style="margin: 0">下文：同一组件，render prop 通道画另一种外观。</p>
    <KDivider :render="renderDots" />
    <p style="margin: 0">尾文。</p>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import KDivider from 'kit/vue/ui/components/Divider/Divider.vue'
import type { KDividerRenderScope } from 'kit/vue/ui/components/Divider/Divider.vue'

// render prop 通道：闭包收 scope，返回 h() 产物；rootAttrs 散播继承 separator 语义
const renderDots = ({ dashed, rootAttrs }: KDividerRenderScope) =>
  h('div', { ...rootAttrs, class: 'hl-dots', 'data-dashed': dashed || undefined }, [
    h('span', { class: 'hl-dots__dot' }),
    h('span', { class: 'hl-dots__line' }),
    h('span', { class: 'hl-dots__dot' }),
  ])
</script>

<!-- render prop 闭包产物在子组件作用域渲染，不带本 demo 的 scoped data-v，样式须全局（hl- 专属命名）或内联 -->
<style>
.hl-gradient {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px 0;
}
.hl-gradient::before,
.hl-gradient::after {
  content: '';
  flex: 1;
  height: 2px;
  border-radius: 1px;
  background: linear-gradient(90deg, transparent, var(--k-color-primary), transparent);
}
.hl-gradient[data-dashed]::before,
.hl-gradient[data-dashed]::after {
  background: repeating-linear-gradient(90deg, var(--k-color-primary) 0 6px, transparent 6px 12px);
  opacity: 0.6;
}
.hl-gradient__label {
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--k-color-primary);
}
.hl-dots {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 16px 0;
}
.hl-dots__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--k-color-warning);
}
.hl-dots__line {
  flex: 1;
  border-top: 1px solid var(--k-color-split);
}
</style>
