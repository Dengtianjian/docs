<template>
  <div style="max-width: 340px">
    <KDatePicker v-model="value" multiple clearable style="width: 100%" />
    <p style="margin: 8px 0 0; font-size: 12px; color: var(--k-color-text-tertiary)">
      已选 {{ value.length }} 天{{ value.length ? `：${[...value].sort((a, b) => a - b).map(fmt).join('、')}` : '' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from 'kit/vue/ui/components/DatePicker/DatePicker.vue'

const value = ref<number[]>([])
const fmt = (ts: number) => {
  const d = new Date(ts)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
</script>
