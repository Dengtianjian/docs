<template>
  <KSpace size="md" direction="vertical" style="width: 320px">
    <KInput v-model="site" addon-before="https://" addon-after=".com" placeholder="example" />
    <KInput v-model="price" size="sm" addon-before="¥" addon-after="RMB" placeholder="0.00" />
    <KInput v-model="pkg" size="lg" placeholder="包名">
      <template #addonBefore>npm</template>
      <template #addonAfter>latest</template>
    </KInput>
    <KInput v-model="readonly" addon-before="ID" disabled placeholder="禁用态" />
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const site = ref('ruyi-kit')
const price = ref('')
const pkg = ref('kit')
const readonly = ref('')
</script>