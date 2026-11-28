<template>
  <KFlex gap="md" vertical style="width: 240px">
    <KDatePicker v-model="a" :min="min" :max="max" clearable placeholder="2026-11-05 ~ 11-25" />
    <KDatePicker v-model="b" :disabled-date="noWeekend" clearable placeholder="周末不可选" />
    <KDatePicker v-model="c" format="YYYY年M月D日" clearable placeholder="自定义展示格式" />
    <div style="font-size: 12px; color: #888">
      min/max 收时间戳或可解析字符串，按 picker 粒度比较；disabledDate 逐格判定（下钻到月/年层时按整月/整年判）。
      format 只改回显，值仍是时间戳。
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Dayjs } from 'dayjs'
import KDatePicker from 'kit/vue/ui/components/data-entry/DatePicker/DatePicker.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const a = ref<number | null>(null)
const b = ref<number | null>(null)
const c = ref<number | null>(null)

const min = '2026-11-05'
const max = '2026-11-25'
// 周末不可选（入参 = 当前面板粒度的周期起点）
const noWeekend = (d: Dayjs) => d.day() === 0 || d.day() === 6
</script>
