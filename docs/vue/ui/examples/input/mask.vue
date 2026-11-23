<template>
  <KFlex vertical gap="md" style="width: 100%; max-width: 340px">
    <KInput v-model="card" mask="#### #### #### ####" placeholder="4242 4242 4242 4242" />
    <KFlex gap="sm">
      <KInput v-model="expiry" mask="##/##" placeholder="MM/YY" />
      <KInput v-model="cvc" mask="###" maxlength="3" placeholder="CVC" />
    </KFlex>
    <KInput v-model="phone" mask="### #### ####" placeholder="138 0013 8000" />
    <KInput v-model="raw" mask="### #### ####" unmask placeholder="unmask：只回写数字" />
    <div style="font-size: 12px; color: var(--k-color-text-tertiary)">
      v-model：{{ card || '—' }} / {{ expiry || '—' }} / {{ raw || '—' }}
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const card = ref('4242 4242 4242 4242')
const expiry = ref('')
const cvc = ref('')
const phone = ref('')
const raw = ref('')
</script>