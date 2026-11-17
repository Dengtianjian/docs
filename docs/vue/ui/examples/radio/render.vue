<script setup lang="ts">
import { h, ref } from 'vue'
import KRadio from 'kit/vue/ui/components/Radio/Radio.vue'
import KRadioGroup from 'kit/vue/ui/components/Radio/RadioGroup.vue'
import type { KRadioRenderScope } from 'kit/vue/ui/components/Radio/Radio.vue'

const plan = ref('pro')
const solo = ref<string | number | undefined>('b')

// render prop 通道：原生 radio 语义包 + change 逻辑包继承，卡片视觉自绘
const renderTile = (ctx: KRadioRenderScope) =>
  h('label', { ...ctx.rootAttrs, class: ['hl-radio-tile', ctx.checked && 'hl-radio-tile--on'] }, [
    h('input', { ...ctx.inputAttrs, class: 'hl-radio-tile__input', onChange: ctx.inputOn.change }),
    h('span', { class: 'hl-radio-tile__ring', 'aria-hidden': 'true' }),
    h('span', null, ctx.value === 'a' ? '方案 A' : '方案 B'),
  ])
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <!-- 组 headless：role=radiogroup 语义 + select/value 逻辑直消费 -->
    <KRadioGroup v-model="plan" :options="[{ label: '免费版', value: 'free' }, { label: '专业版', value: 'pro' }, { label: '旗舰版', value: 'max' }]">
      <template #render="ctx">
        <div v-bind="ctx.rootAttrs" class="hl-radio-plans">
          <button
            v-for="o in ctx.options"
            :key="String(o.value)"
            type="button"
            role="radio"
            :aria-checked="ctx.value === o.value"
            class="hl-radio-plan"
            :class="{ 'hl-radio-plan--on': ctx.value === o.value }"
            @click="ctx.select(o.value)"
          >
            <span class="hl-radio-plan__name">{{ o.label }}</span>
            <span class="hl-radio-plan__price">{{ o.value === 'free' ? '¥0' : o.value === 'pro' ? '¥29' : '¥99' }}/月</span>
          </button>
        </div>
      </template>
    </KRadioGroup>
    <span style="color: var(--k-color-text-tertiary); font-size: 13px">当前套餐 = {{ plan }}</span>

    <div style="display: flex; gap: 12px">
      <KRadio v-model="solo" value="a" :render="renderTile" />
      <KRadio v-model="solo" value="b" :render="renderTile" />
    </div>
  </div>
</template>

<!-- render prop 闭包产物在子组件作用域渲染，样式须全局（hl- 专属命名）或内联 -->
<style>
.hl-radio-plans {
  display: inline-flex;
  gap: 10px;
  flex-wrap: wrap;
}
.hl-radio-plan {
  display: inline-flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 18px;
  border: 1px solid var(--k-color-border);
  border-radius: 10px;
  background: var(--k-color-bg-container);
  color: var(--k-color-text);
  font: inherit;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.hl-radio-plan__name {
  font-weight: 600;
}
.hl-radio-plan__price {
  color: var(--k-color-text-tertiary);
  font-size: 12px;
}
.hl-radio-plan--on {
  border-color: var(--k-color-primary);
  box-shadow: 0 0 0 1px var(--k-color-primary);
}
.hl-radio-plan--on .hl-radio-plan__price {
  color: var(--k-color-primary);
}
.hl-radio-tile {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px dashed var(--k-color-border);
  border-radius: 8px;
  cursor: pointer;
}
.hl-radio-tile__input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
}
.hl-radio-tile__ring {
  width: 14px;
  height: 14px;
  border: 2px solid var(--k-color-border);
  border-radius: 50%;
  transition: border-color 0.2s, background 0.2s;
}
.hl-radio-tile--on {
  border-style: solid;
  border-color: var(--k-color-primary);
  color: var(--k-color-primary);
  font-weight: 600;
}
.hl-radio-tile--on .hl-radio-tile__ring {
  border-color: var(--k-color-primary);
  background: radial-gradient(circle, var(--k-color-primary) 0 4px, transparent 5px);
}
</style>