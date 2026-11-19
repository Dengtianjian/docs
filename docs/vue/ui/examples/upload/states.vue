<template>
  <div style="max-width: 460px">
    <KUpload
      v-model:file-list="files"
      :upload="upload"
      :remove="removeHook"
      multiple
      @error="onError"
      @reject="onReject"
      @retry="onRetry"
    />
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      upload 返回 false 拒 .exe / Promise&lt;false&gt; 异步拒 .log；上传失败的项显示「上传失败」+ 重试；protected.txt 删除会被拦截。{{ log }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KUpload from 'kit/vue/ui/components/Upload/Upload.vue'
import type { KUploadFile, KUploadFileItem, KUploadUpload } from 'kit/vue/ui/components/Upload/Upload.vue'
import { createMockRequest } from './_mock'

// 同名文件第一次失败、重试成功（failOnce 命中即删）
const mock = createMockRequest({ failOnce: new Set(['失败一次.txt']) })
// upload 一处裁决：返回 false 同步拒绝，Promise<false> 异步拒绝，其余交给 mock
const upload: KUploadUpload = (options) => {
  if (options.file.name.endsWith('.exe')) return false
  if (options.file.name.endsWith('.log')) return Promise.resolve(false)
  return mock(options)
}
const files = ref<KUploadFile[]>([])
const log = ref('')

function onError(file: KUploadFileItem) {
  log.value = `${file.name} 上传失败，点行尾重试图标可重试`
}
function onReject(file: File, reason: string) {
  log.value = `${file.name} 被拒绝（${reason}）`
}
async function removeHook(file: KUploadFileItem) {
  if (file.name === 'protected.txt') {
    log.value = `${file.name} 受保护，remove 返回 false 已拦截删除`
    return false
  }
  return true
}
function onRetry(file: KUploadFileItem) {
  log.value = `${file.name} 触发重传（retry 事件）`
}
</script>
