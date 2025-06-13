
<script setup>
import { useFetchPatientNutritionScreening } from '~/composables/fetch-data/fetch-patientNutritionScreening';
import { useFetchPatientNutritionAssessment } from '~/composables/fetch-data/fetch-patientNutritionAssessment';
import { useCrudNutritionScreening } from '~/composables/crud/crud-NutritionScreening';
import errorInlineMessage from '~/components/customComponents/errors/errorInlineMessage.vue';
import { useMyPatientDetailsStore } from '~/stores/patientDetails';
import NarQuestions from '~/assets/json/NarQuestions.json';


const { create_NutritionScreening, get_NutritionScreening, update_NutritionScreening, delete_NutritionScreening } = useCrudNutritionScreening();
const patientStore = useMyPatientDetailsStore();
const nutritionScreeningDialog = ref(false);
const addQuestionDialog = ref(false);
const assessmentResult = ref([]);
const selectedAssessment = ref(0);
const answers = ref(new Array(4).fill(null));
const userCookies = useCookie('authUser');
const toast = useToast();
const confirm = useConfirm();
const props = defineProps({
  enccode: {
    type: String,
    required: true
  },
  age : {
    type: String,
    required: true
  }
})



const { data: patientNutritionScreeningData, status: screeningStatus, error: screeningError, refresh } = await get_NutritionScreening(props.enccode);

const narQuestionaires = computed(() =>  Number(props.age) > 18 ? NarQuestions.adult : NarQuestions.pedia );

const setError = () => {
  return {
    errorTitle: 'Error Gathering Nutrition Screening',
    errorCode: 500,
    errorIcon: 'search-error',
    errorMessage: error.value?.message
  }
};

const screeningApiStatus = computed(() => screeningStatus.value);

if (screeningApiStatus.value === 'success') {
  setPatientNutritionTag();
}

const fetch_PatientNutritionScreening = async () => { 

}

const setAnswers = (value) => {
  answers.value = new Array(4).fill(value);
}

const clearAnswers = () => {
  answers.value = new Array(4).fill(null);
}

const selectAssessment = (event) => {
  selectedAssessment.value = event;
};

const handleOnClick_NutritionAssessments = () => { 
  nutritionScreeningDialog.value = true;
  fetchPatientAssessments();
}

const onDelete_NutritionScreening = async (id) => {
  const composable_result = await delete_NutritionScreening(id);

  if(composable_result.status === 'error') {
    toast.add({ severity: 'error', summary: 'Error', detail: composable_result.error.message, life: 3000 });
    return;
  }
  toast.add({ severity: 'success', summary: 'Success Deletion', detail: 'Nutrition Screening was deleted successfully', life: 3000 });
  await refresh();
}

const fetchPatientAssessments = async () => {

  const assessmentResultData = await useFetchPatientNutritionAssessment(props.enccode);
  if (assessmentResultData.error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: assessmentResultData.error.message,
      life: 3000
    });
    return;
  }
  assessmentResult.value = assessmentResultData.data;
}

const handleOnclick_cancelNutritionScreening = () => { 
  addQuestionDialog.value = false;
  clearAnswers();
}

const handleOnClick_SaveNutritionSreening = async () => {

  const form = {
    screeningAnswers: answers.value,
    enccode: props.enccode,
    height: patientNutritionScreeningData.value[0]?.height,
    weight: patientNutritionScreeningData.value[0]?.weight,
    bmi: patientNutritionScreeningData.value[0]?.bmi,
    entry_by: userCookies.value.employeeid,
    age: props.age
  }

  const composable_Result = await create_NutritionScreening(form); 

  if (composable_Result.status === 'error') {
    handleFail_NutritionScreening();
    return;
  }

  handleSuccess_NutritionScreening();
}

const handleSuccess_NutritionScreening = () => {
  nutritionScreeningDialog.value = false;
  addQuestionDialog.value = false;
  setPatientNutritionTag();
  clearAnswers();
  refresh();
  toast.add({ severity: 'success', summary: 'Saving Success', detail: 'Nutrition Screening Answers are Saved Successfully!', life: 3000 });
}

const handleFail_NutritionScreening = () => {
  toast.add({ severity: 'error', summary: composable_Result.title, detail: composable_Result.error.statusMessage, life: 3000 });
  clearAnswers();
}

