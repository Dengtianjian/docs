#### 虚拟滚动

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| virtual | 虚拟滚动（支持变量行高、单元格合并与展开行；卡片模式按卡片高度虚拟化） | `boolean` | `false` |
| virtualThreshold | 启用虚拟滚动的行数阈值 | `number` | `40` |
| virtualOverscan | 窗口上下各预渲染的行数 | `number` | `6` |
| virtualBuffer | 滚出当前窗口多少行后才重算窗口 | `number` | `3` |
| virtualRowHeight | 未测量行的估算行高（px）；<br>实测后按真实高度计算 | `number` | — |

#### 触底加载

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| reachEndThreshold | 距底部多少 px 触发 `reachEnd` | `number` | `40` |
| loadingMore | 加载中：不再触发 `reachEnd`，并在表格内部底边上方悬浮加载指示 | `boolean` | `false` |
