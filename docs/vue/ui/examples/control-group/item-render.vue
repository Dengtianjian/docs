<template>
  <KFlex vertical gap="lg">
    <KControlGroup>
      <KControlGroupItem>
        <template #render="ctx">
          <span v-bind="ctx.rootAttrs" class="hl-cg-render__rate">
            <span class="hl-cg-render__tag">折扣</span>
            <strong>9.5</strong> 折
          </span>
        </template>
      </KControlGroupItem>
      <KInput v-model="code" placeholder="优惠码" style="width: 160px; flex: none" />
      <KButton type="primary">兑换</KButton>
    </KControlGroup>

    <KControlGroup>
      <KControlGroupItem :render="renderPoints" />
      <KControlGroupItem :render="renderTier" />
      <KControlGroupItem :render="renderDeadline" />
    </KControlGroup>
  </KFlex>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import KControlGroup from 'kit/vue/ui/components/data-entry/ControlGroup/ControlGroup.vue'
import KControlGroupItem from 'kit/vue/ui/components/data-entry/ControlGroup/ControlGroupItem.vue'
import type { KControlGroupItemRenderScope } from 'kit/vue/ui/components/data-entry/ControlGroup/ControlGroupItem.vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const code = ref('')

const renderPoints = (ctx: KControlGroupItemRenderScope) =>
  h('span', { ...ctx.rootAttrs, class: 'hl-cg-render__shell hl-cg-render__shell--points' }, [
    h('span', { class: 'hl-cg-render__label' }, '积分余额'),
    h('strong', { class: 'hl-cg-render__value' }, '2,480'),
  ])

const renderTier = (ctx: KControlGroupItemRenderScope) =>
  h('span', { ...ctx.rootAttrs, class: 'hl-cg-render__shell hl-cg-render__shell--tier' }, [
    h('span', { class: 'hl-cg-render__label' }, '会员等级'),
    h('strong', { class: 'hl-cg-render__value' }, 'V4'),
  ])

const renderDeadline = (ctx: KControlGroupItemRenderScope) =>
  h('span', { ...ctx.rootAttrs, class: 'hl-cg-render__shell hl-cg-render__shell--deadline' }, [
    h('span', { class: 'hl-cg-render__dot', 'aria-hidden': 'true' }),
    h('span', { class: 'hl-cg-render__label' }, '12 月 31 日前有效'),
  ])
</script>

<!-- headless 自绘产物在子组件作用域渲染，样式须全局（hl- 专属命名）或内联 -->
<style>
.hl-cg-render__rate {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: var(--k-control-height);
  padding: 0 14px;
  border: 1px solid var(--k-color-border);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-container);
  color: var(--k-color-text);
  font-size: var(--k-input-font-size, var(--k-font-size));
  white-space: nowrap;
}
.hl-cg-render__rate strong {
  color: var(--k-color-primary);
  font-variant-numeric: tabular-nums;
}
.hl-cg-render__tag {
  padding: 1px 6px;
  border-radius: var(--k-border-radius-xs);
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary);
  font-size: var(--k-font-size-sm, 12px);
}
.hl-cg-render__shell {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: var(--k-control-height);
  padding: 0 var(--k-padding);
  border: 1px solid var(--k-color-border);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-container);
  font-size: var(--k-input-font-size, var(--k-font-size));
  white-space: nowrap;
}
.hl-cg-render__label {
  color: var(--k-color-text-secondary);
}
.hl-cg-render__value {
  font-variant-numeric: tabular-nums;
}
.hl-cg-render__shell--points .hl-cg-render__value {
  color: var(--k-color-primary);
}
.hl-cg-render__shell--tier {
  background: var(--k-color-warning-bg);
  border-color: var(--k-color-warning-border);
}
.hl-cg-render__shell--tier .hl-cg-render__value {
  color: var(--k-color-warning-text-strong);
}
.hl-cg-render__shell--deadline {
  border-style: dashed;
}
.hl-cg-render__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--k-color-success);
}
</style>