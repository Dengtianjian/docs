<template>
  <div style="display: grid; grid-template-columns: repeat(3, 96px); gap: 8px">
    <template v-for="row in ROWS" :key="row[0]">
      <KButton v-for="p in row" :key="p" @click="show(p)">{{ LABEL[p] }}</KButton>
    </template>
  </div>
  <div style="margin-top: 12px">
    <KModal
      title="动画原点 CSS 通道"
      :width="360"
      :styles="{ dialog: { '--k-modal-transform-origin': '20% 80%' } }"
    >
      <template #trigger><KButton type="primary" variant="soft">动画原点 CSS 通道（20% 80%）</KButton></template>
      <p style="margin: 0">
        落位管屏幕位置，动画原点另走 <code>--k-modal-transform-origin</code> 变量（此处 20% 80%，靠左下胀出）。业务 CSS 覆写该变量同样生效。
      </p>
    </KModal>
  </div>

  <KModal
    v-model:open="open"
    :placement="placement"
    :title="`屏幕落位：${LABEL[placement]}`"
    :width="360"
  >
    <p style="margin: 0">
      弹窗停在视口「{{ LABEL[placement] }}」格。缘距沿用 wrap 留白：上/下排 80、左/右列 24、center 四边 20；
      zoom 动画原点仍走点击自动记录，与落位互不干涉。
    </p>
  </KModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KModal from 'kit/vue/ui/components/Modal/Modal.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import type { KModalPlacement } from 'kit/vue/ui'

const ROWS: KModalPlacement[][] = [
  ['top-left', 'top', 'top-right'],
  ['left', 'center', 'right'],
  ['bottom-left', 'bottom', 'bottom-right'],
]
const LABEL: Record<KModalPlacement, string> = {
  'top-left': '左上',
  top: '上中',
  'top-right': '右上',
  left: '左中',
  center: '中间',
  right: '右中',
  'bottom-left': '左下',
  bottom: '中下',
  'bottom-right': '右下',
}

const open = ref(false)
const placement = ref<KModalPlacement>('center')

function show(p: KModalPlacement) {
  placement.value = p
  open.value = true
}
</script>
