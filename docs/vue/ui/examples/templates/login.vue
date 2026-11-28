<template>
  <div class="recipe-login">
    <div class="panel">
      <aside class="brand-panel">
        <div class="brand-row">
          <span class="mark">K</span>
          <strong>K UI</strong>
        </div>
        <div class="brand-copy">
          <p class="eyebrow">DESIGN SYSTEM</p>
          <h2>把时间留给业务，<br />把一致性交给组件库。</h2>
          <ul>
            <li>四轴外观，主题 token 统一收敛</li>
            <li>语义 DOM 与键盘交互开箱可用</li>
            <li>桌面与移动端共享一套组件</li>
          </ul>
        </div>
        <p class="quote">“从设计语言到代码实现，一套规则走到底。”</p>
      </aside>

      <section class="form-panel">
        <div class="form-head">
          <h3>欢迎回来</h3>
          <p>使用工作邮箱登录控制台</p>
        </div>

        <KForm :model="model" :rules="rules" @finish="onSubmit">
          <KFormItem label="邮箱" name="email">
            <KInput v-model="model.email" placeholder="name@company.com" autocomplete="email" />
          </KFormItem>
          <KFormItem label="密码" name="password">
            <KInput
              v-model="model.password"
              type="password"
              placeholder="至少 6 位字符"
              autocomplete="current-password"
            />
          </KFormItem>
          <div class="form-meta">
            <KCheckbox v-model="model.remember">记住我</KCheckbox>
            <a class="text-link" href="#" @click.prevent>忘记密码？</a>
          </div>
          <KButton type="primary" block native-type="submit">登录</KButton>
          <p v-if="logged" class="success">校验通过，已模拟登录成功。</p>
        </KForm>

        <KDivider>或</KDivider>
        <KButton block variant="outlined">使用企业微信登录</KButton>
        <p class="hint">演示：任意合法邮箱 + 至少 6 位密码即可通过校验。</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KCheckbox from 'kit/vue/ui/components/data-entry/Checkbox/Checkbox.vue'
import KDivider from 'kit/vue/ui/components/general/Divider/Divider.vue'
import KForm from 'kit/vue/ui/components/data-entry/Form/Form.vue'
import KFormItem from 'kit/vue/ui/components/data-entry/Form/FormItem.vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'

const model = reactive({
  email: '',
  password: '',
  remember: true,
})
const rules: Record<string, unknown> = {
  email: [
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '邮箱格式不正确' },
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 6, message: '密码至少 6 位' },
  ],
}
const logged = ref(false)

function onSubmit() {
  logged.value = true
}
</script>

<style scoped>
.recipe-login {
  padding: 20px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: 16px;
  background:
    radial-gradient(circle at 0% 0%, var(--k-color-primary-bg), transparent 38%),
    var(--k-color-bg-layout);
}
.panel {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  min-height: 430px;
  overflow: hidden;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: 14px;
  background: var(--k-color-bg-container);
}
.brand-panel {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 32px;
  border-right: 1px solid var(--k-color-border-secondary);
  background: linear-gradient(155deg, var(--k-color-primary-bg), var(--k-color-bg-container) 68%);
}
.brand-row {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 14px;
}
.mark {
  display: inline-flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--k-color-primary);
  color: var(--k-color-text-light-solid);
  font-weight: 700;
}
.brand-copy {
  margin-top: 20px;
}
.eyebrow {
  margin: 0 0 10px;
  color: var(--k-color-primary-text);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
}
.brand-copy h2 {
  margin: 0;
  font-size: 27px;
  line-height: 38px;
  letter-spacing: -0.03em;
}
.brand-copy ul {
  display: grid;
  gap: 10px;
  margin: 24px 0 0;
  padding: 0;
  color: var(--k-color-text-secondary);
  font-size: 13px;
  list-style: none;
}
.brand-copy li {
  display: flex;
  align-items: center;
  gap: 8px;
}
.brand-copy li::before {
  width: 16px;
  height: 16px;
  flex: none;
  border-radius: 50%;
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary-text);
  content: '✓';
  font-size: 10px;
  line-height: 16px;
  text-align: center;
}
.quote {
  margin: auto 0 0;
  color: var(--k-color-text-tertiary);
  font-size: 12px;
}
.form-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 36px 40px;
}
.form-head {
  margin-bottom: 22px;
}
.form-head h3 {
  margin: 0;
  font-size: 22px;
  line-height: 30px;
  letter-spacing: -0.02em;
}
.form-head p {
  margin: 6px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 13px;
}
.form-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: -2px 0 16px;
  font-size: 12px;
}
.text-link {
  color: var(--k-color-primary-text);
  text-decoration: none;
}
.text-link:hover {
  color: var(--k-color-primary-text-hover);
}
.success {
  margin: 12px 0 0;
  color: var(--k-color-success-text);
  font-size: 12px;
}
.hint {
  margin: 12px 0 0;
  color: var(--k-color-text-tertiary);
  font-size: 11px;
  line-height: 18px;
}
@media (max-width: 780px) {
  .recipe-login {
    padding: 12px;
  }
  .panel {
    grid-template-columns: minmax(0, 1fr);
  }
  .brand-panel {
    gap: 18px;
    padding: 22px;
    border-right: 0;
    border-bottom: 1px solid var(--k-color-border-secondary);
  }
  .brand-copy h2 {
    font-size: 22px;
    line-height: 31px;
  }
  .brand-copy ul,
  .quote {
    display: none;
  }
  .form-panel {
    padding: 24px 22px;
  }
}
</style>