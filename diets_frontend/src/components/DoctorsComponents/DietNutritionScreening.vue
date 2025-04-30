
<script setup>
import  { useFetchPatientNutritionScreening } from '~/composables/fetch-data/fetch-patientNutritionScreening';
import errorInlineMessage from '~/components/customComponents/errors/errorInlineMessage.vue';

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


const setInlineMessage = (status) => ({
  severity: status === 'A' ? 'success' : status === 'P' ? 'warn' : 'danger',
  name: status === 'A' ? 'Active' : status === 'P' ? 'Pending' : 'Inactive',
});


</script>


<template>
  <div class="">
    <div v-if="status === 'pending'"> Loading...</div>
    <div v-else-if="status === 'idle'"> Idle...</div>
    <errorInlineMessage v-else-if="status === 'error'" :errorObject="setError()"/>
    <div v-else-if="status === 'success'">
      <p class="font-bold text-xl"> Nutrition Screening Details </p>
      <p class="font-extrabold text-xl text-primary-500 m-0">{{ patientNutritionScreeningData[0]?.riskIndicator || ''}} </p>
      <div class="flex justify-between text-sm">
        <span> <span class="font-bold"> Entry Date: </span> {{ formatDate(patientNutritionScreeningData[0]?.datepost) || ''}} </span>
        <span> <span class="font-bold"> Entry By: </span> {{ patientNutritionScreeningData[0]?.entry_by || ''}} </span>
      </div>
      
      <div class="mt-4 flex-col justify-between "> 
        <p class="m-0 flex items-center gap-1"> <Icon name="healthicons:body-mass-index" size="1.5em"/> <span class="font-bold"> BMI: </span> {{ patientNutritionScreeningData[0]?.bmi || ''}}  </p>
        <Divider class="m-1" />
        <ul class="items-center flex justify-between mt-4 text-sm">
          <li class="flex items-center gap-1"> <Icon name="healthicons:weight" size="1.5em"  /> <span class="font-bold"> Weight(kg): </span>  {{ (patientNutritionScreeningData[0]?.weight ?? 'No Weight Recorded')}}  </li>
          <li class="flex items-center gap-1"> <Icon name="healthicons:height" size="1.5em" /> <span class="font-bold"> Height(cm): </span> {{ patientNutritionScreeningData[0]?.height ?? 'No Height Recorded'}}  </li>
        </ul>
      </div>
      
      
    </div>
  </div>
</template>


<style>

</style>