import { defineStore } from 'pinia'
import blockers from '../data/blockers.json'

export const useBlockerStore = defineStore('blocker', {
  state: () => ({
    blockers: [...blockers],
    selectedBlocker: null
  }),
  getters: {
    blockerList: (state) => state.blockers,
    getBlockerById: (state) => (id) => state.blockers.find(b => b.id === id)
  },
  actions: {
    selectBlocker(id) {
      this.selectedBlocker = this.blockers.find(b => b.id === id) || null
    },
    filterBlockers({ severity = 'All', team = 'All' }) {
      return this.blockers.filter(b => {
        const matchesSeverity = severity === 'All' || b.severity === severity
        const matchesTeam = team === 'All' || b.team === team
        return matchesSeverity && matchesTeam
      })
    }
  }
})
