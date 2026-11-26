<template>
  <KLayout has-sider style="height: 340px; border: 1px solid var(--k-color-border-secondary); border-radius: var(--k-border-radius); overflow: hidden">
    <KLayoutSider v-model:collapsed="collapsed" collapsible :width="220">
      <KMenu
        v-model:selected-keys="selected"
        v-model:open-keys="open"
        :items="items"
        mode="inline"
        menu-label="侧边导航"
      />
    </KLayoutSider>
    <KLayoutContent style="padding: 20px">
      <div class="sider-title">当前页面</div>
      <p class="sider-text">
        {{ selected.join(', ') || '未选择' }} · 侧栏{{ collapsed ? '已收起' : '已展开' }}
      </p>
    </KLayoutContent>
  </KLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineComponent, h } from 'vue'
import KLayout from 'kit/vue/ui/components/layouts/Layout/Layout.vue'
import KLayoutSider from 'kit/vue/ui/components/layouts/Layout/Sider.vue'
import KLayoutContent from 'kit/vue/ui/components/layouts/Layout/Content.vue'
import KMenu from 'kit/vue/ui/components/navigation/Menu/Menu.vue'
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
  h('circle', { cx: 8, cy: 5.4, r: 2.6 }),
  h('path', { d: 'M3.2 13.2c.6-2.3 2.5-3.6 4.8-3.6s4.2 1.3 4.8 3.6' }),
])

const collapsed = ref(false)
const selected = ref<string[]>(['article'])
const open = ref<string[]>(['content'])
const items: KMenuItem[] = [
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
    key: 'account',
    label: '账号',
    icon: UserIcon,
    children: [
      { key: 'profile', label: '个人资料' },
      { key: 'security', label: '安全设置' },
    ],
  },
]
</script>

<style scoped>
.sider-title {
  margin-bottom: 8px;
  font-weight: 600;
}
.sider-text {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>