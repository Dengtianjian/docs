# 模板（Templates）

> 用 K UI 已落地组件拼出来的完整页面、常用区块，以及再封装一层形成的可复用组件。页面与区块是单文件 SFC，点「查看代码 / 复制代码」就能拿走；二次封装组件是 kit 里的正式组件（导出 + `KResolver`），不是可复制模板。

## 页面、区块与二次封装组件

| 类型 | 说明 | 当前条目 |
| --- | --- | --- |
| 页面（Pages） | 带完整信息层级与页面容器的模板，可直接作为路由页起点 | [数据看板](./pages/dashboard.md)、[成员管理](./pages/members.md)、[移动端确认订单](./pages/mobile-order.md) |
| 区块（Blocks） | 可嵌入任意页面的功能区块，按业务场景组合 | [登录](./blocks/login.md)、[定价方案](./blocks/pricing.md)、[通知设置](./blocks/settings.md)、[苹果活动环](./blocks/activity-rings.md) |
| 二次封装（Composed） | 对 K UI 组件再封装一层形成的可复用组件，处理路由等额外能力 | [路由页签](./composed/router-tabs.md)、[路由菜单](./composed/router-menu.md) |

## 怎么用

1. 页面 / 区块：打开模板页，展开「查看代码」确认依赖组件，再点「复制代码」，粘贴为业务项目里的 `.vue` 单文件。
2. 二次封装组件：直接从 kit 导入组件（如 `KRouterTabs` / `KRouterMenu`），按组件页的接入示例传路由或菜单数据。
3. 示例内的 mock 数据、按钮文案与路由跳转都集中在 `<script setup>` 顶部，先替换这些。
4. 保持 `kit/vue/ui/components/<category>/<Name>/<Name>.vue` 单文件导入即可；如果项目已接 `KResolver`，可以把导入换成全局组件名。
5. 主题、亮暗、移动端尺寸继续由 K UI token 控制；示例只写布局与业务样式，不覆写组件内部变量。

## 约定

- **页面 / 区块不是组件**：没有额外的 `KXxxTemplate` 导出，也不承诺跨项目 API 稳定；它们是可读、可改的起点代码。
- **二次封装是正式组件**：`KRouterTabs` / `KRouterMenu` 在 kit 内封装、随 kit 导出并接入 `KResolver`，API 按组件维护；本区不是模板代码复制。
- **复制即完整**：页面与区块的样式写在同一个 SFC 的 `<style scoped>` 里，复制一个文件即可还原外观；图片位使用色块/文字占位，不依赖外部资源。
- **数据与交互可替换**：表格、图表、表单数据都在示例内声明，接入时换成接口返回即可。
- **优先用组件能力**：弹窗、下拉、移动端弹层等直接使用 K UI 的交互语义，不在示例里重造键盘与焦点逻辑。