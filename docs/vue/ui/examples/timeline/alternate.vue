<template>
  <KTimeline :items="items" mode="alternate" size="sm" pending="等待下一批节点" />
</template>

<script setup lang="ts">
import KTimeline from 'kit/vue/ui/components/Timeline/Timeline.vue'

const items = [
  { label: '立项', content: '确定本周目标与验收口径', color: 'primary' as const },
  { label: '设计', content: '完成两版视觉探索', color: 'success' as const },
  { label: '开发', content: '组件与文档同步推进', color: 'warning' as const },
  { label: '验收', content: '浏览器与移动端回归', color: 'gray' as const },
]
</script>