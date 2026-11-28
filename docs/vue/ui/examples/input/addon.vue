<template>
  <KFlex gap="md" vertical style="width: 320px">
    <KInput v-model="site" before="https://" after=".com" placeholder="example" />
    <KInput v-model="price" size="sm" before="¥" after="RMB" placeholder="0.00" />
    <KInput v-model="pkg" size="lg" placeholder="包名">
      <template #before>npm</template>
      <template #after>latest</template>
    </KInput>
    <KInput v-model="readonly" before="ID" disabled placeholder="禁用态" />
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const site = ref('ruyi-kit')
const price = ref('')
const pkg = ref('kit')
const readonly = ref('')
</script>