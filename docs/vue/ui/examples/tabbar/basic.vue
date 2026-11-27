<template>
  <div>
    <div class="phone-frame">
      <div class="phone-body">
        <p>底部标签栏：图标 + 文案 + 角标，支持受控切换与键盘左右移动。</p>
        <p>当前页面：{{ active }}</p>
      </div>
      <KTabBar
        v-model:active="active"
        :items="items"
        :fixed="false"
        @change="onChange"
      />
    </div>
    <div class="tab-tip">最近切换：{{ last || '—' }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconHome, IconMessage, IconSearch, IconUser } from '@tabler/icons-vue'
import KTabBar from 'kit/vue/ui/components/navigation/TabBar/TabBar.vue'
import type { KTabBarItem } from 'kit/vue/ui'

const active = ref('home')
const last = ref('')
const items: KTabBarItem[] = [
  { key: 'home', title: '首页', icon: IconHome },
  { key: 'discover', title: '发现', icon: IconSearch, badge: 3 },
  { key: 'message', title: '消息', icon: IconMessage, badge: true },
  { key: 'profile', title: '我的', icon: IconUser },
]

function onChange(key: string) {
  last.value = key
}
</script>

<style scoped>
.phone-frame {
  display: flex;
  flex-direction: column;
  width: 375px;
  height: 260px;
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