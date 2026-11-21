<template>
  <KContextMenu :items="items" aria-label="文件操作">
    <div class="row">
      <span class="file">design.fig</span>
      <span class="hint">右键查看禁用与危险项</span>
    </div>
  </KContextMenu>
</template>

<script setup lang="ts">
import KContextMenu from 'kit/vue/ui/components/ContextMenu/ContextMenu.vue'
import type { KContextMenuItem } from 'kit/vue/ui/components/ContextMenu/ContextMenu.vue'

const items: KContextMenuItem[] = [
  { key: 'download', label: '下载' },
  { key: 'share', label: '分享链接' },
  { key: 'edit', label: '编辑（无权限）', disabled: true },
  { divider: true },
  { key: 'remove', label: '移入回收站', danger: true },
]
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-container);
}
.file {
  font-family: var(--k-font-family-mono);
  font-size: var(--k-font-size-sm);
}
.hint {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
</style>