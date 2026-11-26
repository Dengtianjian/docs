<template>
  <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap">
    <!-- #render 插槽通道：票券形按钮，click 逻辑包继承（计数自证） -->
    <KButton type="primary">
      <template #render="ctx">
        <button v-bind="ctx.rootAttrs" v-on="ctx.rootOn" class="hl-btn-ticket" @click="count++">
          <span class="hl-btn-ticket__stub">ADMIT</span>
          <span class="hl-btn-ticket__body">点我 · {{ count }}</span>
        </button>
      </template>
    </KButton>

    <KButton :render="renderTag" @click="hits++" />
    <span style="color: var(--k-color-text-tertiary); font-size: 13px">render prop 点击 {{ hits }} 次</span>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import type { KButtonRenderScope } from 'kit/vue/ui/components/general/Button/Button.vue'

const count = ref(0)
const hits = ref(0)

// render prop 通道：type/href/disabled 语义随 rootAttrs，click（含 disabled/loading 拦截）随 rootOn
const renderTag = (ctx: KButtonRenderScope) =>
  h(
    ctx.tag,
    {
      ...ctx.rootAttrs,
      class: ['hl-btn-tag', ctx.disabled && 'hl-btn-tag--off'],
      onClick: ctx.rootOn.click,
    },
    [h('span', { class: 'hl-btn-tag__dot' }), '标签按钮'],
  )
</script>

<!-- render prop 闭包产物在子组件作用域渲染，样式须全局（hl- 专属命名）或内联 -->
<style>
.hl-btn-ticket {
  display: inline-flex;
  align-items: stretch;
  padding: 0;
  border: 1px dashed var(--k-color-primary);
  border-radius: 8px;
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary);
  font: inherit;
  cursor: pointer;
  overflow: hidden;
}
.hl-btn-ticket__stub {
  display: inline-flex;
  align-items: center;
  padding: 8px 10px;
  background: var(--k-color-primary);
  color: var(--k-color-text-light-solid);
  font-size: 11px;
  letter-spacing: 0.12em;
}
.hl-btn-ticket__body {
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  font-weight: 600;
}
.hl-btn-ticket:active .hl-btn-ticket__body {
  background: color-mix(in oklab, var(--k-color-primary) 14%, transparent);
}
.hl-btn-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: 1px solid var(--k-color-border);
  border-radius: 999px;
  background: var(--k-color-bg-container);
  color: var(--k-color-text);
  font: inherit;
  cursor: pointer;
}
.hl-btn-tag:hover {
  border-color: var(--k-color-primary);
  color: var(--k-color-primary);
}
.hl-btn-tag__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--k-color-success);
}
.hl-btn-tag--off {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
