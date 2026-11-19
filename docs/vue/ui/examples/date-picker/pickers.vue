<template>
  <KSpace size="md" direction="vertical" style="width: 240px">
    <KSpace v-for="m in modes" :key="m" size="sm" align="center">
      <KDatePicker v-model="values[m]" :picker="m" clearable style="width: 240px" />
    </KSpace>
    <div style="font-size: 12px; color: #888">
      值统一为周期起点的毫秒时间戳：date=当日 0 点、week=周一 0 点、month/quarter/year=周期首日 0 点。
      周回显如「2026-47周」（周起点周一，跨年周按周属年）。
    </div>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from 'kit/vue/ui/components/DatePicker/DatePicker.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import type { KPickerMode } from 'kit/vue/ui/utils/date'

const modes: KPickerMode[] = ['date', 'week', 'month', 'quarter', 'year']
const values = ref<Record<KPickerMode, number | null>>({
  date: null,
  week: null,
  month: null,
  quarter: null,
  year: null,
})
</script>
