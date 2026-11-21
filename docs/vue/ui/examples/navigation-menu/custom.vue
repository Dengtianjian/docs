<template>
  <KNavigationMenu v-model:value="active" :items="items" trigger="click">
    <template #item="{ item, open }">
      <span class="dot" :class="{ open }" />
      <span>{{ item.label }}</span>
      <span v-if="item.badge" class="badge">{{ item.badge }}</span>
    </template>
    <template #content="{ item, close }">
      <div class="panel">
        <p class="panel-title">{{ item.label }} · 快速入口</p>
        <div class="cards">
          <button v-for="child in item.children" :key="child.key" class="card" @click="pick(child, close)">
            <strong>{{ child.label }}</strong>
            <small>{{ child.description }}</small>
          </button>
        </div>
      </div>
    </template>
  </KNavigationMenu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KNavigationMenu from 'kit/vue/ui/components/NavigationMenu/NavigationMenu.vue'
import type { KNavigationMenuItem } from 'kit/vue/ui/components/NavigationMenu/NavigationMenu.vue'

const active = ref<string | number | null>(null)
const items: KNavigationMenuItem[] = [
  {
    key: 'workspace',
    label: '工作台',
    badge: '4',
    children: [
      { key: 'overview', label: '总览', description: '关键指标与趋势' },
      { key: 'tasks', label: '任务', description: '待办与进行中' },
      { key: 'members', label: '成员', description: '团队与权限' },
    ],
  },
  {
    key: 'settings',
    label: '设置',
    children: [
      { key: 'theme', label: '主题', description: '亮色 / 暗色 / 跟随系统' },
      { key: 'shortcut', label: '快捷键', description: '自定义命令面板热键' },
    ],
  },
]

function pick(item: KNavigationMenuItem, close: () => void) {
  active.value = item.key ?? null
  close()
}
</script>

<style scoped>
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--k-color-text-quaternary);
}
.dot.open {
  background: var(--k-color-primary);
}
.badge {
  padding: 0 5px;
  border-radius: var(--k-border-radius-full);
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary);
  font-size: 11px;
}
.panel {
  width: 320px;
  padding: 6px;
}
.panel-title {
  margin: 4px 6px 8px;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
.cards {
  display: grid;
  gap: 4px;
}
.card {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 10px;
  border: none;
  border-radius: var(--k-border-radius-sm);
  background: transparent;
  color: var(--k-color-text);
  text-align: left;
  cursor: pointer;
}
.card:hover {
  background: var(--k-color-fill-secondary);
}
.card small {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
</style>
