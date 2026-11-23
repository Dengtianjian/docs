<template>
  <KFlex gap="lg" wrap>
    <KCard v-for="item in stats" :key="item.label" :title="item.label" size="sm" variant="filled" style="width: 180px">
      <div class="value">{{ item.value }}</div>
      <div class="trend" :class="{ 'is-up': item.up }">{{ item.trend }}</div>
    </KCard>
  </KFlex>
</template>

<script setup lang="ts">
import KCard from 'kit/vue/ui/components/Card/Card.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const stats = [
  { label: '访问量', value: '12,480', trend: '较上周 +8.2%', up: true },
  { label: '转化率', value: '3.6%', trend: '较上周 +0.4%', up: true },
  { label: '客单价', value: '¥ 268', trend: '较上周 -1.1%', up: false },
]
</script>

<style scoped>
.value {
  color: var(--k-color-text);
  font-size: 22px;
  font-weight: var(--k-font-weight-strong);
  line-height: 1.2;
}
.trend {
  margin-top: var(--k-size-xxs);
  color: var(--k-color-error);
  font-size: var(--k-font-size-sm);
}
.trend.is-up {
  color: var(--k-color-success);
}
</style>