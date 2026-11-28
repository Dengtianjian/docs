# 苹果活动环

> 模板类型：区块（Blocks） · Apple 活动圆环风格。深色卡片中三个渐变同心环 + 进度头部徽标 / 顶部裸图标 + 指标列表，基于 `KProgressGroup` / `KProgress` 组合，不新增组件 API。

## 预览

<Demo
  path="templates/activity-rings"
  title="苹果活动环模块"
  :desc="['三个渐变环由 KProgressGroup 同心叠放：strokeColor 控制环色，trailColor 控制轨道；徽标贴着各环进度头部。', 'KProgressGroup 只接管直径 / 线宽 / 间距，percent 与颜色仍由子项决定。', '第二个卡片把轨道换成渐变，进入视口后用 1.2s 缓动把三个环从 0 长到目标值，徽标与环同步移动。', '第三个卡片去掉徽标底色，三枚白色图标按环半径落在 12 点方向的环中心线上。']"
/>

## 组成

| 区域 | 使用组件 | 说明 |
| --- | --- | --- |
| 卡片 | 原生布局 + CSS | 深色渐变卡片，模板自带 |
| 同心环 | `KProgressGroup` | 240px 外径、20px 环宽、8px 间距 |
| 环体 | `KProgress` | `percent` + 渐变 `strokeColor` + 半透明或渐变 `trailColor` |
| 渐变轨道版 | `KProgress` `trailColor` | 第二个卡片把环色数组首尾色降透明度后作为轨道渐变数组 |
| 起始徽标 | `@tabler/icons-vue` | 按各环半径与进度头部角度计算位置，图标随数据切换 |
| 顶部裸图标版 | 原生定位 | 第三个卡片去掉徽标底色，白色图标固定在 12 点方向，层级高于环面 |
| 指标列表 | 原生布局 | 颜色点 + 名称 + 数值 + 百分比 |

## 复制后替换

1. `rings` 提供环色与图标；`variants` 提供每张卡片的 `percents / values / tip`，三个卡片共用同一组环。
2. `variants` 控制卡片形态：`gradientTrail=true` 时用 `trailGradientOf` 把环色数组首尾色降透明度生成 trailColor 数组（当前 0.34 → 0.06），换环色后轨道会自动跟随；`animated=true` 时进入视口后用 rAF 从 0 缓动到目标值（1.2s ease-out）；`bareIcons=true` 时去掉徽标底色、图标按环半径固定 12 点。
3. 几何常量联动：`GROUP_SIZE=240`、`RING_STROKE=20`、`RING_GAP=8`；环径按「前一环线宽 + gap」递推为 240 / 184 / 128，`ringRadii` 由同一组常量算出，徽标 `badgeStyle` 再按半径与头部角度求 `left / top`，改尺寸或线宽只需改常量。
4. 深色卡片是模板样式；放到浅色页面时把卡片背景改浅、`trailColor` 换成浅色、文字颜色反转即可。
5. 中心留空；需要中心数据时用 `KProgressGroup` 的 `#content` 插槽自行排版（组件不注入排版样式）。
6. `KProgressGroup` 会把子项统一为 `circle` 并隐藏自带中心信息，只保留 `percent / strokeColor / segments / status` 等数据能力。

## 注意

- 环的填充从 12 点开始顺时针推进，缺口位置由 `percent` 决定；要固定缺口落点可调整 percent 或旋转整组容器。
- `gap=0` 时环带相切不重叠；本模板用 8px 保持环间呼吸。
- 徽标按环半径与头部角度用 `left / top` 定位（`translate(-50%, -50%)` 居中），随 percent 变化移动；裸图标版固定在 12 点（`top = 140 - 半径`）。改尺寸 / 线宽 / 间距时同步几何常量即可。