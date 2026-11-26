<template>
  <div>
    <KButton type="primary" @click="open = true">打开（音频 / PDF / Office 内置渲染）</KButton>
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      第 2 项音频使用内置播放器；第 3 项 PDF 用浏览器内置阅读器嵌入；第 4 项 Office 文档只展示文件卡与打开入口。
    </p>
    <KPreview v-model:open="open" v-model:current="current" :items="items" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KPreview from 'kit/vue/ui/components/data-display/Preview/Preview.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import type { KPreviewItem } from 'kit/vue/ui/components/data-display/Preview/Preview.vue'

const svg = (label: string, color: string) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300"><rect width="480" height="300" fill="${color}"/><text x="240" y="168" font-size="44" fill="#fff" text-anchor="middle" font-family="sans-serif">${label}</text></svg>`,
  )

const items: KPreviewItem[] = [
  { src: svg('封面图', '#1677ff'), name: '封面图.svg' },
  {
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
    name: '示例音频.mp3',
  },
  {
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    name: '示例文档.pdf',
  },
  { src: 'https://example.com/files/季度报告.docx', name: '季度报告.docx' },
]

const open = ref(false)
const current = ref(1)
</script>