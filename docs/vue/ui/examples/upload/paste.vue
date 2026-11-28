<template>
  <div style="max-width: 420px; outline: none">
    <KUpload v-model:file-list="files" :upload="upload" paste />
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      在页面任意位置按 Ctrl/Cmd+V 粘贴文件或截图；纯文本粘贴不拦截。
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
