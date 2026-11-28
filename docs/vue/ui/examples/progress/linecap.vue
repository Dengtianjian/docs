<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <div v-for="item in caps" :key="item.value" class="row">
      <span class="name">{{ item.label }}</span>
      <KProgress :percent="60" :stroke-linecap="item.value" />
    </div>
    <div class="row">
      <span class="name">线宽 16</span>
      <KProgress :percent="60" :stroke-width="16" />
    </div>
    <div class="row">
      <span class="name">线宽 2</span>
      <KProgress :percent="60" :stroke-width="2" />
    </div>
    <KFlex gap="lg" align="center" wrap style="margin-top: 8px">
      <KProgress type="circle" :percent="60" stroke-linecap="round" />
      <KProgress type="circle" :percent="60" stroke-linecap="butt" />
      <KProgress type="circle" :percent="60" stroke-linecap="square" />
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import KProgress from 'kit/vue/ui/components/feedback/Progress/Progress.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const caps = [
  { value: 'round', label: '圆头' },
  { value: 'butt', label: '平头' },
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