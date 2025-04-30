<script lang="ts" setup>

const props = defineProps({

  patientsDietResult: {
    type: Object,
    required: true
  }

});


</script>



<template>
  <div>
    <div class="flex flex-col justify-between">
      <div class="flex-col">
        <span class="font-bold text-6xl m-0 header_class"> {{ patientsDietResult.dietname ? patientsDietResult.dietname : 'No Diet' }}  </span>
        <Icon name="healthicons:question-circle" class="text-2xl bg-primary pb-16 ml-5" v-tooltip.bottom="patientsDietResult.dietdesc ? patientsDietResult.dietdesc : 'No Diet Order was given to the patient.'" />
        <p class="font-bold text-xl ml-1"> {{  patientsDietResult.dietgroup ? checkAcronym(patientsDietResult.dietgroup) : '' }}</p>
        <div class="flex ml-1">
          <p class="border-r border-gray-200 pr-4"> Ordered Date: <span class="font-bold">{{ patientsDietResult.dodate ? formatDate(patientsDietResult.dodate) : '---' }}</span></p>
          <p class="pl-4"> Ordered By: <span class="font-bold">{{ patientsDietResult.licno ? patientsDietResult.licno : '---' }}</span></p>
        </div>
      </div>
      <Panel class="mt-2 flex-col justify-between">
        <div class="flex items-center" v-if="patientsDietResult.dietgroup === 'E'">
          <div class="w-1/4 pr-4 font-bold text-lg">Feeding Requirements</div>
          <Divider layout="vertical"  class=""/>
          <ul class="flex justify-evenly text-center pl-4 w-3/4">
            <li>
              <label class="labelSmall">Feeding Mode</label>
              <p class="font-bold"> {{ patientsDietResult.feedingMode ? patientsDietResult.feedingMode : 'None' }} </p>
            </li>
            <li >
              <label class="labelSmall">Feeding Duration</label>
              <p class="font-bold"> {{ patientsDietResult.feedingDuration ? patientsDietResult.feedingDuration : '0' }} hours </p>
            </li>
            <li>
              <label class="labelSmall">Feeding Frequency</label>
              <p class="font-bold"> {{ patientsDietResult.feedingFrequency? patientsDietResult.feedingFrequency : '0' }}x a day </p>
            </li>
          </ul>
        </div>
        <div class="flex items-center">
          <div class="w-1/4 pr-4 font-bold text-lg align-center">Diet Requirements</div>
          <Divider layout="vertical"  class=""/>
            <ul class="flex justify-evenly text-center pl-4 w-3/4">
              <li>
                <label class="labelSmall">Calories</label>
                <p class="font-bold"> {{ patientsDietResult.calories? patientsDietResult.calories : '0' }} kcal </p>
              </li>
              <li v-if="patientsDietResult.dietgroup === 'E'">
                <label class="labelSmall">Dilution</label>
                <p class="font-bold"> {{ patientsDietResult.dilution? patientsDietResult.dilution : '0' }}kcal : 1ml </p>
              </li>
              <li v-if="patientsDietResult.dietgroup === 'E'">
                <label class="labelSmall">Volume</label>
                <p class="font-bold"> {{ patientsDietResult.volume? patientsDietResult.volume : '0' }} ml</p>
              </li>
            </ul>
        </div>
      </Panel>
    </div>

    <div class="flex mt-2 justify-between gap-4"> 
      <Panel class="w-1/2">
        <template #header>
          <div class="text-center w-full font-bold text-xl ">Diet Restrictions</div>
        </template>
        <div class="p-2">
          <p class="flex items-center justify-between">
            <span class="">Food Allergies: </span>
            <span class="font-bold"> {{ patientsDietResult.category? patientsDietResult.category : 'none' }}</span>
          </p>
          <p class="flex items-center justify-between">
            <span class="">Food Precautions:</span>
            <span class="font-bold">  {{ patientsDietResult.precaution? patientsDietResult.precaution : 'none' }}</span>
          </p>
        </div>
      </Panel>
      
      <Panel class="w-1/2" >
        <template #header>
          <div class="text-center w-full font-bold text-xl "> Nutrients</div>
        </template>
        <div class="p-2">
          <p class="flex items-center justify-between">
            <span class="">Protein (g)</span>
            <span class="font-bold"> {{ patientsDietResult.protein? patientsDietResult.protein : '0' }}</span>
          </p>
          <p class="flex items-center justify-between">
            <span class="">Carbohydrates (g)</span>
            <span class="font-bold"> {{ patientsDietResult.carbohydrates? patientsDietResult.carbohydrates : '0' }}</span>
          </p>
          <p class="flex items-center justify-between">
            <span class="">Fats (g)</span>
            <span class="font-bold"> {{ patientsDietResult.fats? patientsDietResult.fats : '0' }}</span>
          </p>
          <p class="flex items-center justify-between">
            <span class="">Fiber (g)</span>
            <span class="font-bold"> {{ patientsDietResult.fiber? patientsDietResult.fiber : '0' }}</span>
          </p>
        </div>
      </Panel>
    </div>


    <div class="flex mt-2 gap-4">
      <Panel class="w-full tex-center">
        <template #header>
          <div class="w-full font-bold text-xl ">Special Nutrition Supplement (SNS)</div>
        </template>
          <p class="flex items-center justify-between ">
            <span class="">Type: </span>
            <span class="font-bold"> {{ patientsDietResult.allergies? patientsDietResult.allergies : '' }}</span>
          </p>
          <p class="flex items-center justify-between ">
            <span class="">Frequency:</span>
            <span class="font-bold self-start justify-self-start">  {{ patientsDietResult.precaution? patientsDietResult.precaution : 'None' }}</span>
          </p>
          <p class="flex items-center justify-between ">
            <span class="">Other Details:</span>
            <span class="font-bold">  {{ patientsDietResult.precaution? patientsDietResult.precaution : '' }}</span>
          </p>
      </Panel>
    </div>

    <Panel class="w-full mt-2">
        <template #header>
          <div class=" w-full font-bold text-xl ">Diet Remarks</div>
        </template>
        <p> {{ patientsDietResult.ordreas? patientsDietResult.ordreas : '' }} </p>
    </Panel>
  </div>
</template>



<style>

</style>