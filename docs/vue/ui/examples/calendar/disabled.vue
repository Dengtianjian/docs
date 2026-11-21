<template>
  <KCalendar
    v-model="value"
    :fullscreen="false"
    :disabled-date="isWeekend"
    :min="min"
    :max="max"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KCalendar from 'kit/vue/ui/components/Calendar/Calendar.vue'

const DAY = 24 * 60 * 60 * 1000
const value = ref<number | null>(Date.now())
const min = Date.now() - 15 * DAY
const max = Date.now() + 45 * DAY
const isWeekend = (date: { day: () => number }) => date.day() === 0 || date.day() === 6

function onChange(value: number | null, info: { source: string }) {
  console.log('change', value, info.source)
}
</script>

<style scoped>
:deep(.k-calendar) {
  max-width: 380px;
}
</style>
