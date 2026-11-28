<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KSlider
      v-model="percent"
      :step="5"
      :marks="{ 0: '0%', 25: '25%', 50: '50%', 75: '75%', 100: '100%' }"
      :tooltip-formatter="formatPercent"
      show-tooltip="always"
    />
    <KSlider v-model="price" range :min="0" :max="1000" :step="50" :tooltip-formatter="formatPrice" />
    <span style="color: var(--k-color-text-secondary)">价格区间：{{ formatPrice(price[0]) }} - {{ formatPrice(price[1]) }}</span>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSlider from 'kit/vue/ui/components/data-entry/Slider/Slider.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const percent = ref(45)
const price = ref<[number, number]>([200, 800])
function formatPrice(value: number) {
  return `¥${value}`
}
function formatPercent(value: number) {
  return `${value}%`
}
</script>