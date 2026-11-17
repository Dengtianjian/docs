<script setup lang="ts">
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const variants = ['outlined', 'filled', 'tonal', 'text', 'quiet', 'dashed', 'ghost', 'plain', 'soft', 'border'] as const
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <KSpace wrap>
      <KButton v-for="v in variants" :key="v" :variant="v">{{ v }}</KButton>
    </KSpace>
    <KSpace wrap>
      <KButton v-for="v in variants" :key="v" type="primary" :variant="v">{{ v }}</KButton>
    </KSpace>
    <KSpace wrap>
      <KButton v-for="v in variants" :key="v" type="danger" :variant="v">{{ v }}</KButton>
    </KSpace>
  </div>
</template>
