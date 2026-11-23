<template>
  <KFlex gap="lg" wrap align="center">
    <KButton v-for="t in types" :key="t.type" @click="fire(t.type)">{{ t.button }}</KButton>
    <KButton type="primary" @click="fireAll">四类齐发</KButton>
  </KFlex>
</template>

<script setup lang="ts">
import { useKApp } from 'kit/vue/ui/composables/useKApp'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
import type { KNotificationType } from 'kit/vue/ui/components/Notification/service'

const { notification } = useKApp()!

const types: { type: KNotificationType; button: string; title: string; description: string }[] = [
  { type: 'info', button: 'info', title: '有新版本可用', description: 'v2.4.0 已发布，可前往设置页更新。' },
  { type: 'success', button: 'success', title: '保存成功', description: '配置已同步到 3 台设备。' },
  { type: 'warning', button: 'warning', title: '证书即将过期', description: '域名证书将在 7 天后到期，请及时续期。' },
  { type: 'error', button: 'error', title: '部署失败', description: '构建日志返回 exit code 1，请查看详情。' },
]

function fire(type: KNotificationType) {
  const meta = types.find(item => item.type === type)!
  notification!.open({
    type,
    title: meta.title,
    description: meta.description,
    placement: 'topRight',
    duration: 4,
  })
}

function fireAll() {
  types.forEach((item, index) => setTimeout(() => fire(item.type), index * 250))
}
</script>