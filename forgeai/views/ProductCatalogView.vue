<template>
  <div>
    <!-- Page Header -->
    <a-page-header
      :title="'Product Catalog'"
      :sub-title="'Explore all AI products in the organization'"
      class="glass-card"
    >
      <template #title>
        <AppstoreOutlined style="font-size: 22px; margin-right: 8px; color: #00BFA5" />
        Product Catalog
      </template>
    </a-page-header>

    <!-- Filters & Search -->
    <div class="glass-card" style="margin: 16px 0; padding: 20px; display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
      <a-input-search v-model:value="search" placeholder="Search products..." style="max-width: 260px;" allow-clear />
      <a-select v-model:value="status" style="width: 160px;" :options="statusOptions" />
      <a-select v-model:value="domain" style="width: 180px;" :options="domainOptions" />
    </div>

    <!-- Product Summary Cards -->
    <a-row :gutter="[16, 16]" style="margin-bottom: 16px;">
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="AppstoreOutlined"
          :title="'Total Products'"
          :value="filteredProducts.length"
          :glow-class="'glow-blue'"
          :theme="theme"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="CheckCircleOutlined"
          :title="'Production'"
          :value="prodCount('Production')"
          :glow-class="'glow-green'"
          :theme="theme"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="ExperimentOutlined"
          :title="'Staging'"
          :value="prodCount('Staging')"
          :glow-class="'glow-purple'"
          :theme="theme"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="RocketOutlined"
          :title="'In Development'"
          :value="prodCount('Development')"
          :glow-class="'glow-orange'"
          :theme="theme"
        />
      </a-col>
    </a-row>

    <!-- Product Table -->
    <div class="glass-card" style="padding: 20px;">
      <GlassTable :columns="columns" :data="filteredProducts" :row-key="'id'" :pagination="{ pageSize: 8 }" :theme="theme" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h, inject } from 'vue'
import { useProductStore } from '../stores/productStore'
import GlassKpiCard from '../components/common/GlassKpiCard.vue'
import GlassTable from '../components/common/GlassTable.vue'
import { AppstoreOutlined, CheckCircleOutlined, ExperimentOutlined, RocketOutlined } from '@ant-design/icons-vue'

const productStore = useProductStore()
const search = ref('')
const status = ref('All')
const domain = ref('All')
const theme = inject('theme', 'dark')

const statusOptions = [
  { label: 'All Statuses', value: 'All' },
  { label: 'Production', value: 'Production' },
  { label: 'Staging', value: 'Staging' },
  { label: 'Development', value: 'Development' }
]
const domainOptions = [
  { label: 'All Domains', value: 'All' },
  { label: 'Fraud & Risk', value: 'Fraud & Risk' },
  { label: 'Customer Experience', value: 'Customer Experience' },
  { label: 'Operations', value: 'Operations' }
]

const filteredProducts = computed(() =>
  productStore.filterProducts({ search: search.value, status: status.value, domain: domain.value })
)
const prodCount = (statusVal) => productStore.products.filter(p => p.status === statusVal).length

const columns = [
  {
    title: 'Product',
    key: 'name',
    customRender: ({ record }) => [
      h('span', { style: 'font-weight:bold;' }, record.name),
      h('br'),
      h('span', { style: 'color:rgba(255,255,255,0.6);font-size:13px;' }, record.description)
    ]
  },
  { title: 'Domain', dataIndex: 'domain', key: 'domain' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    customRender: ({ record }) => h(
      'a-tag',
      { color: record.status === 'Production' ? 'green' : record.status === 'Staging' ? 'purple' : 'orange' },
      record.status
    )
  },
  { title: 'Models', dataIndex: 'models', key: 'models' },
  { title: 'Uptime (%)', dataIndex: 'uptime', key: 'uptime', customRender: ({ record }) => record.uptime ? record.uptime.toFixed(2) : '' },
  { title: 'Users', dataIndex: 'users', key: 'users' },
  { title: 'Team', dataIndex: 'team', key: 'team' },
  { title: 'Last Updated', key: 'lastUpdated', customRender: ({ record }) => new Date(record.lastUpdated).toLocaleDateString() }
]
</script>
