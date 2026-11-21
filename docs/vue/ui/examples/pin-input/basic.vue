<template>
  <KSpace direction="vertical" size="lg">
    <KPinInput v-model="code" :group-size="3" separator="·" />
    <p class="value">当前输入：{{ code || '（空）' }}</p>
    <KSpace>
      <KButton size="sm" @click="code = ''">清空</KButton>
      <KButton size="sm" @click="code = '123456'">填充 123456</KButton>
    </KSpace>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KPinInput from 'kit/vue/ui/components/PinInput/PinInput.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const code = ref('')
</script>

<style scoped>
.value {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>
