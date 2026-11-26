<template>
  <KFlex vertical gap="sm">
    <div v-for="v in variants" :key="v" style="display: flex; align-items: center; gap: 12px">
      <span style="width: 84px; font-size: 12px; color: var(--k-color-text-tertiary)">{{ v }}</span>
      <KInputTags v-model="picked[v]" :variant="v" :placeholder="v" style="width: 280px" />
    </div>
    <span style="font-size: 12px; color: var(--k-color-text-tertiary)">输入后回车添加标签；filled / borderless / underlined 同样作用于标签外壳。</span>
  </KFlex>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import KInputTags from 'kit/vue/ui/components/data-entry/InputTags/InputTags.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const variants = ['outlined', 'filled', 'borderless', 'underlined'] as const
const picked = reactive<Record<(typeof variants)[number], string[]>>({
  outlined: [],
  filled: [],
  borderless: [],
  underlined: [],
})
</script>