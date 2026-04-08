<template>
  <div>
    <a-page-header
      :title="'Team Velocity'"
      :sub-title="'Track how fast your teams are shipping AI products'"
      class="glass-card"
      style="margin-bottom: 16px;"
    >
      <template #title>
        <RocketOutlined style="font-size: 22px; margin-right: 8px; color: #7C4DFF" />
        Team Velocity
      </template>
    </a-page-header>
    <a-row :gutter="[16, 16]" style="margin-bottom: 16px;">
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="CalendarOutlined"
          :title="'Current Sprint'"
          :value="'Sprint 14'"
          :glow-class="'glow-purple'"
          :trend-text="'Mar 30 – Apr 10, 2026'"
          :theme="theme"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="CheckCircleOutlined"
          :title="'Story Points Completed'"
          :value="'68 / 85'"
          :glow-class="'glow-teal'"
          :theme="theme"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="CheckCircleOutlined"
          :title="'Sprint Burndown'"
          :value="'On Track'"
          :glow-class="'glow-green'"
          :theme="theme"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="TeamOutlined"
          :title="'Team Members Active'"
          :value="'24 / 26'"
          :glow-class="'glow-blue'"
          :theme="theme"
        />
      </a-col>
    </a-row>
    <!-- Velocity Chart -->
    <div class="glass-card" style="padding: 20px; margin-bottom: 16px;">
      <div :class="['text-light', theme === 'light' ? 'text-light--light' : '']" style="font-weight: bold; margin-bottom: 12px;">Sprint Velocity — Last 8 Sprints</div>
      <Bar :data="velocityBarData" :options="velocityBarOptions" />
    </div>

    <!-- Team Breakdown Table -->
    <div class="glass-card" style="padding: 20px; margin-bottom: 16px;">
      <div :class="['text-light', theme === 'light' ? 'text-light--light' : '']" style="font-weight: bold; margin-bottom: 12px;">Team Performance</div>
      <GlassTable :columns="teamColumns" :data="teams" :row-key="'id'" :pagination="false" />
    </div>

    <!-- Cycle Time Distribution Chart -->
    <div class="glass-card" style="padding: 20px; margin-bottom: 16px;">
      <div :class="['text-light', theme === 'light' ? 'text-light--light' : '']" style="font-weight: bold; margin-bottom: 12px;">Feature Cycle Time Distribution (Days)</div>
      <Bar :data="cycleTimeData" :options="cycleTimeOptions" />
      <a-tag style="margin-top: 10px;">Median: 7 days</a-tag>
    </div>

    <!-- Blockers & Risks -->
    <div class="glass-card" style="padding: 20px;">
      <div :class="['text-light', theme === 'light' ? 'text-light--light' : '']" style="font-weight: bold; margin-bottom: 12px;">
        <WarningOutlined style="color: #FFD740; margin-right: 8px;" />Active Blockers & Risks
      </div>
      <a-list :data-source="blockers" bordered>
        <template #renderItem="{ item }">
          <a-list-item>
            <a-badge :status="badgeStatus(item.severity)" />
            <span :class="['text-light', theme === 'light' ? 'text-light--light' : '']" style="margin-left: 8px;">{{ item.description }}</span>
            <a-tag class="glass-tag" style="margin-left: 16px;">{{ item.team }}</a-tag>
            <span :class="['text-muted', theme === 'light' ? 'text-muted--light' : '']" style="margin-left: auto;">{{ item.daysOpen }} days open</span>
            <a-button type="link" size="small" style="margin-left: 16px;">View</a-button>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { useTeamStore } from '../stores/teamStore'
import GlassKpiCard from '../components/common/GlassKpiCard.vue'
import GlassTable from '../components/common/GlassTable.vue'
import { RocketOutlined, CalendarOutlined, CheckCircleOutlined, TeamOutlined, WarningOutlined } from '@ant-design/icons-vue'
import { computed, inject } from 'vue'

const teamStore = useTeamStore()
const teams = computed(() => teamStore.teamList)
const theme = inject('theme', 'dark')

const blockers = [
  { severity: 'Critical', description: 'Production deployment blocked by failed integration tests.', team: 'DocuMind', daysOpen: 2 },
  { severity: 'High', description: 'Data pipeline latency exceeding SLA.', team: 'Nexus', daysOpen: 4 },
  { severity: 'Medium', description: 'Model retraining delayed due to resource contention.', team: 'Sentinel', daysOpen: 3 },
  { severity: 'High', description: 'API error rate spike in staging environment.', team: 'Athena', daysOpen: 1 },
  { severity: 'Critical', description: 'Security vulnerability detected in open-source dependency.', team: 'Guardian', daysOpen: 5 }
]

const badgeStatus = (severity) => {
  if (severity === 'Critical') return 'error'
  if (severity === 'High') return 'warning'
  if (severity === 'Medium') return 'processing'
  return 'default'
}

const velocityBarData = {
  labels: ['Sprint 7','Sprint 8','Sprint 9','Sprint 10','Sprint 11','Sprint 12','Sprint 13','Sprint 14'],
  datasets: [
    { label: 'Committed', backgroundColor: 'rgba(124,77,255,0.5)', data: [75, 80, 82, 78, 85, 80, 88, 85] },
    { label: 'Completed', backgroundColor: '#00BFA5', data: [70, 78, 80, 72, 82, 79, 84, 68] },
    { label: 'Average Velocity', type: 'line', borderColor: '#FFD740', borderDash: [8,4], borderWidth: 2, fill: false, data: [77,77,77,77,77,77,77,77], pointRadius: 0 }
  ]
}
const velocityBarOptions = {
  responsive: true,
  plugins: { legend: { labels: { color: 'rgba(255,255,255,0.7)' } } },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } },
    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } }
  }
}

const teamColumns = [
  { title: 'Team Name', dataIndex: 'name', key: 'name' },
  { title: 'Product Focus', dataIndex: 'focus', key: 'focus' },
  { title: 'Members', dataIndex: 'members', key: 'members' },
  { title: 'Sprint Points', key: 'sprintPoints', customRender: ({ record }) => `${record.sprintPoints.completed} / ${record.sprintPoints.committed}` },
  { title: 'Completion Rate', key: 'completionRate', customRender: ({ record }) => `<a-progress percent="${record.completionRate}" size="small" />` },
  { title: 'Deployments This Sprint', dataIndex: 'deployments', key: 'deployments' },
  { title: 'Status', key: 'status', customRender: ({ record }) => `<a-tag color="${record.status === 'On Track' ? 'green' : record.status === 'At Risk' ? 'orange' : 'red'}">${record.status}</a-tag>` }
]

const cycleTimeData = {
  labels: ['1-2 days','3-5 days','6-10 days','11-15 days','16-20 days','21+ days'],
  datasets: [
    { label: 'Features', backgroundColor: '#7C4DFF', data: [8, 15, 22, 12, 5, 2] }
  ]
}
const cycleTimeOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } },
    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } }
  }
}
</script>
