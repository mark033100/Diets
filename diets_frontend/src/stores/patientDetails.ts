import { defineStore } from 'pinia'

export const useMyPatientDetailsStore = defineStore('myPatientDetailsStore', {
  state: () => ({
    patientTags: [] as any[]
  }),
  actions: {
    addPatientTag(tag: any) {

      const isTagExist = this.patientTags.some(item => item.title === tag.title)
      if (!isTagExist) {
        this.patientTags.push(tag)
      }
    },
    clearTags() {
      this.patientTags = []
    }
  }
})
