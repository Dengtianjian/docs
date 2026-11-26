<template>
  <KFlex vertical gap="md" style="width: 300px">
    <KMenu
      v-model:selected-keys="selected"
      v-model:open-keys="open"
      :items="items"
      menu-label="多级导航"
      style="border: 1px solid var(--k-color-border-secondary); border-radius: var(--k-border-radius)"
    />
    <div class="menu-tip">
      选中：{{ selected.join(', ') || '—' }}；展开：{{ open.join(', ') || '—' }}
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineComponent, h } from 'vue'
import KMenu from 'kit/vue/ui/components/Menu/Menu.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
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
const SystemIcon = svg([
  h('path', { d: 'M3 4.2h10M3 8h10M3 11.8h10' }),
  h('circle', { cx: 6, cy: 4.2, r: 1.1 }),
  h('circle', { cx: 10, cy: 8, r: 1.1 }),
  h('circle', { cx: 6.6, cy: 11.8, r: 1.1 }),
])
const DataIcon = svg([
  h('path', { d: 'M2.8 12.8h10.4' }),
  h('path', { d: 'M4.6 12.8V8.4M8 12.8V5.4M11.4 12.8V7' }),
])
const HelpIcon = svg([
  h('circle', { cx: 8, cy: 8, r: 5.2 }),
  h('path', { d: 'M6.4 6.2a1.7 1.7 0 1 1 2.4 1.6c-.5.2-.8.6-.8 1.2v.4' }),
  h('path', { d: 'M8 11.6h.01' }),
])

const selected = ref<string[]>(['admin'])
const open = ref<string[]>(['system', 'system-perm', 'system-perm-role', 'data'])
const items: KMenuItem[] = [
  { key: 'dashboard', label: '仪表盘', icon: DashboardIcon },
  {
    key: 'system',
    label: '系统管理',
    icon: SystemIcon,
    children: [
      {
        key: 'system-perm',
        label: '用户与权限',
        children: [
          {
            key: 'system-perm-role',
            label: '角色',
            children: [
              { key: 'admin', label: '管理员' },
              { key: 'operator', label: '运营' },
            ],
          },
          { key: 'account', label: '账号' },
        ],
      },
      {
        key: 'system-log',
        label: '日志',
        children: [
          { key: 'login-log', label: '登录日志' },
          { key: 'action-log', label: '操作日志' },
        ],
      },
    ],
  },
  {
    key: 'data',
    label: '数据中心',
    icon: DataIcon,
    children: [
      {
        key: 'data-report',
        label: '报表',
        children: [
          { key: 'daily', label: '日报' },
          { key: 'weekly', label: '周报' },
        ],
      },
      { key: 'board', label: '看板' },
    ],
  },
  { key: 'help', label: '帮助', icon: HelpIcon, divided: true },
]
</script>

<style scoped>
.menu-tip {
  overflow: hidden;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>