<template>
  <div>
    <a-page-header
      :title="'Command Center'"
      :sub-title="'Real-time overview of the AI Product Factory'"
      class="glass-card"
      style="margin-bottom: 16px;"
    >
      <template #title>
        <DashboardOutlined style="font-size: 22px; margin-right: 8px; color: #7C4DFF" />
        Command Center
      </template>
      <template #extra>
        <a-segmented
          :options="['Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'Last Quarter']"
          v-model="selectedRange"
        />
      </template>
    </a-page-header>

    <!-- KPI Cards Row -->
    <a-row :gutter="[16, 16]" style="margin-bottom: 16px;">
      <a-col v-for="kpi in kpis" :key="kpi.label" :xs="24" :sm="12" :md="8" :lg="4">
        <div class="glass-card" :class="kpi.glow" style="padding: 20px;">
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <component :is="kpi.icon" style="font-size: 28px; color: white; background: kpi.bg; border-radius: 50%; padding: 8px; margin-right: 12px;" />
            <span :class="['text-light', theme === 'light' ? 'text-light--light' : '']" style="font-size: 2rem; font-weight: bold;">{{ kpi.value }}</span>
          </div>
          <div :class="['text-muted', theme === 'light' ? 'text-muted--light' : '']" style="font-size: 13px;">{{ kpi.label }}</div>
          <div style="margin-top: 6px;">
            <a-tag :color="kpi.trendColor">
              <component v-if="kpi.trendIcon" :is="kpi.trendIcon" />
              {{ kpi.trend }}
            </a-tag>
          </div>
        </div>
      </a-col>
    </a-row>

    <!-- Charts Row 1 -->
    <a-row :gutter="[16, 16]" style="margin-bottom: 16px;">
      <a-col :xs="24" :lg="16">
        <div class="glass-card" style="padding: 20px;">
          <div :class="['text-light', theme === 'light' ? 'text-light--light' : '']" style="font-weight: bold; margin-bottom: 12px;">Deployment Frequency</div>
          <Bar :data="deploymentBarData" :options="barOptions" :key="'deploy-' + selectedRange" />
        </div>
      </a-col>
      <a-col :xs="24" :lg="8">
        <div class="glass-card" style="padding: 20px;">
          <div :class="['text-light', theme === 'light' ? 'text-light--light' : '']" style="font-weight: bold; margin-bottom: 12px;">Product Status</div>
          <Doughnut :data="productStatusData" :options="doughnutOptions" :key="'status-' + selectedRange" />
          <div style="text-align: center; margin-top: 10px; font-size: 15px; color: #fff;">18 Total Products</div>
        </div>
      </a-col>
    </a-row>

    <!-- Charts Row 2 -->
    <a-row :gutter="[16, 16]" style="margin-bottom: 16px;">
      <a-col :xs="24" :lg="12">
        <div class="glass-card" style="padding: 20px;">
          <div :class="['text-light', theme === 'light' ? 'text-light--light' : '']" style="font-weight: bold; margin-bottom: 12px;">Model Accuracy Trends</div>
          <Line :data="accuracyLineData" :options="lineOptions" :key="'accuracy-' + selectedRange" />
        </div>
      </a-col>
      <a-col :xs="24" :lg="12">
        <div class="glass-card" style="padding: 20px;">
          <div :class="['text-light', theme === 'light' ? 'text-light--light' : '']" style="font-weight: bold; margin-bottom: 12px;">Monthly AI Spend by Category</div>
          <Bar :data="spendBarData" :options="spendBarOptions" :key="'spend-' + selectedRange" />
        </div>
      </a-col>
    </a-row>

    <!-- Recent Activity Feed -->
    <div class="glass-card" style="padding: 20px;">
      <div style="font-weight: bold; color: #fff; margin-bottom: 12px;">
        Live Activity Feed <span class="status-dot status-dot--active"></span>
      </div>
      <a-list :data-source="activityFeed" bordered>
        <template #renderItem="{ item }">
          <a-list-item>
            <a-avatar :style="{ background: item.bg }" :icon="item.icon" size="36" />
            <span class="text-light" style="margin-left: 12px;">{{ item.desc }}</span>
            <a-tag class="glass-tag" style="margin-left: 16px;">{{ item.team }}</a-tag>
            <span class="text-muted" style="margin-left: auto;">{{ item.time }}</span>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Bar, Doughnut, Line } from 'vue-chartjs'
const selectedRange = ref('Last 7 Days')

import { DashboardOutlined, AppstoreOutlined, ExperimentOutlined, CloudUploadOutlined, ClockCircleOutlined, CheckCircleOutlined, DollarOutlined, ArrowUpOutlined, ArrowDownOutlined, WarningOutlined, UserOutlined, ApiOutlined, CloseCircleOutlined } from '@ant-design/icons-vue'

