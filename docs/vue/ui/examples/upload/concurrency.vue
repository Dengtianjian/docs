<template>
  <div style="max-width: 460px">
    <KUpload v-model:file-list="files" :upload="upload" :concurrency="2" multiple />
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      并发上限 2：超出部分排队，前一个完成后自动补位。当前执行 {{ active }} / 峰值 {{ peak }}。
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KUpload from 'kit/vue/ui/components/data-entry/Upload/Upload.vue'
import type { KUploadFile, KUploadUpload } from 'kit/vue/ui/components/data-entry/Upload/Upload.vue'
import { createMockRequest } from './_mock'

const files = ref<KUploadFile[]>([])
const active = ref(0)
const peak = ref(0)
const mock = createMockRequest({ stepMs: 120 })

const upload: KUploadUpload = (ctx) => {
  let finished = false
  active.value += 1
  peak.value = Math.max(peak.value, active.value)
  ;(window as any).__uploadStats = { active: active.value, peak: peak.value }
  const done = () => {
    if (finished) return
    finished = true
    active.value = Math.max(0, active.value - 1)
    ;(window as any).__uploadStats = { active: active.value, peak: peak.value }
  }
  const handle = mock({
    ...ctx,
    onSuccess: (resp) => {
      done()
      ctx.onSuccess(resp)
    },
    onError: (err) => {
      done()
      ctx.onError(err)
    },
  })
  return {
    abort() {
      done()
      if (handle && typeof handle === 'object' && 'abort' in handle) handle.abort()
    },
  }
}
</script>
