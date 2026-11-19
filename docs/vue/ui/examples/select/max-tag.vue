<template>
  <KSpace size="md" direction="vertical" style="width: 260px">
    <KSelect v-model="fixed" mode="multiple" :options="opts" :max-tag-count="2" placeholder="maxTagCount=2" />
    <div style="width: 180px">
      <KSelect v-model="resp" mode="multiple" :options="opts" max-tag-count="responsive" placeholder="responsive（窄触发器）" />
    </div>
    <KSelect v-model="labeled" mode="multiple" :options="opts" placeholder="#label 插槽改标签回显">
      <template #label="{ option, value }">
        <span>{{ option?.label }}<span style="opacity: 0.55">·{{ value }}</span></span>
      </template>
    </KSelect>
    <div style="font-size: 12px; color: var(--k-color-text-tertiary)">悬停 +N 标签看被折叠项；responsive 随触发器宽度实测收敛。</div>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSelect from 'kit/vue/ui/components/Select/Select.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const opts = [
  { label: '北京', value: 'bj' },
  { label: '上海', value: 'sh' },
  { label: '广州', value: 'gz' },
  { label: '深圳', value: 'sz' },
  { label: '杭州', value: 'hz' },
  { label: '成都', value: 'cd' },
  { label: '武汉', value: 'wh' },
  { label: '西安', value: 'xa' },
]
const fixed = ref<(string | number)[]>(['bj', 'sh', 'gz', 'sz'])
const resp = ref<(string | number)[]>(['bj', 'sh', 'gz', 'sz', 'hz', 'cd'])
const labeled = ref<(string | number)[]>(['bj', 'sh'])
</script>
