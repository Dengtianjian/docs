<template>
  <div style="width: 100%; max-width: 460px">
    <KDateRangePicker v-model="range" show-time clearable />
    <p style="margin-top: 12px; font-size: 12px; color: var(--k-color-text-tertiary)">
      {{ range ? `${fmt(range[0])} → ${fmt(range[1])}` : '未选择' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDateRangePicker from 'kit/vue/ui/components/data-entry/DateRangePicker/DateRangePicker.vue'

const range = ref<[number, number] | null>(null)
const fmt = (ts?: number) => (ts ? new Date(ts).toLocaleString() : '')
</script>
