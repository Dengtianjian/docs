<template>
  <KTimeline :items="items" />
</template>

<script setup lang="ts">
import KTimeline from 'kit/vue/ui/components/Timeline/Timeline.vue'

const items = [
  { label: '创建项目', time: '2026-11-18 09:20', content: '如意工作台初始化完成', color: 'primary' as const },
  { label: '提交评审', time: '2026-11-19 14:05', content: '组件规格进入设计评审', color: 'success' as const },
  { label: '补充用例', time: '2026-11-20 11:30', content: '补齐键盘与暗色回归用例', color: 'warning' as const },
  { label: '发布上线', time: '2026-11-21 18:00', content: 'K UI P7 批次发布', color: 'gray' as const },
]
</script>