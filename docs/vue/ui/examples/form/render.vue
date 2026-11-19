<template>
  <!-- Form / FormItem 双层 headless：注册/校验/控件注入照跑，表单视觉整件自绘 -->
  <KForm :model="model" :rules="rules" @finish="onFinish" @finish-failed="onFail">
    <template #render="ctx">
      <form v-bind="ctx.rootAttrs" v-on="ctx.rootOn" class="hl-form-card">
        <div class="hl-form-card__head">
          <span class="hl-form-card__title">投稿</span>
          <span v-if="ctx.validating" class="hl-form-card__busy">校验中…</span>
        </div>

        <KFormItem name="title" label="标题">
          <template #render="item">
            <div v-bind="item.rootAttrs" class="hl-form-row" :class="{ 'hl-form-row--error': item.status === 'error' }">
              <span class="hl-form-row__label">
                <span v-if="item.required" class="hl-form-row__star" aria-hidden="true">*</span>
                {{ item.label }}
              </span>
              <KInput v-model="model.title" placeholder="必填" />
              <span class="hl-form-row__help">{{ item.error ?? '一句话说明主题' }}</span>
            </div>
          </template>
        </KFormItem>

        <KFormItem name="email" label="邮箱">
          <template #render="item">
            <div v-bind="item.rootAttrs" class="hl-form-row" :class="{ 'hl-form-row--error': item.status === 'error' }">
              <span class="hl-form-row__label">
                <span v-if="item.required" class="hl-form-row__star" aria-hidden="true">*</span>
                {{ item.label }}
              </span>
              <KInput v-model="model.email" placeholder="name@example.com" />
              <span class="hl-form-row__help">{{ item.error ?? '用于接收回执' }}</span>
            </div>
          </template>
        </KFormItem>

        <div class="hl-form-card__foot">
          <KButton type="primary" native-type="submit">提交</KButton>
          <KButton @click="ctx.resetFields(); verdict = ''">清错误</KButton>
          <span v-if="verdict" class="hl-form-card__verdict">{{ verdict }}</span>
        </div>
      </form>
    </template>
  </KForm>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import KForm from 'kit/vue/ui/components/Form/Form.vue'
import KFormItem from 'kit/vue/ui/components/Form/FormItem.vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'

const model = reactive({ title: '', email: '' })
const rules = {
  title: [{ required: true, message: '请填写标题' }],
  email: [
    { required: true, message: '请填写邮箱' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
  ],
}
const verdict = ref('')

function onFinish() {
  verdict.value = '校验通过 ✓'
}
function onFail(e: { errors: unknown[] }) {
  verdict.value = `未通过：${e.errors.length} 处错误`
}
</script>

<style scoped>
.hl-form-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 440px;
  padding: 18px;
  border: 1px solid var(--k-color-border);
  border-radius: 12px;
  background: var(--k-color-bg-container);
  box-shadow: var(--k-box-shadow-tertiary);
}
.hl-form-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hl-form-card__title {
  font-weight: 700;
  font-size: 15px;
}
.hl-form-card__busy {
  color: var(--k-color-info);
  font-size: 12px;
}
.hl-form-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.hl-form-row__label {
  font-size: 13px;
  color: var(--k-color-text-secondary);
}
.hl-form-row__star {
  color: var(--k-color-error);
}
.hl-form-row__help {
  font-size: 12px;
  color: var(--k-color-text-tertiary);
}
.hl-form-row--error .hl-form-row__help {
  color: var(--k-color-error);
}
.hl-form-card__foot {
  display: flex;
  align-items: center;
  gap: 10px;
}
.hl-form-card__verdict {
  font-size: 13px;
  color: var(--k-color-text-secondary);
}
</style>
