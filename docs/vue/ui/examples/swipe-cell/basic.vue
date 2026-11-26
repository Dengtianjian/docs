<template>
  <div class="list">
    <KSwipeCell
      v-for="row in rows"
      :key="row.id"
      :right-actions="rightActions"
      @action="onAction(row, $event)"
      @click="last = `打开 ${row.title}`"
    >
      <div class="row">
        <span class="avatar">{{ row.title.slice(0, 1) }}</span>
        <span class="body">
          <strong>{{ row.title }}</strong>
          <small>{{ row.description }}</small>
        </span>
        <span class="arrow">›</span>
      </div>
    </KSwipeCell>
  </div>
  <p class="tip">最近操作：{{ last || '左滑行试试' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSwipeCell from 'kit/vue/ui/components/overlay/SwipeCell/SwipeCell.vue'
import type { KSwipeCellAction } from 'kit/vue/ui/components/overlay/SwipeCell/SwipeCell.vue'

const last = ref('')
const rightActions: KSwipeCellAction[] = [
  { key: 'pin', text: '置顶', color: 'var(--k-color-primary)' },
  { key: 'delete', text: '删除', color: 'var(--k-color-error)' },
]
const rows = [
  { id: 1, title: '产品周会', description: '周三 10:00 · 会议室 A' },
  { id: 2, title: '设计评审', description: '周四 14:30 · 线上' },
  { id: 3, title: '发布窗口', description: '周五 18:00 · 生产环境' },
]

function onAction(row: { title: string }, action: KSwipeCellAction) {
  last.value = `${row.title} · ${action.text}`
}
</script>

<style scoped>
.list {
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  overflow: hidden;
}
.row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-bottom: 1px solid var(--k-color-border-secondary);
  background: var(--k-color-bg-container);
}
.avatar {
  display: inline-flex;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--k-color-fill-secondary);
  font-size: var(--k-font-size-sm);
}
.body {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 2px;
}
.body strong { font-size: var(--k-font-size); }
.body small { color: var(--k-color-text-tertiary); font-size: 11px; }
.arrow { color: var(--k-color-text-quaternary); font-size: 18px; }
.tip {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>