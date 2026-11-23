<template>
  <KFlex gap="md" vertical style="width: 260px">
    <KInput v-model="limited" :maxlength="20" show-count placeholder="maxlength=20 + showCount" />
    <KInput v-model="free" show-count placeholder="仅 showCount" />
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const limited = ref('ruyi-kit')
const free = ref('无上限也可见计数')
</script>
