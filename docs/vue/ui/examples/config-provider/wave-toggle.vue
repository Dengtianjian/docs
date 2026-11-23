<template>
  <KFlex vertical gap="md">
    <KCheckbox v-model="disabled">
      <code>wave.disabled</code> = {{ disabled }}
    </KCheckbox>
    <KConfigProvider :wave="{ disabled }">
      <KFlex wrap>
        <KButton type="primary">跟随全局开关</KButton>
        <KButton type="primary" :wave="true">实例级强制开</KButton>
        <KButton type="danger" :wave="false">实例级强制关</KButton>
      </KFlex>
    </KConfigProvider>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KConfigProvider from 'kit/vue/ui/components/ConfigProvider/ConfigProvider.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
import KCheckbox from 'kit/vue/ui/components/Checkbox/Checkbox.vue'

const disabled = ref(false)
</script>
