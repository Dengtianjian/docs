<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KConfigProvider from 'kit/vue/ui/components/ConfigProvider/ConfigProvider.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const disabled = ref(false)
</script>

<template>
  <KSpace direction="vertical" size="md">
    <label style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer">
      <input v-model="disabled" type="checkbox" />
      <code>wave.disabled</code> = {{ disabled }}
    </label>
    <KConfigProvider :wave="{ disabled }">
      <KSpace wrap>
        <KButton type="primary">跟随全局开关</KButton>
        <KButton type="primary" :wave="true">实例级强制开</KButton>
        <KButton type="danger" :wave="false">实例级强制关</KButton>
      </KSpace>
    </KConfigProvider>
  </KSpace>
</template>
