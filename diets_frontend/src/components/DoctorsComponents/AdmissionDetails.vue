
<script lang="ts" setup>
import custom_button_add from '~/components/customComponents/custom_button_add.vue.vue';
import custom_user_icon  from '~/components/customComponents/icons/custom_user_icon.vue';
import { useMyPatientDetailsStore } from '~/stores/patientDetails';

const patientStore = useMyPatientDetailsStore();

const props = defineProps({
  patientsDietResult: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['toggleDietOrder'])

const patientTags = computed(() => patientStore.patientTags);


</script>


<template>
  <div>
    <div class="panel-header">
      <h5 class="wrapper"> 
        <Icon name="fluent:patient-32-filled" size="1.5em" class="icon"/> 
        <span class="title"> Patient Details </span>
      </h5>
    </div>

    <div class="mt-8 flex gap-4">
      <custom_user_icon :gender="patientsDietResult.patsex"/>
      <div class="flex flex-col ">
        <span class="flex gap-2">
          <Tag v-for="tag in patientTags" :key="tag.id" :severity="tag.severity" >
            <p class="text-xs">{{ tag.title }}</p>
          </Tag>  
        </span>
        <p class="data-output-medium">{{ patientsDietResult?.patname }}</p>
        <div class="flex gap-4">
          <p class="data-output" v-if="patientsDietResult.age"> {{ patientsDietResult?.age }} </p>
          <p class="data-output" v-if="patientsDietResult.gender">{{ patientsDietResult?.gender }}  </p>
        </div>
      </div>
    </div>
    
    <div class="mt-8 flex justify-between pr-8 ">
      <span>
        <label class="label-small">Hospital Number</label>
        <p class="data-output" v-if="patientsDietResult.hpercode">{{ formatHpercode(patientsDietResult?.hpercode) }} </p>
      </span>
      <span>
        <label class="label-small">Admission Date</label>
        <p class="data-output" v-if="patientsDietResult.admdate">{{ formatDate(patientsDietResult?.admdate) }}</p>
      </span>
    </div>
    
    <span class="mt-6 flex flex-col">
      <label class="label-small">Ward - Room</label>
      <p class="data-output" >{{ patientsDietResult?.wardname ? patientsDietResult?.wardname : '' }} - {{ patientsDietResult?.rmname ? patientsDietResult?.rmname : ''  }}</p>
    </span>
      
    <span class="mt-6 flex flex-col">
      <label class="label-small">Allergy</label>
      <p class="data-output"> {{ patientsDietResult.allergies ? patientsDietResult.allergies : '' }} </p>
    </span>

    


    <!-- <div class="mt-6 flex justify-center">
      <custom_button_add v-tooltip.top="'Create New Diet Order'" @click="emit('toggleDietOrder', true)"/>
    </div> -->
  </div>
</template>


<style>

</style>