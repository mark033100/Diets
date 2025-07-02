<script setup>
// --> COMPOSABLES
import { useFetchPatientDietData } from '~/composables/fetch-data/fetch-patientDietData';
import { useFetchReproductiveStatus } from '~/composables/fetch-data/fetch-reproductiveStatus'

// --> COMPONENTS
import DietHistory from '~/components/DoctorsComponents/DietHistory.vue';
import DietDetails from '~/components/DoctorsComponents/DietDetails.vue';
import DietNutritionScreening from '~/components/DoctorsComponents/DietNutritionScreening.vue';
import CreateNewDoctorsOrder from '~/components/DoctorsComponents/CreateNewDoctorsOrder.vue';
import AdmissionDetails from '~/components/DoctorsComponents/AdmissionDetails.vue';
import Loader_Egg from '~/components/misc/loaders/Loader_Egg.vue';

// --> STORES
import { useMyPatientDetailsStore } from '~/stores/patientDetails';

const patient_store = useMyPatientDetailsStore();
const toast = useToast();
const toggle_diet_order = ref(false);
const api_status = ref(false);

// Extract patient data from route
const { patient } = useRoute().params;
const enccode = decodeURIComponent(patient.split('+')[0]);
// Reactive state
const patientsDietResult = ref(null);
const maternalStatus = ref();
const error_object = ref({
  status: null,
  title: '',
  description: ''
});


onMounted(async () => {
  if (!enccode) {
    handleError('500','Patient Data Not Found', 'No patient encounter code was found in the route parameters.');
    return
  }
  api_status.value = 'loading';
  const result = await useFetchPatientDietData(enccode);
  if (result.status === 'success') {
    handleFetchSuccess(result?.data[0]);
  } else {
    handleError('500', 'Server Error', result.error);
  }

});


function handleError(status, title, message) {
  api_status.value = 'error';
  toast.add({ severity: 'error', summary: title, detail: message, life: 3000, });
  error_object.value = {
    status: status,
    title: title,
    description: message
  };
}

async function handleFetchSuccess(patient) { 
  api_status.value = 'success';
  if (!patient || Object.keys(patient).length === 0) {
    handleError('500', 'Patient Data Not Found', 'No patient data was found for the provided encounter code.');
  } else {
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

    patient_store.addPatientTag({
      title: Number(patient.patage) < 18 ? 'Pedia' : 'Adult',
      severity: 'warn'
    });
  
  }
  
  


  
  //maternalStatus.value = await useFetchReproductiveStatus(patient?.enccode);

}

async function onSuccessSubmit() {
  toggle_diet_order.value = false;
  await fetchPatientDietData();
}

</script>

<template>
  <div> <!-- Content Area -->
    <section class="card flex justify-between items-center">
      <div>
        <h4 class="m-0">Patient Diet Information </h4>
        <p class="text-xs">General Admission Data and Diet Data of the Patient.</p>
      </div>
      <div>
        <Button style="margin-right: 10px;" @click="toggle_diet_order = true" >
          <Icon name="fluent:add-circle-12-filled" size="1.5em"/>
          <label class="font-bold">Create New Diet Order</label>
        </Button>
      </div>
    </section>

    <!-- Main Content Area -->
    <div class="card flex flex-col justify-center items-center h-[80vh] gap-24" v-if="api_status === 'loading'">
      <Loader_Egg class="w-24 h-24" />
      <span class="text-gray-500 ml-28 font-bold">Loading Patient Diet Data ...</span>
    </div>
    <div v-else-if="api_status === 'error'" class="card flex flex-col justify-center items-center h-[80vh] gap-4">
      <div class="flex items-center">
        <Icon name="fluent:accessibility-error-20-filled" size="3em" class="text-red-500" />
        <span class="text-gray-500 ml-4 font-bold">{{ error_object.title }}</span>
      </div>
      <p class="text-sm text-gray-500">{{ error_object.description }}</p>
      <Button as="router-link" to="/" severity="info" outlined class="mt-12">
        <Icon name="fluent:home-16-filled" size="1.5em" />
        <span class="ml-2 font-bold">Return Search</span>
      </Button>
    </div>
    <div class="doctors-main-wrapper doctors-main-container" v-else-if="api_status === 'success' && patientsDietResult"> 
      <section class="card admission-details" >
        <AdmissionDetails :patientsDietResult="patientsDietResult" @toggle_diet_order="toggle_diet_order = $event"/>
      </section>

      <section class="card diet-details">
        <DietDetails :patientsDietResult="patientsDietResult" />
      </section>

      <section class="card nutrition-screening ">
        <DietNutritionScreening :enccode="patientsDietResult.enccode" :age="patientsDietResult.patage"/>
      </section>

      <section class="card diet-history">
        <DietHistory :hpercode="patientsDietResult.hpercode" />
      </section>
    </div>
    <!-- End of Main Content Area -->

    <Dialog v-model:visible="toggle_diet_order" 
        :style="{ width: '95vw', height: '95vh' }" 
        :draggable="false" 
        :closable="true" 
        :closeOnEscape="true" 
        :blockScroll="true" 
        class="overflow-y-hidden"
        modal>
        <template #header>
          <div class="w-full">
            <span>
              <label class="font-bold text-xl">Create Diet Order</label> 
              <p> This is a form to create a new diet order for a patient. </p>
            </span>
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
  </div> <!-- End of Content Area -->
  
</template>



<style>



</style>