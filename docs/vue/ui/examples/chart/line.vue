<template>
  <KChart
    type="line"
    :categories="categories"
    :series="series"
    smooth
    area
    :height="300"
    @point-click="last = $event"
  />
  <p class="tip">点击数据点：{{ last ? `${last.seriesName} / ${last.category} = ${last.value}` : '（未选择）' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KChart from 'kit/vue/ui/components/Chart/Chart.vue'

const last = ref<{ seriesName?: string; category: string; value: number } | null>(null)
const categories = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const series = [
  { name: '访问量', data: [320, 420, 380, 560, 610, 720, 680] },
  { name: '下单量', data: [80, 110, 96, 140, 168, 192, 180] },
]
</script>

<style scoped>
.tip {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>