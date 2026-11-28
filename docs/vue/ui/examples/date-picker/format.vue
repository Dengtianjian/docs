<template>
  <KFlex gap="md" vertical style="width: 260px">
    <KDatePicker v-model="slash" format="YYYY/MM/DD" clearable placeholder="YYYY/MM/DD" />
    <KDatePicker v-model="chinese" format="YYYY年M月D日" clearable placeholder="YYYY年M月D日" />
    <KDatePicker
      v-model="withTime"
      show-time
      :minute-step="5"
      format="YYYY/MM/DD HH:mm"
      clearable
      placeholder="YYYY/MM/DD HH:mm"
    />
    <div style="font-size: 12px; color: var(--k-color-text-tertiary)">
      format 只改变回显与手动输入的解析格式，v-model 始终是毫秒时间戳。
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from 'kit/vue/ui/components/data-entry/DatePicker/DatePicker.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const slash = ref<number | null>(null)
const chinese = ref<number | null>(null)
const withTime = ref<number | null>(null)
</script>