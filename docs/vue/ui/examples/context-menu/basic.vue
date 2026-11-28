<template>
  <KContextMenu :items="items" @select="onSelect">
    <div class="surface">
      <strong>在任意位置右键</strong>
      <span>支持右键、Shift+F10 与菜单键唤起</span>
    </div>
  </KContextMenu>
  <p class="tip">最近操作：{{ last || '（无）' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KContextMenu from 'kit/vue/ui/components/overlay/ContextMenu/ContextMenu.vue'
import type { KContextMenuItem } from 'kit/vue/ui/components/overlay/ContextMenu/ContextMenu.vue'

const last = ref('')
const items: KContextMenuItem[] = [
  { key: 'open', label: '打开', shortcut: '↵' },
  { key: 'rename', label: '重命名', shortcut: 'F2' },
  { key: 'duplicate', label: '创建副本', shortcut: '⌘D' },
  { divider: true },
  { key: 'archive', label: '归档' },
  { key: 'delete', label: '删除', danger: true, shortcut: '⌫' },
]

function onSelect(item: KContextMenuItem) {
  last.value = item.label ?? ''
}
</script>

<style scoped>
.surface {
  display: flex;
  min-height: 120px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px dashed var(--k-color-border);
  border-radius: var(--k-border-radius);
  background: var(--k-color-fill-quaternary);
  color: var(--k-color-text-secondary);
  user-select: none;
}
.surface strong {
  color: var(--k-color-text);
  font-size: var(--k-font-size);
}
.surface span {
  font-size: var(--k-font-size-sm);
}
.tip {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>