<script lang="ts" setup>

// Interfaces
interface DoctorDraft {
    id: number
    title: string
    created_at: string
    description: string
    category: string
    details: string
}

// Variables
const selectedDraft = ref<DoctorDraft | null>(null);
const emp_id = useCookie<{ employeeid: string } | null | undefined>('authUser');
const toggleDraftPreview = ref(false);
const dietDetails = ref<any>('');
const confirm = useConfirm();
const toast = useToast();
const emit = defineEmits(['use-diet-template']);

const { data: doctorDrafts, status, error, refresh } = await useFetch<DoctorDraft[]>(`/api/doctors-api/doctor_getDrafts`, {
    method: 'GET',
    query: {
        emp_id: emp_id.value?.employeeid
    },
    headers: {
        'Content-Type': 'application/json'
    }
});

const onClickDraftList = () => {
    toggleDraftPreview.value = true;
    dietDetails.value = JSON.parse(selectedDraft.value?.details || '');
};

const onClickUseTemplate = () => {
    if (dietDetails.value) {
        // Emit the diet details to the parent component
        // @ts-ignore
        emit('use-diet-template', dietDetails.value);
        toggleDraftPreview.value = false;
    }
};
const confirmDeleteTemplate = (event: any) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Are you sure you want to delete this template?',
        icon: 'pi pi-info-circle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Confirm Delete',
            severity: 'danger'
        },
        accept: () => {
            onConfirmDeleteTemplate();
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

const onConfirmDeleteTemplate = async () => {
    if (!selectedDraft.value) {
        return;
    } 
    // Perform delete operation here

    const id = selectedDraft.value.id;
    const emp_id = useCookie<{ employeeid: string } | null | undefined>('authUser');

    try { 
        const res = await useFetch(`/api/doctors-api/doctor_deleteDraft`, {
            method: 'DELETE',
            query: {
                id,
                emp_id: emp_id.value?.employeeid
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        toast.add({ severity: 'success', summary: 'Success', detail: 'Draft deleted successfully.', life: 3000 });
        refresh(); // Refresh the list of drafts

    } catch (error) {
        console.error('Error deleting draft:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete the draft.', life: 3000 });
        return;
    }
    

    // After deletion, close the dialog and reset selectedDraft
    toggleDraftPreview.value = false;
    selectedDraft.value = null;  
}





</script>


<template>
    <div>
        <section v-if="status === 'pending'">
            <p>Loading...</p>
        </section>
        <section v-else>
            <div v-if="doctorDrafts && doctorDrafts.length > 0">
                <ConfirmPopup />
                <section >
                    <Listbox v-model="selectedDraft" :options="doctorDrafts" optionLabel="title" checkmark :filter="doctorDrafts.length > 5" @click="onClickDraftList">
                        <template #option="slotProps">
                            <div class="flex justify-start items-center w-full gap-6" >
                                <Icon :name=" slotProps.option.category === 'Personal' ? 'mdi:person' : 'mdi:briefcase' " />
                                <p class="font-bold"> {{ slotProps.option.title }}</p>
                            </div>
                        </template>
                    </Listbox>
                </section>
            </div>
            <div v-else>
                <p class="text-sm italic">No templates found.</p>
            </div>
        </section>

        <Dialog v-model:visible="toggleDraftPreview" :style="{ width: '50vw' }" :draggable="false" :closable="true" :closeOnEscape="true" :blockScroll="true" modal>
            <template #header>
                <h3 class="text-lg font-bold">Template Preview</h3>
            </template>
                <div class="p-4 border border-gray-300 rounded-md border-double">
                    <div class="flex justify-start items-start gap-10">
                        <div class="flex flex-col gap-4 font-bold text-sm">
                            <span>Title:</span>
                            <span>Category:</span>
                            <span>Created At:</span>
                            <span>Description:</span>
                        </div>
                        <div v-if="selectedDraft" class="flex flex-col justify-start gap-4 text-sm ml-12">
                            <span> {{ selectedDraft?.title }}</span>
                            <span> {{ selectedDraft?.category }}</span>
                            <span> {{ new Date(selectedDraft?.created_at).toLocaleString() }}</span>
                            <span> {{ selectedDraft?.description }}</span>
                        </div>
                    </div>
                </div>
            <template #footer>
                <div class="flex justify-between items-center gap-3">
                    <Button label="Delete" icon="pi pi-trash" raised severity="danger" @click="confirmDeleteTemplate($event)" />
                    <Button label="Use Template" icon="pi pi-check" raised @click="onClickUseTemplate" />
                </div>
            </template>
        </Dialog>
    </div>
</template>


<style scoped>



</style>