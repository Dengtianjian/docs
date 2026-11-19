<template>
  <KInput v-model="value" loading placeholder="加载状态" style="width: 100%; max-width: 340px" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'

const value = ref('正在同步…')
</script>
