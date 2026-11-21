<template>
  <KSpace direction="vertical" size="md" align="start">
    <KPinInput
      v-model="code"
      :length="6"
      :status="status"
      otp
      @complete="onComplete"
    />
    <p class="tip" :class="status">{{ message }}</p>
    <p class="tip">支持整段粘贴、退格回退、方向键移动与 Home / End 跳转。</p>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KPinInput from 'kit/vue/ui/components/PinInput/PinInput.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const code = ref('')
const status = ref<'error' | undefined>(undefined)
const message = ref('请输入 6 位验证码，正确验证码为 123456。')

function onComplete(value: string) {
  if (value === '123456') {
    status.value = undefined
    message.value = '验证通过'
  } else {
    status.value = 'error'
    message.value = '验证码不正确，请重新输入'
  }
}
</script>

<style scoped>
.tip {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.tip.error {
  color: var(--k-color-error);
}
</style>
