<template>
  <KFlex gap="lg" align="start" wrap>
    <div class="block">
      <div class="block-title">图标栏（mode="collapsed"）</div>
      <div class="rail">
        <KMenu v-model:selected-keys="railSelected" :items="railItems" mode="collapsed" menu-label="图标栏导航" />
      </div>
    </div>

    <div class="block">
      <div class="block-title">手风琴（accordion）</div>
      <KMenu
        v-model:selected-keys="accordionSelected"
        v-model:open-keys="accordionOpen"
        :items="items"
        accordion
        class="accordion-menu"
        menu-label="手风琴导航"
      />
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
const FolderIcon = svg([h('path', { d: 'M2.8 4.2h3.4l1 1.2h6V12H2.8z' })])
const UserIcon = svg([
  h('circle', { cx: 8, cy: 5.6, r: 2.2 }),
  h('path', { d: 'M3.6 13c.6-2.2 2.3-3.4 4.4-3.4s3.8 1.2 4.4 3.4' }),
])
const SettingsIcon = svg([
  h('circle', { cx: 8, cy: 8, r: 2.1 }),
  h('path', { d: 'M8 2.6v1.2M8 12.2v1.2M2.6 8h1.2M12.2 8h1.2M4.2 4.2l.9.9M10.9 10.9l.9.9M11.8 4.2l-.9.9M5.1 10.9l-.9.9' }),
])
const TrashIcon = svg([
  h('path', { d: 'M3.2 4.4h9.6M6.2 4.4V3.2h3.6v1.2M4.6 4.4l.5 8.2h5.8l.5-8.2' }),
])

const railSelected = ref<string[]>(['dashboard'])
const railItems: KMenuItem[] = [
  { key: 'dashboard', label: '仪表盘', icon: DashboardIcon },
  {
    key: 'content',
    label: '内容管理',
    icon: FolderIcon,
    children: [
      { key: 'article', label: '文章' },
      { key: 'category', label: '分类' },
    ],
  },
  {
    key: 'user',
    label: '用户',
    icon: UserIcon,
    children: [
      { key: 'profile', label: '个人资料' },
      { key: 'role', label: '角色' },
    ],
  },
  {
    key: 'settings',
    label: '设置',
    icon: SettingsIcon,
    children: [
      { key: 'notice', label: '通知' },
      { key: 'security', label: '安全' },
    ],
  },
  { key: 'trash', label: '回收站', icon: TrashIcon, divided: true },
]

const accordionSelected = ref<string[]>([])
const accordionOpen = ref<string[]>(['content'])
const items: KMenuItem[] = [
  { key: 'overview', label: '概览' },
  {
    key: 'content',
    label: '内容管理',
    children: [
      { key: 'article', label: '文章' },
      { key: 'category', label: '分类' },
    ],
  },
  {
    key: 'system',
    label: '系统设置',
    children: [
      { key: 'log', label: '日志' },
      { key: 'notice', label: '通知' },
    ],
  },
  {
    key: 'data',
    label: '数据报表',
    children: [
      { key: 'daily', label: '日报' },
      { key: 'weekly', label: '周报' },
    ],
  },
]
</script>

<style scoped>
.block-title {
  margin-bottom: 8px;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
}
.rail {
  width: 64px;
  padding: 4px 0;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
}
.accordion-menu {
  width: 240px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
}
</style>