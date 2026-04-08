<template>
  <div>
    <!-- Page Header -->
    <a-page-header
      :title="'Pipeline Monitor'"
      :sub-title="'Monitor all CI/CD, ML, and ETL pipelines'"
      class="glass-card"
    >
      <template #title>
        <BranchesOutlined style="font-size: 22px; margin-right: 8px; color: #00BFA5" />
        Pipeline Monitor
      </template>
    </a-page-header>

    <!-- Filters & Search -->
    <div class="glass-card" style="margin: 16px 0; padding: 20px; display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
      <a-input-search v-model:value="search" placeholder="Search pipelines..." style="max-width: 260px;" allow-clear />
      <a-select v-model:value="status" style="width: 160px;" :options="statusOptions" />
      <a-select v-model:value="type" style="width: 180px;" :options="typeOptions" />
    </div>

    <!-- Pipeline Summary Cards -->
    <a-row :gutter="[16, 16]" style="margin-bottom: 16px;">
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="BranchesOutlined"
          :title="'Total Pipelines'"
          :value="filteredPipelines.length"
          :glow-class="'glow-blue'"
          :theme="theme"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="SyncOutlined"
          :title="'Running'"
          :value="pipelineCount('Running')"
          :glow-class="'glow-green'"
          :theme="theme"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="ClockCircleOutlined"
          :title="'Queued'"
          :value="pipelineCount('Queued')"
          :glow-class="'glow-orange'"
          :theme="theme"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="CheckCircleOutlined"
          :title="'Completed'"
          :value="pipelineCount('Completed')"
          :glow-class="'glow-purple'"
          :theme="theme"
        />
      </a-col>
    </a-row>

    <!-- Pipelines Table -->
    <div class="glass-card" style="padding: 20px;">
      <GlassTable :columns="columns" :data="filteredPipelines" :row-key="'id'" :pagination="{ pageSize: 8 }" :theme="theme" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue'
import { usePipelineStore } from '../stores/pipelineStore'
import GlassKpiCard from '../components/common/GlassKpiCard.vue'
import GlassTable from '../components/common/GlassTable.vue'
import { BranchesOutlined, SyncOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons-vue'

const pipelineStore = usePipelineStore()
const search = ref('')
const status = ref('All')
const type = ref('All')

const statusOptions = [
  { label: 'All Statuses', value: 'All' },
  { label: 'Running', value: 'Running' },
  { label: 'Queued', value: 'Queued' },
  { label: 'Completed', value: 'Completed' }
]
const typeOptions = [
  { label: 'All Types', value: 'All' },
  { label: 'CI/CD', value: 'CI/CD' },
  { label: 'ML Training', value: 'ML Training' },
  { label: 'Data ETL', value: 'Data ETL' }
]

const filteredPipelines = computed(() =>
  pipelineStore.filterPipelines({ search: search.value, status: status.value, type: type.value })
)
const pipelineCount = (statusVal) => pipelineStore.pipelines.filter(p => p.status === statusVal).length

const columns = [
  {
    title: 'Pipeline',
    key: 'name',
    customRender: ({ record }) => h('div', [
      h('span', { style: { fontWeight: 'bold' } }, record.name),
      h('br'),
      h('span', { style: { color: 'rgba(255,255,255,0.6)', fontSize: '13px' } }, record.type)
    ])
  },
  { title: 'Status', dataIndex: 'status', key: 'status', customRender: ({ record }) => h('a-tag', { color: record.status === 'Running' ? 'green' : record.status === 'Queued' ? 'orange' : 'purple' }, record.status) },
  { title: 'Progress', key: 'progress', customRender: ({ record }) => record.status === 'Running' ? h('a-progress', { percent: record.progress, size: 'small' }) : '-' },
  { title: 'Triggered By', dataIndex: 'triggeredBy', key: 'triggeredBy' },
  { title: 'Started', key: 'started', customRender: ({ record }) => record.started ? new Date(record.started).toLocaleString() : '-' },
  { title: 'Est. Remaining', dataIndex: 'estimatedRemaining', key: 'estimatedRemaining' }
]
</script>
