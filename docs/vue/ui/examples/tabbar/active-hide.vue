<template>
  <div>
    <div class="phone-frame">
      <div class="phone-body">
        <p>activeHide 控制选中项隐藏文案或图标，单项可覆盖。</p>
        <p>动画仅本演示通过 classNames + 样式叠加：{{ currentLabel }}</p>
      </div>
      <KTabBar
        v-model:active="active"
        :items="items"
        :fixed="false"
        :active-hide="activeHide"
        :class-names="{ root: 'ah-bar' }"
      />
    </div>
    <KSegmented v-model="mode" :options="modes" class="mode-seg" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { IconHome, IconMessage, IconUser } from '@tabler/icons-vue'
import KTabBar from 'kit/vue/ui/components/navigation/TabBar/TabBar.vue'
import KSegmented from 'kit/vue/ui/components/data-entry/Segmented/Segmented.vue'
import type { KTabBarItem } from 'kit/vue/ui'

type Mode = 'none' | 'label' | 'icon'

const active = ref('home')
const mode = ref<Mode>('label')
const modes = [
  { label: '都显示', value: 'none' },
  { label: '隐藏文案', value: 'label' },
  { label: '隐藏图标', value: 'icon' },
]
const activeHide = computed(() => (mode.value === 'none' ? undefined : mode.value))
const currentLabel = computed(() => modes.find(item => item.value === mode.value)?.label)

const items: KTabBarItem[] = [
  { key: 'home', title: '首页', icon: IconHome },
  { key: 'message', title: '消息', icon: IconMessage, badge: 3 },
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
.mode-seg {
  margin-top: 14px;
}
/* 仅本演示：把默认的瞬时隐藏改成过渡动画 */
.ah-bar :deep(.k-tabbar__item .k-tabbar__label) {
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  max-height: 22px;
  opacity: 1;
  transform: translateY(0);
  transition:
    max-height 0.25s ease,
    opacity 0.2s ease,
    transform 0.25s ease,
    font-size 0.2s ease;
}
.ah-bar :deep(.k-tabbar__item.is-hide-label .k-tabbar__label) {
  display: inline-flex;
  max-height: 0;
  opacity: 0;
  transform: translateY(4px);
}
.ah-bar :deep(.k-tabbar__item .k-tabbar__icon) {
  display: inline-flex;
  overflow: hidden;
  max-width: 44px;
  max-height: 24px;
  opacity: 1;
  transform: scale(1);
  transition:
    max-width 0.25s ease,
    max-height 0.25s ease,
    opacity 0.2s ease,
    transform 0.25s ease;
}
.ah-bar :deep(.k-tabbar__item.is-hide-icon .k-tabbar__icon) {
  display: inline-flex;
  max-width: 0;
  max-height: 0;
  opacity: 0;
  transform: scale(0.6);
}
/* 图标收起后：文字居中并放大 */
.ah-bar :deep(.k-tabbar__item.is-hide-icon .k-tabbar__label) {
  font-size: var(--k-font-size);
  transform: translateY(1px);
}
</style>