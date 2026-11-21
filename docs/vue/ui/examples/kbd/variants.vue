<template>
  <KSpace direction="vertical" size="md">
    <KSpace align="center" wrap>
      <KKbd value="Ctrl + C" size="sm" />
      <KKbd value="Ctrl + V" size="md" />
      <KKbd value="Ctrl + S" size="lg" />
    </KSpace>
    <KSpace align="center" wrap>
      <KKbd value="Ctrl + K" variant="outline" />
      <KKbd value="Ctrl + K" variant="filled" />
      <KKbd value="Ctrl + K" variant="ghost" />
      <KKbd value="Ctrl + K" disabled />
    </KSpace>
  </KSpace>
</template>

<script setup lang="ts">
import KKbd from 'kit/vue/ui/components/Kbd/Kbd.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>