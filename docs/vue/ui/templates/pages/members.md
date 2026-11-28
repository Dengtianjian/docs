# 成员管理

> 模板类型：页面（Pages） · 桌面端列表页。包含搜索、团队筛选、行选择、批量移除与邀请成员表单。

## 预览

<Demo
  path="templates/members"
  title="成员管理页"
  :desc="['搜索与团队筛选驱动同一份 `filtered` 列表。', '表格支持行选择；选中后工具栏出现批量移除。', '「邀请成员」打开 KModal，表单校验通过后直接插入待加入成员。']"
/>

## 组成

| 区域 | 使用组件 | 说明 |
| --- | --- | --- |
| 页头 | `KButton` | 导入名单与邀请成员入口 |
| 指标条 | 原生布局 | 全部成员、活跃成员、待加入数量 |
| 工具栏 | `KInput` / `KSelect` / `KButton` | 搜索、团队筛选、清空筛选与批量操作 |
| 成员表 | `KTable` / `KAvatar` / `KTag` | 自定义成员单元格、状态标签、行选择 |
| 邀请弹窗 | `KModal` / `KForm` / `KFormItem` | 姓名、邮箱、团队三字段校验 |

## 复制后替换

1. `members` 是页面唯一数据源；接入时换成接口返回的数组，保留 `id` 与 `status` 即可。
2. `selection.onChange` 与 `@selection-change` 目前重复同步 `selected`，接业务后只保留一条即可。
3. `submitInvite` 在校验通过后直接改本地数组；真实场景把它替换为邀请接口，等待成功后 `unshift` 返回的成员。
4. 表格 `scroll.x` 预留了 760px 横向空间；列少时可以删除，列多时按需补 `fixed: 'left' / 'right'`。

## 注意

- `KTable` 的分页是客户端分页；接服务端分页时改为 `v-model:current` + `v-model:page-size` 并让接口返回当前页。
- 行选择默认跨页保留；如果只需要当前页选择，接业务时确认 `selectAllScope` 的取值。
- 邀请表单的 `validate()` 失败时错误已经由 `KFormItem` 展示，示例里直接 `return`，不再额外弹提示。