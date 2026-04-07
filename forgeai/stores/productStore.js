import { defineStore } from 'pinia'
import products from '../data/products.json'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [...products],
    selectedProduct: null
  }),
  getters: {
    productList: (state) => state.products,
    getProductById: (state) => (id) => state.products.find(p => p.id === id)
  },
  actions: {
    selectProduct(id) {
      this.selectedProduct = this.products.find(p => p.id === id) || null
    },
    filterProducts({ search = '', status = 'All', domain = 'All' }) {
      return this.products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = status === 'All' || p.status === status
        const matchesDomain = domain === 'All' || p.domain === domain
        return matchesSearch && matchesStatus && matchesDomain
      })
    }
  }
})
