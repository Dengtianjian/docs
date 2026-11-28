<template>
  <KFlex gap="lg" wrap>
    <KButton @click="openDemo">open（无图标）</KButton>
    <KButton @click="functionalDemos('info')">info</KButton>
    <KButton @click="functionalDemos('success')">success</KButton>
    <KButton @click="functionalDemos('error')">error</KButton>
    <KButton @click="functionalDemos('warning')">warning</KButton>
    <KButton variant="soft" @click="selfButtonDemo">内容自绘按钮</KButton>
    <KButton @click="draggableDemo">可拖拽 + 无遮罩</KButton>
  </KFlex>
  <p style="margin: 12px 0 0; color: var(--k-color-text-secondary)">{{ result }}</p>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { useKApp } from 'kit/vue/ui/composables/useKApp'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const { modal } = useKApp()!
const result = ref('—')

function functionalDemos(kind: 'info' | 'success' | 'error' | 'warning') {
  modal![kind]({
    title: kind === 'info' ? '提示' : kind === 'success' ? '操作成功' : kind === 'error' ? '操作失败' : '请注意',
    content: `${kind} 功能弹窗：图标随类型切换，不预设按钮，关闭走 X / 蒙层 / Esc。`,
    onClose: () => { result.value = `${kind} 已关闭（onClose 回调）` },
  })
}

function openDemo() {
  modal!.open({
    title: '纯 open（无图标）',
    content: 'open 不带类型图标；标题 + 内容 + 右上 X，关闭同样触发 onClose。',
    onClose: () => { result.value = 'open 已关闭（onClose 回调）' },
  })
}

function selfButtonDemo() {
  const handle = modal!.open({
    title: '按钮自绘',
    content: h('div', {}, [
      h('p', { style: 'margin:0 0 12px' }, '不预设按钮——需要操作钮时在内容里自绘，点它调 handle.destroy() 关闭。'),
      h(KButton, {
        type: 'primary',
        onClick: () => { result.value = '自绘按钮关闭（handle.destroy）'; handle.destroy() },
      }, { default: () => '完成' }),
    ]),
  })
}

function draggableDemo() {
  modal!.warning({
    title: '可拖拽 + 无遮罩',
    content: '实例 API 同样支持 draggable / mask / placement：落在右下角，按住标题栏拖动试试。',
    draggable: true,
    mask: false,
    placement: 'bottom-right',
  })
}
</script>
