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
import {
  IconAdjustmentsHorizontal,
  IconChartBar,
  IconHelpCircle,
  IconLayoutGrid,
  IconUser,
} from '@tabler/icons-vue'
import KMenu from 'kit/vue/ui/components/navigation/Menu/Menu.vue'
import KRadioGroup from 'kit/vue/ui/components/data-entry/Radio/RadioGroup.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KMenuItem } from 'kit/vue/ui'

const selected = ref<string[]>(['profile'])
const trigger = ref<'hover' | 'click'>('hover')
const open = ref<string[]>(['account', 'system'])
const items: KMenuItem[] = [
  { key: 'dashboard', label: '仪表盘', icon: IconLayoutGrid },
  {
    key: 'account',
    label: '账号设置',
    icon: IconUser,
    children: [
      { key: 'profile', label: '个人资料' },
      { key: 'security', label: '安全设置' },
    ],
  },
  {
    key: 'reports',
    label: '报表中心',
    icon: IconChartBar,
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
    icon: IconAdjustmentsHorizontal,
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