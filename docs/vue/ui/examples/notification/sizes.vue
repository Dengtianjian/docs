<template>
  <KSpace wrap align="center">
    <KButton v-for="size in sizes" :key="size" :size="size" @click="show(size)">
      {{ size.toUpperCase() }}
    </KButton>
  </KSpace>
</template>

<script setup lang="ts">
import { useKApp } from 'kit/vue/ui/composables/useKApp'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import type { KNotificationSize } from 'kit/vue/ui'

const sizes: KNotificationSize[] = ['sm', 'md', 'lg']
const { notification } = useKApp()!

function show(size: KNotificationSize) {
  notification!.info({
    title: `${size} 尺寸通知`,
    description: '字号、边距、标题/描述与关闭钮同步缩放。',
    size,
    placement: 'topRight',
  })
}
</script>