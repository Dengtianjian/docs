<template>
  <KTimeline mode="alternate" pending="等待部署结果" :items="items" />
</template>

<script setup lang="ts">
import KTimeline from 'kit/vue/ui/components/Timeline/Timeline.vue'

const items = [
  { label: '开发环境', time: '10:00', content: '构建通过', color: 'primary' as const },
  { label: '测试环境', time: '12:30', content: '自动化用例全绿', color: 'success' as const },
  { label: '预发环境', time: '16:10', content: '等待人工验收', color: 'warning' as const },
  { label: '生产环境', time: '—', content: '待发布', color: 'gray' as const },
]
</script>
