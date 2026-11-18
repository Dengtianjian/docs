<script setup lang="ts">
import { ref } from 'vue'
import KPreview from 'kit/vue/ui/components/Preview/Preview.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'

// 演示扩展点：#item 插槽接管当前内容渲染（后续 pdf/video 等类型走这里）
const items = [
  { src: '', name: '产品合同.pdf', type: undefined },
  { src: 'data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22240%22%3E%3Crect width=%22400%22 height=%22240%22 fill=%22%23722ed1%22/%3E%3Ctext x=%22200%22 y=%22136%22 font-size=%2234%22 fill=%22%23fff%22 text-anchor=%22middle%22 font-family=%22sans-serif%22%3E扫描件%3C/text%3E%3C/svg%3E', name: '扫描件.svg' },
]
const open = ref(false)
const current = ref(0)
</script>

<template>
  <div>
    <KButton @click="open = true">打开自定义内容预览</KButton>
    <KPreview v-model:open="open" v-model:current="current" :items="items">
      <template #item="{ item }">
        <div
          v-if="(item as { name?: string }).name?.endsWith('.pdf')"
          style="width: min(420px, 80vw); padding: 40px 24px; border-radius: 12px; background: #26262f; color: #e8e8ef; text-align: center"
        >
          <div style="font-size: 40px" aria-hidden="true">▤</div>
          <p style="margin: 12px 0 4px; font-weight: 600">{{ (item as { name?: string }).name }}</p>
          <p style="margin: 0; font-size: 12px; color: #9a9ab0">
            PDF 预览后续版本支持；当前由 #item 插槽接管渲染。
          </p>
        </div>
        <img v-else :src="(item as { src: string }).src" alt="" style="max-width: 86vw; max-height: 86vh" />
      </template>
    </KPreview>
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      #item 插槽（或 render prop）按 type/业务字段分流内容；切换、缩放、键盘与开合逻辑仍由组件提供。
    </p>
  </div>
</template>