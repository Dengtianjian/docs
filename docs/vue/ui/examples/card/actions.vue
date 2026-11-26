<template>
  <KCard segmented title="操作按钮特性" style="width: 380px">
    <template #extra>{{ clicks }} 次点击</template>
    KCardAction 的原生属性直接透传：`disabled`、`aria-label`、`title`、`@click` 都可控。
    <template #footer>
      <KButton size="sm" type="primary" variant="tonal" @click="locked = !locked">{{ locked ? '解除禁用' : '禁用第二项' }}</KButton>
    </template>
    <template #actions>
      <KCardAction title="点击后计数 +1" aria-label="点击计数" @click="clicks++">点击 +1</KCardAction>
      <KCardAction type="primary" variant="text" @click="clicks++">主色</KCardAction>
      <KCardAction :disabled="locked" aria-label="受控操作">受控项</KCardAction>
    </template>
  </KCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KCard from 'kit/vue/ui/components/layouts/Card/Card.vue'
import KCardAction from 'kit/vue/ui/components/layouts/Card/CardAction.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'

const clicks = ref(0)
const locked = ref(true)
</script>