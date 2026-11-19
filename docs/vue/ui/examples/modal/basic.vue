<template>
  <KSpace size="lg" wrap align="center">
    <KModal title="编辑名称" @close="done = '已关闭（X / Esc / 蒙层）'">
      <template #trigger><KButton type="primary">打开弹窗（自管开合）</KButton></template>
      <p style="margin: 0 0 12px">自管开合：不传 <code>open</code>，<code>#trigger</code> 点击即开；关闭走右上 X / 蒙层 / Esc，统一发 <code>close</code> 事件。</p>
      <KInput placeholder="输入点内容试试滚动锁" />
    </KModal>
    <KModal v-model:open="centerOpen" title="center 落位" placement="center" :width="360">
      <template #trigger><KButton>center 落位 + 自定义 footer（受控）</KButton></template>
      <template #footer>
        <div style="display: flex; justify-content: space-between; width: 100%">
          <KButton @click="centerOpen = false">稍后再说</KButton>
          <KButton type="danger" @click="centerOpen = false; done = '已确认（自定义 footer）'">确认操作</KButton>
        </div>
      </template>
      <p style="margin: 0">受控开合：传 <code>v-model:open</code>，trigger 点击只发 <code>update:open</code>；footer 纯插槽驱动，按钮完全由业务自绘。</p>
    </KModal>
    <span style="color: var(--k-color-text-secondary)">{{ done }}</span>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KModal from 'kit/vue/ui/components/Modal/Modal.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const centerOpen = ref(false)
const done = ref('未提交')
</script>
