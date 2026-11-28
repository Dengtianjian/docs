<template>
  <KTimeline>
    <KTimelineItem label="需求确认" time="11-18" color="primary">
      <template #dot>1</template>
      与业务方确认字段与权限范围。
    </KTimelineItem>
    <KTimelineItem label="开发联调" time="11-19" color="success">
      <template #dot>2</template>
      接口联调完成，补充异常分支。
    </KTimelineItem>
    <KTimelineItem label="灰度发布" time="11-21" color="warning">
      <template #dot>3</template>
      <span>先放开 10% 流量，观察 30 分钟。</span>
    </KTimelineItem>
  </KTimeline>
</template>

<script setup lang="ts">
import KTimeline from 'kit/vue/ui/components/data-display/Timeline/Timeline.vue'
import KTimelineItem from 'kit/vue/ui/components/data-display/Timeline/TimelineItem.vue'
</script>