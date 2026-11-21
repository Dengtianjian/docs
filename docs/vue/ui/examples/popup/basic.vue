<template>
  <KSpace>
    <KButton @click="bottom = true">底部弹层</KButton>
    <KButton variant="outline" @click="center = true">居中弹层</KButton>
  </KSpace>

  <KPopup v-model:open="bottom" title="底部弹层" closeable>
    从底部滑入，支持安全区、圆角与挂载容器。
    <template #footer>
      <KButton block @click="bottom = false">知道了</KButton>
    </template>
  </KPopup>

  <KCenterPopup v-model:open="center" title="居中提示" closeable>
    <p class="center-copy">居中弹层适合确认、权限说明与短提示。</p>
  </KCenterPopup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KCenterPopup from 'kit/vue/ui/components/CenterPopup/CenterPopup.vue'
import KPopup from 'kit/vue/ui/components/Popup/Popup.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const bottom = ref(false)
const center = ref(false)
</script>

<style scoped>
.center-copy {
  margin: 0;
  text-align: center;
}
</style>