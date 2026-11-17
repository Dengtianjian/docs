<script setup lang="ts">
import { h } from 'vue'
import KLink from 'kit/vue/ui/components/Link/Link.vue'
import type { KLinkRenderScope } from 'kit/vue/ui/components/Link/Link.vue'

// render prop 通道：external 的 href/target/rel 语义随 rootAttrs；自定义色三态变量随 colorVars
const renderPill = (ctx: KLinkRenderScope) =>
  h('a', { ...ctx.rootAttrs, class: 'hl-link-pill', style: ctx.colorVars }, [
    '外部文档',
    h('span', { class: 'hl-link-pill__arrow', 'aria-hidden': 'true' }, '↗'),
  ])
</script>

<template>
  <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap">
    <!-- #render 插槽通道：派生 tag（a）+ href 语义继承，下划线装饰自绘 -->
    <KLink href="https://example.com" underline="never">
      <template #render="ctx">
        <component :is="ctx.tag" v-bind="ctx.rootAttrs" class="hl-link-ink">
          <component :is="ctx.slots.default" />
          <span class="hl-link-ink__line" aria-hidden="true"></span>
        </component>
      </template>
      墨线链接
    </KLink>

    <KLink href="https://example.com" external color="#722ed1" :render="renderPill" />

    <!-- disabled → span 派生 + aria-disabled 继承 -->
    <KLink href="https://example.com" disabled>
      <template #render="ctx">
        <component :is="ctx.tag" v-bind="ctx.rootAttrs" class="hl-link-ink hl-link-ink--off">
          <component :is="ctx.slots.default" />
        </component>
      </template>
      禁用链接
    </KLink>
  </div>
</template>

<!-- render prop 闭包产物在子组件作用域渲染，样式须全局（hl- 专属命名）或内联 -->
<style>
/* 双类名抬特异度：宿主 .vp-doc a (0,1,1) 会压过单类名，同 KLink 基线的 :is(a) 路数 */
.hl-link-ink.hl-link-ink {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  color: var(--k-color-text);
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}
.hl-link-ink__line {
  height: 2px;
  margin-top: 2px;
  border-radius: 1px;
  background: linear-gradient(90deg, var(--k-color-primary), var(--k-color-warning));
  transform: scaleX(0.35);
  transform-origin: left;
  transition: transform 0.2s ease;
}
.hl-link-ink:hover .hl-link-ink__line {
  transform: scaleX(1);
}
.hl-link-ink--off {
  color: var(--k-color-text-quaternary);
  cursor: not-allowed;
}
.hl-link-pill.hl-link-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  background: color-mix(in oklab, var(--k-link-color, #722ed1) 12%, transparent);
  color: var(--k-link-color, #722ed1);
  font-weight: 600;
  text-decoration: none;
}
.hl-link-pill.hl-link-pill:hover {
  color: var(--k-link-color-hover);
  background: color-mix(in oklab, var(--k-link-color, #722ed1) 20%, transparent);
}
.hl-link-pill__arrow {
  font-size: 12px;
}
</style>