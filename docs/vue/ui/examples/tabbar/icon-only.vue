<template>
  <div>
    <div class="phone-frame">
      <div class="phone-body">
        <p>不传 title 时只显示图标，入口用 ariaLabel 提供读屏名。</p>
        <p>首页选中换成填充图标（activeIcon），其余沿用线性图标。</p>
        <p>当前：{{ active }}</p>
      </div>
      <KTabBar v-model:active="active" :items="items" :fixed="false" />
    </div>
    <div class="tab-tip">图标 20px，条目等分</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IconHome,
  IconHomeFilled,
  IconMessage,
  IconSearch,
  IconSettings,
  IconUser,
} from '@tabler/icons-vue'
import KTabBar from 'kit/vue/ui/components/navigation/TabBar/TabBar.vue'
import type { KTabBarItem } from 'kit/vue/ui'

const active = ref('home')
const items: KTabBarItem[] = [
  { key: 'home', icon: IconHome, activeIcon: IconHomeFilled, ariaLabel: '首页' },
  { key: 'discover', icon: IconSearch, ariaLabel: '发现' },
  { key: 'message', icon: IconMessage, ariaLabel: '消息' },
  { key: 'profile', icon: IconUser, ariaLabel: '我的' },
  { key: 'setting', icon: IconSettings, ariaLabel: '设置' },
]
</script>

<style scoped>
.phone-frame {
  display: flex;
  flex-direction: column;
  width: 375px;
  height: 220px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: 18px;
  overflow: hidden;
  background: var(--k-color-bg-layout);
}
.phone-body {
  flex: 1;
  padding: 16px;
}
.phone-body p {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.7;
}
.tab-tip {
  margin-top: 12px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>