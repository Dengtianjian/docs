<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <KSpace size="xs:8 md:sm lg:lg" wrap style="max-width: 420px">
      <KButton v-for="i in 6" :key="i">字符串 {{ i }}</KButton>
    </KSpace>
    <KSpace :size="{ xs: 'xs', md: 'md' }" wrap style="max-width: 420px">
      <KButton v-for="i in 6" :key="i">对象 {{ i }}</KButton>
    </KSpace>
  </div>
</template>

<script setup lang="ts">
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
</script>
