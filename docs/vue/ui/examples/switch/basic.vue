<template>
  <KFlex gap="lg" align="center" wrap>
    <KSwitch v-model="on" size="lg" label="大号" />
    <KSwitch v-model="on" label="默认" />
    <KSwitch v-model="on" size="sm" label="小号" />
    <KSwitch v-model="off" checked-children="开" un-checked-children="关" label="内嵌文字" />
    <KSwitch v-model="loading" loading label="加载中" />
    <KSwitch disabled :model-value="false" label="禁用" />
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSwitch from 'kit/vue/ui/components/data-entry/Switch/Switch.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const on = ref(true)
const off = ref(false)
const loading = ref(false)
</script>