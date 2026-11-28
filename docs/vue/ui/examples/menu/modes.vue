<template>
  <KFlex gap="lg" align="start" wrap>
    <div class="block">
      <div class="block-title">图标栏（collapsed）</div>
      <div class="rail">
        <KMenu v-model:selected-keys="railSelected" :items="railItems" collapsed menu-label="图标栏导航" />
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
import { IconFolder, IconLayoutGrid, IconSettings, IconTrash, IconUser } from '@tabler/icons-vue'
import KMenu from 'kit/vue/ui/components/navigation/Menu/Menu.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KMenuItem } from 'kit/vue/ui'

const railSelected = ref<string[]>(['dashboard'])
const railItems: KMenuItem[] = [
  { key: 'dashboard', label: '仪表盘', icon: IconLayoutGrid },
  {
    key: 'content',
    label: '内容管理',
    icon: IconFolder,
    children: [
      { key: 'article', label: '文章' },
      { key: 'category', label: '分类' },
    ],
  },
  {
    key: 'user',
    label: '用户',
    icon: IconUser,
    children: [
      { key: 'profile', label: '个人资料' },
      { key: 'role', label: '角色' },
    ],
  },
  {
    key: 'settings',
    label: '设置',
    icon: IconSettings,
    children: [
      { key: 'notice', label: '通知' },
      { key: 'security', label: '安全' },
    ],
  },
  { key: 'trash', label: '回收站', icon: IconTrash, divided: true },
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