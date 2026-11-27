<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KProgress :percent="64">
      <template #content="{ percent }">
        <span class="slot-line">已传输 <strong>{{ percent }}%</strong></span>
      </template>
    </KProgress>
    <KFlex gap="lg" align="center" wrap>
      <KProgress type="circle" :percent="72">
        <template #content="{ percent }">
          <span class="slot-stack">
            <strong>{{ percent }}%</strong>
            <span class="slot-sub">已完成</span>
          </span>
        </template>
      </KProgress>
      <KProgress type="dashboard" :percent="45">
        <template #content="{ percent }">
          <span class="slot-line">配额 <strong>{{ percent }}%</strong></span>
        </template>
      </KProgress>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import KProgress from 'kit/vue/ui/components/feedback/Progress/Progress.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
</script>

<style scoped>
.slot-line {
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-secondary);
}
.slot-line strong {
  color: var(--k-color-text);
}
.slot-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2;
}
.slot-stack strong {
  font-size: 20px;
}
.slot-sub {
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-tertiary);
}
</style>