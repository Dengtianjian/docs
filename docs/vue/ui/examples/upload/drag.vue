<script setup lang="ts">
import { ref } from 'vue'
import KUpload from 'kit/vue/ui/components/Upload/Upload.vue'
import type { KUploadFile } from 'kit/vue/ui/components/Upload/Upload.vue'
import { createMockRequest } from './_mock'

const files = ref<KUploadFile[]>([])
const upload = createMockRequest()
</script>

<template>
  <div style="max-width: 420px">
    <KUpload v-model:file-list="files" :upload="upload" drag multiple />
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      drag 开启后根区域整体可拖放，拖入时出现「释放以上传」提示；multiple 允许多选。
    </p>
  </div>
</template>