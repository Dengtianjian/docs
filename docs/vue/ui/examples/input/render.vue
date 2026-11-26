<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 420px">
    <!-- #render 插槽通道： underline 形态，focus 状态驱动自绘底线 -->
    <KInput v-model="name" placeholder="署名" clearable>
      <template #render="ctx">
        <span v-bind="ctx.rootAttrs" class="hl-input-ink" :class="{ 'hl-input-ink--focus': ctx.focused }">
          <input :ref="ctx.inputEl" v-bind="ctx.inputAttrs" v-on="ctx.inputOn" class="hl-input-ink__input" />
          <button
            v-if="ctx.showClear"
            type="button"
            class="hl-input-ink__clear"
            aria-label="清除"
            @mousedown.prevent="ctx.onClear()"
          >×</button>
          <span class="hl-input-ink__line" aria-hidden="true"></span>
        </span>
      </template>
    </KInput>
    <span style="color: var(--k-color-text-tertiary); font-size: 13px">v-model =「{{ name }}」</span>

    <KInput v-model="kw" placeholder="搜索" clearable :render="renderSearch" />
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'
import type { KInputRenderScope } from 'kit/vue/ui/components/data-entry/Input/Input.vue'

const name = ref('')
const kw = ref('kit')

// render prop 通道：原生 input 语义包 + input/focus/blur/change 逻辑包继承；清除动作直调 onClear
const renderSearch = (ctx: KInputRenderScope) =>
  h('span', { ...ctx.rootAttrs, class: ['hl-input-search', ctx.focused && 'hl-input-search--focus'] }, [
    h('span', { class: 'hl-input-search__lens', 'aria-hidden': 'true' }, '⌕'),
    h('input', {
      ...ctx.inputAttrs,
      ref: ctx.inputEl,
      class: 'hl-input-search__input',
      onInput: ctx.inputOn.input,
      onFocus: ctx.inputOn.focus,
      onBlur: ctx.inputOn.blur,
      onChange: ctx.inputOn.change,
    }),
    ctx.showClear
      ? h('button', { type: 'button', class: 'hl-input-search__clear', 'aria-label': '清除', onMousedown: (e: MouseEvent) => { e.preventDefault(); ctx.onClear() } }, '×')
      : null,
  ])
</script>

<!-- render prop 闭包产物在子组件作用域渲染，样式须全局（hl- 专属命名）或内联 -->
<style>
.hl-input-ink {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 2px;
}
.hl-input-ink__input {
  flex: auto;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--k-color-text);
  font: inherit;
}
.hl-input-ink__line {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--k-color-border);
  transition: background 0.2s;
}
.hl-input-ink--focus .hl-input-ink__line {
  background: linear-gradient(90deg, var(--k-color-primary), var(--k-color-info));
}
.hl-input-ink__clear,
.hl-input-search__clear {
  border: none;
  background: transparent;
  color: var(--k-color-text-quaternary);
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
}
.hl-input-ink__clear:hover,
.hl-input-search__clear:hover {
  color: var(--k-color-text);
}
.hl-input-search {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border: 1px solid var(--k-color-border);
  border-radius: 999px;
  background: var(--k-color-fill-tertiary);
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
}
.hl-input-search--focus {
  border-color: var(--k-color-primary);
  background: var(--k-color-bg-container);
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--k-color-primary) 18%, transparent);
}
.hl-input-search__lens {
  color: var(--k-color-text-tertiary);
  font-size: 16px;
}
.hl-input-search__input {
  flex: auto;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--k-color-text);
  font: inherit;
}
</style>
