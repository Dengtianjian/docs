<template>
  <div class="grid">
    <KStatistic title="总销售额" :value="1285600" prefix="¥" description="较上月增长 12.4%" />
    <KStatistic title="活跃用户" :value="8642" suffix="人" />
    <KStatistic title="转化率" :value="36.8" suffix="%" size="lg" />
  </div>
</template>

<script setup lang="ts">
import KStatistic from 'kit/vue/ui/components/Statistic/Statistic.vue'
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
}
</style>
