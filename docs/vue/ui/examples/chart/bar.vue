<template>
  <KChart
    type="bar"
    :series="series"
    :categories="categories"
    :height="260"
    :colors="['var(--k-color-primary)', 'var(--k-color-warning)']"
  />
</template>

<script setup lang="ts">
import KChart from 'kit/vue/ui/components/Chart/Chart.vue'

const categories = ['一月', '二月', '三月', '四月', '五月', '六月']
const series = [
  { name: '计划', data: [320, 420, 380, 510, 460, 580] },
  { name: '实际', data: [280, 390, 420, 470, 520, 610] },
]
</script>
