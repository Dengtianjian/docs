<template>
  <KButton @click="open">自定义消息（render + classNames）</KButton>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useKApp } from 'kit/vue/ui/composables/useKApp'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'

const { message } = useKApp()!

function open() {
  message!.open({
    content: '草稿已自动保存',
    type: 'success',
    duration: 0,
    key: 'demo-custom',
    classNames: { root: 'demo-message' },
    render: ({ content, close }) =>
      h('div', { class: 'demo-message__body' }, [
        h('span', { class: 'demo-message__dot' }),
        h('span', content as string),
        h('button', { type: 'button', onClick: close }, '收起'),
      ]),
  })
}
</script>

<style>
.demo-message {
  background: #26262f;
  color: #f0f0f5;
  border-radius: 999px;
  padding: 6px 8px 6px 14px;
}
.demo-message__body {
  display: flex;
  align-items: center;
  gap: 8px;
}
.demo-message__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #52c41a;
}
.demo-message__body button {
  border: none;
  border-radius: 999px;
  padding: 2px 10px;
  background: rgb(255 255 255 / 0.16);
  color: #fff;
  font-size: 12px;
  cursor: pointer;
}
</style>