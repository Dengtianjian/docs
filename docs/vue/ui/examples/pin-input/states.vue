<template>
  <KSpace direction="vertical" size="lg" align="start">
    <KPinInput v-model="code" mask otp :length="4" aria-label="支付密码" />
    <KPinInput v-model="code" size="sm" :length="4" />
    <KPinInput v-model="code" size="lg" :length="4" status="error" />
    <KPinInput model-value="1234" disabled :length="4" />
    <KPinInput model-value="1234" readonly :length="4" />
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KPinInput from 'kit/vue/ui/components/PinInput/PinInput.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const code = ref('')
</script>
