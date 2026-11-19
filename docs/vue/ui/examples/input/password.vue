<template>
  <KSpace direction="vertical" size="md" style="width: 100%; max-width: 340px">
    <KInput v-model="value" type="password" placeholder="默认显示切换按钮" @password-visible-change="visible = $event" />
    <KInput v-model="value" type="password" :show-password="false" placeholder="showPassword=false" />
    <div style="font-size: 12px; color: var(--k-color-text-tertiary)">passwordVisibleChange: {{ visible }}</div>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const value = ref('secret-123')
const visible = ref(false)
</script>
