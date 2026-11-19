<template>
  <div>
    <p class="hint">
      4 个部门 × 3 个团队 × 6 名成员，共 88 行，再加顶/底固定汇总行：树形展开、固定列、多级表头、单元格合并、
      虚拟滚动与吸顶表头同时开启。「批次」列的 rowSpan 按<strong>当前可见行</strong>实时计算（团队行 + 展开的成员），
      收起团队自动缩回；「状态」列筛选改变可见行时合并同步重算，不会吞掉相邻分组；里程碑行横向合并任务与备注。
      固定行只放扁平汇总行——树节点固定后其子树不再展示。
    </p>
    <KTable
      class="tree-combined-demo"
      row-key="id"
      tree
      virtual
      sticky
      :columns="columns"
      :data-source="rows"
      :span-method="spanMethod"
      :row-pinning="{ top: ['pinned-top'], bottom: ['pinned-bottom'] }"
      :scroll="{ x: 1490, y: 420 }"
      :expanded-row-keys="expandedKeys"
      @update:expanded-row-keys="onExpandedChange"
      @filter-change="onFilterChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import type {
  KTableCellSpan,
  KTableColumn,
  KTableFilterState,
  KTableRowKey,
  KTableSpanContext,
} from 'kit/vue/ui'

interface Row {
  id: string
  name: string
  owner: string
  role: string
  email: string
  batch: string
  task: string
  note: string
  progress: number
  score: number
  status: string
  risk: string
  milestone: boolean
  team: string
  children?: Row[]
}

const STATUSES = ['已完成', '进行中', '待开始']
const DEPTS = ['研发部', '设计部', '产品部', '测试部']

const departments: Row[] = DEPTS.map((dept, deptIndex) => {
  const deptId = `d${deptIndex + 1}`
  const teams: Row[] = Array.from({ length: 3 }, (_, teamIndex): Row => {
    const teamId = `${deptId}-t${teamIndex + 1}`
    const batch = `B${deptIndex + 1}.${teamIndex + 1}`
    const members: Row[] = Array.from({ length: 6 }, (_, memberIndex): Row => {
      const seq = memberIndex + 1
      const progress = 30 + ((deptIndex * 11 + teamIndex * 9 + memberIndex * 7) % 70)
      const milestone = memberIndex === 5
      return {
        id: `${teamId}-m${seq}`,
        name: `成员 ${deptIndex + 1}-${teamIndex + 1}-${seq}`,
        owner: `员工 ${deptIndex + 1}-${teamIndex + 1}-${seq}`,
        role: ['工程师', '负责人', '实习生'][(teamIndex + memberIndex) % 3],
        email: `member${deptIndex + 1}-${teamIndex + 1}-${seq}@example.com`,
        batch,
        task: milestone
          ? `第 ${deptIndex + 1}-${teamIndex + 1} 组周会：同步批次进度与风险（里程碑行，横向合并）`
          : `任务 ${deptIndex + 1}-${teamIndex + 1}-${seq}：树形 + 合并 + 虚拟组合`,
        note: milestone ? '—' : `备注 ${seq}`,
        progress,
        score: 60 + ((deptIndex * 13 + teamIndex * 7 + memberIndex * 5) % 40),
        status: progress >= 80 ? '已完成' : progress >= 55 ? '进行中' : '待开始',
        risk: ['低', '中', '高'][memberIndex % 3],
        milestone,
        team: teamId,
      }
    })
    return {
      id: teamId,
      name: `团队 ${deptIndex + 1}-${teamIndex + 1}`,
      owner: `组长 ${deptIndex + 1}-${teamIndex + 1}`,
      role: '团队',
      email: `team${deptIndex + 1}-${teamIndex + 1}@example.com`,
      batch,
      task: `团队 ${deptIndex + 1}-${teamIndex + 1} 共 6 名成员`,
      note: '—',
      progress: 40 + ((deptIndex * 17 + teamIndex * 13) % 55),
      score: 70 + ((deptIndex * 5 + teamIndex * 3) % 28),
      status: ['进行中', '已完成'][(deptIndex + teamIndex) % 2],
      risk: ['低', '中'][teamIndex % 2],
      milestone: false,
      team: teamId,
      children: members,
    }
  })
  return {
    id: deptId,
    name: dept,
    owner: `总监 ${deptIndex + 1}`,
    role: '部门',
    email: `dept${deptIndex + 1}@example.com`,
    batch: '—',
    task: `${dept} 下 3 个团队`,
    note: '—',
    progress: 50 + deptIndex * 10,
    score: 75 + deptIndex * 4,
    status: '进行中',
    risk: '低',
    milestone: false,
    team: deptId,
    children: teams,
  }
})

