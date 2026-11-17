<script setup lang="ts">
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
</script>

<template>
  <!-- gap 解析逻辑随 rootAttrs 继承；justify/align 是状态，视觉自绘消费 -->
  <KFlex gap="lg" justify="between" align="center">
    <template #render="ctx">
      <div
        v-bind="ctx.rootAttrs"
        class="hl-flex-band"
        :style="{ justifyContent: ctx.justify === 'between' ? 'space-between' : undefined }"
      >
        <span class="hl-flex-band__cell">justify = {{ ctx.justify }}</span>
        <span class="hl-flex-band__cell">gap = {{ ctx.gap?.join(' / ') }}</span>
        <span class="hl-flex-band__cell">vertical = {{ ctx.vertical }}</span>
      </div>
    </template>
  </KFlex>
</template>

<style scoped>
.hl-flex-band {
  display: flex;
  align-items: center;
  gap: var(--k-flex-gap-row) var(--k-flex-gap-column);
  padding: 10px 14px;
  border-radius: 10px;
  background: var(--k-color-fill-quaternary);
}
.hl-flex-band__cell {
  padding: 4px 10px;
  border-radius: 6px;
  background: var(--k-color-bg-container);
  font-size: 12px;
  font-family: var(--k-font-family-code);
}
</style>