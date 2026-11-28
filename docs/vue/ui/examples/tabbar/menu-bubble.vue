<template>
  <div>
    <div class="phone-frame">
      <div class="phone-body">
        <p>「服务」带 children，气泡子菜单锚定在点击项上方。</p>
        <p>子项图标可单独设色（iconColor）；再点收起，点外部或 Esc 关闭。</p>
        <p>最近选择：{{ last || '—' }}</p>
      </div>
      <KTabBar
        v-model:active="active"
        :items="items"
        menu-variant="bubble"
        :fixed="false"
        @child-click="onChild"
      />
    </div>
    <div class="tab-tip">气泡宽度随内容，左右超出会自动收进栏内</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IconCalendarEvent,
  IconDownload,
  IconHeadset,
  IconHome,
  IconMessageCircle,
  IconUser,
} from '@tabler/icons-vue'
import KTabBar from 'kit/vue/ui/components/navigation/TabBar/TabBar.vue'
import type { KTabBarChild, KTabBarItem } from 'kit/vue/ui'

const active = ref('home')
const last = ref('')
const items: KTabBarItem[] = [
  { key: 'home', title: '首页', icon: IconHome },
  {
    key: 'service',
    title: '服务',
    icon: IconMessageCircle,
    children: [
      { key: 'course', title: '课程预约', icon: IconCalendarEvent, iconColor: '#1677ff' },
      { key: 'download', title: '资料下载', icon: IconDownload, iconColor: '#52c41a' },
      { key: 'support', title: '在线客服', icon: IconHeadset, iconColor: '#fa8c16' },
    ],
  },
  { key: 'profile', title: '我的', icon: IconUser },
]

function onChild(key: string, child: KTabBarChild) {
  last.value = String(child.title ?? key)
}
</script>

<style scoped>
.phone-frame {
  display: flex;
  flex-direction: column;
  width: 375px;
  height: 300px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: 18px;
  overflow: hidden;
  background: var(--k-color-bg-layout);
}
.phone-body {
  flex: 1;
  min-height: 0;
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