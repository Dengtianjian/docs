<template>
  <KFlex wrap align="center">
    <KPopover
      v-for="size in sizes"
      :key="size"
      :size="size"
      :title="`${size} 卡片`"
      content="字号、内边距、标题与关闭钮随尺寸同步缩放。"
      closable
      trigger="click"
    >
      <template #trigger>
        <KButton :size="size">{{ size.toUpperCase() }}</KButton>
      </template>
    </KPopover>
  </KFlex>
</template>

<script setup lang="ts">
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KPopover from 'kit/vue/ui/components/Popover/Popover.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
import type { KPopoverSize } from 'kit/vue/ui'

const sizes: KPopoverSize[] = ['sm', 'md', 'lg']
</script>