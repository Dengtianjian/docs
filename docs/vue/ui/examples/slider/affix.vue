<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KSlider v-model="volume">
      <template #prefix><IconVolume size="18" /></template>
      <template #suffix><span class="slider-affix-text">{{ volume }}%</span></template>
    </KSlider>
    <div style="display: flex; gap: 48px; align-items: center; height: 220px">
      <KSlider v-model="zoom" vertical :marks="{ 0: '小', 100: '大' }">
        <template #prefix><IconZoomIn size="18" /></template>
        <template #suffix><IconZoomOut size="18" /></template>
      </KSlider>
      <span class="slider-affix-text">音量 {{ volume }}% · 缩放 {{ zoom }}%</span>
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconVolume, IconZoomIn, IconZoomOut } from '@tabler/icons-vue'
import KSlider from 'kit/vue/ui/components/data-entry/Slider/Slider.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const volume = ref(40)
const zoom = ref(60)
</script>

<style scoped>
.slider-affix-text {
  color: var(--k-color-text-secondary);
}
</style>