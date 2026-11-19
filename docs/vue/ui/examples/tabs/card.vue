<template>
  <KSpace direction="vertical" size="lg">
    <KRadioGroup
      v-model="size"
      shape="button"
      :options="[
        { label: 'sm', value: 'sm' },
        { label: 'md', value: 'md' },
        { label: 'lg', value: 'lg' },
      ]"
    />
    <KTabs :size="size" type="card">
      <KTabPane name="overview" label="概览">卡片形态：页签与内容区连成一体。</KTabPane>
      <KTabPane name="detail" label="详情">详情内容。</KTabPane>
      <KTabPane name="log" label="日志">日志内容。</KTabPane>
    </KTabs>
    <KTabs type="line" stretch>
      <KTabPane name="a" label="等分 1">`stretch` 让页签等分铺满。</KTabPane>
      <KTabPane name="b" label="等分 2">内容 2</KTabPane>
      <KTabPane name="c" label="等分 3">内容 3</KTabPane>
    </KTabs>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTabs from 'kit/vue/ui/components/Tabs/Tabs.vue'
import KTabPane from 'kit/vue/ui/components/Tabs/TabPane.vue'
import KRadioGroup from 'kit/vue/ui/components/Radio/RadioGroup.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const size = ref('md')
</script>