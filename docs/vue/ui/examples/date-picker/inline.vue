<template>
  <div style="display: flex; gap: 24px; flex-wrap: wrap">
    <div>
      <KDatePicker v-model="date" inline clearable />
      <p style="margin: 8px 0 0; font-size: 12px; color: #888">inline 日期 · {{ date ?? '未选择' }}</p>
    </div>
    <div>
      <KDatePicker v-model="month" picker="month" inline />
      <p style="margin: 8px 0 0; font-size: 12px; color: #888">inline 月份 · {{ month ?? '未选择' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from 'kit/vue/ui/components/data-entry/DatePicker/DatePicker.vue'

const date = ref<number | null>(Date.now())
const month = ref<number | null>(null)
</script>
