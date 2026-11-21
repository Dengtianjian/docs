<template>
  <KChart
    type="line"
    :series="series"
    :categories="categories"
    :height="260"
    :value-formatter="v => `${v.toLocaleString('zh-CN')} 次`"
  />
</template>

<script setup lang="ts">
import KChart from 'kit/vue/ui/components/Chart/Chart.vue'

const categories = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const series = [
  { name: '访问量', data: [820, 932, 901, 934, 1290, 1330, 1320] },
  { name: '下单量', data: [220, 282, 291, 334, 390, 430, 410] },
]
</script>
