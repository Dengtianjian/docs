<template>
  <KFlex vertical gap="md">
    <KMenu
      v-model:selected-keys="selected"
      :items="items"
      mode="horizontal"
      menu-label="水平导航"
    />
    <div class="menu-tip">选中：{{ selected.join(', ') || '—' }}</div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KMenu from 'kit/vue/ui/components/Menu/Menu.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
import type { KMenuItem } from 'kit/vue/ui'

const selected = ref<string[]>(['overview'])
const items: KMenuItem[] = [
  { key: 'overview', label: '概览' },
  {
    key: 'data',
    label: '数据',
    children: [
      { key: 'realtime', label: '实时数据' },
      { key: 'history', label: '历史趋势' },
      { key: 'report', label: '报表', disabled: true },
    ],
  },
  {
    key: 'team',
    label: '团队',
    children: [
      {
        key: 'member',
        label: '成员',
        children: [
          { key: 'member-list', label: '成员列表' },
          { key: 'member-invite', label: '邀请成员' },
        ],
      },
      { key: 'role', label: '角色权限' },
    ],
  },
  { key: 'help', label: '帮助', divided: true },
]
</script>

<style scoped>
.menu-tip {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>