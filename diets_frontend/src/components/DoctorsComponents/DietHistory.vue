<script setup>
import { useFetchPatientDietHistory } from '~/composables/fetch-data/fetch-patientDietHistory';
import errorInlineMessage from '~/components/customComponents/errors/errorInlineMessage.vue';
import { FilterMatchMode } from '@primevue/core/api';


const selectedDietHistory = ref(null);
const dialogVisible = ref(false);
const props = defineProps({
  hpercode: {
    type: String,
    required: true
  }
});

const { data: patientHistory, status, error, refresh, clear } = useFetchPatientDietHistory(props.hpercode);


const setError = () => { 
  return {
    errorTitle: 'Error Gathering Diet History',
    errorCode: 500,
    errorIcon: 'search-error',
    errorMessage: error.value.message
  }
}

const setInlineMessage = (status) => ({
  severity: status === 'A' ? 'success' : status === 'P' ? 'warn' : 'danger',
  name: status === 'A' ? 'Active' : status === 'P' ? 'Pending' : 'Inactive',
});


const globalFilters = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const onRowSelect = (event) => {
  selectedDietHistory.value = event.data
  dialogVisible.value = true;
}

onUnmounted(() => {
  clear();
})

</script>

<template>
  <div>
    <div v-if="status === 'pending'">Loading...</div>
    <div v-else-if="error"> 
      <errorInlineMessage :errorObject="setError()"/>
    </div>
    <div v-else>
      <DataTable :selection="selectedDietHistory" 
        :filters="globalFilters" 
        :value="patientHistory" 
        :globalFilterFields="['dodate', 'dietname', 'fname', 'lname']" 
        tableStyle="min-width: 50rem"  
        :loading="status === 'pending'" 
        selectionMode="single" 
        @rowClick="onRowSelect" 
        paginator 
        :rows="5" 
        :rowsPerPageOptions="[5, 10, 20, 50]">
        <template #header>
          <div class="flex justify-between">
            <h4 class="m-0">Diet History</h4>
            <div class="flex justify-between w-1/2 gap-10">
              <InputText v-model="globalFilters['global'].value" placeholder="Keyword Search" class="w-full" />
              <Button icon="pi pi-refresh" v-tooltip.top="'Refresh Diet History'" rounded raised @click="refresh" />
            </div>
            
          </div>
        </template>
        <template #loading>
          <div class="w-full text-center">
            Loading...
          </div>
        </template>
        <Column header="Date">
          <template #body="slotPops">
            <span> {{ formatDate(slotPops.data.dodate)  }}</span>
          </template>
        </Column>
        <Column header="Diet">
          <template #body="slotPops">
            <span> {{ slotPops.data.dietname }}</span>
          </template>
        </Column>
        <Column header="Ordered By">
          <template #body="slotPops">
            <span> {{ slotPops.data.lname }} , {{ slotPops.data.fname   }}</span>
          </template>
        </Column>
        <Column header="Status">
          <template #body="slotPops">
            <Tag :severity="setInlineMessage(slotPops.data.dostatus)?.severity" :value=" setInlineMessage(slotPops.data.dostatus)?.name" class=" text-center" /> 
          </template>
        </Column>
      </DataTable>
    </div>


    <Dialog :visible="dialogVisible" :selection="selectedDietHistory" :style="{ width: '50vw' }" :draggable="false" :closable="false" :dismissableMask="true" :closeOnEscape="true" :blockScroll="true" modal class="p-fluid" position="bottomright" >
      <template #header>
        <div class="flex justify-between w-full">
          <h4 class="m-0">Diet History Details</h4>
          <Button icon="pi pi-times" class="p-button-text" @click="dialogVisible = false" />
        </div>
      </template>
      <div v-if="!selectedDietHistory">
        <p> No Diet History Data</p>
      </div>
      <div v-else>
        
        <div>
          {{ console.log('Data: ', selectedDietHistory)   }}
          <p class="font-extrabold text-2xl "> {{ selectedDietHistory.dietname ? selectedDietHistory.dietname : '' }} <Tag :severity="setInlineMessage(selectedDietHistory.dostatus)?.severity" :value=" setInlineMessage(selectedDietHistory.dostatus)?.name" class=" align-top" /> </p>
          <p class="font-bold"> {{ selectedDietHistory.dietgroup ? checkAcronym(selectedDietHistory.dietgroup) : 'group' }}</p>
        </div>
        <div class="flex gap-5">
          <span class="font-bold text-orange-400 flex items-center gap-2"> <span> <Icon name="healthicons:calendar" size="1.5em" /> </span> {{ selectedDietHistory.dodate ? formatDate(selectedDietHistory.dodate) : '' }} </span> 
          <p class="flex items-center text-surface-600 gap-2"> <span> <Icon name="healthicons:doctor-male" size="1.5em" /> </span> {{ selectedDietHistory.lname ? selectedDietHistory.lname : '' }}, {{ selectedDietHistory.fname ? selectedDietHistory.fname : '' }}</p>
        </div>


        <div class="w-full flex justify-between gap-4 my-10">
          <section class="w-full">
            <div class="mt-5 text-sm">
              <p class="font-extrabold text-surface-600 text-lg flex items-center"> <Icon name="healthicons:circle-small" size="1.5em" style="color: var(--primary-color)"  /> Feeding and Diet Requirements </p>
              <div class="flex gap-10 ml-10">
                <div class="text-surface-600" v-if="selectedDietHistory.dietgroup === 'E'">
                  <p> <span class="font-bold"> Feeding Mode: </span>  {{ selectedDietHistory.feedingMode ? selectedDietHistory.feedingMode : 'None' }} </p>
                  <p> <span class="font-bold"> Feeding Duration: </span> {{ selectedDietHistory.feedingDuration ? selectedDietHistory.feedingDuration : '0' }} hours</p>
                  <p> <span class="font-bold"> Feeding Frequency: </span> {{ selectedDietHistory.feedingFrequency ? selectedDietHistory.feedingFrequency : '0' }}x a day</p>
                </div>
                <div class="text-surface-600">
                  <p> <span class="font-bold"> Calories: </span> {{ selectedDietHistory.calories ? selectedDietHistory.calories : '0' }} kcal</p>
                  <p v-if="selectedDietHistory.dietgroup === 'E' "> <span class="font-bold"> Volume: </span>{{ selectedDietHistory.volume ? selectedDietHistory.volume : '0' }} ml</p>
                  <p v-if="selectedDietHistory.dietgroup === 'E'"> <span class="font-bold"> Dilution: </span>{{ selectedDietHistory.dilution ? selectedDietHistory.dilution : '0' }} kcal : 1ml</p>
                </div>
              </div>
            </div>
            <div class="mt-10 text-sm">
              <p class="font-extrabold text-surface-600 text-lg flex items-center"> <Icon name="healthicons:circle-small" size="1.5em" style="color: var(--primary-color)"  />Diet Remarks</p>
              <p class="ml-10 text-surface-600"> {{ selectedDietHistory.ordreas ? selectedDietHistory.ordreas : 'None' }}</p>
            </div>
            <div class="mt-10 text-sm">
              <p class="font-extrabold text-surface-600 text-lg flex items-center"> <Icon name="healthicons:circle-small" size="1.5em" style="color: var(--primary-color)"  />  SNS </p>
              <ul class="ml-10 text-surface-600 flex flex-col gap-2">
                <li> <span class="font-bold"> Type: </span> {{ selectedDietHistory.onsName ? selectedDietHistory.onsName : '' }} {{ selectedDietHistory.onsName2 ? '& ' + selectedDietHistory.onsName2 : '' }}</li>
                <li> <span class="font-bold"> Frequency: </span>{{ selectedDietHistory.onsFrequency ? selectedDietHistory.onsFrequency : '' }}</li>
                <li> <span class="font-bold"> Description: </span> {{ selectedDietHistory.onsDescription ? selectedDietHistory.onsDescription : '' }}</li>
              </ul>
            </div>
          </section>

          <section>
            <Divider layout="vertical" /> 
          </section>

          <section class="w-1/2">
            <div class="mt-5 text-sm">
              <p class="font-extrabold text-surface-600 text-lg flex items-center"> <Icon name="healthicons:circle-small" size="1.5em" style="color: var(--primary-color)"  /> Diet Restrictions </p>
              <ul class="ml-10 text-surface-600 flex flex-col gap-2"> 
                <li> <span class="font-bold"> Food Precautions: </span>  {{ selectedDietHistory.precaution ? selectedDietHistory.precaution : 'None' }} </li>
                <li> <span class="font-bold"> Food Allergies: </span>  {{ selectedDietHistory.category ? selectedDietHistory.category : 'None' }} </li>
              </ul>
            </div>

            <div class="mt-16 text-sm">
              <p class="font-extrabold text-surface-600 text-lg flex items-center"> <Icon name="healthicons:circle-small" size="1.5em" style="color: var(--primary-color)"  /> Nutrients</p>
              <ul class="ml-10 text-surface-600 flex flex-col gap-2">
                <li class="m-0 p-0"> <span class="font-bold"> Protein: </span>  {{ selectedDietHistory.protein ? selectedDietHistory.protein : '0' }} g</li>
                <li class="m-0 p-0"> <span class="font-bold"> Carbohydrates: </span>  {{ selectedDietHistory.carbohydrates ? selectedDietHistory.carbohydrates : '0' }} g</li>
                <li class="m-0 p-0"> <span class="font-bold"> Fats: </span>  {{ selectedDietHistory.fats ? selectedDietHistory.fats : '0' }} g</li>
                <li class="m-0 p-0"> <span class="font-bold"> Fiber: </span>  {{ selectedDietHistory.fiber ? selectedDietHistory.fiber : '0' }} g</li>
                <li class="m-0 p-0"> <span class="font-bold"> Sodium: </span>  {{ selectedDietHistory.sodium ? selectedDietHistory.sodium : '0' }} g</li>
              </ul>
            </div>
          </section>
        </div>
      </div>

    </Dialog>


  </div>
</template>
