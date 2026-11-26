<template>
  <KDateRangePicker
    v-model="range"
    :min="min"
    :max="max"
    :disabled-date="disabledDate"
    clearable
    style="max-width: 380px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import KDateRangePicker from 'kit/vue/ui/components/data-entry/DateRangePicker/DateRangePicker.vue'

const range = ref<[number, number] | null>(null)
const min = dayjs().subtract(7, 'day').valueOf()
const max = dayjs().add(30, 'day').valueOf()

function disabledDate(date: dayjs.Dayjs) {
  return date.day() === 0 || date.day() === 6
}
</script>
