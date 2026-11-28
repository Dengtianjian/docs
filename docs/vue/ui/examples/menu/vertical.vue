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
import { IconChartBar, IconFolder, IconLayoutGrid, IconSettings } from '@tabler/icons-vue'
import KMenu from 'kit/vue/ui/components/navigation/Menu/Menu.vue'
import type { KMenuItem } from 'kit/vue/ui'

const selected = ref<string[]>(['overview'])
const items: KMenuItem[] = [
  { key: 'overview', label: '概览', icon: IconLayoutGrid },
  {
    key: 'content',
    label: '内容管理',
    icon: IconFolder,
    children: [
      { key: 'article', label: '文章' },
      { key: 'category', label: '分类' },
      { key: 'comment', label: '评论' },
    ],
  },
  {
    key: 'data',
    label: '数据中心',
    icon: IconChartBar,
    children: [
      { key: 'realtime', label: '实时数据' },
      { key: 'report', label: '报表', disabled: true },
    ],
  },
  {
    key: 'settings',
    label: '设置',
    icon: IconSettings,
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