<template>
  <KSpace align="center" wrap>
    <KKbd value="Ctrl + K" />
    <KKbd value="mod + shift + P" />
    <KKbd :keys="['Esc']" />
    <KKbd value="↑ + ↑ + ↓ + ↓" />
  </KSpace>
</template>

<script setup lang="ts">
import KKbd from 'kit/vue/ui/components/Kbd/Kbd.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>