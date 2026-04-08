import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'CommandCenter', component: () => import('../views/CommandCenterView.vue') },
  { path: '/velocity', name: 'TeamVelocity', component: () => import('../views/TeamVelocityView.vue') },
  { path: '/products', name: 'ProductCatalog', component: () => import('../views/ProductCatalogView.vue') },
  { path: '/models', name: 'ModelRegistry', component: () => import('../views/ModelRegistryView.vue') },
  { path: '/deployments', name: 'Deployments', component: () => import('../views/DeploymentsView.vue') },
  { path: '/components', name: 'ComponentLibrary', component: () => import('../views/ComponentLibraryView.vue') },
  { path: '/pipelines', name: 'PipelineMonitor', component: () => import('../views/PipelineMonitorView.vue') },
  { path: '/analytics', name: 'PerformanceAnalytics', component: () => import('../views/PerformanceAnalyticsView.vue') },
  { path: '/costs', name: 'CostUsage', component: () => import('../views/CostUsageView.vue') },
  { path: '/search', name: 'SearchResults', component: () => import('../views/SearchResultsView.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
