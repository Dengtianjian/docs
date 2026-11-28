<template>
  <div v-if="ready" class="router-menu-demo">
    <div class="side">
      <KRouterMenu :routes="routes" mode="inline" />
    </div>
    <div class="main">
      <p class="route">当前路由：{{ currentName }}</p>
      <p class="title">{{ currentTitle }}</p>
      <p class="hint">点击左侧菜单会导航并更新高亮；进入子路由时父级自动展开。</p>
      <div class="actions">
        <KButton size="sm" @click="go('orderRefund')">跳到「退款处理」</KButton>
        <KButton size="sm" @click="go('memberRoles')">跳到「角色权限」</KButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createMemoryHistory, createRouter, routerKey } from 'vue-router'
import KRouterMenu from 'kit/vue/ui/components/navigation/RouterMenu/RouterMenu.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'

const Blank = { setup: () => () => null }

const routes: RouteRecordRaw[] = [
  { path: '/dashboard', name: 'dashboard', component: Blank, meta: { title: '总览' } },
  {
    path: '/orders',
    name: 'orders',
    component: Blank,
    meta: { title: '订单' },
    children: [
      { path: 'list', name: 'orderList', component: Blank, meta: { title: '订单列表' } },
      { path: 'refund', name: 'orderRefund', component: Blank, meta: { title: '退款处理' } },
    ],
  },
  {
    path: '/members',
    name: 'members',
    component: Blank,
    meta: { title: '成员' },
    children: [
      { path: 'list', name: 'memberList', component: Blank, meta: { title: '成员列表' } },
      { path: 'roles', name: 'memberRoles', component: Blank, meta: { title: '角色权限' } },
    ],
  },
  { path: '/settings', name: 'settings', component: Blank, meta: { title: '系统设置' } },
]

/* 示例用内存路由模拟；实际项目不传 routes 时取当前 router 的顶层路由 */
const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
provide(routerKey, router)
/* 初始导航完成后再渲染，保证菜单第一帧就命中当前路由 */
const ready = ref(false)
router.push({ name: 'orderList' }).catch(() => {}).finally(() => {
  ready.value = true
})

const currentName = computed(() => String(router.currentRoute.value.name ?? '—'))
const currentTitle = computed(() => {
  const meta = router.currentRoute.value.meta as { title?: string }
  return meta.title ?? currentName.value
})

function go(name: string) {
  router.push({ name }).catch(() => {})
}
</script>

<style scoped>
.router-menu-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: stretch;
}
.side {
  flex: 0 0 208px;
  padding: 6px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-container);
}
.main {
  flex: 1 1 240px;
  min-width: 220px;
  padding: 16px;
  border: 1px dashed var(--k-color-border);
  border-radius: var(--k-border-radius);
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.route {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
}
.title {
  margin: 6px 0 10px;
  color: var(--k-color-text);
  font-size: var(--k-font-size-lg);
  font-weight: var(--k-font-weight-strong);
}
.hint {
  margin-bottom: 12px;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>