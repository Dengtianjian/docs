<template>
  <div>
    <div class="phone-frame">
      <div class="phone-body">
        <p>mode 切换贴底 / 悬浮，radius 控制圆角（数字按 px）。</p>
        <p>当前：{{ floating ? '悬浮' : '贴底' }} · 圆角 {{ radius }}px</p>
      </div>
      <KTabBar
        v-model:active="active"
        :items="items"
        :fixed="false"
        :mode="floating ? 'floating' : 'default'"
        :radius="radius"
      />
    </div>
    <div class="controls">
      <label class="row">
        <KSwitch v-model="floating" />
        <span>悬浮模式</span>
      </label>
      <div class="row radius-row">
        <span>圆角</span>
        <KSlider v-model="radius" :min="0" :max="40" class="radius-slider" />
        <span class="radius-value">{{ radius }}px</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconHome, IconHomeFilled, IconMessage, IconUser } from '@tabler/icons-vue'
import KTabBar from 'kit/vue/ui/components/navigation/TabBar/TabBar.vue'
import KSwitch from 'kit/vue/ui/components/data-entry/Switch/Switch.vue'
import KSlider from 'kit/vue/ui/components/data-entry/Slider/Slider.vue'
import type { KTabBarItem } from 'kit/vue/ui'

const active = ref('home')
const floating = ref(true)
const radius = ref(24)
const items: KTabBarItem[] = [
  { key: 'home', title: '首页', icon: IconHome, activeIcon: IconHomeFilled },
  { key: 'message', title: '消息', icon: IconMessage, badge: 2 },
  { key: 'profile', title: '我的', icon: IconUser },
]
</script>

<style scoped>
.phone-frame {
  display: flex;
  flex-direction: column;
  width: 375px;
  height: 240px;
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
.controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
  max-width: 375px;
}
.row {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.radius-row {
  flex-wrap: wrap;
}
.radius-slider {
  width: 180px;
}
.radius-value {
  min-width: 48px;
  color: var(--k-color-text);
}
</style>