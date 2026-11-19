<script setup lang="ts">
import { ref } from 'vue'
import KUpload from 'kit/vue/ui/components/Upload/Upload.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import type { KUploadFile } from 'kit/vue/ui/components/Upload/Upload.vue'
import { createMockRequest } from './_mock'

const uploader = ref<InstanceType<typeof KUpload> | null>(null)
const files = ref<KUploadFile[]>([])
const upload = createMockRequest()

function addSample() {
  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 600
  const ctx = canvas.getContext('2d')!
  const grad = ctx.createLinearGradient(0, 0, 800, 600)
  grad.addColorStop(0, '#1677ff')
  grad.addColorStop(1, '#52c41a')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 800, 600)
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 96px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('CROP', 400, 330)
  canvas.toBlob((blob) => {
    if (blob) uploader.value?.addFiles([new File([blob], 'crop-sample.jpg', { type: 'image/jpeg' })])
  }, 'image/jpeg', 0.9)
}
</script>

<template>
  <div style="max-width: 460px">
    <KButton size="sm" style="margin-bottom: 8px" @click="addSample">生成 800×600 示例图</KButton>
    <KUpload
      ref="uploader"
      v-model:file-list="files"
      :upload="upload"
      crop
      list-type="picture"
      accept="image/*"
    />
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      选图后弹层裁剪：拖动框移动，四角 + 四边中点自由缩放（可裁长方形），确定后才入列；取消或关闭不产生文件。
    </p>
  </div>
</template>
