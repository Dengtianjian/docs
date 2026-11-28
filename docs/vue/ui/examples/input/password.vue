<template>
  <KFlex vertical gap="md" style="width: 100%; max-width: 340px">
    <KInput v-model="value" type="password" disable-autofill placeholder="默认显示切换按钮" @password-visible-change="visible = $event" />
    <KInput v-model="value" type="password" disable-autofill :show-password="false" placeholder="showPassword=false" />
    <div style="font-size: 12px; color: var(--k-color-text-tertiary)">passwordVisibleChange: {{ visible }}</div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const value = ref('secret-123')
const visible = ref(false)
</script>
