<template>
  <KFlex wrap gap="xs" style="max-width: 360px">
    <span
      v-for="tag in ['Vue 3.5', 'CSS-first', 'oklab', '双端', '@layer', '语义 DOM', '零构建', '按需导入']"
      :key="tag"
      style="padding: 2px 10px; border-radius: var(--k-border-radius-full, 999px); background: var(--k-color-primary-bg); color: var(--k-color-primary-text)"
    >{{ tag }}</span>
  </KFlex>
</template>

<script setup lang="ts">
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
</script>
