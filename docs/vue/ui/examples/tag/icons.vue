<template>
  <KFlex vertical gap="md">
    <KFlex align="center">
      <KTag v-for="item in icons" :key="item.name" :color="item.color" :icon="item.icon">
        {{ item.name }}
      </KTag>
    </KFlex>
    <KFlex align="center">
      <KTag
        v-for="item in positions"
        :key="item.position"
        color="primary"
        :icon="item.icon"
        :icon-position="item.position"
      >
        {{ item.position }}
      </KTag>
    </KFlex>
    <KFlex align="center">
      <KTag color="success" closable>
        <template #icon><CheckIcon /></template>
        插槽图标
      </KTag>
      <KTag color="#722ed1" variant="outlined" :icon="RefreshIcon" spin>自定义颜色 + spin</KTag>
      <KTag color="processing" size="lg" closable>processing 自动图标</KTag>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import KTag from 'kit/vue/ui/components/data-display/Tag/Tag.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { Component, VNode } from 'vue'
import type { KTagColor, KTagIconPosition } from 'kit/vue/ui'

function svg(children: VNode[]) {
  return defineComponent({
    setup() {
      return () =>
        h(
          'svg',
          {
            viewBox: '0 0 16 16',
            width: '1em',
            height: '1em',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': 1.6,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
          },
          children,
        )
    },
  })
}

const CheckIcon = svg([h('path', { d: 'M3.5 8.5 6.5 11.5 12.5 4.5' })])
const StarIcon = svg([
  h('path', { d: 'M8 2.5 9.7 6.1l3.8.5-2.8 2.7.7 3.9L8 11.4l-3.4 1.8.7-3.9L2.5 6.6l3.8-.5z' }),
])
const ClockIcon = svg([h('circle', { cx: 8, cy: 8, r: 5.5 }), h('path', { d: 'M8 4.8V8l2.2 1.4' })])
const InfoIcon = svg([h('circle', { cx: 8, cy: 8, r: 5.5 }), h('path', { d: 'M8 7.2v3.2' }), h('path', { d: 'M8 5.4v.1' })])
const WarnIcon = svg([
  h('path', { d: 'M8 2.8 13.5 12.8H2.5z' }),
  h('path', { d: 'M8 6.6v2.6' }),
  h('path', { d: 'M8 11v.1' }),
])
const CloseIcon = svg([h('path', { d: 'M4.5 4.5l7 7M11.5 4.5l-7 7' })])
const RefreshIcon = svg([h('path', { d: 'M13 8a5 5 0 1 1-1.5-3.6' }), h('path', { d: 'M13 3v3h-3' })])

const icons: { name: string; color: KTagColor; icon: Component }[] = [
  { name: '已完成', color: 'success', icon: CheckIcon },
  { name: '待处理', color: 'warning', icon: ClockIcon },
  { name: '提示', color: 'processing', icon: InfoIcon },
  { name: '风险', color: 'error', icon: WarnIcon },
  { name: '已收藏', color: '#fa8c16', icon: StarIcon },
  { name: '不可用', color: 'default', icon: CloseIcon },
]

const positions: { position: KTagIconPosition; icon: Component }[] = [
  { position: 'left', icon: CheckIcon },
  { position: 'right', icon: StarIcon },
  { position: 'top', icon: ClockIcon },
  { position: 'bottom', icon: InfoIcon },
]
</script>