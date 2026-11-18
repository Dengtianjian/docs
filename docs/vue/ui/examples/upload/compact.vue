<script setup lang="ts">
import { ref } from 'vue'
import KUpload from 'kit/vue/ui/components/Upload/Upload.vue'
import type { KUploadChangeReason, KUploadFile, KUploadFileItem } from 'kit/vue/ui/components/Upload/Upload.vue'
import { createMockRequest, svgImage } from './_mock'

const upload = createMockRequest()
const lastReason = ref('')

function onChange(_list: KUploadFileItem[], info: { reason: KUploadChangeReason }) {
  lastReason.value = info.reason
}

const cards = ref<KUploadFile[]>([
  { uid: 'seed-c1', name: '封面.svg', url: svgImage('封面', '#722ed1'), status: 'done' },
  { uid: 'seed-c2', name: '插图.svg', url: svgImage('插图', '#fa8c16'), status: 'done' },
])
const pictures = ref<KUploadFile[]>([
  { uid: 'seed-p1', name: 'banner.svg', url: svgImage('Banner', '#13c2c2'), status: 'done' },
])
const texts = ref<KUploadFile[]>([
  { uid: 'seed-t1', name: '季度报告.pdf', status: 'done', size: 380 * 1024 },
])
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px; max-width: 460px">
    <div>
      <p style="margin: 0 0 8px; font-size: 13px; font-weight: 600">卡片墙（picture-card）</p>
      <KUpload
        v-model:file-list="cards"
        :upload="upload"
        list-type="picture-card"
        accept="image/*"
        :max-count="3"
        :show-actions="false"
        click-to-upload
        @change="onChange"
      />
    </div>
    <div>
      <p style="margin: 0 0 8px; font-size: 13px; font-weight: 600">图片列表（picture）</p>
      <KUpload
        v-model:file-list="pictures"
        :upload="upload"
        list-type="picture"
        accept="image/*"
        :max-count="3"
        :show-actions="false"
        click-to-upload
        @change="onChange"
      />
    </div>
    <div>
      <p style="margin: 0 0 8px; font-size: 13px; font-weight: 600">文件列表（text）</p>
      <KUpload
        v-model:file-list="texts"
        :upload="upload"
        :show-actions="false"
        click-to-upload
        @change="onChange"
      />
    </div>
    <p style="margin: 0; font-size: 12px; color: #888">
      showActions=false：hover 不出现「预览 / 删除」；clickToUpload：卡片墙 hover 显示黑底白色图标蒙层，图片列表与文件列表 hover 行尾出现与删除同款的「重新上传」图标按钮，
      点选文件后原位替换并重新上传（change reason=replace）。最近 reason：{{ lastReason || '—' }}
    </p>
  </div>
</template>