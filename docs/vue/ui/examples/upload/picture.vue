<template>
  <div style="max-width: 420px">
    <KUpload v-model:file-list="files" :upload="upload" list-type="picture" multiple />
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      图片缩略图优先用 thumbUrl，其次 url；新上传的图片在没有 url 时用本地 raw 对象 URL 即时出图。
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KUpload from 'kit/vue/ui/components/Upload/Upload.vue'
import type { KUploadFile } from 'kit/vue/ui/components/Upload/Upload.vue'
import { createMockRequest, svgImage } from './_mock'

const files = ref<KUploadFile[]>([
  { uid: 'seed-1', name: '山景预览.svg', url: svgImage('山景', '#13c2c2'), status: 'done' },
  { uid: 'seed-2', name: '晚霞预览.svg', url: svgImage('晚霞', '#fa541c'), status: 'done' },
])
const upload = createMockRequest()
</script>
