<script setup>
import { useFetchPatientDietHistory } from '~/composables/fetch-data/fetch-patientDietHistory';
import errorInlineMessage from '~/components/customComponents/errors/errorInlineMessage.vue';
import Loader_Egg from '../misc/loaders/Loader_Egg.vue';
import { FilterMatchMode } from '@primevue/core/api';


const selectedDietHistory = ref(null);
const dietStatus = ref();
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
  dietStatus.value = setInlineMessage(selectedDietHistory.value.dostatus);
}

onUnmounted(() => {
  clear();
})

</script>

<template>
  <div>
    <div v-if="error"> 
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
        :rowsPerPageOptions="[5, 10, 20, 50]"
        scrollable 
        scrollHeight="350px">
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
            <div class="flex flex-col items-center justify-center">
              <Loader_Egg />
              <p class="ml-6 mt-4 font-bold">Loading...</p>
            </div>
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


    <Dialog v-model:visible="dialogVisible" 
      :selection="selectedDietHistory" 
      :style="{ width: '60vw' }" 
      :draggable="false" 
      :dismissableMask=true
      closeOnEscape 
      blockScroll 
      modal 
      class="p-fluid" 
      position="bottomright" >
      <template #header>
        <div class="flex justify-between w-full">
          <span class="flex items-center gap-2">
            <Icon name="fluent:history-32-filled" size="1.5em"/>
            <h4 class="m-0">Diet History Details</h4>
          </span>
        </div>
      </template>
      <div v-if="!selectedDietHistory">
        <p> No Diet History Data</p>
      </div>
      <div class="history-layout-container" v-else>

        <section>
          <Tag :severity="dietStatus.severity" :value=" dietStatus.name" class=" align-top" />
          <span class="font-bold text-xl"> 
            {{ selectedDietHistory.dietgroup ? checkAcronym(selectedDietHistory.dietgroup) : selectedDietHistory }} - {{ selectedDietHistory.dietname ? selectedDietHistory.dietname : '' }} 
          </span> 
          <span> {{ selectedDietHistory.dodate ? formatDate(selectedDietHistory.dodate) : '' }} | {{ selectedDietHistory.lname ? selectedDietHistory.lname : '' }}, {{ selectedDietHistory.fname ? selectedDietHistory.fname : '' }} </span>
        </section>

        <section>
          <span class="label-title  "> Diet Requirements </span>
          <div class="flex justify-between gap-4"> 
            <div class="w-[50%]">
              <div class="p-2 text-sm">
                <p class="flex gap-4 items-center justify-between font-bold">
                  <span> Calories: </span>
                  <span> {{ selectedDietHistory.calories ? selectedDietHistory.calories : '0' }} kcal</span>
                </p>
                
                <p class="font-bold"> Macronutrients</p>
                <ul class="pl-8 flex flex-col gap-2">
                  <li class="flex justify-between">
                    <span>Protein: </span>
                    <span class="font-bold"> {{ selectedDietHistory.protein? selectedDietHistory.protein : '0' }} g </span>
                  </li>
                  <li class="flex justify-between">
                    <span>Carbohydrates: </span>
                    <span class="font-bold"> {{ selectedDietHistory.carbohydrates? selectedDietHistory.carbohydrates : '0' }} g </span>
                  </li>
                  <li class="flex justify-between">
                    <span>Fats: </span>
                    <span class="font-bold"> {{ selectedDietHistory.fats? selectedDietHistory.fats : '0' }} g </span>
                  </li>
                  <li class="flex justify-between">
                    <span>Fiber: </span>
                    <span class="font-bold"> {{ selectedDietHistory.fiber? selectedDietHistory.fiber : '0' }} g </span>
                  </li>
                </ul>
              </div>
            </div>

            <Divider layout ="vertical" type="dashed"/>

            <div class="w-[50%]" v-if="selectedDietHistory.dietgroup === 'E'">
              <div class=" flex-col gap-2">
                <div class="p-2 text-sm w-full">
                  <p class="font-bold"> Formula</p>
                  <ul class="pl-4 flex flex-col gap-2">
                    <li class="flex justify-between">
                      <label>Calories: </label>
                      <p class="font-bold"> {{ selectedDietHistory.calories? selectedDietHistory.calories : '0' }} kcal </p>
                    </li>
                    <li class="flex justify-between">
                      <label>Dilution: </label>
                      <p class="font-bold"> {{ selectedDietHistory.dilution? selectedDietHistory.dilution : '0' }} kcal : 1 ml</p>
                    </li>
                    <li class="flex justify-between">
                      <label>Volume: </label>
                      <p class="font-bold"> {{ selectedDietHistory.volume? selectedDietHistory.volume : '0' }} ml </p>
                    </li>
                  </ul>
                </div>
                <div class="p-2 text-sm w-full">
                  <p class="font-bold"> Feeding Procedure</p>
                  <ul class="pl-4 flex flex-col gap-2">
                    <li class="flex justify-between">
                      <label>Mode: </label>
                      <p class="font-bold"> {{ selectedDietHistory.feedingMode ? selectedDietHistory.feedingMode : 'None' }} </p>
                    </li>
                    <li class="flex justify-between">
                      <label>Duration: </label>
                      <p class="font-bold"> {{ selectedDietHistory.duration? selectedDietHistory.duration : '0' }} hours</p>
                    </li>
                    <li class="flex justify-between">
                      <label>Frequency: </label>
                      <p class="font-bold"> {{ selectedDietHistory.frequency? selectedDietHistory.frequency : '0' }} times/day</p>
                    </li>
                  </ul>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        <section>
          <span class="label-title"> Diet Restrictions </span>
          <div class="flex text-sm p-2">
            <div class="w-1/2">
              <label class="font-bold">Food Allergies: </label>
              <p class="pl-4 mt-4"> {{ selectedDietHistory.category ? selectedDietHistory.category : 'None' }}</p>
            </div>
            <div>
              <label class="font-bold">Food Precautions: </label>
              <p class="pl-4 mt-4"> {{ selectedDietHistory.precaution ? selectedDietHistory.precaution : 'None' }} </p>
            </div>
          </div>
        </section>

        <section>
          <span class="label-title"> Special Nutrition Supplement (SNS) </span>
          <div class="tex-center flex justify-between w-1/2 p-2">
            <ul class="text-sm flex flex-col gap-2 font-bold">  
              <li>Type: </li>
              <li>Frequency:</li>
              <li>Other Details:</li>
            </ul>
            <ul>
              <li> {{ selectedDietHistory.onsName? selectedDietHistory.onsName : '' }}</li>
              <li class="self-start justify-self-start">  {{ selectedDietHistory.onsFrequency? selectedDietHistory.onsFrequency : '' }}</li>
              <li>  {{ selectedDietHistory.onsDescription? selectedDietHistory.onsDescription : '' }}</li>
            </ul>
              
          </div>
        </section>

        <section>
          <span class="label-title"> Diet Remarks </span>
          <p class="text-sm p-2"> {{ selectedDietHistory.ordreas? selectedDietHistory.ordreas : '' }} </p>
        </section>



      </div>

    </Dialog>


  </div>
</template>


<style scoped>
  .history-layout-container {

    padding: 1 rem;

    .history-layout-wrapper {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      padding-top: 2rem;
    }

    .label-title {
      font-weight: bold;
      font-size: 1.2rem;
      padding-top: 1rem;
    }
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-bottom: 1px dashed rgb(228, 227, 227);
    padding-bottom: 1.5rem;
  }
</style>
