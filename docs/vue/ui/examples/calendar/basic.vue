<template>
  <KFlex :gap="20" wrap align="start">
    <KCalendar v-model="value" :markers="markers" @change="last = $event" />
    <div class="side">
      <div class="label">当前日期</div>
      <strong>{{ value }}</strong>
      <div class="label">最近选择</div>
      <span>{{ last || '（未选择）' }}</span>
      <div class="label">标记</div>
      <span>11 月 21 日有发布节点</span>
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KCalendar from 'kit/vue/ui/components/Calendar/Calendar.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const value = ref('2026-11-21')
const last = ref('')
const markers = [
  { date: '2026-11-21', color: 'var(--k-color-success)' },
  { date: '2026-11-26', color: 'var(--k-color-warning)' },
]
</script>

<style scoped>
.side {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: var(--k-font-size-sm);
}
.side strong {
  font-size: var(--k-font-size-lg);
}
.label {
  margin-top: 8px;
  color: var(--k-color-text-tertiary);
  font-size: 12px;
}
</style>