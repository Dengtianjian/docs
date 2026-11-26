<template>
  <div class="anchor-horizontal-demo">
    <KAnchor
      class="anchor-horizontal-nav"
      direction="horizontal"
      :items="items"
      :target="() => scrollEl"
      :target-offset="12"
      @change="onChange"
    />
    <div ref="scrollEl" class="anchor-horizontal-scroll">
      <section id="anchor-horizontal-overview">
        <h3>概览</h3>
        <p>横向模式把高亮段放在底部，跟随当前项移动。</p>
        <p v-for="n in 3" :key="n">补充说明 {{ n }}：用于拉高章节高度，方便观察高亮切换。</p>
      </section>
      <section id="anchor-horizontal-install">
        <h3>安装</h3>
        <p>点击锚点或滚动内容时，高亮段会同步移动到当前章节。</p>
        <p v-for="n in 3" :key="n">补充说明 {{ n }}：安装章节的补充内容。</p>
      </section>
      <section id="anchor-horizontal-usage">
        <h3>使用</h3>
        <p>target 传滚动容器，targetOffset 同时影响高亮阈值与跳转落点。</p>
        <p v-for="n in 3" :key="n">补充说明 {{ n }}：使用章节的补充内容。</p>
      </section>
      <section id="anchor-horizontal-faq">
        <h3>常见问题</h3>
        <p>横向模式建议使用单层锚点，多级锚点更适合纵向排列。</p>
        <p v-for="n in 3" :key="n">补充说明 {{ n }}：常见问题的补充内容。</p>
      </section>
    </div>
    <div class="anchor-tip">当前锚点：{{ active || '—' }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KAnchor from 'kit/vue/ui/components/navigation/Anchor/Anchor.vue'
import type { KAnchorItem } from 'kit/vue/ui'

const scrollEl = ref<HTMLElement | null>(null)
const active = ref('overview')

const items: KAnchorItem[] = [
  { key: 'overview', href: '#anchor-horizontal-overview', title: '概览' },
  { key: 'install', href: '#anchor-horizontal-install', title: '安装' },
  { key: 'usage', href: '#anchor-horizontal-usage', title: '使用' },
  { key: 'faq', href: '#anchor-horizontal-faq', title: '常见问题' },
]

function onChange(key: string) {
  active.value = key
}
</script>

<style scoped>
.anchor-horizontal-demo {
  max-width: 620px;
}
.anchor-horizontal-nav {
  padding: 0 4px;
}
.anchor-horizontal-scroll {
  height: 260px;
  padding: 0 16px;
  overflow: auto;
  border: 1px solid var(--k-color-border-secondary);
  border-top: 0;
  border-radius: 0 0 var(--k-border-radius) var(--k-border-radius);
}
.anchor-horizontal-scroll section {
  padding: 8px 0 24px;
}
.anchor-horizontal-scroll h3 {
  margin: 0 0 8px;
  font-size: var(--k-font-size);
}
.anchor-horizontal-scroll p {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.7;
}
.anchor-tip {
  margin-top: 12px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>