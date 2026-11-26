<template>
  <KFlex vertical gap="md">
    <KSegmented v-model="range" :options="ranges" />
    <p class="tip">当前：{{ range }}</p>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSegmented from 'kit/vue/ui/components/data-entry/Segmented/Segmented.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const range = ref('30d')
const ranges = [
  { label: '概览', value: 'overview' },
  { label: '最近 30 天', value: '30d' },
  { label: '自定义范围', value: 'custom' },
]
</script>

<style scoped>
.tip {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>