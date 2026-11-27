<template>
  <KFlex vertical gap="md">
    <KFlex>
      <KTag v-for="color in colors" :key="color" :color="color">#{{ color.slice(1) }}</KTag>
    </KFlex>
    <KFlex>
      <KTag v-for="variant in variants" :key="variant" color="#722ed1" :variant="variant">
        {{ variant }}
      </KTag>
    </KFlex>
    <KFlex>
      <KTag color="#722ed1" round size="lg" closable>紫色大号可关闭</KTag>
      <KTag color="warning" closable>预设与十六进制共用 color</KTag>
      <KTag color="#fa8c16" spin :icon="RefreshIcon">自定义图标 + spin</KTag>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import KTag from 'kit/vue/ui/components/data-display/Tag/Tag.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KTagVariant } from 'kit/vue/ui'

const colors = ['#1677ff', '#52c41a', '#faad14', '#ff4d4f', '#722ed1']
const variants: KTagVariant[] = ['filled', 'outlined', 'dashed', 'borderless']

const RefreshIcon = defineComponent({
  name: 'RefreshIcon',
  setup() {
    return () =>
      h('svg', { viewBox: '0 0 16 16', width: '1em', height: '1em', fill: 'none', stroke: 'currentColor', 'stroke-width': 1, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
        h('path', { d: 'M13 8a5 5 0 1 1-1.5-3.6' }),
        h('path', { d: 'M13 3v3h-3' }),
      ])
  },
})
</script>