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
import {
  IconAlertTriangle,
  IconCheck,
  IconClock,
  IconInfoCircle,
  IconRefresh,
  IconStar,
  IconX,
} from '@tabler/icons-vue'
import KTag from 'kit/vue/ui/components/data-display/Tag/Tag.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { Component } from 'vue'
import type { KTagColor, KTagIconPosition } from 'kit/vue/ui'

/** 图标收进 1em，跟随标签字号（Tabler 默认 24px 会顶满标签高度） */
function sized(icon: Component): Component {
  return defineComponent({
    setup() {
      return () => h(icon, { size: '1em' })
    },
  })
}

const CheckIcon = sized(IconCheck)
const StarIcon = sized(IconStar)
const ClockIcon = sized(IconClock)
const InfoIcon = sized(IconInfoCircle)
const WarnIcon = sized(IconAlertTriangle)
const CloseIcon = sized(IconX)
const RefreshIcon = sized(IconRefresh)

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