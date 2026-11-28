<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KSlider
      v-model="volume"
      :stops="[0, 20, 50, 80, 100]"
      :marks="{ 0: '静音', 20: '20', 50: '50', 80: '80', 100: '100' }"
      show-tooltip="always"
    />
    <KSlider
      v-model="range"
      range
      :stops="[0, 25, 50, 75, 100]"
      :marks="{ 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }"
    />
    <span class="slider-stops-text">单值只能停在 0/20/50/80/100：{{ volume }} · 区间：{{ range.join(' - ') }}</span>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSlider from 'kit/vue/ui/components/data-entry/Slider/Slider.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const volume = ref(50)
const range = ref<[number, number]>([25, 75])
</script>

<style scoped>
.slider-stops-text {
  color: var(--k-color-text-secondary);
}
</style>