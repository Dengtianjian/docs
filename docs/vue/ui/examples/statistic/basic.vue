<template>
  <KSpace :size="32" wrap align="end">
    <KStatistic title="本月收入" :value="128456.78" :precision="2" prefix="¥" />
    <KStatistic title="订单量" :value="12849" suffix="单" size="sm" />
    <KStatistic title="转化率" :value="36.42" :precision="1" suffix="%" size="lg" />
    <KStatistic title="加载中" :value="0" loading />
  </KSpace>
</template>

<script setup lang="ts">
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KStatistic from 'kit/vue/ui/components/Statistic/Statistic.vue'
</script>