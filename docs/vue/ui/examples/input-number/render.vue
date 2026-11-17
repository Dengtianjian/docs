<script setup lang="ts">
import { h, ref } from 'vue'
import KInputNumber from 'kit/vue/ui/components/InputNumber/InputNumber.vue'
import type { KInputNumberRenderScope } from 'kit/vue/ui/components/InputNumber/InputNumber.vue'

const qty = ref<number | null>(3)
const temp = ref<number | null>(20)

// render prop 通道：文本态/落定/键盘步进逻辑包继承，温度计视觉自绘
const renderTemp = (ctx: KInputNumberRenderScope) =>
  h('span', { ...ctx.rootAttrs, class: 'hl-num-temp' }, [
    h('button', { type: 'button', class: 'hl-num-temp__btn', 'aria-label': '减少', onMousedown: (e: MouseEvent) => { e.preventDefault(); ctx.stepDown() } }, '−'),
    h('span', { class: 'hl-num-temp__read' }, [
      h('input', {
        value: ctx.text,
        class: 'hl-num-temp__input',
        inputmode: 'decimal',
        'aria-label': '温度',
        onInput: (e: Event) => ctx.setText((e.target as HTMLInputElement).value),
        onBlur: ctx.onBlur,
        onKeydown: ctx.onKeydown,
      }),
      h('span', { class: 'hl-num-temp__unit' }, '°C'),
    ]),
    h('button', { type: 'button', class: 'hl-num-temp__btn', 'aria-label': '增加', onMousedown: (e: MouseEvent) => { e.preventDefault(); ctx.stepUp() } }, '+'),
  ])
</script>

<template>
  <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap">
    <!-- #render 插槽通道：数量步进器，stepUp/stepDown/setText/onCommit 全逻辑继承 -->
    <KInputNumber v-model="qty" :min="0" :max="99">
      <template #render="ctx">
        <span v-bind="ctx.rootAttrs" class="hl-num-qty">
          <button type="button" class="hl-num-qty__btn" aria-label="减少" :disabled="!ctx.showStep" @mousedown.prevent="ctx.stepDown()">−</button>
          <input
            :value="ctx.text"
            class="hl-num-qty__input"
            inputmode="decimal"
            aria-label="数量"
            @input="ctx.setText(($event.target as HTMLInputElement).value)"
            @blur="ctx.onBlur($event)"
            @keydown="ctx.onKeydown($event)"
          />
          <button type="button" class="hl-num-qty__btn" aria-label="增加" :disabled="!ctx.showStep" @mousedown.prevent="ctx.stepUp()">+</button>
        </span>
      </template>
    </KInputNumber>
    <span style="color: var(--k-color-text-tertiary); font-size: 13px">数量 = {{ qty }}</span>

    <KInputNumber v-model="temp" :min="-10" :max="40" :step="0.5" :render="renderTemp" />
    <span style="color: var(--k-color-text-tertiary); font-size: 13px">温度 = {{ temp }}（step 0.5）</span>
  </div>
</template>

<!-- render prop 闭包产物在子组件作用域渲染，样式须全局（hl- 专属命名）或内联 -->
<style>
.hl-num-qty {
  display: inline-flex;
  align-items: stretch;
  border: 1px solid var(--k-color-border);
  border-radius: 8px;
  overflow: hidden;
}
.hl-num-qty__btn {
  width: 34px;
  border: none;
  background: var(--k-color-fill-tertiary);
  color: var(--k-color-text);
  font-size: 16px;
  cursor: pointer;
}
.hl-num-qty__btn:hover:not(:disabled) {
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary);
}
.hl-num-qty__btn:disabled {
  color: var(--k-color-text-quaternary);
  cursor: not-allowed;
}
.hl-num-qty__input {
  width: 56px;
  border: none;
  border-inline: 1px solid var(--k-color-border);
  outline: none;
  background: var(--k-color-bg-container);
  color: var(--k-color-text);
  font: inherit;
  text-align: center;
}
.hl-num-temp {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 999px;
  background: color-mix(in oklab, var(--k-color-info) 10%, transparent);
}
.hl-num-temp__btn {
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 50%;
  background: var(--k-color-bg-container);
  color: var(--k-color-info);
  font-size: 15px;
  cursor: pointer;
  box-shadow: var(--k-box-shadow-tertiary);
}
.hl-num-temp__btn:hover {
  background: var(--k-color-info);
  color: var(--k-color-text-light-solid);
}
.hl-num-temp__read {
  display: inline-flex;
  align-items: baseline;
  gap: 2px;
}
.hl-num-temp__input {
  width: 52px;
  border: none;
  outline: none;
  background: transparent;
  color: var(--k-color-text);
  font: inherit;
  font-weight: 700;
  text-align: right;
}
.hl-num-temp__unit {
  color: var(--k-color-text-tertiary);
  font-size: 12px;
}
</style>