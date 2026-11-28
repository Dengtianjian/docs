<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap">
      <!-- #render 插槽通道：隐藏原生 input 继承勾选逻辑，chip 视觉自绘 -->
      <KCheckbox v-model="solo">
        <template #render="ctx">
          <label v-bind="ctx.rootAttrs" class="hl-check-chip" :class="{ 'hl-check-chip--on': ctx.checked }">
            <input v-bind="ctx.inputAttrs" v-on="ctx.inputOn" class="hl-check-chip__input" />
            <span aria-hidden="true">{{ ctx.checked ? '◉' : '○' }}</span>
            <component :is="ctx.slots.default" />
          </label>
        </template>
        单件 chip（v-model = {{ solo }}）
      </KCheckbox>

      <KCheckbox :render="renderCard" />
    </div>

    <!-- 组 headless：options 归一化 + toggle/values 逻辑直消费，provide 注入照跑 -->
    <KCheckboxGroup v-model="picked" :options="['vue', 'react', 'svelte']">
      <template #render="ctx">
        <div v-bind="ctx.rootAttrs" class="hl-check-bar">
          <button
            v-for="o in ctx.options"
            :key="String(o.value)"
            type="button"
            class="hl-check-bar__seg"
            :class="{ 'hl-check-bar__seg--on': ctx.values.includes(o.value) }"
            :aria-pressed="ctx.values.includes(o.value)"
            @click="ctx.toggle(o.value, !ctx.values.includes(o.value))"
          >
            {{ o.label }}
          </button>
          <span class="hl-check-bar__echo">已选 {{ ctx.values.join(' / ') || '无' }}</span>
        </div>
      </template>
    </KCheckboxGroup>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import KCheckbox from 'kit/vue/ui/components/data-entry/Checkbox/Checkbox.vue'
import KCheckboxGroup from 'kit/vue/ui/components/data-entry/Checkbox/CheckboxGroup.vue'
import type { KCheckboxRenderScope } from 'kit/vue/ui/components/data-entry/Checkbox/Checkbox.vue'

const solo = ref(true)
const picked = ref<(string | number)[]>(['vue'])

// render prop 通道：原生 input 语义包 + change 逻辑包继承，卡片视觉自绘
const renderCard = (ctx: KCheckboxRenderScope) =>
  h('label', { ...ctx.rootAttrs, class: ['hl-check-card', ctx.checked && 'hl-check-card--on', ctx.disabled && 'hl-check-card--off'] }, [
    h('input', { ...ctx.inputAttrs, class: 'hl-check-card__input', onChange: ctx.inputOn.change }),
    h('span', { class: 'hl-check-card__mark', 'aria-hidden': 'true' }, ctx.checked ? '✓' : ''),
    h('span', null, ['组件库', h('small', null, 'kit / vue / ui')]),
  ])
</script>

<!-- render prop 闭包产物在子组件作用域渲染，样式须全局（hl- 专属命名）或内联 -->
<style>
.hl-check-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: 1px solid var(--k-color-border);
  border-radius: 999px;
  color: var(--k-color-text-secondary);
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}
.hl-check-chip__input,
.hl-check-card__input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
}
.hl-check-chip--on {
  border-color: var(--k-color-primary);
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary);
  font-weight: 600;
}
.hl-check-card {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border: 1px solid var(--k-color-border);
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.hl-check-card small {
  display: block;
  color: var(--k-color-text-tertiary);
  font-size: 11px;
}
.hl-check-card__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 1px solid var(--k-color-border);
  border-radius: 6px;
  color: var(--k-color-text-light-solid);
  font-size: 12px;
}
.hl-check-card--on {
  border-color: var(--k-color-primary);
  box-shadow: 0 0 0 1px var(--k-color-primary);
}
.hl-check-card--on .hl-check-card__mark {
  border-color: var(--k-color-primary);
  background: var(--k-color-primary);
}
.hl-check-card--off {
  opacity: 0.5;
  cursor: not-allowed;
}
.hl-check-bar {
  display: inline-flex;
  align-items: center;
  gap: 0;
  border: 1px solid var(--k-color-border);
  border-radius: 8px;
  overflow: hidden;
}
.hl-check-bar__seg {
  padding: 7px 16px;
  border: none;
  border-right: 1px solid var(--k-color-border);
  background: var(--k-color-bg-container);
  color: var(--k-color-text-secondary);
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}
.hl-check-bar__seg--on {
  background: var(--k-color-primary);
  color: var(--k-color-text-light-solid);
  font-weight: 600;
}
.hl-check-bar__echo {
  padding: 7px 14px;
  color: var(--k-color-text-tertiary);
  font-size: 12px;
}
</style>
