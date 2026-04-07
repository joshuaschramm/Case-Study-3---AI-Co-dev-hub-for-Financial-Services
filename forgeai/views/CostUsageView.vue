<template>
  <div>
    <!-- Page Header -->
    <a-page-header
      :title="'Cost & Usage'"
      :sub-title="'Track cloud spend and product usage'"
      class="glass-card"
    >
      <template #title>
        <DollarOutlined style="font-size: 22px; margin-right: 8px; color: #00BFA5" />
        Cost & Usage
      </template>
    </a-page-header>

    <!-- KPI Cards -->
    <a-row :gutter="[16, 16]" style="margin-bottom: 16px;">
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="DollarOutlined"
          :title="'Current Month Spend'"
          :value="`$${monthly[monthly.length-1].total.toLocaleString()}`"
          :glow-class="'glow-blue'"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="DollarOutlined"
          :title="'Infra'"
          :value="`$${monthly[monthly.length-1].infra.toLocaleString()}`"
          :glow-class="'glow-purple'"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="DollarOutlined"
          :title="'ML/AI'"
          :value="`$${monthly[monthly.length-1].ml.toLocaleString()}`"
          :glow-class="'glow-green'"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="DollarOutlined"
          :title="'Data & API'"
          :value="`$${(monthly[monthly.length-1].data + monthly[monthly.length-1].api).toLocaleString()}`"
          :glow-class="'glow-orange'"
        />
      </a-col>
    </a-row>

    <!-- Monthly Cost Breakdown Chart -->
    <div class="glass-card" style="padding: 20px; margin-bottom: 16px;">
      <div class="text-light" style="font-weight: bold; margin-bottom: 12px;">Monthly Cost Breakdown (Last 6 Months)</div>
      <Bar :data="costChartData" :options="costChartOptions" />
    </div>

    <!-- Product Cost & Usage Table -->
    <div class="glass-card" style="padding: 20px;">
      <div class="text-light" style="font-weight: bold; margin-bottom: 12px;">Product Cost & Usage</div>
      <GlassTable :columns="columns" :data="byProduct" :row-key="'product'" :pagination="false" />
    </div>
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import GlassKpiCard from '../components/common/GlassKpiCard.vue'
import GlassTable from '../components/common/GlassTable.vue'
import { DollarOutlined } from '@ant-design/icons-vue'
import costs from '../data/costs.json'

const monthly = costs.monthly
const byProduct = costs.byProduct

const costChartData = {
  labels: monthly.map(m => m.month),
  datasets: [
    { label: 'Infra', backgroundColor: '#7C4DFF', data: monthly.map(m => m.infra) },
    { label: 'ML/AI', backgroundColor: '#00BFA5', data: monthly.map(m => m.ml) },
    { label: 'Data', backgroundColor: '#FFD740', data: monthly.map(m => m.data) },
    { label: 'API', backgroundColor: '#FF5252', data: monthly.map(m => m.api) }
  ]
}
const costChartOptions = {
  responsive: true,
  plugins: { legend: { labels: { color: 'rgba(255,255,255,0.7)' } } },
  scales: {
    x: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } },
    y: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } }
  }
}

const columns = [
  { title: 'Product', dataIndex: 'product', key: 'product' },
  { title: 'Cost', key: 'cost', customRender: ({ record }) => `$${record.cost.toLocaleString()}` },
  { title: 'Usage', key: 'usage', customRender: ({ record }) => record.usage.toLocaleString() }
]
</script>
