

<script lang="ts" setup>

import DietTypes from '~/public/json/DietTypes.json';
import { FilterMatchMode } from '@primevue/core/api';
import { useFetchDietTypes } from '~/composables/fetch-data/fetch-dietTypes'; 


interface eventObject { 
  data: object
}

const toast = useToast();
const confirm = useConfirm();
const editDialogToggle = ref(false);
const selectedDietType = ref();



const optionStatus = [
  { label: 'Enabled', value: 'Enabled' },
  { label: 'Disabled', value: 'Disabled' }
];

const optionsType = [
  { label: 'Enteral', value: 'EN' },
  { label: 'Routine', value: 'RT' },
  { label: 'Therapeutic', value: 'TP' }
];

const optionsGroup = [
  { label: 'Oral', value: 'O' },
  { label: 'Enteral', value: 'E' }
];

const refreshDietTypes = async () => {
  const result = await $fetch(`/api/admin-api/api-updateDietTypes`);
};

const onRowSelect = (event: eventObject) => {
  editDialogToggle.value = true;
  selectedDietType.value = JSON.parse(JSON.stringify(event.data));
}

const globalFilters = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const formatDietTypes = () => { 
  DietTypes.forEach((diet) => {
    diet.dietstat = diet.dietstat === 'A' || diet.dietstat === 'Enabled' ? 'Enabled' : 'Disabled';
  })
}


const updateDietType = () => { 

  
  
}

const confirmSave = (event:any) => { 
  confirm.require({
    target: event.currentTarget,
    message: `Are you sure you want to update this Diet Type?`,
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Save'
    },
    accept: () => { 
      updateDietType();
    },
    reject: () => {
      editDialogToggle.value = false;
    }
  })
}


onBeforeMount(() => formatDietTypes());
</script>

<template>
  <div>
    
    <section class="card">
      <p class=" flex items-center gap-2 mb-6 text-sm">
        <a><i class="pi pi-home"></i> Home</a>
        <a><i class="pi pi-angle-right"></i> Diet Settings</a>
        <a><i class="pi pi-angle-right"></i> Diet Types Configuration</a>
      </p>
      <h3 class="m-0">Diet Settings </h3>
      <p class="text-sm">Manage Dietary Information and Configuration</p>
    </section>

  <Tabs value="0" class="card">
    <TabList>
      <Tab value="0"> Diet Types </Tab>
      <Tab value="1"> Allergies & Precautions </Tab>
      
    </TabList>
    <TabPanels>
      <TabPanel value="0">
        <h4>Diet Types Configuration</h4>
        <p class="text-sm" > Diet Types are fetched through local JSON file, to update the JSON file you may click on Refetch Diet Types Button.</p>
        <div class="flex justify-between gap-20">
          <InputText v-model="globalFilters['global'].value" placeholder="Keyword Search" class="w-full" />
          <Button icon="pi pi-refresh" label="Refetch Diet Types" @click="refreshDietTypes" class="w-full" v-tooltip.top="'Fetch Data From Database'"/> 
          <Button icon="pi pi-plus" label="Add New Diet Type" class="w-full" />
        </div>
        <DataTable :value="DietTypes" 
          paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" 
          scrollable scrollHeight="400px"
          size="small" 
          class="mt-10"
          :filters="globalFilters" :globalFilterFields="['dietcode', 'dietname', 'dietdesc', 'diettype', 'dietgroup', 'dietstat']"
          @rowClick="onRowSelect" >
          <Column field="dietcode" header="Code"></Column>
          <Column field="dietname" header="Diet Name"></Column>
          <Column header="Status">
            <template #body="slotProps">
              <Tag :severity="slotProps.data.dietstat === 'Enabled' ? 'success' : 'danger'" :value="slotProps.data.dietstat" />
            </template>
          </Column>
          <Column field="dietdesc" header="Description"></Column>
          <Column field="diettype" header="Type"></Column>
          <Column field="dietgroup" header="Group"></Column>

        </DataTable>

      </TabPanel>
      <TabPanel value="1">
        <h3>Allergy & Precaution Configuration</h3>
      </TabPanel>
    </TabPanels>
  </Tabs>
  <!-- eslint-disable vue/no-v-model-argument --> 
  <Dialog v-model:visible="editDialogToggle" header="Edit Diet Type"  modal closable :dismissable-mask="true" :close-on-escape="true" :block-scroll="true" position="center" style="width: 50vw" :draggable="false">
    <p v-if="!selectedDietType"> No Diet Type Selected </p>
    <div v-else class="flex justify-between gap-4">
      <ul class="flex flex-col gap-4 w-3/4">
        <li class="flex gap-10 items-center">  
          <label for="dietcode">Diet Code</label>
          <InputText id="dietcode" v-model="selectedDietType.dietcode" readonly disabled />
        </li>
        <li class="flex gap-10 items-center">
          <label for="dietname">Diet Name</label>
          <InputText id="dietname" v-model="selectedDietType.dietname" />
        </li>
        
      </ul>
      <ul  class="flex flex-col gap-4 w-3/4">
        <li class="flex justify-between gap-4 items-center">
          <label for="dietstat">Diet Status</label>
          <Select :options="optionStatus" v-model="selectedDietType.dietstat"  optionLabel="label" optionValue="value" class="w-2/4" />
        </li>
        <li class="flex justify-between gap-4  items-center">
          <label for="diettype">Diet Type</label>
          <Select :options="optionsType" v-model="selectedDietType.diettype"  optionLabel="label" optionValue="value" class="w-2/4"/>
        </li>
        <li class="flex justify-between gap-4 items-center">
          <label for="dietgroup">Diet Group</label>
          <Select :options="optionsGroup" v-model="selectedDietType.dietgroup"  optionLabel="label" optionValue="value" class="w-2/4"/>
        </li>
      </ul>
      
    </div>
    <p class="flex gap-10 items-center mt-5 h-full">
      <label for="dietdesc">Diet Description</label>
      <Textarea id="dietdesc" class=" w-full h-full" v-model="selectedDietType.dietdesc" />
    </p>
    <div class="flex justify-between gap-4 mt-10">
      <ConfirmPopup />
      <Button label="Cancel" icon="pi pi-times" class="p-button-danger" @click="editDialogToggle = false" />
      <Button label="Save" icon="pi pi-save" class="p-button-success"  @click="confirmSave($event)"/>
      
    </div>
    
  </Dialog>

  </div>
</template>


<style>

</style>