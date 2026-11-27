<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <div class="pos-row">
      <span class="pos-name">右侧（默认）</span>
      <KProgress :percent="60" />
    </div>
    <div class="pos-row">
      <span class="pos-name">左侧</span>
      <KProgress :percent="60" info-position="left" />
    </div>
    <div class="pos-row">
      <span class="pos-name">轨道内</span>
      <KProgress :percent="60" info-position="inside" />
    </div>
    <div class="pos-row">
      <span class="pos-name">上方</span>
      <KProgress :percent="60" info-position="top" />
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import KProgress from 'kit/vue/ui/components/feedback/Progress/Progress.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
</script>

<style scoped>
.pos-row {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr);
  align-items: center;
  gap: 16px;
}
.pos-name {
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-tertiary);
}
</style>