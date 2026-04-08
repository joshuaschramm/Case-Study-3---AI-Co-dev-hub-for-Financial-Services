<template>
  <div>
    <a-page-header
      :title="`Search Results for: '${query}'`"
      class="glass-card"
      style="margin-bottom: 16px;"
    />
    <div v-if="results.length === 0" class="glass-card" style="padding: 32px; text-align: center;">
      <div style="font-size: 1.2rem; color: #888;">No results found.</div>
    </div>
    <div v-else>
      <a-list :data-source="results" bordered>
        <template #renderItem="{ item }">
          <a-list-item>
            <div>
              <div style="font-weight: bold;">{{ item.title }}</div>
              <div style="color: #888;">{{ item.description }}</div>
              <a-tag v-for="tag in item.tags" :key="tag" color="purple" style="margin-right: 4px;">{{ tag }}</a-tag>
            </div>
            <a-button type="link" @click="goTo(item)">View</a-button>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import { useModelStore } from '../stores/modelStore'
import { usePipelineStore } from '../stores/pipelineStore'
import { useDeploymentStore } from '../stores/deploymentStore'
import { useTeamStore } from '../stores/teamStore'

const route = useRoute()
const router = useRouter()
const query = route.query.q || ''

const productStore = useProductStore()
const modelStore = useModelStore()
const pipelineStore = usePipelineStore()
const deploymentStore = useDeploymentStore()
const teamStore = useTeamStore()

const results = computed(() => {
  const q = query.toLowerCase()
  const productResults = productStore.productList.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)).map(p => ({
    title: p.name,
    description: p.description,
    tags: ['Product'],
    route: '/products'
  }))
  const modelResults = modelStore.modelList.filter(m => m.name.toLowerCase().includes(q) || m.product.toLowerCase().includes(q)).map(m => ({
    title: m.name,
    description: m.product,
    tags: ['Model'],
    route: '/models'
  }))
  const pipelineResults = pipelineStore.pipelineList.filter(p => p.name.toLowerCase().includes(q)).map(p => ({
    title: p.name,
    description: p.type,
    tags: ['Pipeline'],
    route: '/pipelines'
  }))
  const deploymentResults = deploymentStore.deploymentList.filter(d => d.product.toLowerCase().includes(q)).map(d => ({
    title: d.product,
    description: d.environment + ' - ' + d.status,
    tags: ['Deployment'],
    route: '/deployments'
  }))
  const teamResults = teamStore.teamList.filter(t => t.name.toLowerCase().includes(q) || t.focus.toLowerCase().includes(q)).map(t => ({
    title: t.name,
    description: t.focus,
    tags: ['Team'],
    route: '/velocity'
  }))
  return [...productResults, ...modelResults, ...pipelineResults, ...deploymentResults, ...teamResults]
})

function goTo(item) {
  router.push(item.route)
}
</script>
