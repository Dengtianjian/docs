<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center">
    <KDatePicker v-model="value" clearable style="width: 260px" placeholder="试试输入 2026-12-01" />
    <KDatePicker v-model="readonlyValue" input-readonly style="width: 220px" placeholder="input-readonly（只读）" />
    <span style="font-size: 12px; color: var(--k-color-text-tertiary)">
      输入文本后 Enter 或失焦提交；也接受 2026/12/01；非法输入回退。
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from 'kit/vue/ui/components/DatePicker/DatePicker.vue'

const value = ref<number | null>(null)
const readonlyValue = ref<number | null>(null)
</script>