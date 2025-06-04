import { defineStore } from 'pinia'

export const useMyMiscellaneousStore = defineStore({
  id: 'myMiscellaneousStore',
  state: () => ({
    currentRoute: '/',
    breadCrumbs: ''
  }),
  actions: {}
})
