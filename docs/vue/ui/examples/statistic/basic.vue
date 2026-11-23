<template>
  <KFlex :gap="32" wrap align="end">
    <KStatistic title="本月收入" :value="128456.78" :precision="2" prefix="¥" />
    <KStatistic title="订单量" :value="12849" suffix="单" size="sm" />
    <KStatistic title="转化率" :value="36.42" :precision="1" suffix="%" size="lg" />
    <KStatistic title="加载中" :value="0" loading />
  </KFlex>
</template>

<script setup lang="ts">
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
import KStatistic from 'kit/vue/ui/components/Statistic/Statistic.vue'
</script>