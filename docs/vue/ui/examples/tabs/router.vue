<template>
  <div class="router-demo">
    <KTabs router :items="items" />
    <div class="actions">
      <KButton size="sm" @click="go('basicDetail')">进入「基础设置」详情（子路由）</KButton>
      <KButton size="sm" @click="go('other')">进入临时页（无页签）</KButton>
      <KButton size="sm" @click="go('security')">程序跳到「安全设置」</KButton>
    </div>
    <div class="pane">
      <div class="route">当前路由：{{ routeName }}</div>
      <div>{{ panel }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { createMemoryHistory, createRouter, routerKey } from 'vue-router'
import KTabs from 'kit/vue/ui/components/Tabs/Tabs.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'

const Blank = { setup: () => () => null }
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/settings/basic', name: 'basic', component: Blank },
    { path: '/settings/security', name: 'security', component: Blank },
    { path: '/settings/notice', name: 'notice', component: Blank },
    { path: '/settings/basic/detail', name: 'basicDetail', component: Blank },
    { path: '/other', name: 'other', component: Blank },
  ],
})
provide(routerKey, router)
router.push({ name: 'basic' })

const items = [
  { name: 'basic', label: '基础设置', match: ['basicDetail'] },
  { name: 'security', label: '安全设置' },
  { name: 'notice', label: '通知' },
]

const routeName = computed(() => String(router.currentRoute.value.name ?? '—'))
const panel = computed(() => {
  switch (router.currentRoute.value.name) {
    case 'basic':
      return '基础设置：账号、头像、昵称。'
    case 'basicDetail':
      return '基础设置详情：从子路由进入，页签仍停在「基础设置」。'
    case 'security':
      return '安全设置：密码、两步验证。'
    case 'notice':
      return '通知偏好。'
    default:
      return '临时页：没有对应页签，高亮保持上一次的位置。'
  }
})

function go(name: string) {
  router.push({ name })
}
</script>

<style scoped>
.router-demo {
  max-width: 560px;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}
.pane {
  margin-top: 12px;
  padding: 12px;
  border: 1px dashed var(--k-color-border);
  border-radius: var(--k-border-radius-sm);
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.route {
  margin-bottom: 6px;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
}
</style>