<template>
  <div class="vertical-demo">
    <KMenu
      v-model:selected-keys="selected"
      :items="items"
      mode="vertical"
      menu-label="垂直导航"
    />
    <div class="menu-tip">选中：{{ selected.join(', ') || '—' }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineComponent, h } from 'vue'
import KMenu from 'kit/vue/ui/components/Menu/Menu.vue'
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
const ChartIcon = svg([
  h('path', { d: 'M2.8 12.8h10.4' }),
  h('path', { d: 'M4.6 12.8V8.4M8 12.8V5.4M11.4 12.8V7' }),
])
const SettingsIcon = svg([
  h('circle', { cx: 8, cy: 8, r: 2.1 }),
  h('path', { d: 'M8 2.6v1.2M8 12.2v1.2M2.6 8h1.2M12.2 8h1.2M4.2 4.2l.9.9M10.9 10.9l.9.9M11.8 4.2l-.9.9M5.1 10.9l-.9.9' }),
])

const selected = ref<string[]>(['overview'])
const items: KMenuItem[] = [
  { key: 'overview', label: '概览', icon: DashboardIcon },
  {
    key: 'content',
    label: '内容管理',
    icon: FolderIcon,
    children: [
      { key: 'article', label: '文章' },
      { key: 'category', label: '分类' },
      { key: 'comment', label: '评论' },
    ],
  },
  {
    key: 'data',
    label: '数据中心',
    icon: ChartIcon,
    children: [
      { key: 'realtime', label: '实时数据' },
      { key: 'report', label: '报表', disabled: true },
    ],
  },
  {
    key: 'settings',
    label: '设置',
    icon: SettingsIcon,
    children: [
      { key: 'profile', label: '个人资料' },
      { key: 'security', label: '安全设置' },
    ],
  },
]
</script>

<style scoped>
.vertical-demo {
  width: 240px;
}
.vertical-demo :deep(.k-menu) {
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
}
.menu-tip {
  margin-top: 8px;
  overflow: hidden;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>