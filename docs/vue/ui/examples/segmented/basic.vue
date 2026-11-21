<template>
  <KSpace direction="vertical" size="lg">
    <KSegmented v-model="value" :options="options" />
    <KSpace size="lg" align="center">
      <KSegmented v-model="sizeValue" size="sm" :options="options" />
      <KSegmented v-model="sizeValue" size="lg" :options="options" />
    </KSpace>
    <p class="value">当前：{{ value }} / {{ sizeValue }}</p>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSegmented from 'kit/vue/ui/components/Segmented/Segmented.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

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