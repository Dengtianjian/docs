<template>
  <div class="recipe-mobile-order">
    <div class="phone">
      <div class="statusbar">
        <span>9:41</span>
        <span class="signals"><i /><i /><i /></span>
      </div>
      <KNavBar title="确认订单" subtitle="预计 11-22 送达" :fixed="false" @back="backed = true" />
      <div class="screen">
        <KNoticeBar
          text="满 199 减 30，已为你自动匹配最优优惠"
          type="warning"
          mode="none"
          :show-icon="false"
        />

        <section class="card address">
          <div>
            <div class="address-name">林一 <span>138****8000</span></div>
            <p>浙江省杭州市西湖区文三路 90 号<br />东部软件园 6 幢 302</p>
          </div>
          <KTag variant="outlined" size="sm">默认</KTag>
        </section>

        <section class="card goods">
          <div class="thumb">K</div>
          <div class="goods-copy">
            <strong>K UI 联名帆布包</strong>
            <span>米白 · 大号 · 加厚</span>
            <div class="goods-bottom">
              <span class="price">¥ 268</span>
              <span class="qty">x1</span>
            </div>
          </div>
        </section>

        <section class="card rows">
          <button type="button" class="row row-button" @click="sheetOpen = true">
            <span>配送方式</span>
            <span class="row-value">{{ delivery }} <i>›</i></span>
          </button>
          <div class="row">
            <span>优惠券</span>
            <span class="discount">-¥ 30</span>
          </div>
          <div class="row">
            <span>积分抵扣</span>
            <span class="discount">-¥ 8</span>
          </div>
        </section>

        <section class="card summary">
          <div class="row">
            <span>商品金额</span>
            <span>¥ 268.00</span>
          </div>
          <div class="row">
            <span>运费</span>
            <span>包邮</span>
          </div>
          <div class="row">
            <span>优惠合计</span>
            <span class="discount">-¥ 38.00</span>
          </div>
          <div class="row total">
            <span>合计</span>
            <span>¥ 230.00</span>
          </div>
        </section>

        <p class="agreement">提交订单即表示同意《购买协议》</p>
      </div>
      <KSubmitBar
        :price="230"
        label="实付"
        button-text="提交订单"
        :fixed="false"
        @submit="submitted = true"
      />
    </div>
    <p class="tip">
      {{ submitted ? '订单已提交（演示）' : backed ? '返回已触发（演示）' : '切换配送方式或提交订单试试' }}
    </p>

    <KActionSheet
      v-model:open="sheetOpen"
      title="选择配送方式"
      :actions="deliveryActions"
      @select="selectDelivery"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KActionSheet from 'kit/vue/ui/components/ActionSheet/ActionSheet.vue'
import type { KActionSheetAction } from 'kit/vue/ui/components/ActionSheet/ActionSheet.vue'
import KNavBar from 'kit/vue/ui/components/NavBar/NavBar.vue'
import KNoticeBar from 'kit/vue/ui/components/NoticeBar/NoticeBar.vue'
import KSubmitBar from 'kit/vue/ui/components/SubmitBar/SubmitBar.vue'
import KTag from 'kit/vue/ui/components/Tag/Tag.vue'

const sheetOpen = ref(false)
const delivery = ref('顺丰包邮')
const submitted = ref(false)
const backed = ref(false)

const deliveryActions: KActionSheetAction[] = [
  { key: 'sf', label: '顺丰包邮', description: '预计 11-22 送达' },
  { key: 'jd', label: '京东物流', description: '预计 11-23 送达' },
  { key: 'pickup', label: '门店自提', description: '杭州文三路店 · 今日可取' },
]

function selectDelivery(action: KActionSheetAction) {
  delivery.value = action.label
  sheetOpen.value = false
}
</script>

<style scoped>
.recipe-mobile-order {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
}
.phone {
  width: 375px;
  max-width: 100%;
  overflow: hidden;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: 28px;
  background: var(--k-color-bg-layout);
  box-shadow: 0 18px 44px rgb(0 0 0 / 8%);
}
.statusbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px 4px;
  background: var(--k-color-bg-container);
  color: var(--k-color-text);
  font-size: 11px;
  font-weight: 600;
}
.signals {
  display: flex;
  align-items: flex-end;
  gap: 2px;
}
.signals i {
  width: 3px;
  height: 6px;
  border-radius: 1px;
  background: currentColor;
}
.signals i:nth-child(2) {
  height: 9px;
}
.signals i:nth-child(3) {
  height: 12px;
  margin-left: 3px;
  opacity: 0.55;
}
.screen {
  max-height: 616px;
  overflow: auto;
  padding: 12px;
}
.card {
  margin-top: 10px;
  padding: 14px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: 14px;
  background: var(--k-color-bg-container);
}
.address {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.address-name {
  color: var(--k-color-text);
  font-size: 14px;
  font-weight: 600;
}
.address-name span {
  margin-left: 8px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  font-weight: 400;
}
.address p {
  margin: 6px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 19px;
}
.goods {
  display: flex;
  gap: 12px;
}
.thumb {
  display: flex;
  width: 76px;
  height: 76px;
  flex: none;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--k-color-primary-bg), var(--k-color-warning-bg));
  color: var(--k-color-primary-text-strong);
  font-size: 28px;
  font-weight: 700;
}
.goods-copy {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}
.goods-copy strong {
  font-size: 14px;
  line-height: 20px;
}
.goods-copy > span {
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.goods-bottom {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: auto;
}
.price {
  color: var(--k-color-text);
  font-size: 16px;
  font-weight: 600;
}
.qty {
  color: var(--k-color-text-tertiary);
  font-size: 12px;
}
.rows,
.summary {
  padding-top: 4px;
  padding-bottom: 4px;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 38px;
  color: var(--k-color-text-secondary);
  font-size: 13px;
}
.row-button {
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  color: var(--k-color-text-secondary);
  cursor: pointer;
  font: inherit;
  text-align: left;
}
.row-button:hover {
  color: var(--k-color-text);
}
.row-value {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--k-color-text);
}
.row-value i {
  color: var(--k-color-text-tertiary);
  font-style: normal;
}
.discount {
  color: var(--k-color-success-text);
}
.total {
  margin-top: 2px;
  padding-top: 8px;
  border-top: 1px solid var(--k-color-border-secondary);
  color: var(--k-color-text);
  font-size: 14px;
  font-weight: 600;
}
.total span:last-child {
  font-size: 18px;
}
.agreement {
  margin: 12px 2px 4px;
  color: var(--k-color-text-tertiary);
  font-size: 11px;
  text-align: center;
}
.tip {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  text-align: center;
}
@media (max-width: 480px) {
  .phone {
    border-radius: 22px;
  }
  .screen {
    max-height: none;
  }
}
</style>