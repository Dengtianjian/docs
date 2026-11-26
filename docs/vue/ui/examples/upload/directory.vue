<template>
  <div style="max-width: 420px">
    <KUpload v-model:file-list="files" :upload="upload" directory />
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      选择文件夹会递归收集其中文件（webkitdirectory），列表名保留相对路径；目录选择强制多选，仍受 maxCount / maxSize 约束。
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KUpload from 'kit/vue/ui/components/data-entry/Upload/Upload.vue'
import type { KUploadFile } from 'kit/vue/ui/components/data-entry/Upload/Upload.vue'
import { createMockRequest } from './_mock'

const files = ref<KUploadFile[]>([])
const upload = createMockRequest()
</script>
