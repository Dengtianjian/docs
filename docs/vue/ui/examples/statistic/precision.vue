<template>
  <div class="grid">
    <KStatistic title="金额（两位小数）" :value="12856.456" :precision="2" prefix="¥" />
    <KStatistic title="无分组" :value="9876543" :group-separator="''" />
    <KStatistic title="自定义分隔" :value="9876543.21" :precision="2" group-separator=" " decimal-separator="," />
    <KStatistic title="自定义格式" :value="0.862" :formatter="v => `${(Number(v) * 100).toFixed(1)}%`" />
  </div>
</template>

<script setup lang="ts">
import KStatistic from 'kit/vue/ui/components/Statistic/Statistic.vue'
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
</style>
