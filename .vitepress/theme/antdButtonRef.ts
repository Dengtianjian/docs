/**
 * antd v5 Button 状态参考值静态表（亮 seed #1677ff / 暗默认 darkAlgorithm）。
 * 抄录来源：ant-design master components/button/style/{token,variant}.ts + themes/{seed,dark/colors}.ts（2026-11-17）。
 * 暗档色板 = @ant-design/colors v7 generate(seed, {theme:'dark'})，按 dark/colors.ts 换位映射：
 * token6(静置)=colors[5]、token5(hover)=colors[6]、token7(active)=colors[4]（计算过程 R4 页内留档）。
 * 仅收录可直接对上我们 type×variant 的组合；自创档（tonal/quiet/soft/plain/border）标 none。
 * 每格 = [静置, hover, active] 三元 × bg/fg/bd 三通道；'transparent' = 该通道不适用（如透明底）。
 */

export type Scheme = 'light' | 'dark';

type Tri = [string, string, string];
export interface AntdCell {
  /** antd 侧对应的 prop 组合说明 */
  antd: string;
  /** exact = 同义映射；approx = 近似（机制不同仅数值可参） */
  level: 'exact' | 'approx';
  bg: Tri;
  fg: Tri;
  bd: Tri;
}

interface SchemeTable {
  /** solid 三态三元组（bg=bd 同值、fg 恒白），键含 primary 与语义色 */
  solid: Record<string, Tri>;
  neutral: { fg: string; bd: string; bg: string };
  /** antd filled/text 交互灰底三档（colorFillTertiary/Secondary/Fill） */
  fill: Tri;
  link: Tri;
}

const LIGHT: SchemeTable = {
  solid: {
    primary: ['#1677ff', '#4096ff', '#0958d9'],
    info: ['#1677ff', '#4096ff', '#0958d9'],
    success: ['#52c41a', '#73d13d', '#389e0d'],
    warning: ['#faad14', '#ffc53d', '#d48806'],
    danger: ['#ff4d4f', '#ff7875', '#d9363e'],
  },
  neutral: { fg: 'rgba(0,0,0,.88)', bd: '#d9d9d9', bg: '#fff' },
  fill: ['rgba(0,0,0,.04)', 'rgba(0,0,0,.06)', 'rgba(0,0,0,.15)'],
  link: ['#1677ff', '#4096ff', '#0958d9'],
};

const DARK: SchemeTable = {
  solid: {
    primary: ['#1668dc', '#3c89e8', '#1554ad'],
    info: ['#1668dc', '#3c89e8', '#1554ad'],
    success: ['#49aa19', '#6abe39', '#3c8618'],
    warning: ['#d89614', '#e8b339', '#aa7714'],
    danger: ['#dc4446', '#e86e6b', '#ad393a'],
  },
  neutral: { fg: 'rgba(255,255,255,.85)', bd: '#424242', bg: '#141414' },
  fill: ['rgba(255,255,255,.08)', 'rgba(255,255,255,.12)', 'rgba(255,255,255,.18)'],
  link: ['#1668dc', '#3c89e8', '#1554ad'],
};

const TRANSPARENT = 'transparent';
const WHITE: Tri = ['#fff', '#fff', '#fff'];

/** primary/info/success/warning/danger 有 solid 档；default 等无 → null */
function solidTri(t: SchemeTable, type: string): Tri | null {
  return t.solid[type] ?? null;
}

/**
 * 我们的 outlined 是分裂语义（源码注释「outlined 为实底主按钮」）：
 * - default×outlined ↔ antd variant=outlined color=default（容器底，hover/active 彩框彩字）
 * - 语义×outlined ↔ antd variant=solid（实底白字；bg/fg 静置→hover c90%up→active c75%down
 *   与我们 Button.vue 状态公式逐项同值，level=exact）
 */
function outlined(t: SchemeTable, type: string): AntdCell {
  const hoverActive: Tri = [t.solid.primary[0], t.solid.primary[1], t.solid.primary[2]];
  if (type === 'default') {
    return {
      antd: 'variant=outlined color=default',
      level: 'exact',
      bg: [t.neutral.bg, t.neutral.bg, t.neutral.bg],
      fg: [t.neutral.fg, hoverActive[1], hoverActive[2]],
      bd: [t.neutral.bd, hoverActive[1], hoverActive[2]],
    };
  }
  const tri = solidTri(t, type)!;
  return {
    antd: `variant=solid color=${type}`,
    level: 'exact',
    bg: tri,
    fg: WHITE,
    bd: tri,
  };
}

export function antdRef(type: string, variant: string, scheme: Scheme = 'light'): AntdCell | null {
  const t = scheme === 'dark' ? DARK : LIGHT;
  const solidColor = solidTri(t, type);
  const isSolidType = solidColor !== null;

  switch (variant) {
    case 'outlined':
      return type === 'default' || solidColor ? outlined(t, type) : null;
    case 'dashed': {
      if (type === 'default') {
        const base = outlined(t, 'default');
        return { ...base, antd: 'variant=dashed color=default' };
      }
      if (!solidColor) return null;
      return {
        antd: `variant=dashed color=${type}（容器底彩虚线框；我们 dashed 静置同此式）`,
        level: 'exact',
        bg: [t.neutral.bg, t.neutral.bg, t.neutral.bg],
        fg: solidColor,
        bd: solidColor,
      };
    }
    case 'filled':
      return {
        antd: 'variant=filled（无 type 轴，近 our default×filled）',
        level: 'approx',
        bg: t.fill,
        fg: [t.neutral.fg, t.neutral.fg, t.neutral.fg],
        bd: [TRANSPARENT, TRANSPARENT, TRANSPARENT],
      };
    case 'text':
      return {
        antd: 'type=text（无彩色底，hover 落灰底）',
        level: 'approx',
        bg: [TRANSPARENT, t.fill[1], t.fill[2]],
        fg: isSolidType ? solidColor! : [t.neutral.fg, t.neutral.fg, t.neutral.fg],
        bd: [TRANSPARENT, TRANSPARENT, TRANSPARENT],
      };
    case 'ghost':
      return {
        antd: 'ghost=true（暗底白字白框，无彩色档）',
        level: 'approx',
        bg: [TRANSPARENT, TRANSPARENT, TRANSPARENT],
        fg: isSolidType ? solidColor! : scheme === 'dark' ? WHITE : ['#fff', 'rgba(255,255,255,.8)', 'rgba(255,255,255,.5)'],
        bd: isSolidType ? solidColor! : scheme === 'dark' ? WHITE : ['#fff', 'rgba(255,255,255,.8)', 'rgba(255,255,255,.5)'],
      };
    case 'link':
      // antd link 无 type 轴：统一链接色链（danger 走 error 色）
      return {
        antd: 'type=link（danger 用 color=danger）',
        level: 'approx',
        bg: [TRANSPARENT, TRANSPARENT, TRANSPARENT],
        fg: isSolidType ? solidColor! : t.link,
        bd: [TRANSPARENT, TRANSPARENT, TRANSPARENT],
      };
    default:
      // tonal / quiet / soft / plain / border = 自创档，antd 无对应机制
      return null;
  }
}

/** type=link 时我们忽略 variant（不落 variant 类名）：矩阵里 link 行只出一格 */
export const ANTD_NONE_NOTE =
  '自创档（tonal/quiet/soft/plain/border）：antd 无对应外观机制，不造对照。';
