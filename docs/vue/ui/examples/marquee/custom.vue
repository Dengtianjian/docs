<template>
  <KMarquee :duration="22" :gap="56">
    <span v-for="item in notices" :key="item" class="notice">
      <span class="dot" />
      {{ item }}
    </span>
  </KMarquee>
</template>

<script setup lang="ts">
import KMarquee from 'kit/vue/ui/components/Marquee/Marquee.vue'

const notices = [
  '组件文档已补齐 P8',
  'KResolver 支持按需导入',
  '主题 token 支持亮暗两套',
  'DOM 回归测试 14 项通过',
]
</script>

<style scoped>
.notice {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-right: 28px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  white-space: nowrap;
}
.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--k-color-primary);
}
</style>