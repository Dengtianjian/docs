<template>
  <div>
    <div class="phone-frame">
      <div class="phone-body">
        <p>中间是不带标题的操作键，用 render 自绘红色加号。</p>
        <p>发布键点击：{{ publishCount }} 次</p>
      </div>
      <KTabBar
        :active="active"
        @update:active="onUpdate"
        :items="items"
        :fixed="false"
        :styles="{ label: { fontSize: '15px' } }"
      />
    </div>
    <div class="tab-tip">参考小红书千帆：文案 + 中间发布键</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { h } from 'vue'
import { IconPlus } from '@tabler/icons-vue'
import KTabBar from 'kit/vue/ui/components/navigation/TabBar/TabBar.vue'
import type { KTabBarItem } from 'kit/vue/ui'

const active = ref('home')
const publishCount = ref(0)

function onUpdate(key: string) {
  if (key === 'publish') {
    publishCount.value += 1
    return
  }
  active.value = key
}
const items: KTabBarItem[] = [
  { key: 'home', title: '首页' },
  { key: 'message', title: '消息', badge: 1 },
  {
    key: 'publish',
    ariaLabel: '发布',
    render: () =>
      h(
        'span',
        {
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '52px',
            height: '34px',
            borderRadius: '10px',
            background: 'var(--k-color-primary)',
          },
        },
        [h(IconPlus, { size: 20, stroke: 3, color: '#ffffff' })],
      ),
  },
  { key: 'data', title: '数据' },
  { key: 'profile', title: '我的' },
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
.tab-tip {
  margin-top: 12px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>