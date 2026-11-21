<template>
  <KScrollArea horizontal shadow aria-label="横向标签">
    <div class="tags">
      <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </KScrollArea>
</template>

<script setup lang="ts">
import KScrollArea from 'kit/vue/ui/components/ScrollArea/ScrollArea.vue'

const tags = [
  '设计系统', '组件库', 'Vue 3', 'TypeScript', '可访问性',
  '主题 token', '暗色模式', '响应式', '测试回归', '文档站',
  '按需导入', 'SSR',
]
</script>

<style scoped>
.tags {
  display: flex;
  gap: 8px;
  padding: 10px 12px;
}
.tag {
  flex: none;
  padding: 5px 10px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius-full);
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  white-space: nowrap;
}
</style>