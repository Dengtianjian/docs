# 移动端确认订单

> 模板类型：页面（Pages） · 移动端。手机框内展示地址、商品、优惠、金额与底部提交栏，配送方式使用 KActionSheet。

## 预览

<Demo
  path="templates/mobile-order"
  title="确认订单页"
  :desc="['KNavBar + KNoticeBar + 分组卡片构成移动端页面骨架。', '点击「配送方式」打开底部操作面板，选择后回写当前行。', 'KSubmitBar 使用非 fixed 模式，嵌在手机框内；真实页面可加 `fixed` 吸底。']"
/>

## 组成

| 区域 | 使用组件 | 说明 |
| --- | --- | --- |
| 顶部 | `KNavBar` | 标题、副标题与返回事件 |
| 通知 | `KNoticeBar` | 优惠提示，不显示关闭 |
| 地址 / 商品 | `KTag` + 原生布局 | 地址默认标记与商品信息 |
| 操作行 | `KActionSheet` | 配送方式选择，支持取消与遮罩关闭 |
| 金额 | 原生布局 | 商品金额、运费、优惠与合计 |
| 底部提交 | `KSubmitBar` | 实付金额与提交订单按钮 |

## 复制后替换

1. 地址、商品、金额都写在模板里，接业务时改成 `v-for` 渲染购物车行，并把合计改为计算值。
2. `delivery` 与 `deliveryActions` 是配送方式的唯一来源；接运费接口时在 `selectDelivery` 里重新计算价格。
3. `KSubmitBar` 的 `price` 是展示值；真实提交前要在 `@submit` 里做库存、地址与支付方式校验。
4. 页面放在真实路由时，把手机框的 `width`、圆角和阴影去掉，让页面占满视口，并给 `KSubmitBar` 加 `fixed`。

## 注意

- `KActionSheet` 默认 Teleport 到 `body`，在文档站预览时会覆盖整页；业务里如果已有 `KApp` / `popupContainer`，按项目弹层容器配置。
- 金额展示保留两位小数；示例里的价格是静态 mock，不要直接把 `price` 当作支付金额来源。
- 手机框内的滚动区域只用于文档预览；真实页面用页面滚动或 `KScrollArea` 承接长内容。