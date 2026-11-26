<template>
  <KFlex vertical gap="md" align="start">
    <KInput v-model="name" placeholder="先填写名称，满足条件才允许打开弹窗" style="width: 300px" />
    <KFlex gap="lg" align="center">
      <KModal
        :open="open"
        title="提交审核"
        @update:open="onRequest"
        @close="hint = '已关闭'"
      >
        <template #trigger><KButton type="primary">打开弹窗</KButton></template>
        <p style="margin: 0">名称「{{ name }}」已满足条件，弹窗通过受控 <code>open</code> 打开。</p>
      </KModal>
      <span style="font-size: 12px; color: var(--k-color-text-tertiary)">{{ hint }}</span>
    </KFlex>

    <KFlex gap="lg" align="center">
      <KCheckbox v-model="agree">我已确认风险</KCheckbox>
      <KModal :open="guardedOpen" title="危险操作" placement="center" :width="380" @update:open="onGuardedRequest">
        <template #trigger><KButton type="danger" variant="outlined">删除全部</KButton></template>
        <p style="margin: 0">勾选确认后才会打开；未勾选时点击触发按钮只给出提示。</p>
      </KModal>
      <span style="font-size: 12px; color: var(--k-color-text-tertiary)">{{ guardedHint }}</span>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KModal from 'kit/vue/ui/components/feedback/Modal/Modal.vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KCheckbox from 'kit/vue/ui/components/data-entry/Checkbox/Checkbox.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const name = ref('')
const open = ref(false)
const hint = ref('未打开')
const agree = ref(false)
const guardedOpen = ref(false)
const guardedHint = ref('未勾选时不会打开')

function onRequest(next: boolean) {
  if (!next) {
    open.value = false
    return
  }
  if (!name.value.trim()) {
    hint.value = '请先填写名称'
    return
  }
  open.value = true
  hint.value = '已打开'
}

function onGuardedRequest(next: boolean) {
  if (!next) {
    guardedOpen.value = false
    return
  }
  if (!agree.value) {
    guardedHint.value = '请先勾选确认'
    return
  }
  guardedOpen.value = true
  guardedHint.value = '已打开'
}
</script>