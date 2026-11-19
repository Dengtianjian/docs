<template>
  <div style="max-width: 420px">
    <KUpload
      v-model:file-list="files"
      :upload="upload"
      :max-count="3"
      :max-size="1024 * 1024 * 2"
      accept=".txt,.png,.jpg,.pdf"
      @change="onChange"
      @reject="onReject"
    />
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      最多 3 个、单个 ≤ 2MB、accept 过滤；进度由 mock upload 阶梯回传。{{ log }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KUpload from 'kit/vue/ui/components/Upload/Upload.vue'
import type { KUploadFile, KUploadFileItem } from 'kit/vue/ui/components/Upload/Upload.vue'
import { createMockRequest } from './_mock'

const files = ref<KUploadFile[]>([])
const log = ref('尚未操作')
const upload = createMockRequest()

function onChange(list: KUploadFileItem[], info: { reason: string }) {
  log.value = `${info.reason} · 当前 ${list.length} 个文件`
}
function onReject(file: File, reason: string) {
  log.value = `拒绝 ${file.name}（${reason}）`
}
</script>
