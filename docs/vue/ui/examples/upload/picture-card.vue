<script setup lang="ts">
import { ref } from 'vue'
import KUpload from 'kit/vue/ui/components/Upload/Upload.vue'
import type { KUploadFile } from 'kit/vue/ui/components/Upload/Upload.vue'
import { createMockRequest, svgImage } from './_mock'

const files = ref<KUploadFile[]>([
  { uid: 'seed-a', name: '设计稿-A.svg', url: svgImage('设计稿 A', '#2f54eb'), status: 'done' },
])
const upload = createMockRequest()
</script>

<template>
  <div style="max-width: 460px">
    <KUpload
      v-model:file-list="files"
      :upload="upload"
      list-type="picture-card"
      :max-count="4"
      sortable
      multiple
    />
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      卡片墙：hover 出现「预览 / 删除」；点图片打开内置 KPreview 画廊（可切换/缩放）；到达 maxCount 后「+」块消失；
      sortable 下卡片可左右拖拽换顺序（按横向中点判定插前/插后）。
    </p>
  </div>
</template>