import { defineStore } from 'pinia'
import pipelines from '../data/pipelines.json'

export const usePipelineStore = defineStore('pipeline', {
  state: () => ({
    pipelines: [...pipelines],
    selectedPipeline: null
  }),
  getters: {
    pipelineList: (state) => state.pipelines,
    getPipelineById: (state) => (id) => state.pipelines.find(p => p.id === id)
  },
  actions: {
    selectPipeline(id) {
      this.selectedPipeline = this.pipelines.find(p => p.id === id) || null
    },
    filterPipelines({ search = '', status = 'All', type = 'All' }) {
      return this.pipelines.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = status === 'All' || p.status === status
        const matchesType = type === 'All' || p.type === type
        return matchesSearch && matchesStatus && matchesType
      })
    }
  }
})
