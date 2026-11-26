<template>
  <KConfigProvider :popup-container="() => box!">
    <div
      ref="box"
      style="position: relative; height: 180px; overflow: auto; border: 1px dashed #bbb; border-radius: 8px; padding: 8px; width: 260px"
    >
      <KSelect v-model="v" :options="opts" placeholder="点击展开后滚动本盒" />
      <p style="height: 260px; margin: 8px 0 0; font-size: 12px; color: #888">
        滚动本盒：弹层随内容一起滚、并被盒边界裁切（antd getPopupContainer 同款）。
        scoped Provider 的 token 作用域随弹层出口节点走。
      </p>
    </div>
  </KConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSelect from 'kit/vue/ui/components/data-entry/Select/Select.vue'
import KConfigProvider from 'kit/vue/ui/components/general/ConfigProvider/ConfigProvider.vue'

const box = ref<HTMLElement | null>(null)
const v = ref<string | number | null>(null)
const opts = [
  { label: '弹层进本盒文档流', value: 'a' },
  { label: '随内容一起滚动', value: 'b' },
  { label: '被盒边界裁切', value: 'c' },
  { label: '（absolute 容器语义）', value: 'd' },
]
</script>
