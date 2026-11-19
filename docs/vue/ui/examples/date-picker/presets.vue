<template>
  <KDatePicker v-model="value" :presets="presets" clearable style="max-width: 260px" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from 'kit/vue/ui/components/DatePicker/DatePicker.vue'
import type { KDatePickerPreset } from 'kit/vue/ui/components/DatePicker/DatePicker.vue'

const DAY = 24 * 60 * 60 * 1000
const presets: KDatePickerPreset[] = [
  { label: '今天', value: Date.now() },
  { label: '7 天后', value: Date.now() + 7 * DAY },
  { label: '30 天后', value: Date.now() + 30 * DAY },
]

const value = ref<number | null>(null)
</script>
