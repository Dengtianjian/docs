<template>
  <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start">
    <KButton type="primary" @click="input?.click()">选择图片并裁剪</KButton>
    <input ref="input" type="file" accept="image/*" hidden @change="onPick" />
    <img v-if="result" :src="result" alt="裁剪结果" style="max-width: 260px; border-radius: 8px" />
    <KImageCropper v-if="file" :file="file" @confirm="onConfirm" @cancel="onCancel" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KImageCropper from 'kit/vue/ui/components/ImageCropper/ImageCropper.vue'

const input = ref<HTMLInputElement | null>(null)
const file = ref<File | null>(null)
const result = ref('')

function onPick(e: Event) {
  const target = e.target as HTMLInputElement
  const picked = target.files?.[0] ?? null
  target.value = ''
  if (!picked) return
  file.value = picked
}

function onCancel() {
  file.value = null
}

function onConfirm(cropped: File) {
  if (result.value) URL.revokeObjectURL(result.value)
  result.value = URL.createObjectURL(cropped)
  ;(window as any).__cropped = { name: cropped.name, size: cropped.size, type: cropped.type }
}
</script>
