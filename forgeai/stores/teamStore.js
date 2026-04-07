import { defineStore } from 'pinia'
import teams from '../data/teams.json'

export const useTeamStore = defineStore('team', {
  state: () => ({
    teams: [...teams],
    selectedTeam: null
  }),
  getters: {
    teamList: (state) => state.teams,
    getTeamById: (state) => (id) => state.teams.find(t => t.id === id)
  },
  actions: {
    selectTeam(id) {
      this.selectedTeam = this.teams.find(t => t.id === id) || null
    }
  }
})
