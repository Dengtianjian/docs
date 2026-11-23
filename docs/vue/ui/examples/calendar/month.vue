<template>
  <KFlex :gap="20" wrap align="start">
    <KCalendar v-model="value" type="month" />
    <p class="tip">选择月份：{{ value }}</p>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KCalendar from 'kit/vue/ui/components/Calendar/Calendar.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const value = ref('2026-11')
</script>

<style scoped>
.tip {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>