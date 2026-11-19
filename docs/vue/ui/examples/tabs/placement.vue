<template>
  <KSpace direction="vertical" size="lg">
    <KSpace>
      <KRadioGroup
        v-model="placement"
        shape="button"
        :options="[
          { label: 'top', value: 'top' },
          { label: 'bottom', value: 'bottom' },
          { label: 'left', value: 'left' },
          { label: 'right', value: 'right' },
        ]"
      />
      <KRadioGroup
        v-model="type"
        shape="button"
        :options="[
          { label: 'line', value: 'line' },
          { label: 'card', value: 'card' },
        ]"
      />
    </KSpace>
    <KTabs :placement="placement" :type="type" style="min-height: 160px">
      <KTabPane name="one" label="页签一">页签一内容。</KTabPane>
      <KTabPane name="two" label="页签二">页签二内容。</KTabPane>
      <KTabPane name="three" label="页签三">页签三内容。</KTabPane>
    </KTabs>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTabs from 'kit/vue/ui/components/Tabs/Tabs.vue'
import KTabPane from 'kit/vue/ui/components/Tabs/TabPane.vue'
import KRadioGroup from 'kit/vue/ui/components/Radio/RadioGroup.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import type { KTabsPlacement, KTabsType } from 'kit/vue/ui'

const placement = ref<KTabsPlacement>('top')
const type = ref<KTabsType>('line')
</script>