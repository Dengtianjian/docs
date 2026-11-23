<template>
  <KFlex gap="md" vertical style="width: 300px">
    <KSelect
      v-model="value"
      virtual
      filterable
      :options="options"
      placeholder="1000 条选项（虚拟滚动）"
      @reach-top="topCount += 1"
      @reach-bottom="bottomCount += 1"
    />
    <div style="font-size: 12px; color: var(--k-color-text-tertiary)">
      到顶 {{ topCount }} 次，到底 {{ bottomCount }} 次
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSelect from 'kit/vue/ui/components/Select/Select.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const value = ref<string | number | null>(null)
const topCount = ref(0)
const bottomCount = ref(0)
const options = Array.from({ length: 1000 }, (_, i) => ({
  label: `选项 ${String(i + 1).padStart(4, '0')}`,
  value: `v${i + 1}`,
}))
</script>