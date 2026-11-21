<template>
  <KChart
    type="bar"
    :categories="categories"
    :series="series"
    :height="280"
    :colors="['#4f8cff', '#22c55e', '#f97316']"
  />
</template>

<script setup lang="ts">
import KChart from 'kit/vue/ui/components/Chart/Chart.vue'

const categories = ['华东', '华南', '华北', '西南', '海外']
const series = [
  { name: '线上', data: [420, 360, 310, 220, 180] },
  { name: '线下', data: [260, 240, 210, 160, 120] },
  { name: '渠道', data: [140, 120, 96, 80, 60] },
]
</script>