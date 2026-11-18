<script setup lang="ts">
import { ref } from 'vue'
import KUpload from 'kit/vue/ui/components/Upload/Upload.vue'
import type { KUploadFile, KUploadFileItem } from 'kit/vue/ui/components/Upload/Upload.vue'
import { createMockRequest } from './_mock'

const files = ref<KUploadFile[]>([])
const upload = createMockRequest({ stepMs: 90 })
const log = ref('')

function onChange(list: KUploadFileItem[], info: { reason: string }) {
  if (info.reason === 'move') log.value = `已移到第 ${list.findIndex((f) => f.uid === info.file?.uid) + 1} 位`
}
function onReorder(_list: KUploadFileItem[], info: { file: KUploadFileItem; from: number; to: number; position: string }) {
  log.value = `reorder 事件：${info.file.name} 第 ${info.from + 1} 位 → 第 ${info.to + 1} 位（${info.position}）`
}
</script>

<template>
  <div style="max-width: 440px">
    <KUpload
      v-model:file-list="files"
      :upload="upload"
      drag
      sortable
      multiple
      @change="onChange"
      @reorder="onReorder"
    />
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      sortable 开启后列表项可拖拽换顺序（行内上/下半区决定插在目标前/后）；与拖文件进根区域互不干扰。{{ log }}
    </p>
  </div>
</template>