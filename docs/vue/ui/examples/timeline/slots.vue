<template>
  <KTimeline size="lg">
    <KTimelineItem label="需求确认" time="09:00">
      确认 P7 组件范围与验收标准。
    </KTimelineItem>
    <KTimelineItem label="开发实现" time="11:30" color="success">
      组件、样式与导出同步完成。
    </KTimelineItem>
    <KTimelineItem label="质量验证" time="15:00" color="warning" :icon="CheckIcon">
      文档演示与 DOM 回归通过。
    </KTimelineItem>
  </KTimeline>
</template>

<script setup lang="ts">
import { h } from 'vue'
import KTimeline from 'kit/vue/ui/components/Timeline/Timeline.vue'
import KTimelineItem from 'kit/vue/ui/components/Timeline/TimelineItem.vue'

const CheckIcon = () =>
  h('svg', { viewBox: '0 0 16 16', width: '0.8em', height: '0.8em', fill: 'none', stroke: 'currentColor', 'stroke-width': 2.4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M3 8.5l3 3 7-7' }),
  ])
</script>
