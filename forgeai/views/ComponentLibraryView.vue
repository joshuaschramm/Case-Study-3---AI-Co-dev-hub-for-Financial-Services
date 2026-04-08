<template>
  <div>
    <!-- Page Header -->
    <a-page-header
      :title="'Component Library'"
      :sub-title="'Browse and reuse shared components'"
      class="glass-card"
    >
      <template #title>
        <AppstoreOutlined style="font-size: 22px; margin-right: 8px; color: #7C4DFF" />
        Component Library
      </template>
    </a-page-header>

    <!-- Filters & Search -->
    <div class="glass-card" style="margin: 16px 0; padding: 20px; display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
      <a-input-search v-model:value="search" placeholder="Search components..." style="max-width: 260px;" allow-clear />
      <a-select v-model:value="category" style="width: 200px;" :options="categoryOptions" />
    </div>

    <!-- Component Summary Cards -->
    <a-row :gutter="[16, 16]" style="margin-bottom: 16px;">
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="AppstoreOutlined"
          :title="'Total Components'"
          :value="filteredComponents.length"
          :glow-class="'glow-blue'"
          :theme="theme"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="StarOutlined"
          :title="'Most Starred'"
          :value="mostStarred"
          :glow-class="'glow-yellow'"
          :theme="theme"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="DownloadOutlined"
          :title="'Most Downloaded'"
          :value="mostDownloaded"
          :glow-class="'glow-green'"
          :theme="theme"
        />
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <GlassKpiCard
          :icon="TeamOutlined"
          :title="'Most Used'"
          :value="mostUsed"
          :glow-class="'glow-purple'"
          :theme="theme"
        />
      </a-col>
    </a-row>

    <!-- Components Table -->
    <div class="glass-card" style="padding: 20px;">
      <GlassTable :columns="columns" :data="filteredComponents" :row-key="'id'" :pagination="{ pageSize: 8 }" :theme="theme" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue'
import { useComponentStore } from '../stores/componentStore'
import GlassKpiCard from '../components/common/GlassKpiCard.vue'
import GlassTable from '../components/common/GlassTable.vue'
import { AppstoreOutlined, StarOutlined, DownloadOutlined, TeamOutlined } from '@ant-design/icons-vue'

const componentStore = useComponentStore()
const search = ref('')
const category = ref('All')

const categoryOptions = [
  { label: 'All Categories', value: 'All' },
  { label: 'Auth & Security', value: 'Auth & Security' },
  { label: 'Data Connectors', value: 'Data Connectors' },
  { label: 'ML Pipelines', value: 'ML Pipelines' },
  { label: 'API Templates', value: 'API Templates' },
  { label: 'UI Widgets', value: 'UI Widgets' }
]

const filteredComponents = computed(() =>
  componentStore.filterComponents({ search: search.value, category: category.value })
)
const mostStarred = computed(() => {
  const max = Math.max(...componentStore.components.map(c => c.stars))
  return componentStore.components.find(c => c.stars === max)?.name || ''
})
const mostDownloaded = computed(() => {
  const max = Math.max(...componentStore.components.map(c => c.downloads))
  return componentStore.components.find(c => c.downloads === max)?.name || ''
})
const mostUsed = computed(() => {
  const max = Math.max(...componentStore.components.map(c => c.usedIn))
  return componentStore.components.find(c => c.usedIn === max)?.name || ''
})

const columns = [
  {
    title: 'Component',
    key: 'name',
    customRender: ({ record }) => h('div', [
      h('span', { style: { fontWeight: 'bold' } }, record.name),
      h('br'),
      h('span', { style: { color: 'rgba(255,255,255,0.6)', fontSize: '13px' } }, record.description)
    ])
  },
  { title: 'Category', dataIndex: 'category', key: 'category' },
  { title: 'Version', dataIndex: 'version', key: 'version' },
  { title: 'Used In', dataIndex: 'usedIn', key: 'usedIn' },
  { title: 'Downloads', dataIndex: 'downloads', key: 'downloads' },
  { title: 'Stars', dataIndex: 'stars', key: 'stars' },
  { title: 'Maintained By', dataIndex: 'maintainedBy', key: 'maintainedBy' }
]
</script>
