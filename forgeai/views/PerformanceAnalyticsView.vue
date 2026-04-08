<template>
  <div>
    <!-- Page Header -->
    <a-page-header
      :title="'Performance Analytics'"
      :sub-title="'Analyze system latency and API usage'"
      class="glass-card"
      style="margin-bottom: 16px;"
    >
      <template #title>
        <LineChartOutlined style="font-size: 22px; margin-right: 8px; color: #00BFA5" />
        Performance Analytics
      </template>
    </a-page-header>

    <!-- KPI Cards -->
    <a-row :gutter="[16, 16]" style="margin-bottom: 16px;">
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="LineChartOutlined"
          :title="'Median Latency (ms)'"
          :value="latency.p50[latency.p50.length-1]"
          :glow-class="'glow-blue'"
          :theme="theme"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="LineChartOutlined"
          :title="'P95 Latency (ms)'"
          :value="latency.p95[latency.p95.length-1]"
          :glow-class="'glow-purple'"
          :theme="theme"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="LineChartOutlined"
          :title="'P99 Latency (ms)'"
          :value="latency.p99[latency.p99.length-1]"
          :glow-class="'glow-orange'"
          :theme="theme"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="LineChartOutlined"
          :title="'API Calls (30d)'"
          :value="apiCalls.reduce((a,b)=>a+b,0).toLocaleString()"
          :glow-class="'glow-green'"
          :theme="theme"
        />
      </a-col>
    </a-row>

    <!-- Latency Percentiles Chart -->
    <div class="glass-card" style="padding: 20px; margin-bottom: 16px;">
      <div :class="['text-light', theme === 'light' ? 'text-light--light' : '']" style="font-weight: bold; margin-bottom: 12px;">Latency Percentiles (ms) — Last 30 Days</div>
      <Line :data="latencyChartData" :options="latencyChartOptions" />
    </div>

    <!-- API Call Volume Chart -->
    <div class="glass-card" style="padding: 20px;">
      <div :class="['text-light', theme === 'light' ? 'text-light--light' : '']" style="font-weight: bold; margin-bottom: 12px;">API Call Volume — Last 30 Days</div>
      <Bar :data="apiCallChartData" :options="apiCallChartOptions" />
    </div>
  </div>
</template>

<script setup>
import { Bar, Line } from 'vue-chartjs'
import GlassKpiCard from '../components/common/GlassKpiCard.vue'
import { LineChartOutlined } from '@ant-design/icons-vue'
import performance from '../data/performance.json'

const latency = performance.latency
const apiCalls = performance.apiCalls

const latencyChartData = {
  labels: Array.from({length: latency.p50.length}, (_, i) => `Day ${i+1}`),
  datasets: [
    { label: 'P50', borderColor: '#00BFA5', backgroundColor: 'rgba(0,191,165,0.1)', data: latency.p50, fill: false, tension: 0.3 },
    { label: 'P95', borderColor: '#FFD740', backgroundColor: 'rgba(255,215,64,0.1)', data: latency.p95, fill: false, tension: 0.3 },
    { label: 'P99', borderColor: '#FF5252', backgroundColor: 'rgba(255,82,82,0.1)', data: latency.p99, fill: false, tension: 0.3 }
  ]
}
const latencyChartOptions = {
  responsive: true,
  plugins: { legend: { labels: { color: 'rgba(255,255,255,0.7)' } } },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } },
    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } }
  }
}

const apiCallChartData = {
  labels: Array.from({length: apiCalls.length}, (_, i) => `Day ${i+1}`),
  datasets: [
    { label: 'API Calls', backgroundColor: '#7C4DFF', data: apiCalls }
  ]
}
const apiCallChartOptions = {
  responsive: true,
  plugins: { legend: { labels: { color: 'rgba(255,255,255,0.7)' } } },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } },
    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } }
  }
}
</script>