const kpis = [
  { label: 'Active AI Products', value: 18, icon: AppstoreOutlined, glow: 'glow-purple', bg: '#7C4DFF', trend: '+3 this quarter', trendColor: 'success', trendIcon: ArrowUpOutlined },
  { label: 'Models in Production', value: 42, icon: ExperimentOutlined, glow: 'glow-teal', bg: '#00BFA5', trend: '+7 this month', trendColor: 'success' },
  { label: 'Deployments This Week', value: 23, icon: CloudUploadOutlined, glow: 'glow-blue', bg: '#448AFF', trend: '+12% vs last week', trendColor: 'success' },
  { label: 'Avg Deploy Time', value: '14 min', icon: ClockCircleOutlined, glow: 'glow-orange', bg: '#FF6D00', trend: '-3 min improvement', trendColor: 'success', trendIcon: ArrowDownOutlined },
  { label: 'Pipeline Success Rate', value: '96.2%', icon: CheckCircleOutlined, glow: 'glow-green', bg: '#69F0AE', trend: '+1.8%', trendColor: 'success' },
  { label: 'Monthly AI Spend', value: '$284K', icon: DollarOutlined, glow: 'glow-yellow', bg: '#FFD740', trend: '+8% vs budget', trendColor: 'warning', trendIcon: WarningOutlined }
]

// Chart data by range
const deploymentBarDataMap = {
  'Last 24 Hours': {
    labels: ['W12'],
    datasets: [
      { label: 'Successful', backgroundColor: '#69F0AE', data: [5], stack: 'deploy' },
      { label: 'Failed', backgroundColor: '#FF5252', data: [10], stack: 'deploy' }
    ]
  },
  'Last 7 Days': {
    labels: ['W6','W7','W8','W9','W10','W11','W12'],
    datasets: [
      { label: 'Successful', backgroundColor: '#69F0AE', data: [10,5,15,8,12,7,20], stack: 'deploy' },
      { label: 'Failed', backgroundColor: '#FF5252', data: [5,10,2,7,3,8,1], stack: 'deploy' }
    ]
  },
  'Last 30 Days': {
    labels: ['W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12'],
    datasets: [
      { label: 'Successful', backgroundColor: '#69F0AE', data: [2,8,4,12,6,14,10,18,9,11,13], stack: 'deploy' },
      { label: 'Failed', backgroundColor: '#FF5252', data: [12,6,10,2,8,4,7,3,5,9,2], stack: 'deploy' }
    ]
  },
  'Last Quarter': {
    labels: ['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12'],
    datasets: [
      { label: 'Successful', backgroundColor: '#69F0AE', data: [1,3,5,7,9,11,13,15,17,19,21,23], stack: 'deploy' },
      { label: 'Failed', backgroundColor: '#FF5252', data: [23,21,19,17,15,13,11,9,7,5,3,1], stack: 'deploy' }
    ]
  }
}
const deploymentBarData = computed(() => deploymentBarDataMap[selectedRange.value])

const productStatusDataMap = {
  'Last 24 Hours': { labels: ['Production','Staging','Development','Archived'], datasets: [{ data: [1,10,2,8], backgroundColor: ['#69F0AE','#448AFF','#FFD740','#666'] }] },
  'Last 7 Days': { labels: ['Production','Staging','Development','Archived'], datasets: [{ data: [10,2,8,1], backgroundColor: ['#69F0AE','#448AFF','#FFD740','#666'] }] },
  'Last 30 Days': { labels: ['Production','Staging','Development','Archived'], datasets: [{ data: [5,5,5,5], backgroundColor: ['#69F0AE','#448AFF','#FFD740','#666'] }] },
  'Last Quarter': { labels: ['Production','Staging','Development','Archived'], datasets: [{ data: [12,3,7,2], backgroundColor: ['#69F0AE','#448AFF','#FFD740','#666'] }] }
}
const productStatusData = computed(() => productStatusDataMap[selectedRange.value])

