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
import { IconFolder, IconHome, IconSettings, IconTrash } from '@tabler/icons-vue'
import KMenu from 'kit/vue/ui/components/navigation/Menu/Menu.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KMenuItem } from 'kit/vue/ui'

const selected = ref<string[]>(['article'])
const open = ref<string[]>(['content'])
const items: KMenuItem[] = [
  { key: 'home', label: '首页', icon: IconHome },
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
    key: 'settings',
    label: '设置',
    icon: IconSettings,
    children: [
      { key: 'profile', label: '个人资料' },
      { key: 'security', label: '安全设置' },
    ],
  },
  { key: 'trash', label: '回收站', icon: IconTrash, disabled: true, divided: true },
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