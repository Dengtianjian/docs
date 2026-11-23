<template>
  <KFlex vertical gap="md">
    <KRadioGroup
      v-model="align"
      shape="button"
      :options="[
        { label: 'left', value: 'left' },
        { label: 'center', value: 'center' },
        { label: 'right', value: 'right' },
      ]"
    />
    <div class="frame">
      <KTabs v-model:active="active" :align="align" type="line">
        <KTabPane name="overview" label="概览">概览内容。</KTabPane>
        <KTabPane name="detail" label="详情">详情内容。</KTabPane>
        <KTabPane name="log" label="日志">日志内容。</KTabPane>
      </KTabs>
    </div>
    <div class="tip">容器比分页宽时才能看出位置差异；`centered` 等价于 `align="center"`。</div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTabs from 'kit/vue/ui/components/Tabs/Tabs.vue'
import KTabPane from 'kit/vue/ui/components/Tabs/TabPane.vue'
import KRadioGroup from 'kit/vue/ui/components/Radio/RadioGroup.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
import type { KTabsAlign } from 'kit/vue/ui'

const align = ref<KTabsAlign>('left')
const active = ref<string | number>('overview')
</script>

<style scoped>
.frame {
  width: 100%;
  padding: 0 12px;
  border: 1px dashed var(--k-color-border);
  border-radius: var(--k-border-radius-sm);
}
.tip {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
}
</style>