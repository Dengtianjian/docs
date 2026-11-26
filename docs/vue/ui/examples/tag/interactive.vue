<template>
  <KFlex vertical gap="md">
    <p class="hint">
      只有加了 `clickable` 的标签才有交互：光标手型、悬停出现反馈、按下加深；反馈样式随 variant 变化（text 变体默认无底，悬停才出现浅底）。所有标签默认不可选中文字。
    </p>
    <KFlex align="center">
      <KTag v-for="item in presets" :key="item" :color="item" variant="text" clickable>{{ item }}</KTag>
    </KFlex>
    <KFlex align="center">
      <KTag color="primary" clickable>filled</KTag>
      <KTag color="primary" variant="outlined" clickable>outlined</KTag>
      <KTag color="primary" variant="dashed" clickable>dashed</KTag>
      <KTag color="primary" variant="borderless" clickable>borderless</KTag>
    </KFlex>
    <KFlex align="center">
      <KTag color="#722ed1" variant="text" clickable>#722ed1</KTag>
      <KTag color="#fa8c16" variant="text" clickable>#fa8c16</KTag>
      <KTag color="primary" variant="text" :icon="TagIcon" clickable>带图标</KTag>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import KTag from 'kit/vue/ui/components/data-display/Tag/Tag.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KTagPresetColor } from 'kit/vue/ui'

const presets: KTagPresetColor[] = ['default', 'processing', 'success', 'warning', 'error']

const TagIcon = defineComponent({
  setup() {
    return () =>
      h('svg', { viewBox: '0 0 16 16', width: '1em', height: '1em', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
        h('path', { d: 'M2.5 4.5h11v4l-4 4h-7z' }),
        h('circle', { cx: 5.6, cy: 7.6, r: 0.9 }),
      ])
  },
})
</script>

<style scoped>
.hint {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
</style>
