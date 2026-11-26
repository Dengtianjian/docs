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
import { defineComponent, h } from 'vue'
import KTabBar from 'kit/vue/ui/components/navigation/TabBar/TabBar.vue'
import type { KTabBarItem } from 'kit/vue/ui'

function svg(children: ReturnType<typeof h>[]) {
  return defineComponent({
    setup() {
      return () =>
        h(
          'svg',
          {
            viewBox: '0 0 16 16',
            width: '1em',
            height: '1em',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': 1.5,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'aria-hidden': 'true',
          },
          children,
        )
    },
  })
}

const HomeIcon = svg([h('path', { d: 'M2.8 7.2 8 2.8l5.2 4.4V13H9.8V9.8H6.2V13H2.8z' })])
const SearchIcon = svg([
  h('circle', { cx: 7.2, cy: 7.2, r: 4.2 }),
  h('path', { d: 'M10.4 10.4 14 14' }),
])
const MessageIcon = svg([h('path', { d: 'M2.8 3.4h10.4v7.2H7.2L4 13.2V10.6H2.8z' })])
const UserIcon = svg([
  h('circle', { cx: 8, cy: 5.4, r: 2.6 }),
  h('path', { d: 'M3.2 13.2c.6-2.3 2.5-3.6 4.8-3.6s4.2 1.3 4.8 3.6' }),
])

const active = ref('home')
const last = ref('')
const items: KTabBarItem[] = [
  { key: 'home', title: '首页', icon: HomeIcon },
  { key: 'discover', title: '发现', icon: SearchIcon, badge: 3 },
  { key: 'message', title: '消息', icon: MessageIcon, badge: true },
  { key: 'profile', title: '我的', icon: UserIcon },
]

function onChange(key: string) {
  last.value = key
}
</script>

<style scoped>
.phone-frame {
  display: flex;
  flex-direction: column;
  width: 320px;
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