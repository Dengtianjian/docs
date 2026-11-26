<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KSteps
      v-for="size in sizes"
      :key="size"
      v-model:current="current"
      variant="panel"
      :size="size"
      clickable
    >
      <KStep title="提交申请" description="填写基础信息" />
      <KStep title="资料审核" description="预计 1 个工作日" />
      <KStep title="完成开通" description="审核通过后自动生效" />
    </KSteps>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSteps from 'kit/vue/ui/components/navigation/Steps/Steps.vue'
import KStep from 'kit/vue/ui/components/navigation/Steps/Step.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KStepsSize } from 'kit/vue/ui'

const current = ref(1)
const sizes: KStepsSize[] = ['sm', 'md', 'lg']
</script>