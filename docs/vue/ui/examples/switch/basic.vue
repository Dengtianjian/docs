<script setup lang="ts">
import { ref } from 'vue'
import KSwitch from 'kit/vue/ui/components/Switch/Switch.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const on = ref(true)
const off = ref(false)
const loading = ref(false)
</script>

<template>
  <KSpace size="lg" align="center">
    <KSwitch v-model="on" size="large" />
    <KSwitch v-model="on" />
    <KSwitch v-model="on" size="small" />
    <KSwitch v-model="off" checked-children="开" un-checked-children="关" />
    <KSwitch v-model="loading" loading />
    <KSwitch disabled :model-value="false" />
  </KSpace>
</template>
