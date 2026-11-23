<template>
  <KFlex vertical gap="md" style="width: 100%">
    <KAlert
      v-for="row in rows"
      :key="row.variant"
      :type="row.type"
      :variant="row.variant"
      :message="row.message"
      :description="row.description"
    />
  </KFlex>
</template>

<script setup lang="ts">
import KAlert from 'kit/vue/ui/components/Alert/Alert.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
import type { KAlertVariant } from 'kit/vue/ui/components/Alert/Alert.vue'

const rows: { variant: KAlertVariant; type: 'info' | 'success' | 'warning' | 'error'; message: string; description: string }[] = [
  { variant: 'outlined', type: 'info', message: 'outlined（缺省）', description: '浅底 + 描边，图标用语义色。' },
  { variant: 'filled', type: 'success', message: 'filled', description: '语义色实底 + 白字，用于强提醒。' },
  { variant: 'tonal', type: 'warning', message: 'tonal', description: '灰底 + 语义色文字，弱化背景但保留强调。' },
  { variant: 'text', type: 'error', message: 'text', description: '无底无边框，只保留语义色图文。' },
  { variant: 'plain', type: 'warning', message: 'plain', description: '贴边通告条：直角、去左右边框，保留上下边框。' },
  { variant: 'soft', type: 'warning', message: 'soft', description: '贴边通告条的无边框档：直角、四边无边框；等价布尔 banner 的旧观感。' },
]
</script>