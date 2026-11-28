<template>
  <KFlex vertical gap="md">
    <KFlex align="center" wrap>
      <KRadioGroup
        v-model="placement"
        shape="button"
        :options="[
          { label: 'left', value: 'left' },
          { label: 'right', value: 'right' },
          { label: 'top', value: 'top' },
          { label: 'bottom', value: 'bottom' },
        ]"
      />
      <KRadioGroup
        v-model="size"
        shape="button"
        :options="[
          { label: 'sm', value: 'sm' },
          { label: 'md', value: 'md' },
          { label: 'lg', value: 'lg' },
        ]"
      />
      <KButton type="primary" @click="open = true">打开抽屉</KButton>
    </KFlex>
    <div class="drawer-tip">最近关闭：{{ last }}</div>

    <KDrawer
      v-model:open="open"
      :placement="placement"
      :size="size"
      title="编辑资料"
      @close="last = 'close 事件'"
    >
      <KFlex vertical gap="sm">
        <p>抽屉内容从四个方向滑入，尺寸由 size 控制（sm 320 / md 378 / lg 480）。</p>
        <p>点击遮罩、右上角 X 或按 Esc 关闭；页脚按钮由业务自绘。</p>
      </KFlex>
      <template #footer>
        <KButton size="sm" @click="open = false">取消</KButton>
        <KButton size="sm" type="primary" @click="save">保存</KButton>
      </template>
    </KDrawer>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDrawer from 'kit/vue/ui/components/feedback/Drawer/Drawer.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KRadioGroup from 'kit/vue/ui/components/data-entry/Radio/RadioGroup.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KDrawerPlacement, KDrawerSize } from 'kit/vue/ui'

const open = ref(false)
const placement = ref<KDrawerPlacement>('right')
const size = ref<KDrawerSize>('md')
const last = ref('—')

function save() {
  open.value = false
  last.value = '保存并关闭'
}
</script>

<style scoped>
.drawer-tip {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
p {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.7;
}
</style>