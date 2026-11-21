<template>
  <KScrollArea :height="220" aria-label="发布记录">
    <div class="log">
      <div v-for="item in logs" :key="item.time" class="log-row">
        <span class="time">{{ item.time }}</span>
        <span class="text">{{ item.text }}</span>
      </div>
    </div>
  </KScrollArea>
</template>

<script setup lang="ts">
import KScrollArea from 'kit/vue/ui/components/ScrollArea/ScrollArea.vue'

const logs = Array.from({ length: 18 }, (_, index) => ({
  time: `18:${String(index + 1).padStart(2, '0')}`,
  text: `构建任务 #${1200 + index} 已完成，产物校验通过`,
}))
</script>

<style scoped>
.log {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 14px;
}
.log-row {
  display: flex;
  gap: 12px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.time {
  flex: none;
  color: var(--k-color-text-tertiary);
  font-family: var(--k-font-family-mono);
}
</style>