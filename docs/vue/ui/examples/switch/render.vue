<template>
  <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap">
    <!-- #render 插槽通道：方形闸刀，checked 状态驱动自绘 -->
    <KSwitch v-model="a" checked-children="ON" un-checked-children="OFF">
      <template #render="ctx">
        <button v-bind="ctx.rootAttrs" v-on="ctx.rootOn" class="hl-switch-gate" :class="{ 'hl-switch-gate--on': ctx.checked }">
          <span class="hl-switch-gate__label">{{ ctx.checked ? ctx.checkedChildren : ctx.unCheckedChildren }}</span>
          <span class="hl-switch-gate__lever" aria-hidden="true"></span>
        </button>
      </template>
    </KSwitch>
    <span style="color: var(--k-color-text-tertiary); font-size: 13px">v-model = {{ a }}</span>

    <KSwitch v-model="b" :render="renderLamp" />
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import KSwitch from 'kit/vue/ui/components/data-entry/Switch/Switch.vue'
import type { KSwitchRenderScope } from 'kit/vue/ui/components/data-entry/Switch/Switch.vue'

const a = ref(true)
const b = ref(false)

// render prop 通道：role=switch/aria-checked/disabled 语义随 rootAttrs，开合（含 loading 拦截）随 rootOn
const renderLamp = (ctx: KSwitchRenderScope) =>
  h(
    'button',
    {
      ...ctx.rootAttrs,
      class: ['hl-switch-lamp', ctx.checked && 'hl-switch-lamp--on'],
      onClick: ctx.rootOn.click,
      onKeydown: ctx.rootOn.keydown,
    },
    [
      h('span', { class: 'hl-switch-lamp__bulb', 'aria-hidden': 'true' }),
      h('span', null, ctx.checked ? '已点亮' : '已熄灭'),
    ],
  )
</script>

<!-- render prop 闭包产物在子组件作用域渲染，样式须全局（hl- 专属命名）或内联 -->
<style>
.hl-switch-gate {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  border: 1px solid var(--k-color-border);
  border-radius: 6px;
  background: var(--k-color-fill-tertiary);
  color: var(--k-color-text-secondary);
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.hl-switch-gate__lever {
  width: 10px;
  height: 22px;
  border-radius: 3px;
  background: var(--k-color-text-quaternary);
  transform: rotate(18deg);
  transition: transform 0.2s, background 0.2s;
}
.hl-switch-gate--on {
  border-color: var(--k-color-success);
  background: color-mix(in oklab, var(--k-color-success) 12%, transparent);
  color: var(--k-color-success);
}
.hl-switch-gate--on .hl-switch-gate__lever {
  background: var(--k-color-success);
  transform: rotate(-18deg);
}
.hl-switch-lamp {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border: 1px solid var(--k-color-border);
  border-radius: 999px;
  background: var(--k-color-bg-container);
  color: var(--k-color-text-tertiary);
  font: inherit;
  font-size: 13px;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}
.hl-switch-lamp__bulb {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--k-color-text-quaternary);
  transition: background 0.2s, box-shadow 0.2s;
}
.hl-switch-lamp--on {
  border-color: var(--k-color-warning);
  color: var(--k-color-text);
}
.hl-switch-lamp--on .hl-switch-lamp__bulb {
  background: var(--k-color-warning);
  box-shadow: 0 0 8px var(--k-color-warning);
}
</style>
