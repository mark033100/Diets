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

    <ul class="mt-6">
      <li class="flex flex-col gap-0">
        <span class="data-output-large"> 
          {{  patientsDietResult.dietgroup ? checkAcronym(patientsDietResult.dietgroup) : '' }} -
          {{ patientsDietResult.dietname ? patientsDietResult.dietname : 'No Diet' }}  
          <Icon name="fluent:question-circle-16-filled" 
            class="text-2xl bg-primary pb-8" 
            v-tooltip.bottom="patientsDietResult.dietdesc ? patientsDietResult.dietdesc : '---'" 
          />
        </span>
      </li>

      <li>
        <div class="flex">
          <p class="border-r border-gray-200 pr-4"> Ordered Date: <span class="font-bold">{{ patientsDietResult.dodate ? formatDate(patientsDietResult.dodate) : '---' }}</span></p>
          <p class="pl-4"> Ordered By: <span class="font-bold">{{ patientsDietResult.licno ? patientsDietResult.licno : '---' }}</span></p>
        </div>


        
      </li>


    </ul>

    <Divider type="dashed"/>
    <h6 class="w-full font-bold text-xl">Diet Requirements</h6>
    <section class="flex mt-6 justify-between gap-4"> 
      
      <div class="w-[50%]">
        <div class="p-2 text-sm">
          <p class="flex gap-4 items-center justify-between font-bold">
            <span> Calories: </span>
            <span> {{ patientsDietResult.calories ? patientsDietResult.calories : '0' }} kcal</span>
          </p>
          
          <p class="font-bold"> Macronutrients</p>
          <ul class="pl-8 flex flex-col gap-2">
            <li class="flex justify-between">
              <span>Protein: </span>
              <span class="font-bold"> {{ patientsDietResult.protein? patientsDietResult.protein : '0' }} g </span>
            </li>
            <li class="flex justify-between">
              <span>Carbohydrates: </span>
              <span class="font-bold"> {{ patientsDietResult.carbohydrates? patientsDietResult.carbohydrates : '0' }} g </span>
            </li>
            <li class="flex justify-between">
              <span>Fats: </span>
              <span class="font-bold"> {{ patientsDietResult.fats? patientsDietResult.fats : '0' }} g </span>
            </li>
            <li class="flex justify-between">
              <span>Fiber: </span>
              <span class="font-bold"> {{ patientsDietResult.fiber? patientsDietResult.fiber : '0' }} g </span>
            </li>
          </ul>
        </div>
      </div>

      <Divider layout ="vertical" type="dashed"/>

      <div class="w-[50%]" v-if="patientsDietResult.dietgroup === 'E'">
        <div class=" flex-col gap-2">
          <div class="p-2 text-sm w-full">
            <p class="font-bold"> Formula</p>
            <ul class="pl-4 flex flex-col gap-2">
              <li class="flex justify-between">
                <label>Calories: </label>
                <p class="font-bold"> {{ patientsDietResult.calories? patientsDietResult.calories : '0' }} kcal </p>
              </li>
              <li class="flex justify-between">
                <label>Dilution: </label>
                <p class="font-bold"> {{ patientsDietResult.dilution? patientsDietResult.dilution : '0' }} kcal : 1 ml</p>
              </li>
              <li class="flex justify-between">
                <label>Volume: </label>
                <p class="font-bold"> {{ patientsDietResult.volume? patientsDietResult.volume : '0' }} ml </p>
              </li>
            </ul>
          </div>
          <div class="p-2 text-sm w-full">
            <p class="font-bold"> Feeding Procedure</p>
            <ul class="pl-4 flex flex-col gap-2">
              <li class="flex justify-between">
                <label class="">Mode: </label>
                <p class="font-bold"> {{ patientsDietResult.feedingMode ? patientsDietResult.feedingMode : 'None' }} </p>
              </li>
              <li class="flex justify-between">
                <label class="">Duration: </label>
                <p class="font-bold"> {{ patientsDietResult.duration? patientsDietResult.duration : '0' }} hours</p>
              </li>
              <li class="flex justify-between">
                <label class="">Frequency: </label>
                <p class="font-bold"> {{ patientsDietResult.frequency? patientsDietResult.frequency : '0' }} times/day</p>
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
          <span class="font-bold ">Food Allergies:</span>
          <span>{{ patientsDietResult.category || 'none' }}</span>
        </div>
        <Divider layout="vertical"/>
        <div class="w-1/2 flex gap-8">
          <span class="font-bold">Food Precautions:</span>
          <span>{{ patientsDietResult.precaution || 'none' }}</span>
        </div>
      </div>
    </section>

    <Divider type="dashed"/>

    <section class="mt-6">
      <h6 class="font-bold text-xl"> Special Nutrition Supplement (SNS) </h6>
      <div class="tex-center flex justify-between w-1/2">
        <ul class="text-sm flex flex-col gap-2 font-bold">  
          <li>Type: </li>
          <li>Frequency:</li>
          <li>Other Details:</li>
        </ul>
        <ul>
          <li> {{ patientsDietResult.allergies? patientsDietResult.allergies : '' }}</li>
          <li class="self-start justify-self-start">  {{ patientsDietResult.precaution? patientsDietResult.precaution : 'None' }}</li>
          <li>  {{ patientsDietResult.precaution? patientsDietResult.precaution : '' }}</li>
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