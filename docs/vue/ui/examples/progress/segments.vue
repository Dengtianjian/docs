<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <div class="row">
      <span class="name">5 段</span>
      <KProgress type="steps" :percent="60" :steps="5" />
    </div>
    <div class="row">
      <span class="name">8 段 / 间距 8</span>
      <KProgress type="steps" :percent="75" :steps="8" :steps-gap="8" />
    </div>
    <div class="row">
      <span class="name">12 段 / 小尺寸</span>
      <KProgress type="steps" :percent="80" :steps="12" :steps-gap="4" size="sm" />
    </div>
    <div class="row">
      <span class="name">完成</span>
      <KProgress type="steps" :percent="100" :steps="6" status="success" />
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import KProgress from 'kit/vue/ui/components/feedback/Progress/Progress.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
</script>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  align-items: center;
  gap: 16px;
}
.name {
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-tertiary);
}
</style>