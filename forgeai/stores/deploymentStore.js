import { defineStore } from 'pinia'
import deployments from '../data/deployments.json'

export const useDeploymentStore = defineStore('deployment', {
  state: () => ({
    deployments: [...deployments],
    selectedDeployment: null
  }),
  getters: {
    deploymentList: (state) => state.deployments,
    getDeploymentById: (state) => (id) => state.deployments.find(d => d.id === id)
  },
  actions: {
    selectDeployment(id) {
      this.selectedDeployment = this.deployments.find(d => d.id === id) || null
    },
    filterDeployments({ search = '', status = 'All', environment = 'All' }) {
      return this.deployments.filter(d => {
        const matchesSearch = d.product.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = status === 'All' || d.status === status
        const matchesEnv = environment === 'All' || d.environment === environment
        return matchesSearch && matchesStatus && matchesEnv
      })
    }
  }
})
