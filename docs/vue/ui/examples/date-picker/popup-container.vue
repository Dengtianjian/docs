<template>
  <KConfigProvider :popup-container="() => box!">
    <div
      ref="box"
      style="position: relative; height: 200px; overflow: auto; border: 1px dashed #bbb; border-radius: 8px; padding: 8px; width: 300px"
    >
      <KDatePicker v-model="v" clearable placeholder="点击展开后滚动本盒" />
      <p style="height: 320px; margin: 8px 0 0; font-size: 12px; color: #888">
        滚动本盒：面板 absolute 进容器文档流，随内容一起滚、并被盒边界裁切（antd getPopupContainer 同款）。
        scoped Provider 的 token 作用域随弹层出口节点走。
      </p>
    </div>
  </KConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from 'kit/vue/ui/components/DatePicker/DatePicker.vue'
import KConfigProvider from 'kit/vue/ui/components/ConfigProvider/ConfigProvider.vue'

const box = ref<HTMLElement | null>(null)
const v = ref<number | null>(null)
</script>
