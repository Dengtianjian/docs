<template>
  <KSpace direction="vertical" size="md">
    <KDropdown
      v-model:open="open"
      :items="items"
      trigger="click"
      menu-label="通知"
      @select="onSelect"
    >
      <template #trigger>
        <KButton>通知（{{ unread }}）</KButton>
      </template>
      <template #item="{ item }">
        <span class="notify-dot" :class="`notify-dot--${item.key}`" />
        {{ item.label }}
      </template>
    </KDropdown>
    <div class="dropdown-tip">菜单状态：{{ open ? '展开' : '收起' }}；最近选择：{{ last || '—' }}</div>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDropdown from 'kit/vue/ui/components/Dropdown/Dropdown.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import type { KDropdownItem } from 'kit/vue/ui'

const open = ref(false)
const last = ref('')
const unread = ref(3)
const items: KDropdownItem[] = [
  { key: 'comment', label: '3 条新评论' },
  { key: 'system', label: '系统维护通知' },
  { key: 'todo', label: '待办提醒', divided: true },
]

function onSelect(key: string | number) {
  last.value = String(key)
  unread.value = 0
}
</script>

<style scoped>
.notify-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--k-color-primary);
}
.notify-dot--system {
  background: var(--k-color-warning);
}
.notify-dot--todo {
  background: var(--k-color-success);
}
.dropdown-tip {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>