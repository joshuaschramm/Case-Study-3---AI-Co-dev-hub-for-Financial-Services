<template>
  <div>
    <!-- Page Header -->
    <a-page-header
      :title="'Deployments'"
      :sub-title="'Track all product and model deployments'"
      class="glass-card"
    >
      <template #title>
        <CloudUploadOutlined style="font-size: 22px; margin-right: 8px; color: #00BFA5" />
        Deployments
      </template>
    </a-page-header>

    <!-- Filters & Search -->
    <div class="glass-card" style="margin: 16px 0; padding: 20px; display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
      <a-input-search v-model:value="search" placeholder="Search by product..." style="max-width: 260px;" allow-clear />
      <a-select v-model:value="status" style="width: 160px;" :options="statusOptions" />
      <a-select v-model:value="environment" style="width: 180px;" :options="envOptions" />
    </div>

    <!-- Deployment Summary Cards -->
    <a-row :gutter="[16, 16]" style="margin-bottom: 16px;">
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="CloudUploadOutlined"
          :title="'Total Deployments'"
          :value="filteredDeployments.length"
          :glow-class="'glow-blue'"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="CheckCircleOutlined"
          :title="'Success'"
          :value="deployCount('Success')"
          :glow-class="'glow-green'"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="CloseCircleOutlined"
          :title="'Failed'"
          :value="deployCount('Failed')"
          :glow-class="'glow-red'"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="SyncOutlined"
          :title="'In Progress'"
          :value="deployCount('In Progress')"
          :glow-class="'glow-orange'"
        />
      </a-col>
    </a-row>

    <!-- Deployments Table -->
    <div class="glass-card" style="padding: 20px;">
      <GlassTable :columns="columns" :data="filteredDeployments" :row-key="'id'" :pagination="{ pageSize: 8 }" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDeploymentStore } from '../stores/deploymentStore'
import GlassKpiCard from '../components/common/GlassKpiCard.vue'
import GlassTable from '../components/common/GlassTable.vue'
import { CloudUploadOutlined, CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons-vue'

const deploymentStore = useDeploymentStore()
const search = ref('')
const status = ref('All')
const environment = ref('All')

const statusOptions = [
  { label: 'All Statuses', value: 'All' },
  { label: 'Success', value: 'Success' },
  { label: 'Failed', value: 'Failed' },
  { label: 'In Progress', value: 'In Progress' }
]
const envOptions = [
  { label: 'All Environments', value: 'All' },
  { label: 'Production', value: 'Production' },
  { label: 'Staging', value: 'Staging' },
  { label: 'Development', value: 'Development' }
]

const filteredDeployments = computed(() =>
  deploymentStore.filterDeployments({ search: search.value, status: status.value, environment: environment.value })
)
const deployCount = (statusVal) => deploymentStore.deployments.filter(d => d.status === statusVal).length

const columns = [
  { title: 'Product', dataIndex: 'product', key: 'product' },
  { title: 'Version', dataIndex: 'version', key: 'version' },
  { title: 'Environment', dataIndex: 'environment', key: 'environment' },
  { title: 'Triggered By', dataIndex: 'triggeredBy', key: 'triggeredBy' },
  { title: 'Start Time', key: 'startTime', customRender: ({ record }) => new Date(record.startTime).toLocaleString() },
  { title: 'Duration', dataIndex: 'duration', key: 'duration' },
  { title: 'Status', dataIndex: 'status', key: 'status', customRender: ({ record }) => `<a-tag color='${record.status === 'Success' ? 'green' : record.status === 'Failed' ? 'red' : 'orange'}'>${record.status}</a-tag>` }
]
</script>
