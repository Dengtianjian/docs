<template>
  <KFlex wrap>
    <KButton type="primary" :loading="loading" @click="simulate">
      {{ loading ? '提交中…' : '点击模拟异步提交' }}
    </KButton>
    <KButton type="primary" loading>Loading</KButton>
    <KButton type="primary" disabled>Disabled</KButton>
    <KButton disabled>Disabled</KButton>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const loading = ref(false)

function simulate() {
  loading.value = true
  setTimeout(() => (loading.value = false), 1200)
}
</script>
