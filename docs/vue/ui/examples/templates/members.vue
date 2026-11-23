<template>
  <div class="recipe-members">
    <header class="page-head">
      <div>
        <p class="eyebrow">团队设置</p>
        <h2>成员管理</h2>
        <p class="muted">管理成员、角色与邀请状态。列表、筛选与邀请弹窗都在这个页面里。</p>
      </div>
      <div class="head-actions">
        <KButton variant="outlined">导入名单</KButton>
        <KButton type="primary" @click="inviteOpen = true">邀请成员</KButton>
      </div>
    </header>

    <section class="mini-stats">
      <div>
        <span>全部成员</span>
        <strong>{{ members.length }}</strong>
      </div>
      <div>
        <span>活跃成员</span>
        <strong>{{ activeCount }}</strong>
      </div>
      <div>
        <span>待加入</span>
        <strong>{{ pendingCount }}</strong>
      </div>
    </section>

    <KCard class="table-card">
      <div class="toolbar">
        <div class="search-field">
          <KInput
            v-model="keyword"
            clearable
            placeholder="搜索姓名或邮箱"
          />
        </div>
        <div class="team-field">
          <KSelect v-model="team" :options="teamOptions" />
        </div>
        <span v-if="selected.length" class="selection">
          已选 {{ selected.length }} 人
          <KButton size="sm" type="danger" variant="text" @click="removeSelected">移除</KButton>
        </span>
        <span v-else-if="notice" class="notice">{{ notice }}</span>
        <span class="spacer" />
        <KButton size="sm" variant="text" @click="clearFilters">清空筛选</KButton>
      </div>
      <KTable
        row-key="id"
        :columns="columns"
        :data-source="filtered"
        :row-selection="selection"
        :pagination="{ pageSize: 6 }"
        :scroll="{ x: 760 }"
        @selection-change="onSelection"
      />
    </KCard>

    <KModal v-model:open="inviteOpen" title="邀请成员" :width="420">
      <p class="modal-tip">成员会收到一封邀请邮件，接受后自动加入所选团队。</p>
      <KForm
        ref="formRef"
        :model="inviteForm"
        :rules="inviteRules"
        layout="vertical"
      >
        <KFormItem label="姓名" name="name">
          <KInput v-model="inviteForm.name" placeholder="例如：林一" />
        </KFormItem>
        <KFormItem label="邮箱" name="email">
          <KInput v-model="inviteForm.email" placeholder="name@company.com" />
        </KFormItem>
        <KFormItem label="团队" name="team">
          <KSelect v-model="inviteForm.team" :options="inviteTeamOptions" placeholder="选择团队" />
        </KFormItem>
      </KForm>
      <template #footer>
        <div class="modal-footer">
          <KButton @click="inviteOpen = false">取消</KButton>
          <KButton type="primary" @click="submitInvite">发送邀请</KButton>
        </div>
      </template>
    </KModal>
  </div>
</template>

<script setup lang="ts">
import { computed, h, reactive, ref } from 'vue'
import KAvatar from 'kit/vue/ui/components/Avatar/Avatar.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KCard from 'kit/vue/ui/components/Card/Card.vue'
import KForm from 'kit/vue/ui/components/Form/Form.vue'
import KFormItem from 'kit/vue/ui/components/Form/FormItem.vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KModal from 'kit/vue/ui/components/Modal/Modal.vue'
import KSelect from 'kit/vue/ui/components/Select/Select.vue'
import KTable from 'kit/vue/ui/components/Table/Table.vue'
import KTag from 'kit/vue/ui/components/Tag/Tag.vue'
import type { KTableColumn } from 'kit/vue/ui'

type MemberStatus = '正常' | '待加入' | '已停用'

interface Member {
  id: number
  name: string
  email: string
  team: string
  role: string
  status: MemberStatus
  lastActive: string
  color: string
}

const TEAMS = ['产品设计', '前端研发', '后端研发', '市场运营']
const teamOptions = [{ label: '全部团队', value: 'all' }, ...TEAMS.map((team) => ({ label: team, value: team }))]
const inviteTeamOptions = TEAMS.map((team) => ({ label: team, value: team }))

const members = ref<Member[]>([
  { id: 1, name: '林一', email: 'linyi@example.com', team: '产品设计', role: '管理员', status: '正常', lastActive: '刚刚', color: 'var(--k-color-primary)' },
  { id: 2, name: '周舟', email: 'zhouzhou@example.com', team: '前端研发', role: '成员', status: '正常', lastActive: '12 分钟前', color: 'var(--k-color-success)' },
  { id: 3, name: '陈默', email: 'chenmo@example.com', team: '产品设计', role: '成员', status: '正常', lastActive: '1 小时前', color: 'var(--k-color-warning)' },
  { id: 4, name: '赵知远', email: 'zhaozhiyuan@example.com', team: '后端研发', role: '成员', status: '待加入', lastActive: '—', color: 'var(--k-color-info)' },
  { id: 5, name: '许清', email: 'xuqing@example.com', team: '市场运营', role: '成员', status: '正常', lastActive: '昨天', color: 'var(--k-color-error)' },
  { id: 6, name: '沈言', email: 'shenyan@example.com', team: '前端研发', role: '成员', status: '已停用', lastActive: '10 月 28 日', color: 'var(--k-color-text-tertiary)' },
  { id: 7, name: '顾南', email: 'gunan@example.com', team: '后端研发', role: '成员', status: '正常', lastActive: '2 小时前', color: 'var(--k-color-primary)' },
])

