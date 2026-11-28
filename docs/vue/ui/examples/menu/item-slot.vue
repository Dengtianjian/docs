<template>
  <div class="menu-item-slot">
    <KMenu
      v-model:selected-keys="selected"
      v-model:open-keys="open"
      :items="items"
      mode="inline"
      style="max-width: 288px"
    >
      <template #item="{ item, active, open, isSubmenu, isGroup }">
        <span v-if="isGroup" class="group">{{ item.label }}</span>
        <span v-else class="row" :class="{ 'is-active': active }">
          <span class="dot" :class="meta[item.key]?.tone" />
          <span class="text">{{ item.label }}</span>
          <span v-if="meta[item.key]?.count" class="count">{{ meta[item.key].count }}</span>
          <span v-if="isSubmenu" class="state">{{ open ? '收起' : '展开' }}</span>
        </span>
      </template>
    </KMenu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KMenu from 'kit/vue/ui/components/navigation/Menu/Menu.vue'
import type { KMenuItem } from 'kit/vue/ui/components/navigation/Menu/types'

const items: KMenuItem[] = [
  {
    key: 'g-work',
    type: 'group',
    label: '工作区',
    children: [
      { key: 'overview', label: '概览' },
      { key: 'inbox', label: '收件箱' },
      { key: 'tasks', label: '任务' },
    ],
  },
  {
    key: 'project',
    label: '项目',
    children: [
      { key: 'frontend', label: '前端' },
      { key: 'backend', label: '后端' },
      { key: 'design', label: '设计' },
    ],
  },
  { key: 'archive', label: '归档' },
]

const selected = ref(['inbox'])
const open = ref(['project'])

const meta: Record<string, { count?: number; tone?: string }> = {
  inbox: { count: 12, tone: 'warn' },
  tasks: { count: 3, tone: 'info' },
  frontend: { count: 5, tone: 'info' },
  backend: { count: 2, tone: 'ok' },
}
</script>

<style scoped>
.menu-item-slot {
  padding: 12px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-container);
}
.group {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
  font-weight: var(--k-font-weight-strong);
  letter-spacing: 0.08em;
}
.row {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.dot {
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--k-color-text-quaternary);
}
.dot.warn {
  background: var(--k-color-warning);
}
.dot.info {
  background: var(--k-color-info);
}
.dot.ok {
  background: var(--k-color-success);
}
.row.is-active .dot {
  background: currentColor;
}
.text {
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.count {
  flex: none;
  min-width: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: var(--k-color-fill-secondary);
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
  line-height: 18px;
  text-align: center;
}
.state {
  flex: none;
  color: var(--k-color-text-quaternary);
  font-size: var(--k-font-size-xs);
}
</style>