import { defineStore } from 'pinia'
import components from '../data/components.json'

export const useComponentStore = defineStore('component', {
  state: () => ({
    components: [...components],
    selectedComponent: null
  }),
  getters: {
    componentList: (state) => state.components,
    getComponentById: (state) => (id) => state.components.find(c => c.id === id)
  },
  actions: {
    selectComponent(id) {
      this.selectedComponent = this.components.find(c => c.id === id) || null
    },
    filterComponents({ search = '', category = 'All' }) {
      return this.components.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = category === 'All' || c.category === category
        return matchesSearch && matchesCategory
      })
    }
  }
})
