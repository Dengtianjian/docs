<template>
  <KSpace direction="vertical" size="lg">
    <KSpace align="center" size="lg">
      <KAvatar text="如" size="xs" />
      <KAvatar text="如" size="sm" />
      <KAvatar text="如" size="md" />
      <KAvatar text="如" size="lg" />
      <KAvatar text="如" :size="56" />
    </KSpace>
    <KSpace align="center" size="lg">
      <KAvatar text="方" shape="square" />
      <KAvatar text="框" shape="square" color="#7c5cff" />
      <KAvatar text="边" bordered />
      <KAvatar alt="Alice" />
      <KAvatar>
        <template #icon>
          <span>★</span>
        </template>
      </KAvatar>
    </KSpace>
  </KSpace>
</template>

<script setup lang="ts">
import KAvatar from 'kit/vue/ui/components/Avatar/Avatar.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>