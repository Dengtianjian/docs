<template>
  <KFlex :gap="28" wrap align="start">
    <KChart
      type="pie"
      :categories="categories"
      :data="data"
      :height="260"
      :inner-radius="0.6"
      class="pie"
    />
    <KChart
      type="pie"
      :categories="categories"
      :data="data"
      :height="260"
      :inner-radius="0"
      :show-legend="false"
      class="pie"
    />
  </KFlex>
</template>

<script setup lang="ts">
import KChart from 'kit/vue/ui/components/data-display/Chart/Chart.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const categories = ['文档', '组件', '表格', '其他']
const data = [38, 32, 20, 10]
</script>

<style scoped>
.pie {
  width: 320px;
}
</style>