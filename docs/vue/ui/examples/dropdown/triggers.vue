<template>
  <KFlex vertical gap="lg">
    <KFlex align="center" wrap>
      <KDropdown :items="items" trigger="hover" placement="bottomLeft" @select="onSelect">
        <template #trigger><KButton>悬停触发</KButton></template>
      </KDropdown>
      <KDropdown :items="items" trigger="click" placement="bottomRight" @select="onSelect">
        <template #trigger><KButton>点按触发</KButton></template>
      </KDropdown>
      <KDropdown :items="items" trigger="contextmenu" placement="bottomLeft" @select="onSelect">
        <template #trigger>
          <div class="context-area" tabindex="0">在此区域右键</div>
        </template>
      </KDropdown>
    </KFlex>
    <div class="dropdown-tip">选中：{{ last || '—' }}</div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDropdown from 'kit/vue/ui/components/Dropdown/Dropdown.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
import type { KDropdownItem } from 'kit/vue/ui'

const items: KDropdownItem[] = [
  { key: 'copy', label: '复制' },
  { key: 'rename', label: '重命名' },
  { key: 'remove', label: '移除', danger: true, divided: true },
]

const last = ref('')

function onSelect(key: string | number) {
  last.value = String(key)
}
</script>

<style scoped>
.context-area {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  height: 32px;
  padding: 0 12px;
  border: 1px dashed var(--k-color-border);
  border-radius: var(--k-border-radius);
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  user-select: none;
}
.dropdown-tip {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>