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
import { IconFolder, IconLayoutGrid, IconUser } from '@tabler/icons-vue'
import KLayout from 'kit/vue/ui/components/layouts/Layout/Layout.vue'
import KLayoutSider from 'kit/vue/ui/components/layouts/Layout/Sider.vue'
import KLayoutContent from 'kit/vue/ui/components/layouts/Layout/Content.vue'
import KMenu from 'kit/vue/ui/components/navigation/Menu/Menu.vue'
import type { KMenuItem } from 'kit/vue/ui'

const collapsed = ref(false)
const selected = ref<string[]>(['article'])
const open = ref<string[]>(['content'])
const items: KMenuItem[] = [
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
    key: 'account',
    label: '账号',
    icon: IconUser,
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