<template>
  <KFlex vertical gap="md">
    <KMenu
      v-model:selected-keys="selected"
      :items="items"
      mode="horizontal"
      menu-label="水平导航（带图标）"
    />
    <div class="menu-tip">选中：{{ selected.join(', ') || '—' }}</div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineComponent, h } from 'vue'
import KMenu from 'kit/vue/ui/components/navigation/Menu/Menu.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KMenuItem } from 'kit/vue/ui'

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

const DashboardIcon = svg([
  h('rect', { x: 2.8, y: 2.8, width: 4.4, height: 4.4, rx: 0.6 }),
  h('rect', { x: 8.8, y: 2.8, width: 4.4, height: 4.4, rx: 0.6 }),
  h('rect', { x: 2.8, y: 8.8, width: 4.4, height: 4.4, rx: 0.6 }),
  h('rect', { x: 8.8, y: 8.8, width: 4.4, height: 4.4, rx: 0.6 }),
])
const ChartIcon = svg([
  h('path', { d: 'M2.8 12.8h10.4' }),
  h('path', { d: 'M4.6 12.8V8.4M8 12.8V5.4M11.4 12.8V7' }),
])
const UsersIcon = svg([
  h('circle', { cx: 6, cy: 5.6, r: 2.1 }),
  h('path', { d: 'M2.6 13c.5-2 2-3.2 3.8-3.2s3.1 1.2 3.6 3.2' }),
  h('path', { d: 'M10.4 4.2a2 2 0 0 1 0 3.6M11.6 9.9c1.2.4 2 1.4 2.3 2.7' }),
])
const HelpIcon = svg([
  h('circle', { cx: 8, cy: 8, r: 5.2 }),
  h('path', { d: 'M6.4 6.2a1.7 1.7 0 1 1 2.4 1.6c-.5.2-.8.6-.8 1.2v.4' }),
  h('path', { d: 'M8 11.6h.01' }),
])

const selected = ref<string[]>(['overview'])
const items: KMenuItem[] = [
  { key: 'overview', label: '概览', icon: DashboardIcon },
  {
    key: 'data',
    label: '数据',
    icon: ChartIcon,
    children: [
      { key: 'realtime', label: '实时数据' },
      { key: 'history', label: '历史趋势' },
      { key: 'report', label: '报表', disabled: true },
    ],
  },
  {
    key: 'team',
    label: '团队',
    icon: UsersIcon,
    children: [
      { key: 'member', label: '成员' },
      { key: 'role', label: '角色权限' },
    ],
  },
  { key: 'help', label: '帮助', icon: HelpIcon, divided: true },
]
</script>

<style scoped>
.menu-tip {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>