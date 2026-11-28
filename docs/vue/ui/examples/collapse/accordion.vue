<template>
  <KCollapse v-model:active-key="active" accordion ghost>
    <KCollapseItem item-key="a" title="待处理" extra="12 条">
      这里是待处理事项。
    </KCollapseItem>
    <KCollapseItem item-key="b" title="进行中" extra="4 条">
      这里是进行中的事项。
    </KCollapseItem>
    <KCollapseItem item-key="c" title="已归档" disabled>
      禁用项不可展开。
    </KCollapseItem>
  </KCollapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KCollapse from 'kit/vue/ui/components/other/Collapse/Collapse.vue'
import KCollapseItem from 'kit/vue/ui/components/other/Collapse/CollapseItem.vue'

const active = ref<string | number | null>('a')
</script>