<template>
  <KFlex vertical gap="md">
    <div v-for="v in variants" :key="v" style="display: flex; align-items: center; gap: 12px">
      <span style="width: 84px; font-size: 12px; color: var(--k-color-text-tertiary)">{{ v }}</span>
      <KPinInput v-model="code[v]" :variant="v" :length="4" />
    </div>
    <div style="display: flex; align-items: center; gap: 12px">
      <span style="width: 84px; font-size: 12px; color: var(--k-color-text-tertiary)">password</span>
      <KPasswordInput v-model="pwd" variant="underlined" :length="6" />
    </div>
    <span style="font-size: 12px; color: var(--k-color-text-tertiary)">KPasscodeInput / KPasswordInput 预设同样透传 variant。</span>
  </KFlex>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import KPinInput from 'kit/vue/ui/components/data-entry/PinInput/PinInput.vue'
import KPasswordInput from 'kit/vue/ui/components/data-entry/PasswordInput/PasswordInput.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const variants = ['outlined', 'filled', 'borderless', 'underlined'] as const
const code = reactive<Record<(typeof variants)[number], string>>({
  outlined: '',
  filled: '',
  borderless: '',
  underlined: '',
})
const pwd = ref('')
</script>