<template>
  <div>
    <p class="hint">
      80 行、每 4 行一组：部门/组号固定左侧，状态/风险固定右侧，中间 9 列（任务、备注、阶段、进度、工时、评分、邮箱等）；
      多级表头、顶/底固定行、虚拟滚动与吸顶表头同时开启。
      「组号」排序保持整组相邻；「进度 / 评分」是组内排序（先组号、组内再比较），合并不会被打散；「部门」筛选按整组过滤。
      点击行首箭头展开时内容追加到所属合并组末尾；存在展开行期间虚拟滚动自动暂停。
    </p>
    <KTable
      :columns="columns"
      :data-source="rows"
      :span-method="spanMethod"
      :row-pinning="{ top: [901], bottom: [902] }"
      virtual
      sticky
      :scroll="{ x: 1520, y: 420 }"
    >
      <template #expanded="{ row, index, rowKey }">
        <div class="detail">
          <strong>{{ row.name }} · {{ row.dept }}</strong>
          <span>第 {{ index + 1 }} 行 · key {{ rowKey }}</span>
          <span>任务：{{ row.task }}</span>
          <span>备注：{{ row.note }}</span>
        </div>
      </template>
    </KTable>
  </div>
</template>

<script setup lang="ts">
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import type {
  KTableCellSpan,
  KTableColumn,
  KTableSpanContext,
} from 'kit/vue/ui'

interface Row {
  id: number
  dept: string
  group: number
  name: string
  role: string
  email: string
  task: string
  note: string
  phase: string
  progress: number
  hours: number
  score: number
  status: string
  risk: string
  first: boolean
  span: number
  milestone: boolean
}

const GROUP = 4
const TOTAL = 80
const DEPTS = ['研发部', '设计部', '产品部', '测试部']

const byGroupThen = (pick: (row: Row) => number) => (a: Row, b: Row) =>
  a.group - b.group || pick(a) - pick(b)

const columns: KTableColumn<Row>[] = [
  {
    key: 'grp',
    title: '分组',
    children: [
      { key: 'dept', dataIndex: 'dept', title: '部门', width: 100, fixed: 'left',
        filters: DEPTS.map((dept) => ({ label: dept, value: dept })) },
      { key: 'group', dataIndex: 'group', title: '组号', width: 80, fixed: 'left', sortable: true },
    ],
  },
  {
    key: 'team',
    title: '团队',
    children: [
      { key: 'name', dataIndex: 'name', title: '成员', width: 120 },
      { key: 'role', dataIndex: 'role', title: '角色', width: 100 },
      { key: 'email', dataIndex: 'email', title: '邮箱', width: 180, ellipsis: true, ellipsisTooltip: true },
    ],
  },
  {
    key: 'mission',
    title: '任务',
    children: [
      { key: 'task', dataIndex: 'task', title: '任务 / 里程碑', width: 240, ellipsis: true },
      { key: 'note', dataIndex: 'note', title: '备注', width: 160, ellipsis: true },
      { key: 'phase', dataIndex: 'phase', title: '阶段', width: 120 },
    ],
  },
  {
    key: 'metric',
    title: '指标',
    children: [
      { key: 'progress', dataIndex: 'progress', title: '进度', width: 80, align: 'right', sortable: byGroupThen((row) => row.progress) },
      { key: 'hours', dataIndex: 'hours', title: '工时', width: 80, align: 'right' },
      { key: 'score', dataIndex: 'score', title: '评分', width: 90, align: 'right', sortable: byGroupThen((row) => row.score) },
    ],
  },
  {
    key: 'state',
    title: '状态',
    children: [
      { key: 'status', dataIndex: 'status', title: '进度状态', width: 96, fixed: 'right' },
      { key: 'risk', dataIndex: 'risk', title: '风险', width: 72, fixed: 'right' },
    ],
  },
]

const rows: Row[] = Array.from({ length: TOTAL }, (_, index) => {
  const groupIndex = Math.floor(index / GROUP)
  const milestone = index % GROUP === GROUP - 1
  const progress = 30 + ((index * 7) % 70)
  return {
    id: index + 1,
    dept: DEPTS[groupIndex % DEPTS.length],
    group: groupIndex + 1,
    name: `成员 ${index + 1}`,
    role: ['工程师', '负责人', '实习生'][index % 3],
    email: `member${index + 1}@example.com`,
    task: milestone
      ? `第 ${groupIndex + 1} 组周会：同步进度与风险（里程碑行，横向合并）`
      : `任务 ${index + 1}：合并 + 虚拟 + 固定组合验证`,
    note: milestone ? '—' : `备注 ${index + 1}`,
    phase: `W${(groupIndex % 6) + 1}`,
    progress,
    hours: 4 + ((index * 3) % 9),
    score: 60 + ((index * 11) % 40),
    status: progress >= 80 ? '已完成' : progress >= 50 ? '进行中' : '待开始',
    risk: ['低', '中', '高'][index % 3],
    first: index % GROUP === 0,
    span: Math.min(GROUP, TOTAL - index),
    milestone,
  }
})

rows.unshift({
  id: 901,
  dept: '—',
  group: 0,
  name: '项目总览',
  role: '—',
  email: '—',
  task: `共 ${TOTAL} 行 · ${DEPTS.length} 个部门轮转`,
  note: '顶固定行',
  phase: 'W0',
  progress: 65,
  hours: 0,
  score: 0,
  status: '进行中',
  risk: '低',
  first: false,
  span: 1,
  milestone: false,
})
rows.push({
  id: 902,
  dept: '—',
  group: 0,
  name: '待跟进',
  role: '—',
  email: '—',
  task: '汇总完成后统一回归',
  note: '底固定行',
  phase: 'W0',
  progress: 20,
  hours: 0,
  score: 0,
  status: '待开始',
  risk: '中',
  first: false,
  span: 1,
  milestone: false,
})

function spanMethod({ row, columnIndex }: KTableSpanContext<Row>): KTableCellSpan | undefined {
  if (columnIndex === 0 && row.first && row.span > 1) return { rowSpan: row.span }
  if (row.milestone && columnIndex === 5) return { colSpan: 2 }
  return undefined
}
</script>

<style scoped>
.hint {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
.detail {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 20px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.detail strong {
  color: var(--k-color-text);
}
</style>