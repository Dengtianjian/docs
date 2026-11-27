<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KProgress :percent="30" />
    <KProgress :percent="60" status="active" />
    <KProgress :percent="100" />
    <KProgress :percent="72" status="exception" :format="formatScore" />
    <KProgress :percent="45" :success-percent="25" />
    <div class="labeled">
      <div class="labeled-head">
        <span class="labeled-title">2026 年度报告.pdf</span>
        <span class="labeled-sub">正在上传 · 12.6 MB</span>
      </div>
      <KProgress :percent="64" status="active" />
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import KProgress from 'kit/vue/ui/components/feedback/Progress/Progress.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

function formatScore(percent: number) {
  return `${percent} 分`
}
</script>

<style scoped>
.labeled-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}
.labeled-title {
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text);
}
.labeled-sub {
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-tertiary);
}
</style>