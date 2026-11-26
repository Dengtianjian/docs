<template>
  <KFlex vertical gap="md" style="width: 280px">
    <KMenu
      v-model:selected-keys="selected"
      v-model:open-keys="open"
      :items="items"
      menu-label="主导航"
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

const HomeIcon = svg([
  h('path', { d: 'M2.8 7.2 8 2.8l5.2 4.4V13H9.8V9.8H6.2V13H2.8z' }),
])
const FolderIcon = svg([
  h('path', { d: 'M2.8 4.2h3.4l1 1.2h6V12H2.8z' }),
])
const SettingsIcon = svg([
  h('circle', { cx: 8, cy: 8, r: 2.1 }),
  h('path', { d: 'M8 2.6v1.2M8 12.2v1.2M2.6 8h1.2M12.2 8h1.2M4.2 4.2l.9.9M10.9 10.9l.9.9M11.8 4.2l-.9.9M5.1 10.9l-.9.9' }),
])
const TrashIcon = svg([
  h('path', { d: 'M3.2 4.4h9.6M6.2 4.4V3.2h3.6v1.2M4.6 4.4l.5 8.2h5.8l.5-8.2' }),
])

const selected = ref<string[]>(['article'])
const open = ref<string[]>(['content'])
const items: KMenuItem[] = [
  { key: 'home', label: '首页', icon: HomeIcon },
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
    key: 'settings',
    label: '设置',
    icon: SettingsIcon,
    children: [
      { key: 'profile', label: '个人资料' },
      { key: 'security', label: '安全设置' },
    ],
  },
  { key: 'trash', label: '回收站', icon: TrashIcon, disabled: true, divided: true },
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