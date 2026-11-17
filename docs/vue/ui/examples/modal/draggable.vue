<script setup lang="ts">
import { ref } from 'vue'
import KModal from 'kit/vue/ui/components/Modal/Modal.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSwitch from 'kit/vue/ui/components/Switch/Switch.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const draggable = ref(true)
const mask = ref(true)

const paragraphs = Array.from({ length: 12 }, (_, i) =>
  `第 ${i + 1} 段：内容超出视口可用高度时，滚动发生在 body 内部——标题栏保持固定，不会随内容滚走。` +
  '滚动条走组件自己的视觉语言（细轨 + fill 阶梯色），滚到边界也不会把滚动链传给背后的页面。',
)
</script>

<template>
  <KSpace size="lg" wrap align="center">
    <KModal
      title="拖拽 + 内容滚动"
      :draggable="draggable"
      :mask="mask"
    >
      <template #trigger><KButton type="primary">打开长内容弹窗</KButton></template>
      <p style="margin: 0 0 12px; color: var(--k-color-text-secondary)">
        开关在弹窗外，先设好再打开：拖拽开启时按住标题栏移动弹窗；遮罩关闭后背景不再压暗（wrap 仍拦截点击，点空白可关）。
      </p>
      <p v-for="(p, i) in paragraphs" :key="i" style="margin: 0 0 12px">{{ p }}</p>
    </KModal>
    <KSpace size="xs" align="center">
      <span style="color: var(--k-color-text-secondary)">可拖拽</span>
      <KSwitch v-model="draggable" size="small" />
    </KSpace>
    <KSpace size="xs" align="center">
      <span style="color: var(--k-color-text-secondary)">显示遮罩</span>
      <KSwitch v-model="mask" size="small" />
    </KSpace>
  </KSpace>
</template>