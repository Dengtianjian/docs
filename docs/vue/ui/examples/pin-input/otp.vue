<template>
  <KSpace direction="vertical" size="md">
    <KPinInput
      v-model="otp"
      :length="6"
      :group-size="3"
      separator="-"
      otp
      mask
      size="lg"
      aria-label="短信验证码"
    />
    <p class="tip">OTP 模式会提示系统短信验证码；mask 控制是否隐藏数字。</p>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KPinInput from 'kit/vue/ui/components/PinInput/PinInput.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const otp = ref('')
</script>

<style scoped>
.tip {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>