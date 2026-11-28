<template>
  <div v-if="ready" class="router-tabs-demo">
    <KRouterTabs :items="items">
      <template #content="{ item }">
        <div class="pane">
          <p class="route">当前路由：{{ routeName }}</p>
          <p>{{ panels[item.name] ?? panels.fallback }}</p>
        </div>
      </template>
    </KRouterTabs>

    <div class="actions">
      <KButton size="sm" @click="go('basicDetail')">进入「基础设置」详情（子路由）</KButton>
      <KButton size="sm" @click="go('other')">进入临时页（无页签）</KButton>
      <KButton size="sm" @click="go('security')">程序跳到「安全设置」</KButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { createMemoryHistory, createRouter, routerKey } from 'vue-router'
import KRouterTabs from 'kit/vue/ui/components/navigation/RouterTabs/RouterTabs.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'

const Blank = { setup: () => () => null }

/* 示例用内存路由模拟；实际项目直接用应用自己的 router */
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
/* 初始导航完成后再渲染，保证页签第一帧就命中当前路由 */
const ready = ref(false)
router.push({ name: 'basic' }).catch(() => {}).finally(() => {
  ready.value = true
})

/* key = 路由 name；match 把子路由归到父页签 */
const items = [
  { name: 'basic', label: '基础设置', match: ['basicDetail'] },
  { name: 'security', label: '安全设置' },
  { name: 'notice', label: '通知' },
]

const panels: Record<string, string> = {
  basic: '基础设置：账号、头像、昵称。',
  security: '安全设置：密码、两步验证。',
  notice: '通知偏好。',
  fallback: '临时页：没有对应页签，高亮保持上一次的位置。',
}

const routeName = computed(() => String(router.currentRoute.value.name ?? '—'))

function go(name: string) {
  router.push({ name }).catch(() => {})
}
</script>

<style scoped>
.router-tabs-demo {
  max-width: 620px;
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
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}
</style>