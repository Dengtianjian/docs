<template>
  <div class="responsive-form-demo">
    <div class="responsive-form-demo__hint">当前断点：<code>{{ breakpoint }}</code>（拖动窗口跨过 768 / 992 / 1200 观察）</div>
    <KForm
      :model="model"
      layout="xs:vertical md:horizontal"
      label-width="xs:72 sm:88 md:100 lg:120"
      label-align="xs:left md:right"
      colon="xs:false md:true"
      style="max-width: 420px"
    >
      <KFormItem label="用户名" name="user">
        <KInput v-model="model.user" />
      </KFormItem>
      <KFormItem label="邮箱" name="mail">
        <KInput v-model="model.mail" placeholder="拖动窗口观察布局/标签宽/对齐/冒号" />
      </KFormItem>
    </KForm>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import KForm from 'kit/vue/ui/components/Form/Form.vue'
import KFormItem from 'kit/vue/ui/components/Form/FormItem.vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import { getSharedBreakpoint } from 'kit/vue/ui'

const breakpoint = getSharedBreakpoint().current

const model = reactive<Record<string, unknown>>({ user: '', mail: '' })
</script>

<style scoped>
.responsive-form-demo { display: flex; flex-direction: column; gap: 16px; }
.responsive-form-demo__hint { font-size: 12px; color: var(--vp-c-text-3); }
</style>
