<template>
  <div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <img
        v-for="(it, i) in items"
        :key="it.name"
        :src="it.src"
        :alt="it.alt"
        style="width: 96px; height: 64px; object-fit: cover; border-radius: 8px; cursor: pointer"
        @click="show(i)"
      />
    </div>
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      点击缩略图从对应张打开；←/→ 切换（带滑动动画）、+/− 缩放、0 复位、Esc 关闭；工具栏可旋转/翻转，点暗色空白处关闭。状态：{{ open ? '打开中' : '已关闭' }}，当前第 {{ current + 1 }} 张。
    </p>
    <KPreview v-model:open="open" v-model:current="current" :items="items" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KPreview from 'kit/vue/ui/components/Preview/Preview.vue'

const svg = (label: string, color: string) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300"><rect width="480" height="300" fill="${color}"/><text x="240" y="168" font-size="44" fill="#fff" text-anchor="middle" font-family="sans-serif">${label}</text></svg>`,
  )

const items = [
  { src: svg('一号图', '#2f54eb'), name: '一号图.svg', alt: '一号图' },
  { src: svg('二号图', '#13c2c2'), name: '二号图.svg', alt: '二号图' },
  { src: svg('三号图', '#fa541c'), name: '三号图.svg', alt: '三号图' },
]
const open = ref(false)
const current = ref(0)

function show(index: number) {
  current.value = index
  open.value = true
}
</script>
