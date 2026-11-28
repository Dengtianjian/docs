<template>
  <KFlex vertical gap="md">
    <KDropdown :items="items" trigger="click" @select="onSelect">
      <template #trigger>
        <KButton>操作</KButton>
      </template>
    </KDropdown>
    <div class="dropdown-tip">最近操作：{{ last || '—' }}</div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconArchive, IconSettings, IconTrash, IconUser } from '@tabler/icons-vue'
import KDropdown from 'kit/vue/ui/components/navigation/Dropdown/Dropdown.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KDropdownItem } from 'kit/vue/ui'

const last = ref('')
const items: KDropdownItem[] = [
  { key: 'profile', label: '个人资料', icon: IconUser },
  { key: 'settings', label: '设置', icon: IconSettings },
  { key: 'archive', label: '归档（禁用）', icon: IconArchive, disabled: true, divided: true },
  { key: 'delete', label: '删除', icon: IconTrash, danger: true, divided: true },
]

function onSelect(key: string | number) {
  last.value = String(key)
}
</script>

<style scoped>
.dropdown-tip {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>