const accuracyLineDataMap = {
  'Last 24 Hours': { labels: ['Apr'], datasets: [ { label: 'Fraud Detection', borderColor: '#7C4DFF', backgroundColor: 'rgba(124,77,255,0.2)', data: [80], fill: true }, { label: 'Sentiment Analysis', borderColor: '#00BFA5', backgroundColor: 'rgba(0,191,165,0.2)', data: [60], fill: true }, { label: 'Document Processing', borderColor: '#FF6D00', backgroundColor: 'rgba(255,109,0,0.2)', data: [40], fill: true } ] },
  'Last 7 Days': { labels: ['Mar','Apr'], datasets: [ { label: 'Fraud Detection', borderColor: '#7C4DFF', backgroundColor: 'rgba(124,77,255,0.2)', data: [60,90], fill: true }, { label: 'Sentiment Analysis', borderColor: '#00BFA5', backgroundColor: 'rgba(0,191,165,0.2)', data: [90,60], fill: true }, { label: 'Document Processing', borderColor: '#FF6D00', backgroundColor: 'rgba(255,109,0,0.2)', data: [70,100], fill: true } ] },
  'Last 30 Days': { labels: ['Feb','Mar','Apr'], datasets: [ { label: 'Fraud Detection', borderColor: '#7C4DFF', backgroundColor: 'rgba(124,77,255,0.2)', data: [100,50,80], fill: true }, { label: 'Sentiment Analysis', borderColor: '#00BFA5', backgroundColor: 'rgba(0,191,165,0.2)', data: [40,100,60], fill: true }, { label: 'Document Processing', borderColor: '#FF6D00', backgroundColor: 'rgba(255,109,0,0.2)', data: [90,30,70], fill: true } ] },
  'Last Quarter': { labels: ['Jan','Feb','Mar','Apr','May','Jun'], datasets: [ { label: 'Fraud Detection', borderColor: '#7C4DFF', backgroundColor: 'rgba(124,77,255,0.2)', data: [10,20,30,40,50,60], fill: true }, { label: 'Sentiment Analysis', borderColor: '#00BFA5', backgroundColor: 'rgba(0,191,165,0.2)', data: [60,50,40,30,20,10], fill: true }, { label: 'Document Processing', borderColor: '#FF6D00', backgroundColor: 'rgba(255,109,0,0.2)', data: [15,25,35,45,55,65], fill: true } ] }
}
const accuracyLineData = computed(() => accuracyLineDataMap[selectedRange.value])

const spendBarDataMap = {
  'Last 24 Hours': { labels: ['Compute (GPU)','Storage'], datasets: [{ label: 'Spend', data: [1000,9000], backgroundColor: ['#7C4DFF','#00BFA5'] }] },
  'Last 7 Days': { labels: ['Compute (GPU)','Storage','API Calls'], datasets: [{ label: 'Spend', data: [20000,1000,5000], backgroundColor: ['#7C4DFF','#00BFA5','#FF6D00'] }] },
  'Last 30 Days': { labels: ['Compute (GPU)','Storage','API Calls','Data Transfer'], datasets: [{ label: 'Spend', data: [50000,20000,10000,30000], backgroundColor: ['#7C4DFF','#00BFA5','#FF6D00','#448AFF'] }] },
  'Last Quarter': { labels: ['Compute (GPU)','Storage','API Calls','Data Transfer','Licensing'], datasets: [{ label: 'Spend', data: [100000,50000,25000,75000,125000], backgroundColor: ['#7C4DFF','#00BFA5','#FF6D00','#448AFF','#FFD740'] }] }
}
const spendBarData = computed(() => spendBarDataMap[selectedRange.value])
// Chart options (shared)
const barOptions = {
  responsive: true,
  plugins: { legend: { labels: { color: 'rgba(255,255,255,0.7)' } } },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } },
    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } }
  }
}
const doughnutOptions = {
  cutout: '70%',
  plugins: { legend: { labels: { color: 'rgba(255,255,255,0.7)' } } }
}
const lineOptions = {
  responsive: true,
  plugins: { legend: { labels: { color: 'rgba(255,255,255,0.7)' } } },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } },
    y: { min: 85, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } }
  }
}
const spendBarOptions = {
  responsive: true,
  indexAxis: 'y',
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } },
    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } }
  }
}
const activityFeed = [
  { icon: CloudUploadOutlined, bg: '#448AFF', desc: 'Deployed Sentinel Fraud v3.2 to Production', team: 'Sentinel', time: '2m ago' },
  { icon: ExperimentOutlined, bg: '#7C4DFF', desc: 'Model retrained: Pulse Sentiment v2.1', team: 'Pulse', time: '10m ago' },
  { icon: ApiOutlined, bg: '#00BFA5', desc: 'Pipeline run: DocuMind ETL', team: 'DocuMind', time: '18m ago' },
  { icon: WarningOutlined, bg: '#FFD740', desc: 'Alert: API error spike in staging', team: 'Athena', time: '22m ago' },
  { icon: CloseCircleOutlined, bg: '#FF5252', desc: 'Deployment failed: DocuMind Processor v4.0', team: 'DocuMind', time: '30m ago' },
  { icon: CloudUploadOutlined, bg: '#448AFF', desc: 'Deployed Guardian Risk v1.8 to Production', team: 'Guardian', time: '45m ago' },
  { icon: ExperimentOutlined, bg: '#7C4DFF', desc: 'Model retrained: Athena Insights v2.0', team: 'Athena', time: '1h ago' },
  { icon: ApiOutlined, bg: '#00BFA5', desc: 'Pipeline run: Revenue Optimizer Training', team: 'Athena', time: '1h 20m ago' }
]
</script>

<style scoped>
.glass-card {
  margin-bottom: 0;
}
</style>
