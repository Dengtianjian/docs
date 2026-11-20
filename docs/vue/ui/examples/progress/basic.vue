<template>
  <KSpace direction="vertical" size="lg" style="width: 100%">
    <KProgress :percent="30" />
    <KProgress :percent="60" status="active" />
    <KProgress :percent="100" />
    <KProgress :percent="72" status="exception" :format="formatScore" />
    <KProgress :percent="45" :success-percent="25" />
  </KSpace>
</template>

<script setup lang="ts">
import KProgress from 'kit/vue/ui/components/Progress/Progress.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

function formatScore(percent: number) {
  return `${percent} 分`
}
</script>