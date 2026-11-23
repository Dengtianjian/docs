# 数据看板

> 模板类型：页面（Pages） · 桌面端数据首页。用统计卡、趋势图、目标进度和订单表拼出一个可直接落地的运营概览页。

## 预览

<Demo
  path="templates/dashboard"
  title="运营数据看板"
  :desc="['顶部应用栏 + 问候区 + 4 张指标卡。', '主区域左侧趋势折线、右侧本月目标与进度。', '底部最近订单表，窄屏下自动横向滚动。']"
/>

## 组成

| 区域 | 使用组件 | 说明 |
| --- | --- | --- |
| 应用栏 | `KButton` / `KAvatarGroup` | 品牌标记、页面操作与协作者头像 |
| 指标卡 | `KCard` / `KStatistic` | 指标值、前后缀、精度与环比趋势 |
| 趋势图 | `KChart` | 折线 + 面积，两条系列共用分类轴 |
| 目标卡 | `KProgress` / `KList` | 环形进度与目标拆解列表 |
| 订单表 | `KTable` / `KTag` | 自定义金额与状态单元格，固定列宽 |

## 复制后替换

1. 替换 `metrics`、`chartSeries`、`goalItems`、`orders` 四组 mock 数据。
2. 订单状态列用 `render` 返回 `KTag`；接真实状态枚举时同步修改 `statusColor`。
3. 页面底部的 `KTable` 已开启 `scroll.x`，移动端会保留表格结构并横向滚动；如果希望改成卡片，可切到 `KTable` 的 `stacked` 模式。
4. 顶部操作按钮目前只做展示；接入路由或命令时替换 `KButton` 的 `@click`。

## 注意

- 示例使用 `KCard` 的默认外观，没有额外覆写组件内部 padding；改密度时优先调 `size` 与栅格间距。
- 图表颜色走 `KChart` 默认调色板；品牌色需要统一时，传 `colors` 或在主题里导出图表色板。