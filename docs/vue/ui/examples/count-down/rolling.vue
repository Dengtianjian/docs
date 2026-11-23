<template>
  <KFlex vertical gap="md">
    <div class="display">
      <KRollingText :value="value" :duration="650" />
      <span class="unit">单</span>
    </div>
    <KFlex>
      <KButton size="sm" @click="value += 137">增加 137</KButton>
      <KButton size="sm" variant="outline" @click="value = 0">归零</KButton>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KRollingText from 'kit/vue/ui/components/RollingText/RollingText.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const value = ref(1024)
</script>

<style scoped>
.display {
  display: flex;
  align-items: baseline;
  gap: 4px;
  color: var(--k-color-primary-text);
  font-size: 34px;
}
.unit {
  font-size: var(--k-font-size);
  color: var(--k-color-text-tertiary);
}
</style>