import { defineStore } from 'pinia'
import axios from 'axios'

interface Page {
  id: number
  title: string
  slug: string
  keywords: string
  content: string
}

export const usePagesStore = defineStore('pages', {
  state: () => ({
    pages: [] as Page[],
    currentPage: null as Page | null,
    loading: false,
    error: null as string | null,
  }),
  
  getters: {
    homePage: (state) => state.pages?.find(p => !p.slug),
    contentPages: (state) => state.pages?.filter(p => p.slug),
  },

  actions: {
    async fetchPages() {
      this.loading = true
      try {
        const response = await axios.get<{ pages: Page[] }>('http://localhost:3000/pages')
        this.pages = response.data
        this.error = null
      } catch (err) {
        this.error = 'Failed to fetch pages'
        console.error('Error fetching pages:', err)
      } finally {
        this.loading = false
      }
    }
  }
}) 