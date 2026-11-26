<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KProgress :percent="30" />
    <KProgress :percent="60" status="active" />
    <KProgress :percent="100" />
    <KProgress :percent="72" status="exception" :format="formatScore" />
    <KProgress :percent="45" :success-percent="25" />
  </KFlex>
</template>

<script setup lang="ts">
import KProgress from 'kit/vue/ui/components/feedback/Progress/Progress.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

function formatScore(percent: number) {
  return `${percent} 分`
}
</script>