<script setup lang="ts">
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const sizes = ['xs', 'sm', 'md', 'lg'] as const
</script>

<template>
  <KSpace align="center" wrap>
    <KButton v-for="s in sizes" :key="s" type="primary" :size="s">{{ s }}</KButton>
  </KSpace>
</template>
