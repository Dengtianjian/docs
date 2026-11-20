<template>
  <KSpace wrap align="center">
    <KDropdown
      v-for="size in sizes"
      :key="size"
      :items="items"
      :size="size"
      trigger="click"
    >
      <template #trigger>
        <KButton :size="size">{{ size.toUpperCase() }}</KButton>
      </template>
    </KDropdown>
  </KSpace>
</template>

<script setup lang="ts">
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KDropdown from 'kit/vue/ui/components/Dropdown/Dropdown.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import type { KDropdownItem, KDropdownSize } from 'kit/vue/ui'

const sizes: KDropdownSize[] = ['sm', 'md', 'lg']
const items: KDropdownItem[] = [
  { key: 'edit', label: '编辑' },
  { key: 'duplicate', label: '复制' },
  { key: 'delete', label: '删除', danger: true, divided: true },
]
</script>