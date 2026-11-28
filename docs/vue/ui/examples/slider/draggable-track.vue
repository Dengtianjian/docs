<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KSlider
      v-model="price"
      range
      draggable-track
      :min="0"
      :max="1000"
      :step="50"
      :marks="{ 0: '0', 250: '250', 500: '500', 750: '750', 1000: '1000' }"
      :tooltip-formatter="formatPrice"
      show-tooltip="always"
    />
    <span class="slider-route-text">拖动选中段整体平移（跨度不变）：{{ formatPrice(price[0]) }} - {{ formatPrice(price[1]) }}</span>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSlider from 'kit/vue/ui/components/data-entry/Slider/Slider.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const price = ref<[number, number]>([200, 800])

function formatPrice(value: number) {
  return `¥${value}`
}
</script>

<style scoped>
.slider-route-text {
  color: var(--k-color-text-secondary);
}
</style>