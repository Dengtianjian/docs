<template>
  <KFlex vertical gap="lg">
    <KFlex gap="lg" align="start" wrap>
      <KCard v-for="item in variants" :key="item.value" :variant="item.value" :title="item.label" style="width: 220px">
        {{ item.desc }}
      </KCard>
    </KFlex>
    <KFlex gap="lg" align="start" wrap>
      <KCard v-for="item in sizes" :key="item" :size="item" :title="`size=${item}`" style="width: 220px">
        内边距与标题字号随尺寸变化。
      </KCard>
    </KFlex>
    <KCard hover-shadow variant="borderless" title="hoverShadow" style="width: 220px">
      悬浮时浮起阴影，0.2s 过渡。
    </KCard>
    <KCard title="内部卡片" style="width: 520px">
      <KCard inner variant="filled" title="嵌套卡片" extra="inner">
        inner 只缩小圆角与内边距，浅底来自 `variant="filled"`。
        <template #footer>inner 的页脚同样可用。</template>
      </KCard>
    </KCard>
  </KFlex>
</template>

<script setup lang="ts">
import KCard from 'kit/vue/ui/components/Card/Card.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
import type { KCardVariant } from 'kit/vue/ui'

const variants: { value: KCardVariant; label: string; desc: string }[] = [
  { value: 'outlined', label: 'outlined', desc: '描边（默认）' },
  { value: 'borderless', label: 'borderless', desc: '无边框，仅容器底色' },
  { value: 'filled', label: 'filled', desc: '浅底填充' },
  { value: 'elevated', label: 'elevated', desc: '阴影浮起' },
]
const sizes = ['sm', 'md', 'lg'] as const
</script>