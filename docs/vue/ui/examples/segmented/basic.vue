<template>
  <KFlex vertical gap="lg" align="start">
    <KSegmented v-model="value" :options="options" />
    <KFlex gap="lg" align="center">
      <KSegmented v-model="sizeValue" size="sm" :options="options" />
      <KSegmented v-model="sizeValue" size="lg" :options="options" />
    </KFlex>
    <p class="value">当前：{{ value }} / {{ sizeValue }}</p>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSegmented from 'kit/vue/ui/components/data-entry/Segmented/Segmented.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const options = [
  { label: '日', value: 'day' },
  { label: '周', value: 'week' },
  { label: '月', value: 'month' },
]
const value = ref('day')
const sizeValue = ref('week')
</script>

<style scoped>
.value {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>