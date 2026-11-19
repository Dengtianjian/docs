<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from 'kit/vue/ui/components/DatePicker/DatePicker.vue'

const value = ref<number | null>(null)

function disabledTime() {
  return { disabledHours: [0, 1, 2, 3, 4, 5, 6, 7, 8] }
}
</script>

<template>
  <KDatePicker v-model="value" show-time :disabled-time="disabledTime" clearable style="max-width: 260px" />
  <p style="margin-top: 12px; font-size: 12px; color: var(--k-color-text-tertiary)">
    {{ value ? new Date(value).toLocaleString() : '未选择' }}
  </p>
</template>
