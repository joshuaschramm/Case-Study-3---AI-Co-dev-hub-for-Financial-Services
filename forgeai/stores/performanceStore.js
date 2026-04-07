import { defineStore } from 'pinia'
import performance from '../data/performance.json'

export const usePerformanceStore = defineStore('performance', {
  state: () => ({
    latency: performance.latency,
    apiCalls: performance.apiCalls
  }),
  getters: {
    latencySeries: (state) => state.latency,
    apiCallSeries: (state) => state.apiCalls
  }
})
