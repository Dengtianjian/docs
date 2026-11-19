<template>
  <div>
    <KButton type="primary" @click="open = true">打开（加载 / 失败 / 缩略图兜底）</KButton>
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      第 2 项缩略图地址无效 → 缩略条显示名称占位；第 3/4 项大图与视频地址无效 → 打开后显示失败卡（可重试/打开原文件）；第 5 项远程大图可观察加载态（需联网）。
    </p>
    <KPreview v-model:open="open" :items="items" />
    <div style="margin-top: 12px">
      <KButton size="sm" @click="slowOpen = true">打开单张慢速大图（观察骨架）</KButton>
      <KPreview v-model:open="slowOpen" :items="slowItems" :thumbnails="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KPreview from 'kit/vue/ui/components/Preview/Preview.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import type { KPreviewItem } from 'kit/vue/ui/components/Preview/Preview.vue'

const svg = (label: string, color: string) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300"><rect width="480" height="300" fill="${color}"/><text x="240" y="168" font-size="40" fill="#fff" text-anchor="middle" font-family="sans-serif">${label}</text></svg>`,
  )

const items: KPreviewItem[] = [
  { src: svg('正常图片', '#2f54eb'), name: '正常图片.svg' },
  {
    src: svg('大图正常，缩略图失败', '#13c2c2'),
    name: '缩略图加载失败.svg',
    thumbnail: 'https://invalid.invalid/missing-thumb.png',
  },
  {
    src: 'https://invalid.invalid/missing-image.png',
    name: '大图加载失败.png',
    thumbnail: svg('失败缩略图', '#fa541c'),
  },
  {
    src: 'https://invalid.invalid/missing-video.mp4',
    name: '视频加载失败.mp4',
    poster: svg('视频封面', '#722ed1'),
  },
  {
    src: 'https://picsum.photos/2000/1400.jpg',
    name: '远程大图（观察加载态，需联网）',
  },
]

const open = ref(false)
const slowOpen = ref(false)
const slowItems: KPreviewItem[] = [
  {
    src: `https://picsum.photos/2400/1600.jpg?random=${Date.now()}`,
    name: '慢速大图（骨架屏，需联网）',
  },
]
</script>
