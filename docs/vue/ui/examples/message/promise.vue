<template>
  <KFlex gap="lg" wrap align="center">
    <KButton type="primary" :disabled="running" @click="run(true)">成功任务</KButton>
    <KButton type="danger" variant="outlined" :disabled="running" @click="run(false)">失败任务</KButton>
    <span style="font-size: 12px; color: var(--k-color-text-tertiary)">{{ log }}</span>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useKApp } from 'kit/vue/ui/composables/useKApp'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const { message } = useKApp()!
const running = ref(false)
const log = ref('等待执行')

async function run(ok: boolean) {
  running.value = true
  log.value = '任务执行中…'
  try {
    const result = await message!.promise(
      () =>
        new Promise<string>((resolve, reject) =>
          setTimeout(() => (ok ? resolve('同步 42 条记录') : reject(new Error('网络超时'))), 1200),
        ),
      {
        loading: '正在同步…',
        success: '同步完成',
        error: e => `同步失败：${(e as Error).message}`,
      },
    )
    log.value = `已返回：${result}`
  } catch (e) {
    log.value = `异常透传：${(e as Error).message}`
  } finally {
    running.value = false
  }
}
</script>