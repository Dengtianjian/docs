<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <KFlex wrap>
      <KButton v-for="v in variants" :key="v" :variant="v">{{ v }}</KButton>
    </KFlex>
    <KFlex wrap>
      <KButton v-for="v in variants" :key="v" type="primary" :variant="v">{{ v }}</KButton>
    </KFlex>
    <KFlex wrap>
      <KButton v-for="v in variants" :key="v" type="danger" :variant="v">{{ v }}</KButton>
    </KFlex>
  </div>
</template>

<script setup lang="ts">
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const variants = ['outlined', 'filled', 'tonal', 'text', 'quiet', 'dashed', 'ghost', 'plain', 'soft', 'border'] as const
</script>
