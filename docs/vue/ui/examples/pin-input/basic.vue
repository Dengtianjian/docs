<template>
  <KSpace direction="vertical" size="md">
    <KPinInput v-model="code" :length="6" @complete="completed = $event" />
    <p class="tip">输入：{{ code || '（空）' }}</p>
    <p class="tip">{{ completed ? `已完成：${completed}` : '输入满 6 位触发 complete' }}</p>
    <KSpace>
      <KButton size="sm" @click="code = ''">清空</KButton>
      <KButton size="sm" variant="outline" @click="code = '246810'">填入示例</KButton>
    </KSpace>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KPinInput from 'kit/vue/ui/components/PinInput/PinInput.vue'

const code = ref('')
const completed = ref('')
</script>

<style scoped>
.tip {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>