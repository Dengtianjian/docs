<template>
  <KSpace direction="vertical" size="lg">
    <div class="block">
      <span class="label">支付密码</span>
      <KPasswordInput v-model="password" :length="6" @complete="completed = true" />
    </div>
    <div class="block">
      <span class="label">验证码（PasscodeInput）</span>
      <KPasscodeInput v-model="passcode" :length="4" :group-size="2" />
    </div>
    <p class="tip">{{ completed ? '支付密码已输入完成' : '请输入 6 位数字密码' }}</p>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KPasscodeInput from 'kit/vue/ui/components/PasscodeInput/PasscodeInput.vue'
import KPasswordInput from 'kit/vue/ui/components/PasswordInput/PasswordInput.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const password = ref('')
const passcode = ref('')
const completed = ref(false)
</script>

<style scoped>
.block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.label {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
.tip {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>