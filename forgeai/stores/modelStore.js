import { defineStore } from 'pinia'
import models from '../data/models.json'

export const useModelStore = defineStore('model', {
  state: () => ({
    models: [...models],
    selectedModel: null
  }),
  getters: {
    modelList: (state) => state.models,
    getModelById: (state) => (id) => state.models.find(m => m.id === id),
    getModelsByProduct: (state) => (productName) => state.models.filter(m => m.product === productName)
  },
  actions: {
    selectModel(id) {
      this.selectedModel = this.models.find(m => m.id === id) || null
    },
    filterModels({ search = '', status = 'All', environment = 'All' }) {
      return this.models.filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = status === 'All' || m.status === status
        const matchesEnv = environment === 'All' || m.environment === environment
        return matchesSearch && matchesStatus && matchesEnv
      })
    }
  }
})
