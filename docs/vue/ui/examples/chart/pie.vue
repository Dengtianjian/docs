<template>
  <div class="charts">
    <KChart type="pie" :data="pieData" :categories="labels" :height="240" />
    <KChart type="donut" :data="pieData" :categories="labels" :height="240" />
  </div>
</template>

<script setup lang="ts">
import KChart from 'kit/vue/ui/components/Chart/Chart.vue'

const labels = ['直接访问', '搜索引擎', '社交媒体', '外部链接']
const pieData = [335, 310, 234, 135]
</script>

<style scoped>
.charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}
</style>