const confirm_DeleteNutritionScreening = (event, id) => {
  confirm.require({
    target: event.currentTarget,
    message: `Are you sure you want to delete this Nutrition Screening?`,
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Confirm Delete',
      severity: 'danger',
      outlined: true
    },
    accept: () => {
      console.log('ID: ', id);
      onDelete_NutritionScreening(id);
    },
    reject: () => {
      return false
    }
  })
}

function setPatientNutritionTag () { 
  let stat = patientNutritionScreeningData.value[0]?.riskIndicator === 'Nutritionally at Risk' ? 'danger' : 'success';
  patientStore.addPatientTag({
    title: patientNutritionScreeningData.value[0]?.riskIndicator,
    severity: stat
  });
}

</script>


<template>
  <div>
    <div class="panel-header flex justify-between items-center">
      <h5 class="wrapper"> 
        <Icon name="healthicons:weight" size="1.5em" class="icon"/> 
        <span class="title"> Patient Nutrition Overview</span>
      </h5>
      <Button text @click="handleOnClick_NutritionAssessments()" v-if="screeningApiStatus === 'success'"> 
        View
        <Icon name="fluent:open-12-filled" size="2rem" class="icon" />
      </Button>
    </div>
    <div v-if="screeningApiStatus === 'pending'"> Loading...</div>
    <errorInlineMessage v-else-if="screeningApiStatus === 'error'" :errorObject="setError()"/>
    <div v-else-if="screeningApiStatus === 'success'">
      <span>
        <label class="label-small"> Nutrition Screening Result</label>
        <p class="data-output">{{ patientNutritionScreeningData[0]?.riskIndicator || ''}} </p>
      </span>

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

    <Dialog v-model:visible="nutritionScreeningDialog" :style="{width: '80vw'}" :modal="true" class="p-fluid">
      <template #header>
        <h4 class="m-0"> Patient Nutrition Screening</h4>
      </template>
      <div>
        <Tabs value="0">
          <TabList>
              <Tab value="0">Nutrition Screening</Tab>
              <Tab value="1">Nutrition Assessment</Tab>
          </TabList>
          <TabPanels>
              <TabPanel value="0">
                  <div class=" border border-dashed p-4 rounded-xl">
                      <p class="font-bold text-md">Nutrition Screening Questionaires</p>
                      <p class="text-sm" v-for="(question, index) in narQuestionaires" :key="question.id">{{ index + 1 }}. {{question.question}} </p>
                  </div>
                  <DataTable :value="patientNutritionScreeningData" 
                    pt:root:class="text-xs w-full mt-10" 
                    scrollable 
                    scrollHeight="250px"
                    :loading="screeningApiStatus === 'pending'"  bn
                    >
                      <template #header>
                        <div class="flex justify-between w-full items-center">
                          <span class="m-0 font-bold text-lg"> Nutrition Screening History </span>
                          <Button class="px-12 font-bold" @click="addQuestionDialog = true">
                            <Icon name="fluent:add-circle-12-filled" size="1.5em"/>
                            <label>Add Nutrition Screening</label>  
                          </Button>
                        </div>
                        <Button label="Refresh" icon="pi pi-refresh" class="p-button-text" @click="refresh()"/>
                      </template>
                      <Column header="Date" sortable sortField="date" > 
                          <template #body="{data}">
                              <p>{{ formatDate(data.datepost) }}</p>
                          </template>
                      </Column>  
                      <Column field="question1" header="Question #1"/>
                      <Column field="question2" header="Question #2"/>
                      <Column field="question3" header="Question #3"/>
                      <Column field="question4" header="Question #4"/>
                      <Column field="riskIndicator" header="Indicator">
                        <template #body="{data}">
                          <p :class="data.riskIndicator === 'Not at Risk' ? 'text-green-500' : 'text-red-500'"> {{ data.riskIndicator }}</p>
                        </template>
                      </Column>
                      <Column header="Actions">
                          <template #body="{data}">
                            <ConfirmPopup/>
                              <Button class="p-button-text p-button-rounded p-button-danger p-button-sm" @click="confirm_DeleteNutritionScreening($event, data.id)">
                                <Icon name="ic:round-delete-forever" size="1.5em" class="icon" />
                              </Button>
                          </template>
                      </Column>
                  </DataTable>
              </TabPanel>

              <TabPanel value="1">
                <div class="flex">
                  <ScrollPanel class="h-[55vh] text-sm w-full">
                      <div v-if="assessmentResult.length === 0" class="text-center">
                          <span>No assessments</span>
                      </div>
                      <div class="p-2" v-else>
                          <p class="font-bold text-base">Nutrition Assessment History</p>
                          <Timeline :value="assessmentResult">
                              <template #opposite="slotProps">
                                <div class="w-[5rem] text-xs">
                                  <span :class="slotProps.index === selectedAssessment ? 'text-emerald-600 font-bold' : ''">{{formatDateTime(slotProps.item.created_at)}}</span>
                                </div>
                              </template>
                              <template #content="slotProps">
                                  <div class="flex items-center justify-center">
                                      <p :class="slotProps.index === selectedAssessment ? 'text-emerald-600 font-bold' : ''">{{slotProps.item.firstname}} {{slotProps.item.lastname}} </p>
                                      <Button text outlined @click="selectAssessment(slotProps.index)">
                                        <Icon name="ic:outline-open-in-new" size="1.5em" />
                                      </Button>
                                  </div>
                              </template>
                              <template #marker="slotProps">
                                  <Icon name="material-symbols:calendar-clock" class="text-3xl" :class="slotProps.index === selectedAssessment ? 'text-emerald-600 ' : ''"/>
                              </template>
                          </Timeline>
                      </div>
                      <ScrollTop target="parent" :threshold="100" />
                    </ScrollPanel>

                    <Divider layout="vertical" type="dashed" />
                    
                    <div class="p-2" v-if="assessmentResult.length > 0">
                      <h3 class="font-bold text-base">Assessment Details</h3>
                      <ul class="flex flex-col gap-4 text-sm">
                        <li class="flex items-center gap-2">
                          <Icon name="fluent:person-pill-20-filled" size="1.5em"/>
                          <span>{{ assessmentResult[selectedAssessment]?.firstname }} {{ assessmentResult[selectedAssessment]?.lastname }}</span>
                        </li>
                        <li class="flex items-center gap-2">
                          <Icon name="material-symbols:calendar-clock" size="1.5em"/>
                          <span>{{ formatDateTime(assessmentResult[selectedAssessment]?.created_at) }}</span>
                        </li>
                        <li class="mt-4 flex items-start gap-2">
                          <div>
                            <Icon name="fluent:apps-list-detail-20-filled" size="1.5em"/>
                          </div>
                          <p>{{ assessmentResult[selectedAssessment]?.assessment }}</p>
                        </li>
                      </ul>
                    </div>
                </div>
              </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </Dialog>

    <Dialog v-model:visible="addQuestionDialog" 
      :style="{width: '70vw'}" 
      class="p-fluid"
      modal
      >
      <template #header>
        <div class="flex flex-col">
          <h4 class="m-0"> Add Nutrition Screening</h4>
          <span> Add new nutrition screening assessment for the patient. </span>
        </div>
        
      </template>
      <div>
        <Panel class="mt-2">
          <template #header>
            <p class="font-bold text-base">Survey Questions</p>
          </template>
          <div class="grid grid-cols-12 grid-rows-12 ">
            <div class="col-span-6 row-span-4"></div>
            <div class="col-span-3 row-span-4">
              <div class="flex justify-center">
                <Button label="NO" outlined rounded @click="setAnswers('N')" />
              </div>
            </div>
            <div class="col-span-3 row-span-4 mb-8">
              <div class="flex justify-center">
                <Button label="YES" outlined rounded @click="setAnswers('Y')" />
              </div>
            </div>

            <template v-for="(question, index) in narQuestionaires" :key="question.id">
              <div class="row-span-3 col-span-12 grid grid-cols-12">
                <div class="col-span-6">
                  <p>{{ index + 1 }}. {{ question.question }}</p>
                </div>
                <div class="col-span-3 flex justify-center">
                  <RadioButton v-model="answers[index]" value="N"/>
                </div>
                <div class="col-span-3 flex justify-center">
                  <RadioButton v-model="answers[index]" value="Y"/>
                </div>
              </div>
            </template>
          </div>
        </Panel>
        <div class="w-full mt-4 flex justify-end gap-12">
          <Button severity="danger" outlined raised @click="handleOnclick_cancelNutritionScreening"> 
            <Icon name="fluent:dismiss-square-24-filled" size="1.5em"/>
            <label>Cancel</label>
          </Button>
          <Button raised class="px-12 font-bold" @click="handleOnClick_SaveNutritionSreening">
            <Icon name="fluent:save-16-filled" size="1.5em"/>
            <label>Save</label>
          </Button>
        </div>
      </div>
    </Dialog>

  </div>
</template>


<style scoped>

</style>