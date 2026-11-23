<template>
  <div class="recipe-pricing">
    <header class="head">
      <p class="eyebrow">PRICING</p>
      <h2>按团队规模选择方案</h2>
      <p>所有方案都包含组件库、主题 token 与文档站；随时可以升级或降级。</p>
    </header>

    <div class="plans">
      <KCard
        v-for="plan in plans"
        :key="plan.name"
        class="plan"
        :class="{ 'plan--featured': plan.featured }"
        :variant="plan.featured ? 'elevated' : 'outlined'"
        size="lg"
      >
        <div class="plan-head">
          <div class="plan-name">
            {{ plan.name }}
            <KTag v-if="plan.featured" color="primary" variant="borderless" size="sm">最受欢迎</KTag>
          </div>
          <p>{{ plan.description }}</p>
        </div>

        <div class="price">
          <strong>{{ plan.price }}</strong>
          <span>{{ plan.unit }}</span>
        </div>

        <KButton :type="plan.featured ? 'primary' : 'default'" block>{{ plan.cta }}</KButton>

        <KDivider />

        <ul class="features">
          <li v-for="feature in plan.features" :key="feature">
            <span class="check">✓</span>
            {{ feature }}
          </li>
        </ul>
      </KCard>
    </div>

    <p class="note">演示价格仅用于展示排版，接入时替换 `plans` 数据即可。</p>
  </div>
</template>

<script setup lang="ts">
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KCard from 'kit/vue/ui/components/Card/Card.vue'
import KDivider from 'kit/vue/ui/components/Divider/Divider.vue'
import KTag from 'kit/vue/ui/components/Tag/Tag.vue'

const plans = [
  {
    name: '基础版',
    description: '适合个人与小型项目',
    price: '¥ 0',
    unit: '/ 人 / 月',
    cta: '免费开始',
    featured: false,
    features: ['全部基础组件', '亮暗主题 token', '社区支持', '个人项目商用许可'],
  },
  {
    name: '团队版',
    description: '适合协作与中台团队',
    price: '¥ 49',
    unit: '/ 人 / 月',
    cta: '开始 14 天试用',
    featured: true,
    features: ['包含基础版全部能力', '设计规范与评审清单', '优先问题响应', '团队组件扩展包'],
  },
  {
    name: '企业版',
    description: '适合多团队与私有化部署',
    price: '定制',
    unit: '按年计费',
    cta: '联系销售',
    featured: false,
    features: ['包含团队版全部能力', '私有化与内网部署', '定制主题与组件', '专属技术支持'],
  },
]
</script>

<style scoped>
.recipe-pricing {
  padding: 28px 24px 20px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: 16px;
  background: var(--k-color-bg-layout);
}
.head {
  max-width: 560px;
  margin: 0 auto 24px;
  text-align: center;
}
.eyebrow {
  margin: 0 0 8px;
  color: var(--k-color-primary-text);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
}
.head h2 {
  margin: 0;
  font-size: 26px;
  line-height: 34px;
  letter-spacing: -0.03em;
}
.head p:last-child {
  margin: 8px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 13px;
  line-height: 21px;
}
.plans {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
  gap: 14px;
}
.plan {
  height: 100%;
}
.plan--featured {
  border-color: var(--k-color-primary-border);
  box-shadow: 0 12px 32px rgb(0 0 0 / 7%);
}
.plan-head p {
  min-height: 38px;
  margin: 7px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 19px;
}
.plan-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
}
.price {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin: 18px 0 16px;
}
.price strong {
  font-size: 34px;
  font-weight: 650;
  letter-spacing: -0.04em;
}
.price span {
  color: var(--k-color-text-tertiary);
  font-size: 11px;
}
.features {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.features li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 18px;
}
.check {
  display: inline-flex;
  width: 16px;
  height: 16px;
  flex: none;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
  border-radius: 50%;
  background: var(--k-color-success-bg);
  color: var(--k-color-success-text);
  font-size: 10px;
  font-weight: 700;
}
.note {
  margin: 18px 0 0;
  color: var(--k-color-text-tertiary);
  font-size: 11px;
  text-align: center;
}
@media (max-width: 820px) {
  .plans {
    grid-template-columns: minmax(0, 1fr);
  }
  .plan-head p {
    min-height: 0;
  }
}
@media (max-width: 560px) {
  .recipe-pricing {
    padding: 20px 12px 14px;
  }
  .head h2 {
    font-size: 22px;
    line-height: 30px;
  }
}
</style>