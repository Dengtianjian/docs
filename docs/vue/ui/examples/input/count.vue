<template>
  <KSpace size="md" direction="vertical" style="width: 260px">
    <KInput v-model="limited" :maxlength="20" show-count placeholder="maxlength=20 + showCount" />
    <KInput v-model="free" show-count placeholder="仅 showCount" />
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const limited = ref('ruyi-kit')
const free = ref('无上限也可见计数')
</script>
