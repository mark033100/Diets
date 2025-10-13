import { defineStore } from 'pinia'

export const useMyPatientStore = defineStore('patient-details', () => {


    const patientTags = ref([] as any[]);

    const addTag = (tag: any) => {
        patientTags.value.push(tag);
    }

    const removeTag = (tag: any) => {
        patientTags.value = patientTags.value.filter((t: any) => t.title !== tag.title);
    }

    const clearTags = () => {
        patientTags.value = [];
    }


    return {
        patientTags,
        addTag,
        removeTag,
        clearTags
    }

})