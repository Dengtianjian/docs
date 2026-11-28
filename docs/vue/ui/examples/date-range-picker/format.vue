<template>
  <KFlex gap="md" vertical style="width: 380px">
    <KDateRangePicker v-model="slash" format="YYYY/MM/DD" clearable />
    <KDateRangePicker v-model="chinese" format="YYYY年M月D日" clearable />
    <KDateRangePicker
      v-model="withTime"
      show-time
      format="YYYY/MM/DD HH:mm"
      clearable
    />
    <div style="font-size: 12px; color: var(--k-color-text-tertiary)">
      format 只改变回显，v-model 始终是毫秒时间戳；面板内的月份/星期文案不随 format 变化。
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDateRangePicker from 'kit/vue/ui/components/data-entry/DateRangePicker/DateRangePicker.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const slash = ref<[number, number] | null>(null)
const chinese = ref<[number, number] | null>(null)
const withTime = ref<[number, number] | null>(null)
</script>