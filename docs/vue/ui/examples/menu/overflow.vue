<template>
  <KFlex vertical gap="lg">
    <div class="block">
      <div class="block-title">水平：宽度不够收进「更多」</div>
      <div class="h-box">
        <KMenu
          v-model:selected-keys="horizontalSelected"
          :items="items"
          mode="horizontal"
          overflow
          menu-label="水平溢出导航"
        />
      </div>
    </div>

    <div class="block">
      <div class="block-title">纵向：高度不够收进「更多」</div>
      <KMenu
        v-model:selected-keys="verticalSelected"
        :items="items"
        mode="vertical"
        overflow
        class="v-box"
        menu-label="纵向溢出导航"
      />
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KMenu from 'kit/vue/ui/components/Menu/Menu.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
import type { KMenuItem } from 'kit/vue/ui'

const labels = ['概览', '订单', '库存', '会员', '营销', '报表', '结算', '物流', '售后', '设置']
const items: KMenuItem[] = labels.map((label, index) => ({
  key: `tab-${index + 1}`,
  label,
}))

const horizontalSelected = ref<string[]>(['tab-1'])
const verticalSelected = ref<string[]>(['tab-2'])
</script>

<style scoped>
.block-title {
  margin-bottom: 8px;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
}
.h-box {
  width: 420px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
}
.v-box {
  width: 220px;
  height: 200px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
}
</style>