<template>
  <div style="max-width: 460px">
    <KButton size="sm" style="margin-bottom: 8px" @click="addSample">生成 1MB 示例文件</KButton>
    <KUpload
      ref="uploader"
      v-model:file-list="files"
      :upload="upload"
      :merge="merge"
      :chunk-size="256 * 1024"
      :chunk-concurrency="2"
    />
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      256KB 分片 / 并发 2：分片调用 {{ chunkCalls }} 次，merge {{ mergeCalls }} 次，分片峰值并发 {{ peak }}。
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KUpload from 'kit/vue/ui/components/data-entry/Upload/Upload.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import type { KUploadFile, KUploadUpload, KUploadMerge } from 'kit/vue/ui/components/data-entry/Upload/Upload.vue'

const uploader = ref<InstanceType<typeof KUpload> | null>(null)
const files = ref<KUploadFile[]>([])
const chunkCalls = ref(0)
const mergeCalls = ref(0)
const peak = ref(0)
let active = 0

const upload: KUploadUpload = (ctx) => {
  const chunk = ctx.chunk!
  let finished = false
  active += 1
  peak.value = Math.max(peak.value, active)
  chunkCalls.value += 1
  const timer = setTimeout(() => {
    if (finished) return
    finished = true
    active = Math.max(0, active - 1)
    ctx.onProgress(100)
    ctx.onSuccess({ part: chunk.index, etag: `etag-${chunk.index}` })
  }, 140)
  return {
    abort() {
      clearTimeout(timer)
      if (!finished) {
        finished = true
        active = Math.max(0, active - 1)
      }
    },
  }
}

const merge: KUploadMerge = ({ chunkCount, responses }) =>
  new Promise(resolve => {
    setTimeout(() => {
      mergeCalls.value += 1
      ;(window as any).__chunkStats = { chunks: chunkCalls.value, mergeCalls: mergeCalls.value, peak: peak.value }
      resolve({ url: `data:text/plain,${encodeURIComponent(`merged ${chunkCount} parts: ${JSON.stringify(responses)}`)}` })
    }, 160)
  })

function addSample() {
  const file = new File([new Uint8Array(1024 * 1024)], 'large.bin', { type: 'application/octet-stream' })
  uploader.value?.addFiles([file])
  ;(window as any).__chunkStats = { chunks: 0, mergeCalls: 0, peak: 0 }
}
</script>
