<script setup lang="ts">
import { h, ref } from 'vue'
import KPreview from 'kit/vue/ui/components/Preview/Preview.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import type { KPreviewItem, KPreviewRenderer } from 'kit/vue/ui/components/Preview/Preview.vue'

const svg = (label: string, color: string) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300"><rect width="480" height="300" fill="${color}"/><text x="240" y="168" font-size="44" fill="#fff" text-anchor="middle" font-family="sans-serif">${label}</text></svg>`,
  )

const items: KPreviewItem[] = [
  { src: svg('封面图', '#2f54eb'), name: '封面图.svg' },
  {
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    name: '示例视频.mp4',
    poster: svg('视频封面', '#722ed1'),
  },
  {
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    name: '示例文档.pdf',
  },
]

const pdfRenderer: KPreviewRenderer = ({ item }) =>
  h('div', { class: 'demo-pdf' }, [
    h('strong', item.name),
    h('p', 'PDF 渲染由业务接管：注册在 renderers.pdf 上。'),
    h('a', { href: item.src, target: '_blank', rel: 'noopener' }, '打开原文件'),
  ])

const renderers = { pdf: pdfRenderer }
const open = ref(false)
const current = ref(1)
</script>

<template>
  <div>
    <KButton type="primary" @click="open = true">打开（视频 + 自定义 PDF）</KButton>
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      第 2 项按后缀识别为视频，使用内置播放器（手动播放）；第 3 项识别为 pdf，由 renderers.pdf 接管；底部缩略图点击可跳转。
    </p>
    <KPreview
      v-model:open="open"
      v-model:current="current"
      :items="items"
      :renderers="renderers"
    />
  </div>
</template>

<style>
.demo-pdf {
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
.demo-pdf p {
  margin: 0;
  color: rgb(255 255 255 / 0.7);
  font-size: 13px;
}
.demo-pdf a {
  color: #fff;
}
</style>