<template>
  <div>
    <!-- Page Header -->
    <a-page-header
      :title="'Model Registry'"
      :sub-title="'Browse and manage all ML models'"
      class="glass-card"
    >
      <template #title>
        <DatabaseOutlined style="font-size: 22px; margin-right: 8px; color: #7C4DFF" />
        Model Registry
      </template>
    </a-page-header>

    <!-- Filters & Search -->
    <div class="glass-card" style="margin: 16px 0; padding: 20px; display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
      <a-input-search v-model:value="search" placeholder="Search models..." style="max-width: 260px;" allow-clear />
      <a-select v-model:value="status" style="width: 160px;" :options="statusOptions" />
      <a-select v-model:value="environment" style="width: 180px;" :options="envOptions" />
    </div>

    <!-- Model Summary Cards -->
    <a-row :gutter="[16, 16]" style="margin-bottom: 16px;">
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="DatabaseOutlined"
          :title="'Total Models'"
          :value="filteredModels.length"
          :glow-class="'glow-blue'"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="CheckCircleOutlined"
          :title="'Active'"
          :value="modelCount('Active')"
          :glow-class="'glow-green'"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="ExperimentOutlined"
          :title="'Training'"
          :value="modelCount('Training')"
          :glow-class="'glow-purple'"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="StopOutlined"
          :title="'Inactive'"
          :value="modelCount('Inactive')"
          :glow-class="'glow-orange'"
        />
      </a-col>
    </a-row>

    <!-- Model Table -->
    <div class="glass-card" style="padding: 20px;">
      <GlassTable :columns="columns" :data="filteredModels" :row-key="'id'" :pagination="{ pageSize: 8 }" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue'
import { useModelStore } from '../stores/modelStore'
import GlassKpiCard from '../components/common/GlassKpiCard.vue'
import GlassTable from '../components/common/GlassTable.vue'
import { DatabaseOutlined, CheckCircleOutlined, ExperimentOutlined, StopOutlined } from '@ant-design/icons-vue'

const modelStore = useModelStore()
const search = ref('')
const status = ref('All')
const environment = ref('All')

const statusOptions = [
  { label: 'All Statuses', value: 'All' },
  { label: 'Active', value: 'Active' },
  { label: 'Training', value: 'Training' },
  { label: 'Inactive', value: 'Inactive' }
]
const envOptions = [
  { label: 'All Environments', value: 'All' },
  { label: 'Production', value: 'Production' },
  { label: 'Staging', value: 'Staging' },
  { label: 'Development', value: 'Development' }
]

const filteredModels = computed(() =>
  modelStore.filterModels({ search: search.value, status: status.value, environment: environment.value })
)
const modelCount = (statusVal) => modelStore.models.filter(m => m.status === statusVal).length

const columns = [
  {
    title: 'Model',
    key: 'name',
    customRender: ({ record }) => [
      h('span', { style: 'font-weight:bold;' }, record.name),
      h('br'),
      h('span', { style: 'color:rgba(255,255,255,0.6);font-size:13px;' }, record.product)
    ]
  },
  { title: 'Version', dataIndex: 'version', key: 'version' },
  { title: 'Framework', dataIndex: 'framework', key: 'framework' },
  { title: 'Accuracy (%)', dataIndex: 'accuracy', key: 'accuracy', customRender: ({ record }) => record.accuracy ? record.accuracy.toFixed(2) : '' },
  { title: 'Latency (ms)', dataIndex: 'latency', key: 'latency' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    customRender: ({ record }) => h(
      'a-tag',
      { color: record.status === 'Active' ? 'green' : record.status === 'Training' ? 'purple' : 'orange' },
      record.status
    )
  },
  { title: 'Environment', dataIndex: 'environment', key: 'environment' },
  { title: 'Last Trained', key: 'lastTrained', customRender: ({ record }) => new Date(record.lastTrained).toLocaleDateString() }
]
</script>
