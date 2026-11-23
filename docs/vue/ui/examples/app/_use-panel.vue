<template>
  <div class="use-panel">
    <div class="use-panel__head">
      <strong>{{ title }}</strong>
      <span class="use-panel__root">root：<code>{{ rootTag }}</code></span>
    </div>
    <div class="use-panel__apis">
      <span
        v-for="api in apis"
        :key="api.name"
        class="use-panel__api"
        :class="{ 'is-on': api.on }"
      >{{ api.name }}</span>
    </div>
    <KFlex wrap gap="sm">
      <KButton size="sm" type="primary" @click="messageDemo">message</KButton>
      <KButton size="sm" @click="notificationDemo">notification</KButton>
      <KButton size="sm" @click="modalDemo">modal</KButton>
      <KButton size="sm" @click="drawerDemo">drawer</KButton>
      <KButton size="sm" variant="text" type="link" @click="destroyAll">清空本实例</KButton>
    </KFlex>
    <p class="use-panel__status">最近：{{ status }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useKApp } from 'kit/vue/ui'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const props = withDefaults(defineProps<{ title?: string }>(), { title: 'useKApp' })

const app = useKApp()
const status = ref('—')
const rootTag = computed(() => app?.root.value?.tagName.toLowerCase() ?? 'undefined')
const apis = computed(() => [
  { name: 'message', on: Boolean(app?.message) },
  { name: 'notification', on: Boolean(app?.notification) },
  { name: 'modal', on: Boolean(app?.modal) },
  { name: 'drawer', on: Boolean(app?.drawer) },
])

function messageDemo() {
  app?.message?.success(`来自「${props.title}」的 message`)
  status.value = 'message.success'
}

function notificationDemo() {
  app?.notification?.info({
    title: props.title,
    description: '由 useKApp().notification 打开，队列归当前 KApp。',
  })
  status.value = 'notification.info'
}

function modalDemo() {
  app?.modal?.info({
    title: props.title,
    content: '由 useKApp().modal 打开；关闭走 X / 遮罩 / Esc。',
  })
  status.value = 'modal.info'
}

function drawerDemo() {
  app?.drawer?.open({
    title: props.title,
    content: '由 useKApp().drawer 打开，关闭后触发 afterClose。',
    onClose: () => { status.value = 'drawer.onClose' },
  })
}

function destroyAll() {
  app?.message?.destroyAll()
  app?.notification?.destroyAll()
  app?.modal?.destroyAll()
  app?.drawer?.destroyAll()
  status.value = 'destroyAll'
}
</script>

<style scoped>
.use-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 16px;
  border: 1px solid var(--k-color-border);
  border-radius: var(--k-border-radius);
  background: var(--k-color-fill-secondary);
}
.use-panel__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 12px;
  color: var(--k-color-text);
  font-size: var(--k-font-size);
}
.use-panel__root {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
.use-panel__root code {
  color: var(--k-color-text-secondary);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.use-panel__apis {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.use-panel__api {
  padding: 1px 8px;
  border: 1px solid var(--k-color-border);
  border-radius: 999px;
  color: var(--k-color-text-quaternary);
  font-size: var(--k-font-size-sm);
}
.use-panel__api.is-on {
  border-color: var(--k-color-primary);
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary);
}
.use-panel__status {
  margin: 0;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
</style>