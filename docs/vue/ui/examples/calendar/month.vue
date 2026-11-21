<template>
  <KSpace :size="20" wrap align="start">
    <KCalendar v-model="value" type="month" />
    <p class="tip">选择月份：{{ value }}</p>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KCalendar from 'kit/vue/ui/components/Calendar/Calendar.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const value = ref('2026-11')
</script>

<style scoped>
.tip {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>