const keyword = ref('')
const team = ref('all')
const notice = ref('')
const selected = ref<Array<string | number>>([])

const filtered = computed(() => {
  const query = keyword.value.trim().toLowerCase()
  return members.value.filter((member) => {
    const matchQuery = !query || member.name.toLowerCase().includes(query) || member.email.toLowerCase().includes(query)
    const matchTeam = team.value === 'all' || member.team === team.value
    return matchQuery && matchTeam
  })
})

const activeCount = computed(() => members.value.filter((member) => member.status === '正常').length)
const pendingCount = computed(() => members.value.filter((member) => member.status === '待加入').length)

const statusColor: Record<MemberStatus, string> = {
  正常: 'success',
  待加入: 'processing',
  已停用: 'default',
}

const columns: KTableColumn<Member>[] = [
  {
    key: 'name',
    dataIndex: 'name',
    title: '成员',
    minWidth: 240,
    render: ({ row }) =>
      h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } }, [
        h(KAvatar, { text: row.name.slice(0, 1), size: 'sm', color: row.color }),
        h(
          'div',
          { style: { display: 'flex', minWidth: '0', flexDirection: 'column', gap: '1px' } },
          [
            h(
              'span',
              { style: { color: 'var(--k-color-text)', fontSize: '13px', fontWeight: '500' } },
              row.name,
            ),
            h(
              'span',
              {
                style: {
                  overflow: 'hidden',
                  color: 'var(--k-color-text-tertiary)',
                  fontSize: '11px',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                },
              },
              row.email,
            ),
          ],
        ),
      ]),
  },
  { key: 'team', dataIndex: 'team', title: '团队', width: 110 },
  { key: 'role', dataIndex: 'role', title: '角色', width: 100 },
  {
    key: 'status',
    dataIndex: 'status',
    title: '状态',
    width: 100,
    render: ({ value }) =>
      h(
        KTag,
        { color: statusColor[value as MemberStatus], variant: 'borderless', size: 'sm' },
        () => String(value),
      ),
  },
  { key: 'lastActive', dataIndex: 'lastActive', title: '最近活跃', width: 120 },
  {
    key: 'actions',
    title: '操作',
    width: 80,
    align: 'right',
    render: ({ row }) =>
      h(
        KButton,
        {
          size: 'sm',
          variant: 'text',
          onClick: () => (notice.value = `已打开「${row.name}」的详情（演示）`),
        },
        () => '详情',
      ),
  },
]

const selection = {
  type: 'checkbox' as const,
  onChange: (keys: Array<string | number>) => {
    selected.value = keys
  },
}

function onSelection(keys: Array<string | number>) {
  selected.value = keys
}

function removeSelected() {
  const count = selected.value.length
  members.value = members.value.filter((member) => !selected.value.includes(member.id))
  selected.value = []
  notice.value = `已移除 ${count} 位成员（演示）`
}

function clearFilters() {
  keyword.value = ''
  team.value = 'all'
  notice.value = ''
}

const inviteOpen = ref(false)
const formRef = ref<InstanceType<typeof KForm> | null>(null)
const inviteForm = reactive({
  name: '',
  email: '',
  team: '',
})
const inviteRules: Record<string, unknown> = {
  name: [{ required: true, message: '请输入姓名' }],
  email: [
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '邮箱格式不正确' },
  ],
  team: [{ required: true, message: '请选择团队' }],
}
let nextId = 8

async function submitInvite() {
  try {
    await formRef.value?.validate()
  } catch {
    return
  }
  const email = inviteForm.email.trim()
  members.value.unshift({
    id: nextId++,
    name: inviteForm.name.trim(),
    email,
    team: inviteForm.team,
    role: '成员',
    status: '待加入',
    lastActive: '—',
    color: 'var(--k-color-info)',
  })
  inviteOpen.value = false
  formRef.value?.resetFields()
  Object.assign(inviteForm, { name: '', email: '', team: '' })
  notice.value = `邀请已发送给 ${email}`
}
</script>

<style scoped>
.recipe-members {
  padding: 20px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: 16px;
  background: var(--k-color-bg-layout);
  color: var(--k-color-text);
}
.page-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  padding: 2px 2px 18px;
}
.eyebrow {
  margin: 0 0 6px;
  color: var(--k-color-text-tertiary);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.page-head h2 {
  margin: 0;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.02em;
}
.muted {
  margin: 6px 0 0;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
.head-actions {
  display: flex;
  flex: none;
  gap: 8px;
}
.mini-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 12px;
}
.mini-stats div {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: 10px;
  background: var(--k-color-bg-container);
}
.mini-stats span {
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.mini-stats strong {
  font-size: 20px;
  font-weight: 600;
}
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.search-field {
  width: 240px;
}
.team-field {
  width: 150px;
}
.search-field :deep(.k-input),
.team-field :deep(.k-select) {
  width: 100%;
}
.selection,
.notice {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
.notice {
  color: var(--k-color-success-text);
}
.spacer {
  flex: 1;
}
.modal-tip {
  margin: 0 0 14px;
  color: var(--k-color-text-secondary);
  font-size: 12px;
  line-height: 20px;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
}
@media (max-width: 700px) {
  .recipe-members {
    padding: 12px;
  }
  .page-head {
    align-items: flex-start;
    flex-direction: column;
  }
  .head-actions {
    width: 100%;
  }
  .head-actions > * {
    flex: 1;
  }
  .mini-stats {
    grid-template-columns: minmax(0, 1fr);
  }
  .search-field,
  .team-field {
    width: 100%;
  }
  .spacer {
    display: none;
  }
}
</style>