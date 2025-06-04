
<script setup>
import  { useFetchPatientNutritionScreening } from '~/composables/fetch-data/fetch-patientNutritionScreening';
import errorInlineMessage from '~/components/customComponents/errors/errorInlineMessage.vue';
import { useMyPatientDetailsStore } from '~/stores/patientDetails';

const patientStore = useMyPatientDetailsStore();

const props = defineProps({
  enccode: {
    type: String,
    required: true
  }
})

const { data: patientNutritionScreeningData, status, error, refresh } = useFetchPatientNutritionScreening(props.enccode);

const setError = () => {
  return {
    errorTitle: 'Error Gathering Nutrition Screening',
    errorCode: 500,
    errorIcon: 'search-error',
    errorMessage: error.value?.message
  }
};

// console.log('Nutrition Screening Data: ', patientNutritionScreeningData?.value[0]?.riskIndicator);

const apiStatus = computed(() => status.value);

if ( apiStatus.value === 'success' ) {
  patientStore.addPatientTag({
    title: patientNutritionScreeningData.value[0]?.riskIndicator,
    severity: status
  });
}



</script>


<template>
  <div>
    <div v-if="status === 'pending'"> Loading...</div>
    <div v-else-if="status === 'idle'"> Idle...</div>
    <errorInlineMessage v-else-if="status === 'error'" :errorObject="setError()"/>

    <div v-else-if="status === 'success'">
      <div class="panel-header">
        <h5 class="wrapper"> 
          <Icon name="healthicons:weight" size="1.5em" class="icon"/> 
          <span class="title"> BMI Details </span>
        </h5>
      </div>

      <label class="label-small"> Status</label>
      <p class="data-output">{{ patientNutritionScreeningData[0]?.riskIndicator || ''}} </p>

      
      <div class="mt-2 flex justify-between "> 
        <p class="flex flex-col">
          <label class="label-small"> BMI </label>
          <span class="data-output"> {{ patientNutritionScreeningData[0]?.bmi || '---'}} </span>  
        </p>
        <p class="flex flex-col items-center">
          <label class="label-small"> Height (cm) </label>
          <span class="data-output"> {{ patientNutritionScreeningData[0]?.height ?? 'No Record'}} </span>  
        </p>
        <p class="flex flex-col items-center">
          <label class="label-small"> Weight (kg)</label>
          <span class="data-output"> {{ (patientNutritionScreeningData[0]?.weight ?? 'No Record')}}  </span>  
        </p>
      </div>
  
      <ul class="flex justify-between mt-10">
        <li class="flex flex-col"> 
          <label class="label-small"> Entry By: </label> 
          <span class="data-output"> {{ patientNutritionScreeningData[0]?.entry_by || ''}} </span>
        </li>
        <li class="flex flex-col"> 
          <label class="label-small"> Entry Date: </label> 
          <span class="data-output"> {{ formatDate(patientNutritionScreeningData[0]?.datepost) || ''}} </span>
        </li>
      </ul>
    </div>
  </div>
</template>


<style>

</style>