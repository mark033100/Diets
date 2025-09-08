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
    <div class="panel-header">
      <h5 class="wrapper"> 
        <Icon name="fluent:food-16-filled" size="1.5em" class="icon"/> 
        <span class="title"> Diet Details </span>
      </h5>
    </div>

    <span class="data-output-large"> 
      {{  patientsDietResult.dietgroup ? checkAcronym(patientsDietResult.dietgroup) : '' }} -
      {{ patientsDietResult.dietname ? patientsDietResult.dietname : 'No Diet' }}  
      <Icon name="fluent:question-circle-16-filled" 
        class="text-2xl bg-primary pb-8" 
        v-tooltip.bottom="patientsDietResult.dietdesc ? patientsDietResult.dietdesc : '---'" 
      />
    </span>
    <div class="flex">
      <span class="border-r border-gray-200 pr-4"> Ordered Date:
        <span class="font-bold">{{ formatDate(patientsDietResult.dodate) || '---' }}</span>
      </span>
      <span class="pl-4"> Ordered By: 
        <span class="font-bold">{{ patientsDietResult.licno || '---' }}</span>
      </span>
    </div>

    <Divider type="dashed"/>
    <h6 class="w-full font-bold text-xl">Diet Requirements</h6>
    <section class="flex mt-6 justify-between gap-4"> 
      
      <div class="w-[50%]">
        <div class="p-2 text-sm">
          <p class="flex gap-4 items-center justify-between">
            <span class="label-small"> Calories: </span>
            <span> {{ patientsDietResult.calories || '0' }} kcal</span>
          </p>
          
          <p class="label-small"> Macronutrients</p>
          <ul class="pl-8 flex flex-col gap-2">
            <li class="flex justify-between">
              <span class="label-small">Protein: </span>
              <span> {{ patientsDietResult.protein || '0' }} g </span>
            </li>
            <li class="flex justify-between">
              <span class="label-small">Carbohydrates: </span>
              <span> {{ patientsDietResult.carbohydrates || '0' }} g </span>
            </li>
            <li class="flex justify-between">
              <span class="label-small">Fats: </span>
              <span> {{ patientsDietResult.fats || '0' }} g </span>
            </li>
            <li class="flex justify-between">
              <span class="label-small">Fiber: </span>
              <span> {{ patientsDietResult.fiber || '0' }} g </span>
            </li>
          </ul>
        </div>
      </div>

      <Divider layout ="vertical" type="dashed"/>

      <div class="w-[50%]" v-if="patientsDietResult.dietgroup === 'E'">
        <div class=" flex-col gap-2">
          <div class="p-2 text-sm w-full">
            <p class="label-small"> Formula</p>
            <ul class="pl-4 flex flex-col gap-2">
              <li class="flex justify-between">
                <label class="label-small">Calories: </label>
                <p> {{ patientsDietResult.calories || '0' }} kcal </p>
              </li>
              <li class="flex justify-between">
                <label class="label-small">Dilution: </label>
                <p> {{ patientsDietResult.dilution || '0' }} kcal : 1 ml</p>
              </li>
              <li class="flex justify-between">
                <label class="label-small">Volume: </label>
                <p> {{ patientsDietResult.volume || '0' }} ml </p>
              </li>
            </ul>
          </div>
          <div class="p-2 text-sm w-full">
            <p class="label-small"> Feeding Procedure</p>
            <ul class="pl-4 flex flex-col gap-2">
              <li class="flex justify-between">
                <label class="label-small">Mode:</label>
                <p> {{ patientsDietResult.feedingMode ? checkEnteralCode(patientsDietResult.feedingMode) : 'None' }} </p>
              </li>
              <li class="flex justify-between">
                <label class="label-small">Duration: </label>
                <p> {{ patientsDietResult.feedingDuration || '0' }} hour(s)</p>
              </li>
              <li class="flex justify-between">
                <label class="label-small">Frequency: </label>
                <p> {{ patientsDietResult.feedingFrequency || '0' }} times/day</p>
              </li>
            </ul>
          </div>
        </div>
        
      </div>
    </section>

    <Divider type="dashed"/>

    <section class="mt-6 "> 
      <h6 class="w-full font-bold text-xl">Diet Restrictions</h6>
      <div class="flex justify-between p-2 text-sm">
        <div class="w-1/2 flex gap-8">
          <span class="label-small">Food Allergies:</span>
          <span>{{ patientsDietResult.category || 'none' }}</span>
        </div>
        <Divider layout="vertical"/>
        <div class="w-1/2 flex gap-8">
          <span class="label-small">Food Precautions:</span>
          <span>{{ patientsDietResult.precaution || 'none' }}</span>
        </div>
      </div>
    </section>

    <Divider type="dashed"/>

    <section class="mt-6">
      <h6 class="font-bold text-xl"> Special Nutrition Supplement (SNS) </h6>
      <div class="tex-center flex justify-between w-1/2">
        <ul class="label-small flex flex-col gap-2">  
          <li>Type: </li>
          <li>Frequency:</li>
          <li>Other Details:</li>
        </ul>
        <ul class="text-sm flex flex-col gap-2">
          <li> {{ patientsDietResult.allergies? patientsDietResult.onsFormula : '' }}</li>
          <li class="self-start justify-self-start">  {{ patientsDietResult.onsFrequency? patientsDietResult.onsFrequency : 'None' }}</li>
          <li>  {{ patientsDietResult.precaution? patientsDietResult.onsDescription : '' }}</li>
        </ul>
          
      </div>
    </section>

    <Divider type="dashed"/>
    
    <section class="w-full mt-6">
      <h6 class="w-full font-bold text-xl">Diet Remarks</h6>
      <p class="text-sm"> {{ patientsDietResult.ordreas? patientsDietResult.ordreas : '' }} </p>
    </section>
  </div>
</template>



<style>

</style>