<template>
  <KFlex gap="lg" wrap align="center">
    <KPopconfirm title="确认删除这条记录？" @confirm="log = '已确认'" @cancel="log = '已取消'">
      <template #trigger><KButton>删除</KButton></template>
    </KPopconfirm>
    <KPopconfirm
      title="带描述的确认"
      description="删除后不可恢复，关联的 3 个文件也会一并移除。"
      ok-text="删除"
      ok-type="danger"
      :ok-loading="loading"
      placement="bottom"
      @confirm="fakeDelete"
    >
      <template #trigger><KButton type="danger" variant="outlined">危险操作</KButton></template>
    </KPopconfirm>
    <KPopconfirm ok-text="知道了" @confirm="log = '默认插槽整块已确认'">
      <template #trigger><KButton>默认插槽文案</KButton></template>
      <b>自定义整块</b>：默认插槽覆盖 title / description 文案区
    </KPopconfirm>
    <span style="color: var(--k-color-text-secondary)">{{ log }}</span>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KPopconfirm from 'kit/vue/ui/components/feedback/Popconfirm/Popconfirm.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const log = ref('还没操作')
const loading = ref(false)

function fakeDelete() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    log.value = '已删除（onOk 异步 1.2s，期间确定钮 loading）'
  }, 1200)
}
</script>
