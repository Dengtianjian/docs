<template>
  <div>
    <div class="phone-frame">
      <KNavBar title="" :class-names="{ root: 'nav-tabs-bar' }">
        <template #title>
          <KTabs v-model:active="active" :items="items" type="segment" size="sm" />
        </template>
      </KNavBar>
      <div class="phone-body">
        <p>标题区域替换为 KTabs，页签在导航内切换。</p>
        <p>back、右侧插槽与部件样式照常可用。</p>
      </div>
    </div>
    <div class="nav-tip">当前页签：{{ current }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KNavBar from 'kit/vue/ui/components/navigation/NavBar/NavBar.vue'
import KTabs from 'kit/vue/ui/components/navigation/Tabs/Tabs.vue'
import type { KTabsItem } from 'kit/vue/ui/components/navigation/Tabs/context'

const active = ref<string | number>('all')
const items: KTabsItem[] = [
  { key: 'all', label: '全部' },
  { key: 'doing', label: '进行中' },
  { key: 'done', label: '已完成' },
]
const current = computed(() => items.find(item => item.key === active.value)?.label ?? active.value)
</script>

<style scoped>
.phone-frame {
  width: 320px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: 18px;
  overflow: hidden;
  background: var(--k-color-bg-layout);
}
.phone-body {
  min-height: 120px;
  padding: 16px;
}
.phone-body p {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.7;
}
.nav-tip {
  margin-top: 12px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.nav-tabs-bar {
  --k-navbar-side-min: 30px;
}
</style>