const rows: Row[] = [
  {
    id: 'pinned-top',
    name: '项目总览',
    owner: '—',
    role: '汇总',
    email: '—',
    batch: '—',
    task: '4 个部门 · 12 个团队 · 72 名成员',
    note: '顶固定行',
    progress: 66,
    score: 0,
    status: '进行中',
    risk: '低',
    milestone: false,
    team: '',
  },
  ...departments,
  {
    id: 'pinned-bottom',
    name: '待跟进',
    owner: '—',
    role: '汇总',
    email: '—',
    batch: '—',
    task: '筛选「待开始」后统一回归',
    note: '底固定行',
    progress: 20,
    score: 0,
    status: '待开始',
    risk: '中',
    milestone: false,
    team: '',
  },
]

const columns: KTableColumn<Row>[] = [
  { key: 'name', dataIndex: 'name', title: '部门 / 团队 / 成员', width: 250, fixed: 'left', ellipsis: true },
  { key: 'batch', dataIndex: 'batch', title: '批次', width: 80, align: 'center' },
  {
    key: 'member',
    title: '成员',
    children: [
      { key: 'role', dataIndex: 'role', title: '角色', width: 100 },
      { key: 'owner', dataIndex: 'owner', title: '负责人', width: 130 },
      { key: 'email', dataIndex: 'email', title: '邮箱', width: 200, ellipsis: true, ellipsisTooltip: true },
    ],
  },
  {
    key: 'mission',
    title: '任务',
    children: [
      { key: 'task', dataIndex: 'task', title: '任务 / 里程碑', width: 260, ellipsis: true },
      { key: 'note', dataIndex: 'note', title: '备注', width: 120, ellipsis: true },
    ],
  },
  {
    key: 'metric',
    title: '指标',
    children: [
      { key: 'progress', dataIndex: 'progress', title: '进度', width: 80, align: 'right' },
      { key: 'score', dataIndex: 'score', title: '评分', width: 90, align: 'right', sortable: true },
    ],
  },
  {
    key: 'state',
    title: '状态',
    children: [
      {
        key: 'status',
        dataIndex: 'status',
        title: '进度状态',
        width: 100,
        fixed: 'right',
        filters: STATUSES.map(status => ({ label: status, value: status })),
      },
      { key: 'risk', dataIndex: 'risk', title: '风险', width: 72, fixed: 'right' },
    ],
  },
]

const expandedKeys = ref<KTableRowKey[]>([
  'd1', 'd1-t1', 'd1-t2', 'd1-t3',
  'd2', 'd2-t1', 'd2-t2', 'd2-t3',
])
/** 表格内部管理筛选，演示只镜像状态，用来按同样的规则计算可见行与合并跨度 */
const filterState = ref<KTableFilterState>({})
const expandedSet = computed(() => new Set(expandedKeys.value.map(String)))

function onExpandedChange(keys: KTableRowKey[]) {
  expandedKeys.value = keys
}
function onFilterChange(value: KTableFilterState) {
  filterState.value = value
}

/** 与表格的树内筛选一致：命中行与祖先链保留，祖先强制展开 */
const filteredTree = computed(() => {
  const picked = new Set((filterState.value.status as string[] | undefined) ?? [])
  const forcedExpanded = new Set<string>()
  if (!picked.size) return { nodes: departments, forcedExpanded }
  const walk = (nodes: Row[]): Row[] =>
    nodes.flatMap(node => {
      const children = walk(node.children ?? [])
      if (children.length) {
        forcedExpanded.add(node.id)
        return [{ ...node, children }]
      }
      return picked.has(node.status) ? [{ ...node, children: [] }] : []
    })
  return { nodes: walk(departments), forcedExpanded }
})

const visibleFlat = computed(() => {
  const out: Row[] = []
  const { nodes, forcedExpanded } = filteredTree.value
  const walk = (list: Row[]) => {
    list.forEach(node => {
      out.push(node)
      const open = expandedSet.value.has(node.id) || forcedExpanded.has(node.id)
      if (open && node.children?.length) walk(node.children)
    })
  }
  walk(nodes)
  return out
})

/** 批次合并组 = 当前可见的同一团队连续行（团队行 + 已展开成员），收起团队后自然只剩一行 */
const batchSpans = computed(() => {
  const spans = new Map<string, number>()
  const list = visibleFlat.value
  let index = 0
  while (index < list.length) {
    let end = index + 1
    while (end < list.length && list[end].team === list[index].team) end += 1
    if (end - index > 1) spans.set(list[index].id, end - index)
    index = end
  }
  return spans
})

function spanMethod({ row, columnIndex }: KTableSpanContext<Row>): KTableCellSpan | undefined {
  if (columnIndex === 1) {
    const span = batchSpans.value.get(row.id)
    return span && span > 1 ? { rowSpan: span } : undefined
  }
  if (columnIndex === 5 && row.milestone) return { colSpan: 2 }
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
</style>