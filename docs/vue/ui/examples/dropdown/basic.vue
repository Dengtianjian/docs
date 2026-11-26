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
import { defineComponent, h } from 'vue'
import KDropdown from 'kit/vue/ui/components/navigation/Dropdown/Dropdown.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KDropdownItem } from 'kit/vue/ui'

function svg(children: ReturnType<typeof h>[]) {
  return defineComponent({
    setup() {
      return () =>
        h(
          'svg',
          {
            viewBox: '0 0 16 16',
            width: '1em',
            height: '1em',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': 1.5,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'aria-hidden': 'true',
          },
          children,
        )
    },
  })
}

const UserIcon = svg([
  h('circle', { cx: 8, cy: 5.4, r: 2.6 }),
  h('path', { d: 'M3.2 13.2c.6-2.3 2.5-3.6 4.8-3.6s4.2 1.3 4.8 3.6' }),
])
const SettingsIcon = svg([
  h('circle', { cx: 8, cy: 8, r: 2.2 }),
  h('path', { d: 'M8 2.6v1.2M8 12.2v1.2M2.6 8h1.2M12.2 8h1.2M4.2 4.2l.9.9M10.9 10.9l.9.9M11.8 4.2l-.9.9M5.1 10.9l-.9.9' }),
])
const TrashIcon = svg([
  h('path', { d: 'M3.2 4.4h9.6M6.2 4.4V3.2h3.6v1.2M4.6 4.4l.5 8.2h5.8l.5-8.2' }),
])
const ArchiveIcon = svg([
  h('rect', { x: 2.8, y: 3.2, width: 10.4, height: 2.8, rx: 0.6 }),
  h('path', { d: 'M4 6v6.8h8V6M6.4 8.6h3.2' }),
])

const last = ref('')
const items: KDropdownItem[] = [
  { key: 'profile', label: '个人资料', icon: UserIcon },
  { key: 'settings', label: '设置', icon: SettingsIcon },
  { key: 'archive', label: '归档（禁用）', icon: ArchiveIcon, disabled: true, divided: true },
  { key: 'delete', label: '删除', icon: TrashIcon, danger: true, divided: true },
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