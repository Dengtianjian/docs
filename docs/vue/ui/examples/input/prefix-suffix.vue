<template>
  <KFlex gap="md" vertical style="width: 260px">
    <KInput v-model="kw" clearable placeholder="搜索">
      <template #prefix><component :is="Search" /></template>
    </KInput>
    <KInput v-model="mail" placeholder="邮箱">
      <template #prefix><component :is="Mail" /></template>
      <template #suffix>.com</template>
    </KInput>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, Mail } from '@vicons/tabler'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const kw = ref('')
const mail = ref('')
</script>
