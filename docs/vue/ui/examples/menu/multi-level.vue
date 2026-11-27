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
import { IconAdjustmentsHorizontal, IconChartBar, IconHelpCircle, IconLayoutGrid } from '@tabler/icons-vue'
import KMenu from 'kit/vue/ui/components/navigation/Menu/Menu.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KMenuItem } from 'kit/vue/ui'

const selected = ref<string[]>(['admin'])
const open = ref<string[]>(['system', 'system-perm', 'system-perm-role', 'data'])
const items: KMenuItem[] = [
  { key: 'dashboard', label: '仪表盘', icon: IconLayoutGrid },
  {
    key: 'system',
    label: '系统管理',
    icon: IconAdjustmentsHorizontal,
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
    icon: IconChartBar,
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
  { key: 'help', label: '帮助', icon: IconHelpCircle, divided: true },
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