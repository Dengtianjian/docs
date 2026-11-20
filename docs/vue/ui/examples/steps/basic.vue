<template>
  <KSpace direction="vertical" size="lg" style="width: 100%">
    <KSteps :current="current">
      <KStep title="提交申请" description="2026-11-19 10:20" />
      <KStep title="审核中" description="预计 1 个工作日" />
      <KStep title="完成" description="审核通过后自动开通" />
    </KSteps>
    <KSpace>
      <KButton size="sm" :disabled="current === 0" @click="current--">上一步</KButton>
      <KButton size="sm" type="primary" :disabled="current === 2" @click="current++">下一步</KButton>
    </KSpace>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSteps from 'kit/vue/ui/components/Steps/Steps.vue'
import KStep from 'kit/vue/ui/components/Steps/Step.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const current = ref(1)
</script>