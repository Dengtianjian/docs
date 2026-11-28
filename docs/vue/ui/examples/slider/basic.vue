<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KSlider v-model="single" :marks="marks" show-tooltip="always" />
    <KSlider v-model="range" range :marks="{ 0: '0', 50: '50', 100: '100' }" />
    <KSlider v-model="disabled" disabled :marks="{ 0: '0', 50: '50', 100: '100' }" />
    <div style="display: flex; gap: 48px; align-items: center; height: 220px">
      <KSlider v-model="vertical" vertical :marks="{ 0: '低', 50: '中', 100: '高' }" />
      <span style="color: var(--k-color-text-secondary)">单值：{{ single }} · 范围：{{ range.join(' - ') }}</span>
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSlider from 'kit/vue/ui/components/data-entry/Slider/Slider.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const single = ref(40)
const range = ref<[number, number]>([20, 70])
const disabled = ref(55)
const vertical = ref(60)
const marks = { 0: '0°C', 26: '26°C', 37: '37°C', 100: '100°C' }
</script>