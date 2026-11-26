<template>
  <KFlex vertical gap="md" style="width: 300px">
    <KRadioGroup
      v-model="trigger"
      shape="button"
      style="align-self: flex-start"
      :options="[
        { label: 'hover 弹出', value: 'hover' },
        { label: 'click 弹出', value: 'click' },
      ]"
    />
    <KMenu
      v-model:selected-keys="selected"
      v-model:open-keys="open"
      :items="items"
      :submenu-trigger="trigger"
      menu-label="混合展开方式"
      style="border: 1px solid var(--k-color-border-secondary); border-radius: var(--k-border-radius)"
    />
    <div class="menu-tip">「报表中心」「日志」弹层；整菜单统一 hover / click 触发。</div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineComponent, h } from 'vue'
import KMenu from 'kit/vue/ui/components/Menu/Menu.vue'
import KRadioGroup from 'kit/vue/ui/components/Radio/RadioGroup.vue'
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
const UserIcon = svg([
  h('circle', { cx: 8, cy: 5.6, r: 2.2 }),
  h('path', { d: 'M3.6 13c.6-2.2 2.3-3.4 4.4-3.4s3.8 1.2 4.4 3.4' }),
])
const ReportIcon = svg([
  h('path', { d: 'M2.8 12.8h10.4' }),
  h('path', { d: 'M4.6 12.8V8.4M8 12.8V5.4M11.4 12.8V7' }),
])
const SystemIcon = svg([
  h('path', { d: 'M3 4.2h10M3 8h10M3 11.8h10' }),
  h('circle', { cx: 6, cy: 4.2, r: 1.1 }),
  h('circle', { cx: 10, cy: 8, r: 1.1 }),
  h('circle', { cx: 6.6, cy: 11.8, r: 1.1 }),
])
const HelpIcon = svg([
  h('circle', { cx: 8, cy: 8, r: 5.2 }),
  h('path', { d: 'M6.4 6.2a1.7 1.7 0 1 1 2.4 1.6c-.5.2-.8.6-.8 1.2v.4' }),
  h('path', { d: 'M8 11.6h.01' }),
])

const selected = ref<string[]>(['profile'])
const trigger = ref<'hover' | 'click'>('hover')
const open = ref<string[]>(['account', 'system'])
const items: KMenuItem[] = [
  { key: 'dashboard', label: '仪表盘', icon: DashboardIcon },
  {
    key: 'account',
    label: '账号设置',
    icon: UserIcon,
    children: [
      { key: 'profile', label: '个人资料' },
      { key: 'security', label: '安全设置' },
    ],
  },
  {
    key: 'reports',
    label: '报表中心',
    icon: ReportIcon,
    submenuMode: 'popup',
    children: [
      { key: 'daily', label: '日报' },
      { key: 'weekly', label: '周报' },
      { key: 'monthly', label: '月报' },
    ],
  },
  {
    key: 'system',
    label: '系统管理',
    icon: SystemIcon,
    children: [
      {
        key: 'log',
        label: '日志',
        submenuMode: 'popup',
        children: [
          { key: 'login', label: '登录日志' },
          { key: 'action', label: '操作日志' },
        ],
      },
      { key: 'notice', label: '通知设置' },
    ],
  },
  { key: 'help', label: '帮助', icon: HelpIcon, divided: true },
]
</script>

<style scoped>
/* 文档站的 .vp-doc li + li 间距会穿透进菜单，示例内收掉 */
:deep(.k-menu li + li) {
  margin-top: 0;
}
.menu-tip {
  overflow: hidden;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>