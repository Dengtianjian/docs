<template>
  <KSpace direction="vertical" size="md" style="width: 100%">
    <KAlert
      v-for="size in sizes"
      :key="size"
      :size="size"
      :message="`${size} 提示标题`"
      description="字号、内边距、图标与关闭钮随尺寸同步缩放。"
      closable
    />
  </KSpace>
</template>

<script setup lang="ts">
import KAlert from 'kit/vue/ui/components/Alert/Alert.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import type { KAlertSize } from 'kit/vue/ui'

const sizes: KAlertSize[] = ['sm', 'md', 'lg']
</script>