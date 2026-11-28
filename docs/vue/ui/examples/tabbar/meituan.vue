<template>
  <div>
    <div class="phone-frame">
      <div class="phone-body">
        <p>中间悬浮品牌图标，比两侧高出一截。</p>
        <p>选中后换成实心图标，图标与文字用主题色；中间图标有选中态。</p>
        <p>回弹默认关闭，可用 `bounce` 总开关；购物车单项保持关闭。</p>
      </div>
      <KTabBar
        v-model:active="active"
        :items="items"
        :fixed="false"
        :bounce="bounce"
        :styles="{ item: { color: '#4b4b4d' }, itemActive: { color: 'var(--k-color-primary)' } }"
      />
    </div>
    <div class="bounce-row">
      <KSwitch v-model="bounce" />
      <span>回弹动效（购物车单项已关闭）</span>
    </div>
    <div class="tab-tip">参考美团：tabler 图标 + 选中实心</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineComponent, h } from 'vue'
import {
  IconBrandYoutube,
  IconBrandYoutubeFilled,
  IconMoodSmileFilled,
  IconShoppingCart,
  IconShoppingCartFilled,
  IconSmartHome,
  IconSparklesFilled,
  IconUser,
  IconUserFilled,
} from '@tabler/icons-vue'
import KTabBar from 'kit/vue/ui/components/navigation/TabBar/TabBar.vue'
import KSwitch from 'kit/vue/ui/components/data-entry/Switch/Switch.vue'
import type { KTabBarItem } from 'kit/vue/ui'

const CenterLogo = defineComponent({
  props: { active: Boolean },
  setup(props) {
    return () =>
      h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '52px',
            height: '52px',
            marginTop: props.active ? '-26px' : '-22px',
            borderRadius: '50%',
            border: `3px solid ${props.active ? 'var(--k-color-primary)' : '#ffffff'}`,
            background: 'linear-gradient(135deg,#ffd93b 0%,#ff8ac2 38%,#7fd0ff 68%,#b28bff 100%)',
            boxShadow: props.active
              ? '0 6px 18px rgba(0, 0, 0, 0.22)'
              : '0 2px 6px rgba(0, 0, 0, 0.14)',
            transition: 'margin-top .2s ease, border-color .2s ease, box-shadow .2s ease',
          },
        },
        [h(IconMoodSmileFilled, { size: 28, stroke: 2, color: '#ffffff' })],
      )
  },
})

const active = ref('home')
const bounce = ref(false)
const items: KTabBarItem[] = [
  { key: 'home', title: '首页', activeTitle: '推荐', icon: IconSmartHome, activeIcon: IconSparklesFilled },
  { key: 'video', title: '视频', icon: IconBrandYoutube, activeIcon: IconBrandYoutubeFilled },
  { key: 'brand', ariaLabel: '小团', render: scope => h(CenterLogo, { active: scope.active }) },
  { key: 'cart', title: '购物车', icon: IconShoppingCart, activeIcon: IconShoppingCartFilled, bounce: false },
  { key: 'profile', title: '我的', icon: IconUser, activeIcon: IconUserFilled },
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
.bounce-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>