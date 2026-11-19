<template>
  <div>
    <KButton type="primary" @click="open = true">打开（resolveType 判定）</KButton>
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      第 1/2 项由 kind 判定为 image/video；第 3 项 src 是 data:image，但 kind=contract 被 resolveType 判成 pdf，命中 renderers.pdf。
    </p>
    <KPreview v-model:open="open" :items="items" :resolve-type="resolveType" :renderers="renderers" />
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import KPreview from 'kit/vue/ui/components/Preview/Preview.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import type { KPreviewItem, KPreviewRenderer } from 'kit/vue/ui/components/Preview/Preview.vue'

const svg = (label: string, color: string) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300"><rect width="480" height="300" fill="${color}"/><text x="240" y="168" font-size="40" fill="#fff" text-anchor="middle" font-family="sans-serif">${label}</text></svg>`,
  )

// src 是 data:image（后缀本该推断为图片），但业务字段 kind=contract 决定按 PDF 渲染
const items: KPreviewItem[] = [
  { src: svg('业务图片', '#2f54eb'), name: '封面（无后缀判断需求）', kind: 'image' },
  {
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    name: '演示视频（kind=video）',
    kind: 'video',
    poster: svg('视频封面', '#722ed1'),
  },
  { src: svg('合同扫描件', '#fa541c'), name: '合同扫描件（kind=contract）', kind: 'contract' },
]

function resolveType(item: KPreviewItem): string | undefined {
  const kind = (item as { kind?: string }).kind
  return kind === 'contract' ? 'pdf' : kind
}

const pdfRenderer: KPreviewRenderer = ({ item, type }) =>
  h('div', { class: 'demo-resolve-pdf' }, [
    h('strong', item.name),
    h('p', `resolveType 返回 "${type}"，优先于 src 后缀推断。`),
    h('a', { href: item.src, target: '_blank', rel: 'noopener' }, '打开原文件'),
  ])

const renderers = { pdf: pdfRenderer }
const open = ref(false)
</script>

<style>
.demo-resolve-pdf {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: min(560px, 80vw);
  padding: 28px;
  border-radius: 12px;
  background: rgb(255 255 255 / 0.12);
  color: #fff;
  text-align: center;
}
.demo-resolve-pdf p {
  margin: 0;
  color: rgb(255 255 255 / 0.7);
  font-size: 13px;
}
.demo-resolve-pdf a {
  color: #fff;
}
</style>
