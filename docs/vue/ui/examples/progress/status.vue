<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <div v-for="item in rows" :key="item.label" class="row">
      <span class="name">{{ item.label }}</span>
      <KProgress :percent="item.percent" :status="item.status" />
    </div>
    <KFlex gap="lg" align="center" wrap style="margin-top: 8px">
      <KProgress type="circle" :percent="100" />
      <KProgress type="circle" :percent="72" status="exception" />
      <KProgress type="circle" size="sm" :percent="100" />
      <KProgress type="circle" size="lg" :percent="72" status="exception" />
      <KProgress type="dashboard" :percent="100" />
      <KProgress type="dashboard" :percent="72" status="exception" />
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import KProgress from 'kit/vue/ui/components/feedback/Progress/Progress.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const rows = [
  { label: '完成', percent: 100, status: 'success' },
  { label: '处理中', percent: 64, status: 'warning' },
  { label: '失败', percent: 72, status: 'exception' },
] as const
</script>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  align-items: center;
  gap: 16px;
}
.name {
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-tertiary);
}
</style>