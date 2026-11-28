<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KProgress :percent="64" :show-track="false" />
    <KProgress type="steps" :percent="60" :steps="6" :show-track="false" />
    <KFlex gap="lg" align="center" wrap>
      <KProgress type="circle" :percent="70" :show-track="false" />
      <KProgress type="circle" :segments="10" :percent="70" :show-track="false" />
      <KProgress type="dashboard" :percent="55" :show-track="false" />
    </KFlex>
    <p class="hint">showTrack=false 时只保留已填充部分，未填充轨道透明，布局尺寸不变。</p>
  </KFlex>
</template>

<script setup lang="ts">
import KProgress from 'kit/vue/ui/components/feedback/Progress/Progress.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
</script>

<style scoped>
.hint {
  margin: 0;
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-tertiary);
}
</style>