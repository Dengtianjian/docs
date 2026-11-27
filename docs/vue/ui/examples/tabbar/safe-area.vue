<template>
  <div>
    <div class="safe-demos">
      <div class="demo-item">
        <div class="demo-label">safeArea（桌面无 env，用 20px 模拟）</div>
        <div class="phone-frame">
          <div class="phone-body">
            <p>底部预留安全区，标签栏内容避开指示条。</p>
          </div>
          <KTabBar
            v-model:active="activeSafe"
            :items="items"
            :fixed="false"
            :class-names="{ root: 'tabbar-safe' }"
          />
          <span class="home-indicator" />
        </div>
      </div>
      <div class="demo-item">
        <div class="demo-label">safeArea=false（内容贴底）</div>
        <div class="phone-frame">
          <div class="phone-body">
            <p>不预留安全区，指示条会压住标签内容。</p>
          </div>
          <KTabBar v-model:active="activeFlush" :items="items" :fixed="false" :safe-area="false" />
          <span class="home-indicator" />
        </div>
      </div>
    </div>
    <div class="tab-tip">实际设备由 env(safe-area-inset-bottom) 决定，桌面为 0</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconHome, IconMessage, IconUser } from '@tabler/icons-vue'
import KTabBar from 'kit/vue/ui/components/navigation/TabBar/TabBar.vue'
import type { KTabBarItem } from 'kit/vue/ui'

const items: KTabBarItem[] = [
  { key: 'home', title: '首页', icon: IconHome },
  { key: 'message', title: '消息', icon: IconMessage, badge: 3 },
  { key: 'profile', title: '我的', icon: IconUser },
]

const activeSafe = ref('home')
const activeFlush = ref('home')
</script>

<style scoped>
.safe-demos {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.demo-label {
  margin-bottom: 8px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.phone-frame {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 375px;
  height: 230px;
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
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.7;
}
.tabbar-safe {
  padding-bottom: 20px;
}
.home-indicator {
  position: absolute;
  bottom: 6px;
  left: 50%;
  width: 96px;
  height: 4px;
  border-radius: 999px;
  background: var(--k-color-text);
  opacity: 0.85;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 2;
}
.tab-tip {
  margin-top: 12px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>