<template>
  <div>
    <div class="phone-frame">
      <div class="phone-body">
        <p>悬浮胶囊 + 左侧 AI 入口，组合组件见 `KTabBarCapsule`。</p>
        <p>首页选中直接切换为图片（activeIcon），无过渡动画。</p>
        <p>当前：{{ active }}</p>
      </div>
      <KTabBarCapsule v-model:active="active" :items="items">
        <template #accessory>
          <div class="ai-avatar">AI</div>
        </template>
      </KTabBarCapsule>
    </div>
    <div class="tab-tip">其它项选中只变主题色，文字保持显示</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineComponent, h } from 'vue'
import {
  IconBrandYoutube,
  IconCurrencyYuan,
  IconHome,
  IconMessageCircle,
  IconUser,
} from '@tabler/icons-vue'
import KTabBarCapsule from 'kit/vue/ui/components/navigation/TabBar/Capsule.vue'
import type { KTabBarItem } from 'kit/vue/ui'

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#1677ff"/><text x="24" y="33" text-anchor="middle" font-size="26" font-family="PingFang SC, Microsoft YaHei, sans-serif" fill="#ffffff">支</text></svg>`
const AlipayActiveIcon = defineComponent({
  setup() {
    return () =>
      h('img', {
        src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(logoSvg)}`,
        width: 44,
        height: 44,
        alt: '首页',
        class: 'ai-logo',
        style: 'display: block; border-radius: 50%',
      })
  },
})

const active = ref('home')
const items: KTabBarItem[] = [
  {
    key: 'home',
    title: '首页',
    icon: IconHome,
    activeIcon: AlipayActiveIcon,
    activeHide: 'label',
  },
  { key: 'finance', title: '理财', icon: IconCurrencyYuan },
  { key: 'video', title: '视频', icon: IconBrandYoutube },
  { key: 'message', title: '消息', icon: IconMessageCircle },
  { key: 'profile', title: '我的', icon: IconUser },
]
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
.ai-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd93b 0%, #ff8ac2 38%, #7fd0ff 68%, #b28bff 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.14);
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
}
.tab-tip {
  margin-top: 12px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.phone-frame :deep(.ai-logo) {
  animation: capsule-logo-in 0.32s var(--k-motion-ease-out) both;
}
@keyframes capsule-logo-in {
  0% {
    opacity: 0;
    transform: scale(0.7);
  }
  60% {
    opacity: 1;
    transform: scale(1.06);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>