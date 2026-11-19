<template>
  <KCard segmented title="本周任务" style="width: 340px">
    <template #extra>
      <KTag color="processing">进行中</KTag>
    </template>
    <ul class="tasks">
      <li v-for="task in tasks" :key="task.text">
        <span class="dot" :class="{ 'is-done': task.done }" />
        {{ task.text }}
      </li>
    </ul>
    <template #footer>截止：周五 18:00</template>
    <template #actions>
      <KCardAction>标记完成</KCardAction>
      <KCardAction>延期</KCardAction>
    </template>
  </KCard>
</template>

<script setup lang="ts">
import KCard from 'kit/vue/ui/components/Card/Card.vue'
import KCardAction from 'kit/vue/ui/components/Card/CardAction.vue'
import KTag from 'kit/vue/ui/components/Tag/Tag.vue'

const tasks = [
  { text: '整理组件 API 文档', done: true },
  { text: '补齐表格空态演示', done: false },
  { text: '检查暗色主题对比度', done: false },
]
</script>

<style scoped>
.tasks {
  display: flex;
  flex-direction: column;
  gap: var(--k-size-xs);
  margin: 0;
  padding: 0;
  list-style: none;
}
.tasks li {
  display: flex;
  align-items: center;
  gap: var(--k-size-xs);
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--k-color-text-tertiary);
  flex: none;
}
.dot.is-done {
  background: var(--k-color-success);
}
</style>