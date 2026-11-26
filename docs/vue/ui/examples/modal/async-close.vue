<template>
  <KFlex gap="lg" align="center" wrap>
    <KModal ref="modalRef" v-model:open="open" title="异步保存后关闭" :before-close="guardClose">
      <template #trigger><KButton type="primary">打开弹窗</KButton></template>
      <p style="margin: 0 0 12px">
        X / 蒙层 / Esc 与底部「保存并关闭」都会先走 <code>beforeClose</code>：名称为空时拒绝关闭，否则等待 900ms 模拟保存。
      </p>
      <KInput v-model="name" placeholder="名称（为空时关闭会被阻止）" />
      <template #footer>
        <KFlex justify="end" gap="sm">
          <KButton @click="open = false">取消（直接关）</KButton>
          <KButton type="primary" :loading="saving" @click="modalRef?.close()">保存并关闭</KButton>
        </KFlex>
      </template>
    </KModal>
    <span style="font-size: 12px; color: var(--k-color-text-tertiary)">{{ status }}</span>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KModal from 'kit/vue/ui/components/feedback/Modal/Modal.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const open = ref(false)
const name = ref('')
const saving = ref(false)
const status = ref('等待操作')
const modalRef = ref<{ close: () => Promise<void> } | null>(null)

async function guardClose() {
  if (!name.value.trim()) {
    status.value = '名称为空，已阻止关闭'
    return false
  }
  saving.value = true
  status.value = '保存中，关闭请求已挂起…'
  await new Promise(resolve => setTimeout(resolve, 900))
  saving.value = false
  status.value = '保存完成，允许关闭'
  return true
}
</script>