<template>
  <KDateRangePicker v-model="range" :presets="presets" clearable style="width: 100%; max-width: 420px" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import KDateRangePicker from 'kit/vue/ui/components/data-entry/DateRangePicker/DateRangePicker.vue'

const start = dayjs().startOf('day').valueOf()
const end = dayjs().endOf('day').valueOf()
const range = ref<[number, number] | null>(null)

const presets = [
  { label: '近 7 天', value: [dayjs().subtract(6, 'day').startOf('day').valueOf(), end] },
  { label: '近 30 天', value: [dayjs().subtract(29, 'day').startOf('day').valueOf(), end] },
  { label: '本周', value: [dayjs().startOf('week').valueOf(), end] },
  { label: '本月', value: [dayjs().startOf('month').valueOf(), end] },
  { label: '上月', value: [dayjs().subtract(1, 'month').startOf('month').valueOf(), dayjs().subtract(1, 'month').endOf('month').valueOf()] },
  { label: '未来 30 天', value: [start, dayjs().add(29, 'day').endOf('day').valueOf()] },
]
</script>
