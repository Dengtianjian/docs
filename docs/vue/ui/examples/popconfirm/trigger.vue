<template>
  <KFlex vertical gap="md" align="start">
    <KInput v-model="name" placeholder="先填写名称，满足条件才允许弹出确认" style="width: 300px" />
    <KFlex gap="lg" align="center">
      <KPopconfirm
        :open="open"
        title="确认提交？"
        description="名称非空时才会打开确认气泡"
        @update:open="onRequest"
        @confirm="open = false; hint = '已确认'"
        @cancel="open = false; hint = '已取消'"
      >
        <template #trigger><KButton>提交</KButton></template>
      </KPopconfirm>
      <span style="font-size: 12px; color: var(--k-color-text-tertiary)">{{ hint }}</span>
    </KFlex>

    <KFlex gap="lg" align="center">
      <KSwitch v-model="allow" size="sm" />
      <span style="font-size: 12px; color: var(--k-color-text-tertiary)">disabled 条件：{{ allow ? '可弹出' : '不弹出' }}</span>
      <KPopconfirm :disabled="!allow" title="受 disabled 控制" @confirm="hint = '禁用组已确认'">
        <template #trigger><KButton>受条件控制</KButton></template>
      </KPopconfirm>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KPopconfirm from 'kit/vue/ui/components/feedback/Popconfirm/Popconfirm.vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KSwitch from 'kit/vue/ui/components/data-entry/Switch/Switch.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const name = ref('')
const open = ref(false)
const allow = ref(true)
const hint = ref('等待操作')

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
  hint.value = '已打开确认气泡'
}
</script>