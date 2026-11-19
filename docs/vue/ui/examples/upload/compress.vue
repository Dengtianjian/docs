<template>
  <div style="max-width: 460px">
    <KButton size="sm" style="margin-bottom: 8px" @click="addSample">生成 1600×1200 示例图</KButton>
    <KUpload
      ref="uploader"
      v-model:file-list="files"
      :upload="upload"
      :compress="{ maxWidth: 800, maxHeight: 800, quality: 0.75 }"
      accept="image/*"
    />
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      原始 {{ original ? `${Math.round(original / 1024)} KB` : '—' }} → 压缩后
      {{ compressed ? `${Math.round(compressed / 1024)} KB` : '—' }}（长边 ≤ 800）
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KUpload from 'kit/vue/ui/components/Upload/Upload.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import type { KUploadFile } from 'kit/vue/ui/components/Upload/Upload.vue'
import { createMockRequest } from './_mock'

const uploader = ref<InstanceType<typeof KUpload> | null>(null)
const files = ref<KUploadFile[]>([])
const original = ref(0)
const compressed = ref(0)
const upload = createMockRequest()

async function addSample() {
  const canvas = document.createElement('canvas')
  canvas.width = 1600
  canvas.height = 1200
  const ctx = canvas.getContext('2d')!
  const grad = ctx.createLinearGradient(0, 0, 1600, 1200)
  grad.addColorStop(0, '#1677ff')
  grad.addColorStop(1, '#ff7a45')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 1600, 1200)
  for (let i = 0; i < 120; i++) {
    ctx.fillStyle = `hsl(${i * 3}, 80%, 60%)`
    ctx.beginPath()
    ctx.arc((i * 137) % 1600, (i * 91) % 1200, 18, 0, Math.PI * 2)
    ctx.fill()
  }
  const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.95))
  if (!blob) return
  const file = new File([blob], 'sample.jpg', { type: 'image/jpeg' })
  original.value = file.size
  compressed.value = 0
  uploader.value?.addFiles([file])
  setTimeout(() => {
    compressed.value = files.value[0]?.size ?? 0
    ;(window as any).__compressStats = { original: original.value, compressed: compressed.value, type: files.value[0]?.raw?.type }
  }, 250)
}
</script>
