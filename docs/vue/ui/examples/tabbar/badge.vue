<template>
  <div>
    <div class="phone-frame">
      <div class="phone-body">
        <p>badge 传数字或文本按内容显示，传 true 显示红点。</p>
        <p>当前：{{ active }}</p>
      </div>
      <KTabBar v-model:active="active" :items="items" :fixed="false" />
    </div>
    <div class="tab-tip">角标：数字 12 / 文本 99+ / 红点 / 无</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconBell, IconClipboardCheck, IconMessage, IconUser } from '@tabler/icons-vue'
import KTabBar from 'kit/vue/ui/components/navigation/TabBar/TabBar.vue'
import type { KTabBarItem } from 'kit/vue/ui'

const active = ref('message')
const items: KTabBarItem[] = [
  { key: 'message', title: '消息', icon: IconMessage, badge: 12 },
  { key: 'task', title: '任务', icon: IconClipboardCheck, badge: '99+' },
  { key: 'notice', title: '通知', icon: IconBell, badge: true },
  { key: 'profile', title: '我的', icon: IconUser },
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