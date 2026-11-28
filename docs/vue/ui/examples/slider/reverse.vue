<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KSlider
      v-model="strength"
      reverse
      :marks="{ 0: '弱', 50: '中', 100: '强' }"
      show-tooltip="always"
    />
    <KSlider
      v-model="locked"
      disabled
      :marks="{ 0: '弱', 50: '中', 100: '强' }"
      show-tooltip="always"
    />
    <span class="slider-reverse-text">反向：{{ strength }} · 禁用：{{ locked }}</span>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSlider from 'kit/vue/ui/components/data-entry/Slider/Slider.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const strength = ref(30)
const locked = ref(65)
</script>

<style scoped>
.slider-reverse-text {
  color: var(--k-color-text-secondary);
}
</style>