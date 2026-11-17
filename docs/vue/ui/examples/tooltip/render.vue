<script setup lang="ts">
import { h, Teleport } from 'vue'
import KTooltip from 'kit/vue/ui/components/Tooltip/Tooltip.vue'
import type { KTooltipRenderScope } from 'kit/vue/ui/components/Tooltip/Tooltip.vue'
import { onProps } from 'kit/vue/ui/composables/useCustomRender'

// render prop 通道：h() 里事件包要 onProps() 转成 onXxx 键（模板 v-on 直接散播）
const renderMono = (ctx: KTooltipRenderScope) => [
  h(
    'button',
    { ref: ctx.triggerEl, ...ctx.triggerAttrs, ...onProps(ctx.triggerOn), class: 'hl-tip-btn', type: 'button' },
    'render prop 通道',
  ),
  h(
    Teleport,
    { to: ctx.teleportTarget },
    ctx.visible
      ? [h('div', { ref: ctx.popupEl, ...ctx.popupAttrs, ...onProps(ctx.popupOn), class: 'hl-bubble hl-bubble--mono' }, String(ctx.content ?? ''))]
      : [],
  ),
]
</script>

<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap">
    <!-- #render 插槽通道：触发器与气泡都自绘；ref/attrs/on 散播后延迟、定位、翻转、主题逻辑照跑 -->
    <KTooltip placement="top" content="定位 / 延迟 / 主题逻辑全部继承">
      <template #render="ctx">
        <button
          :ref="ctx.triggerEl"
          v-bind="ctx.triggerAttrs"
          v-on="ctx.triggerOn"
          class="hl-tip-btn hl-tip-btn--accent"
          type="button"
        >
          悬停看自定义气泡
        </button>
        <Teleport :to="ctx.teleportTarget">
          <div v-if="ctx.visible" :ref="ctx.popupEl" v-bind="ctx.popupAttrs" v-on="ctx.popupOn" class="hl-bubble">
            <span class="hl-bubble__star" aria-hidden="true">✦</span>
            {{ ctx.content }}
          </div>
        </Teleport>
      </template>
    </KTooltip>

    <KTooltip placement="bottom" content="h() 闭包画的气泡" :render="renderMono" />
  </div>
</template>

<!-- render prop 闭包产物在子组件作用域渲染，不带本 demo 的 scoped data-v，样式须全局（hl- 专属命名）或内联 -->
<style>
.hl-tip-btn {
  padding: 6px 14px;
  border: 1px solid var(--k-color-border);
  border-radius: 999px;
  background: var(--k-color-bg-container);
  color: var(--k-color-text);
  font-size: 13px;
  cursor: pointer;
}
.hl-tip-btn--accent {
  border-color: var(--k-color-primary);
  color: var(--k-color-primary);
}
.hl-bubble {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--k-color-primary), var(--k-color-info, #2f54eb));
  color: #fff;
  font-size: 13px;
  box-shadow: 0 6px 20px rgb(0 0 0 / 0.18);
}
.hl-bubble--mono {
  background: var(--k-color-text);
  color: var(--k-color-bg-container);
  border-radius: 4px;
}
.hl-bubble__star {
  color: #ffd666;
}
</style>