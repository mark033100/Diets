<script setup>
import { useFetchPatientDietData } from '~/composables/fetch-data/fetch-patientDietData';
import { useFetchReproductiveStatus } from '~/composables/fetch-data/fetch-reproductiveStatus'
import custom_button_add from '~/components/customComponents/custom_button_add.vue';
import custom_user_icon  from '~/components/customComponents/icons/custom_user_icon.vue';
import MenuLists from '~/assets/json/MenuLists.json';
import DietHistory from '~/components/DoctorsComponents/DietHistory.vue';
import DietDetails from '~/components/DoctorsComponents/DietDetails.vue';
import DietNutritionScreening from '~/components/DoctorsComponents/DietNutritionScreening.vue';
import CreateNewDoctorsOrder from '~/components/DoctorsComponents/CreateNewDoctorsOrder.vue';
import '~/assets/css/doctorsUI.css';


const toast = useToast();
const toggleDietOrder = ref(false);

// Extract patient data from route
const { patient } = useRoute().params;
const enccode = patient.split('+')[0];

// Reactive state
const patientsDietResult = ref(null);
const maternalStatus = ref();
const doctorsOrderToggle = ref(false);


// Fetch patient diet data on component mount
await fetchPatientDietData();

// Fetch patient diet data
async function fetchPatientDietData() {
  const result = await useFetchPatientDietData(enccode);

  if (result.status === 'success') {
    handleFetchSuccess(result.data[0]);
  } else {
    handleError('Server Error', result.error);
  }
}

// Handle errors
function handleError(errorTitle, errorMessage) {
  // Show toast notification
  toast.add({ severity: 'error', summary: errorTitle, detail: errorMessage, life: 3000, });

  // Throw an error for global error handling
  throw createError({
    statusCode: 500,
    statusMessage: errorMessage,
  });

}

async function handleFetchSuccess(patient) { 
  
  patientsDietResult.value = {
    ...patient,
    isAdult: Number(patient.patage) >= 18,
    gender: patient.patsex === 'M' ? 'Male' : patient.patsex === 'F' ? 'Female' : 'Unknown',
    age: getPatientAge(patient.patage, patient.patagemo),
    tags: {
      admitted: true,
      pedia: Number(patient.patage) < 18,
      maternal: maternalStatus.value?.status ?? 'N/A',
      atrisk: patient.riskIndicator,
    }
  };
  //maternalStatus.value = await useFetchReproductiveStatus(patient?.enccode);

}


const clickedEvent = async (button)  => { 

  if (button === 'createOrder') { 
    doctorsOrderToggle.value = true;
  }

}

</script>


<template>
  <div class="w-full grid grid-cols-12 gap-2">
    
    <section class="card xl:col-span-5 col-span-12 row-span-2 bg-surface-700" style="margin-bottom: 0;">
      <div class="flex" >
        <custom_user_icon :gender="patientsDietResult?.patsex" :class="patientsDietResult?.patsex === 'M' ? 'bg-dark' : 'bg-l'"/>
        <div class="mt-4 ml-6 ">
          <span class="flex gap-2">
            <Tag severity="success" rounded>Admitted</Tag>
            <Tag severity="warn" rounded v-if="!patientsDietResult?.isAdult"> Pedia </Tag>
            <Tag severity="danger" rounded v-if="patientsDietResult?.riskIndicator === 'At Risk'" v-tooltip.top="'Result after Nutrition Screening'">{{ patientsDietResult?.riskIndicator }}</Tag>
            <Tag severity="info" v-if="patientsDietResult?.patsex === 'F' && maternalStatus?.status">Maternal</Tag>
          </span>
          <p class="patientname">{{ patientsDietResult?.patname }}</p>
          <span class="text-md"> {{ patientsDietResult?.age }} | {{ patientsDietResult?.gender }} |  <span class="font-bold text-primary"> Hospital No. {{ formatHpercode(patientsDietResult?.hpercode) }} </span></span>
        </div>
      </div>
      <div class="mt-6 flex justify-between">
        <span class="my-2">
          <label class="labelSmall">Ward - Room</label>
          <p class="font-bold" >{{ patientsDietResult?.wardname ? patientsDietResult?.wardname : '' }} - {{ patientsDietResult?.rmname ? patientsDietResult?.rmname : ''  }}</p>
        </span>
        <span class="">
          <label class="labelSmall">Admission Date</label>
          <p class="font-bold" v-if="patientsDietResult.admdate">{{ formatDate(patientsDietResult?.admdate) }}</p>
        </span>
      </div>

      <div class="mt-2">
        <label class="labelSmall">Height & Weight</label>
        <p class="font-bold"> <span> {{ patientsDietResult.height ? patientsDietResult.height : 'no input' }} kg | {{ patientsDietResult.weight ? patientsDietResult.weight : 'no input' }} cm</span></p>
      </div>

      <div class="mt-2">
        <label class="labelSmall">Allergy</label>
        <p class="font-bold"> {{ patientsDietResult.allergies ? patientsDietResult.allergies : '' }} </p>
      </div>

      <div class="mt-2">
        <label class="labelSmall">Admitting Diagnosis</label>
        <p class="font-bold"> {{ patientsDietResult.admtxt ? patientsDietResult.admtxt : '' }} </p>
      </div>

      <div class="mt-10 flex justify-center">
        <custom_button_add v-tooltip.top="'Create New Diet Order'" @click="toggleDietOrder = true"/>
      </div>
    </section>


    <section class="card lg:col-span-7 col-span-12  row-span-6">
      <DietDetails :patientsDietResult="patientsDietResult"/>
    </section>

    <section class="card lg:col-span-5 col-span-12 row-span-4 ">
      <DietNutritionScreening :enccode="patientsDietResult.enccode"/>
    </section>

    <section  class="card lg:col-span-12 col-span-12 row-span-4 ">
      <DietHistory :hpercode="patientsDietResult.hpercode"/>
    </section>


    <Dialog v-model:visible="toggleDietOrder" :style="{ width: '70vw' }" :draggable="false" :closable="true" :dismissableMask="true" :closeOnEscape="true" :blockScroll="true" modal class="p-fluid" >
      <template #header>
        <div class="flex justify-between w-full">
          <h4 class="m-0">Create Diet Order</h4>
        </div>
      </template>
      <div class="w-full">
        <CreateNewDoctorsOrder />
      </div>

    </Dialog>
  </div>
  
</template>



<style>



</style>