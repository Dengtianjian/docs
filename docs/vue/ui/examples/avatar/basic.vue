<template>
  <KFlex vertical gap="lg">
    <KFlex align="center" gap="lg">
      <KAvatar text="如" size="xs" />
      <KAvatar text="如" size="sm" />
      <KAvatar text="如" size="md" />
      <KAvatar text="如" size="lg" />
      <KAvatar text="如" :size="56" />
    </KFlex>
    <KFlex align="center" gap="lg">
      <KAvatar text="方" shape="square" />
      <KAvatar text="框" shape="square" color="#7c5cff" />
      <KAvatar text="边" bordered />
      <KAvatar alt="Alice" />
      <KAvatar>
        <template #icon>
          <span>★</span>
        </template>
      </KAvatar>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import KAvatar from 'kit/vue/ui/components/data-display/Avatar/Avatar.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
</script>