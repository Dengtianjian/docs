<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KSteps v-model:current="current" direction="vertical" variant="panel" clickable>
      <KStep title="提交申请" description="填写基础信息与联系人" />
      <KStep title="资料审核" description="预计 1 个工作日完成审核" />
      <KStep title="完成开通" description="审核通过后自动生效" />
    </KSteps>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSteps from 'kit/vue/ui/components/Steps/Steps.vue'
import KStep from 'kit/vue/ui/components/Steps/Step.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const current = ref(1)
</script>