<script setup>
import { useFetchPatientDietData } from '~/composables/fetch-data/fetch-patientDietData';
import { useFetchReproductiveStatus } from '~/composables/fetch-data/fetch-reproductiveStatus'
import DietHistory from '~/components/DoctorsComponents/DietHistory.vue';
import DietDetails from '~/components/DoctorsComponents/DietDetails.vue';
import DietNutritionScreening from '~/components/DoctorsComponents/DietNutritionScreening.vue';
import CreateNewDoctorsOrder from '~/components/DoctorsComponents/CreateNewDoctorsOrder.vue';
import AdmissionDetails from '~/components/DoctorsComponents/AdmissionDetails.vue';
import { useMyPatientDetailsStore } from '~/stores/patientDetails';

const patientStore = useMyPatientDetailsStore();

const toast = useToast();
const toggleDietOrder = ref(false);

// Extract patient data from route
const { patient } = useRoute().params;
const enccode = patient.split('+')[0];

// Reactive state
const patientsDietResult = ref(null);
const maternalStatus = ref();


// Fetch patient diet data on component mount
await fetchPatientDietData();

// Fetch patient diet data
async function fetchPatientDietData() {
  const result = await useFetchPatientDietData(enccode);

  if (result.status === 'success') {
    handleFetchSuccess(result?.data[0]);
  } else {
    handleError('Server Error', result.error);
  }
}

function handleError(errorTitle, errorMessage) {
  toast.add({ severity: 'error', summary: errorTitle, detail: errorMessage, life: 3000, });
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
    unformattedAge: patient.patage,
    tags: {
      admitted: true,
      pedia: Number(patient.patage) < 18,
      // maternal: maternalStatus.value?.status ?? 'N/A',
      atrisk: patient.riskIndicator,
    }
  };


  patientStore.addPatientTag({
    title: Number(patient.patage) < 18 ? 'Pedia' : 'Adult',
    severity: 'warn'
  });
  console.log('Store: ', patientStore.patientTags);
  
  //maternalStatus.value = await useFetchReproductiveStatus(patient?.enccode);

}


function onClickCancel() {
  toggleDietOrder.value = false;
}

async function onSuccessSubmit() {
  toggleDietOrder.value = false;
  await fetchPatientDietData();
}

</script>

<template>
  <div> <!-- Content Area -->
    <section class="card flex justify-between items-center">
      <div>
        <h4 class="m-0">Patient Information </h4>
        <p class="text-xs">General Admission Data and Diet Data of the Patient.</p>
      </div>
      <div>
        <Button style="margin-right: 10px;" @click="toggleDietOrder = true" >
          <Icon name="fluent:add-circle-12-filled" size="1.5em"/>
          <label class="font-bold">Create New Diet Order</label>
        </Button>
      </div>
      
    </section>

    <div class="doctors-main-wrapper doctors-main-container "> <!-- Main Content Area -->
      <section class="card admission-details" >
        <AdmissionDetails 
          :patientsDietResult="patientsDietResult"
          @toggleDietOrder="toggleDietOrder = $event"
        />
      </section>

      <section class="card diet-details">
        <DietDetails :patientsDietResult="patientsDietResult"/>
      </section>

      <section class="card nutrition-screening ">
        <DietNutritionScreening :enccode="patientsDietResult.enccode"/>
      </section>

      <section class="card diet-history">
        <DietHistory 
          :hpercode="patientsDietResult.hpercode"
        />
      </section>
      
      <Dialog v-model:visible="toggleDietOrder" 
        :style="{ width: '95vw', height: '95vh' }" 
        :draggable="false" 
        :closable="true" 
        :dismissableMask="true" 
        :closeOnEscape="true" 
        :blockScroll="true" 
        class="overflow-y-hidden"
        modal>
        <template #header>
          <div class="w-full ">
            <label class="font-bold text-xl">Create Diet Order</label> 
            <p> This is a form to create a new diet order for a patient. </p>
          </div>
        </template>
        <CreateNewDoctorsOrder 
          :age="patientsDietResult.unformattedAge" 
          :gender="patientsDietResult.gender"
          :hpercode="patientsDietResult.hpercode"
          :enccode="patientsDietResult.enccode"
          :dietcode="patientsDietResult.dietcode"
          @success="onSuccessSubmit"
        />
      </Dialog>

    </div> <!-- End of Main Content Area -->

  </div> <!-- End of Content Area -->
  
</template>



<style>



</style>