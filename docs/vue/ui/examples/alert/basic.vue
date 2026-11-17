<script setup lang="ts">
import { ref } from 'vue'
import KAlert from 'kit/vue/ui/components/Alert/Alert.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const alive = ref(true)
</script>

<template>
  <KSpace direction="vertical" size="md" style="width: 100%">
    <KAlert message="info：普通通知，不带描述时单行紧凑" />
    <KAlert type="success" message="success" description="带描述形态：标题加粗，辅助文案走 --k-color-text-secondary。" />
    <KAlert type="warning" :show-icon="false" message="warning + showIcon=false" />
    <KAlert type="error" closable message="error：可关闭，关闭后组件自隐（v-model:open 可受控）" />
    <KAlert type="info" banner message="banner 形态：去圆角、贴边通告条" />
    <KAlert v-if="alive" type="warning" message="带操作区" description="右侧 action 插槽放按钮。">
      <template #action>
        <KButton size="xs" type="warning" variant="outlined" @click="alive = false">知道了</KButton>
      </template>
    </KAlert>
    <KButton v-else variant="text" type="link" @click="alive = true">恢复上一条</KButton>
  </KSpace>
</template>
