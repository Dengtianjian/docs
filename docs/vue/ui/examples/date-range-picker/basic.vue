<script setup lang="ts">
import { ref } from 'vue'
import KDateRangePicker from 'kit/vue/ui/components/DateRangePicker/DateRangePicker.vue'

const range = ref<[number, number] | null>(null)
</script>

<template>
  <div style="width: 100%; max-width: 380px">
    <KDateRangePicker v-model="range" clearable />
    <p style="margin-top: 12px; font-size: 12px; color: var(--k-color-text-tertiary)">
      {{ range ? `${new Date(range[0]).toLocaleDateString()} → ${new Date(range[1]).toLocaleDateString()}` : '未选择' }}
    </p>
  </div>
</template>
