<template>
  <KSpace wrap>
    <KButton v-for="t in types" :key="t" :type="t">{{ t }}</KButton>
  </KSpace>
</template>

<script setup lang="ts">
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const types = ['default', 'primary', 'info', 'success', 'warning', 'danger', 'link'] as const
</script>
