<template>
  <div>
    <div class="anchor-demo">
      <KAnchor
        class="anchor-nav"
        :items="items"
        :target="() => scrollEl"
        :target-offset="12"
        @change="onChange"
      />
      <div ref="scrollEl" class="anchor-scroll">
        <section id="anchor-demo-overview">
          <h3>概览</h3>
          <p>锚点组件监听滚动容器，自动高亮当前所在章节。</p>
          <p>点击链接使用平滑滚动，并同步浏览器 hash。</p>
          <p v-for="n in 3" :key="n">补充说明 {{ n }}：用于拉高章节高度，方便观察滚动与高亮切换。</p>
        </section>
        <section id="anchor-demo-install">
          <h3>安装</h3>
          <p>从 kit/vue/ui/components/Anchor/Anchor.vue 按需引入。</p>
          <p>items 使用 key + href 描述目标，children 可嵌套。</p>
          <p v-for="n in 3" :key="n">补充说明 {{ n }}：安装章节的补充内容。</p>
        </section>
        <section id="anchor-demo-usage">
          <h3>使用</h3>
          <p>target 传滚动容器引用；缺省监听 window。</p>
          <p>targetOffset 同时影响高亮阈值与跳转落点。</p>
          <p v-for="n in 3" :key="n">补充说明 {{ n }}：使用章节的补充内容。</p>
        </section>
        <section id="anchor-demo-faq">
          <h3>常见问题</h3>
          <p>href 必须是 #id 形式，组件按 id 查找目标节点。</p>
          <p>标题顺序应与 DOM 顺序一致，便于高亮判定。</p>
          <p v-for="n in 3" :key="n">补充说明 {{ n }}：常见问题的补充内容。</p>
        </section>
      </div>
    </div>
    <div class="anchor-tip">当前锚点：{{ active || '—' }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KAnchor from 'kit/vue/ui/components/Anchor/Anchor.vue'
import type { KAnchorItem } from 'kit/vue/ui'

const scrollEl = ref<HTMLElement | null>(null)
const active = ref('overview')

const items: KAnchorItem[] = [
  {
    key: 'overview',
    href: '#anchor-demo-overview',
    title: '概览',
    children: [{ key: 'install', href: '#anchor-demo-install', title: '安装' }],
  },
  { key: 'usage', href: '#anchor-demo-usage', title: '使用' },
  { key: 'faq', href: '#anchor-demo-faq', title: '常见问题' },
]

function onChange(key: string) {
  active.value = key
}
</script>

<style scoped>
.anchor-demo {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 20px;
  height: 280px;
}
.anchor-nav {
  align-self: start;
}
.anchor-scroll {
  height: 100%;
  padding: 0 16px;
  overflow: auto;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
}
.anchor-scroll section {
  padding: 8px 0 24px;
}
.anchor-scroll h3 {
  margin: 0 0 8px;
  font-size: var(--k-font-size);
}
.anchor-scroll p {
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