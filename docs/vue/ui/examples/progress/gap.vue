<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KFlex gap="lg" align="center" wrap>
      <div v-for="pos in positions" :key="pos" class="gap-item">
        <KProgress type="circle" :percent="70" :gap-degree="90" :gap-position="pos" />
        <span class="name">{{ labels[pos] }}</span>
      </div>
    </KFlex>
    <KFlex gap="lg" align="center" wrap style="margin-top: 8px">
      <KProgress type="dashboard" :percent="60" />
      <KProgress type="dashboard" :percent="60" :gap-degree="120" gap-position="top" />
      <KProgress type="dashboard" :percent="60" :gap-degree="180" gap-position="left" />
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import KProgress from 'kit/vue/ui/components/feedback/Progress/Progress.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const positions = ['top', 'right', 'bottom', 'left'] as const
const labels = {
  top: '缺口在上',
  right: '缺口在右',
  bottom: '缺口在下',
  left: '缺口在左',
}
</script>

<style scoped>
.gap-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.name {
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-tertiary);
}
</style>