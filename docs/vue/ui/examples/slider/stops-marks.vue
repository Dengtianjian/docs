<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KSlider v-model="value" :stops="stops" :marks="marks" show-tooltip="always" />
    <span class="slider-marks-text">
      刻度每 10 一个，停靠点每 20 一个：当前 {{ value }}，只能停在 0 / 20 / 40 / 60 / 80 / 100
    </span>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSlider from 'kit/vue/ui/components/data-entry/Slider/Slider.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const value = ref(40)
const stops = Array.from({ length: 6 }, (_, i) => i * 20)
const marks = Object.fromEntries(Array.from({ length: 11 }, (_, i) => [i * 10, String(i * 10)]))
</script>

<style scoped>
.slider-marks-text {
  color: var(--k-color-text-secondary);
}
</style>