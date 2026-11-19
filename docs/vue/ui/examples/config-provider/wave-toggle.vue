<template>
  <KSpace direction="vertical" size="md">
    <KCheckbox v-model="disabled">
      <code>wave.disabled</code> = {{ disabled }}
    </KCheckbox>
    <KConfigProvider :wave="{ disabled }">
      <KSpace wrap>
        <KButton type="primary">跟随全局开关</KButton>
        <KButton type="primary" :wave="true">实例级强制开</KButton>
        <KButton type="danger" :wave="false">实例级强制关</KButton>
      </KSpace>
    </KConfigProvider>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KConfigProvider from 'kit/vue/ui/components/ConfigProvider/ConfigProvider.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KCheckbox from 'kit/vue/ui/components/Checkbox/Checkbox.vue'

const disabled = ref(false)
</script>
