<template>
  <div style="max-width: 460px">
    <KUpload
      v-model:file-list="files"
      :upload="upload"
      list-type="picture-circle"
      :max-count="4"
      sortable
      multiple
    />
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      圆形卡片墙：卡片与「+」块同尺寸正圆，蒙层与上传/失败遮罩随圆裁切；hover 出黑底图标操作蒙层，sortable 下可左右拖拽换顺序。
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KUpload from 'kit/vue/ui/components/Upload/Upload.vue'
import type { KUploadFile } from 'kit/vue/ui/components/Upload/Upload.vue'
import { createMockRequest, svgImage } from './_mock'

const files = ref<KUploadFile[]>([
  { uid: 'seed-r1', name: '头像.svg', url: svgImage('头像', '#2f54eb'), status: 'done' },
])
const upload = createMockRequest()
</script>
