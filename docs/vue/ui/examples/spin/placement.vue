<template>
  <KFlex vertical gap="lg">
    <KFlex gap="xl" wrap align="center">
      <KSpin v-for="p in placements" :key="p" :indicator-placement="p" :tip="label[p]" />
    </KFlex>
    <KFlex gap="xl" wrap align="center">
      <KSpin :percent="62" tip="上传中" indicator-placement="right" />
      <KSpin :percent="62" tip="上传中" indicator-placement="bottom" size="lg" />
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import KSpin from 'kit/vue/ui/components/Spin/Spin.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const placements = ['top', 'bottom', 'left', 'right'] as const
const label = { top: '上方', bottom: '下方', left: '左侧', right: '右侧' }
</script>