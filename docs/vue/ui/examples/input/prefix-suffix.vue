<template>
  <KSpace size="md" direction="vertical" style="width: 260px">
    <KInput v-model="kw" clearable placeholder="搜索">
      <template #prefix><component :is="Search" /></template>
    </KInput>
    <KInput v-model="mail" placeholder="邮箱">
      <template #prefix><component :is="Mail" /></template>
      <template #suffix>.com</template>
    </KInput>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, Mail } from '@vicons/tabler'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const kw = ref('')
const mail = ref('')
</script>
