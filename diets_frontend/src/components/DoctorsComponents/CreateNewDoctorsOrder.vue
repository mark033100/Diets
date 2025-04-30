<script lang="ts" setup>


const selectedDietCategory = ref('Oral');


</script>


<template>
  <div class="w-full">
    <div class="p-4">
      <div class="flex gap-4 ">
        <div class="w-1/4">
          <label> Reminders</label>
        </div>
        <div class="w-full">

          <label class="font-bold">Diet Category</label>
          <ul class="flex gap-10 ml-10 mt-2">
            <li class="flex items-center gap-5">
              <RadioButton v-model="selectedDietCategory" name="Oral" value="Oral" inputId="oral" /> <label for="oral"> Oral </label> 
            </li>
            <li class="flex items-center gap-5">
              <RadioButton v-model="selectedDietCategory" name="Enteral" value="Enteral" inputId="enteral" /> <label for="enteral"> Enteral </label>
            </li>
          </ul>

          <div class="mt-5 flex flex-col gap-5">
            <label class="font-bold">Diet Type</label>
            <Select class="w-90% ml-10" placeholder="Select Diet Type"/>
          </div>


          <div class="mt-5">
            <label class="font-bold"> Diet Requirements</label>
            <div class="flex gap-10 ml-10">
              <ul class="flex flex-col gap-2 mt-2">
                <li> <IftaLabel> <InputText id="calories"/> <label for="calories"> Calories(kcal):</label> </IftaLabel></li>
                <li> <IftaLabel> <InputText id="volume"/> <label for="volume"> Volume(ml):</label> </IftaLabel></li>
                <li> <IftaLabel> <InputText id="dilution"/> <label for="dilution"> Dilution(1kcal:1ml):</label> </IftaLabel></li>
              </ul>
              <ul class="flex flex-col gap-2 mt-2">
                <li> <IftaLabel> <Select class="w-full" /> <label for="mode"> Feeding Mode:</label> </IftaLabel></li>
                <li> <IftaLabel> <InputText id="dura" /> <label for="dura"> Feeding Duration:</label> </IftaLabel></li>
                <li> <IftaLabel> <InputText id="freq" /> <label for="freq"> Feeding Frequency:</label> </IftaLabel></li>
              </ul>
            </div>
          </div>

          <div class="w-full mt-5">
            <label class="font-bold"> Diet Restrictions</label>
            <ul class="flex flex-start gap-5 ml-10 mt-2">
              <li class="w-full"> <IftaLabel> <Select class="w-full"/> <label for="precaution"> Food Precautions:</label> </IftaLabel></li>
              <li class="w-full"> <IftaLabel> <Select class="w-full"/> <label for="allergies"> Food Allergies:</label> </IftaLabel></li>
            </ul>
          </div>

          <div class="w-full mt-5">
            <label class="font-bold"> Nutrients </label>
            <div class="flex justify-start gap-2">
              <ul class="flex flex-col gap-2 ml-10 mt-2">
                <li> <IftaLabel> <InputText id="mode"/> <label for="mode"> Protein:</label> </IftaLabel></li>
                <li> <IftaLabel> <InputText id="mode"/> <label for="mode"> Fats:</label> </IftaLabel></li>
              </ul>
              <ul class="flex flex-col gap-2 ml-10 mt-2">
                <li> <IftaLabel> <InputText id="mode"/> <label for="mode"> Carbohydrates:</label> </IftaLabel></li>
                <li> <IftaLabel> <InputText id="mode"/> <label for="mode"> Fiber:</label> </IftaLabel></li>
              </ul>
            </div>
          </div>

          <div class="w-full mt-5">
            <label class="font-bold"> SNS (Special Nutrition Supplement)</label>
            <div class="flex flex-col gap-2 mt-5 ml-10">
              <IftaLabel> <Select  class="w-full" id="snsType"/><label for="snsType"> SNS Type:</label> </IftaLabel>
              <IftaLabel> <Select  class="w-full" id="snsType"/><label for="snsType"> SNS Frequency:</label> </IftaLabel>
              <IftaLabel> <InputText  class="w-full" id="snsType"/><label for="snsType"> SNS Description:</label> </IftaLabel>
            </div>
          </div>

          <div class="w-full flex flex-col mt-5">
            <label class="font-bold"> Diet Remarks</label>
            <Textarea class="w-90 mt-2 ml-10"/>
          </div>
        </div>
      </div>

      <div class="w-full flex items-center justify-between mt-5">
        <Button severity="danger" label="Cancel"/>
        <Button class="" label="Save Diet Order" />
      </div>
    </div>

    
    
  </div>
</template>



<style>

</style>