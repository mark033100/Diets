<script lang="ts" setup>
import DietTypes from '~/assets/json/DietTypes.json';
import custom_button from '~/components/customComponents/buttons/custom_button_icon.vue';
import DoctorsDraft from '~/components/DoctorsComponents/DoctorsDrafts.vue';
import { useDoctorsOrderValidation } from '~/composables/validations/validation-doctorsOrderForm';
import type { doctorsOrdeInputInterface, validationResult, cookieUserInterface, doctorsOrderFormInterface } from '@/types/objectTypes';

const props = defineProps({
  age: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  hpercode: {
    type: String,
    required: true
  },
  enccode: {
    type: String,
    required: true
  },
  dietcode: {
    type: String,
    required: false
  }
});

const reminders = ref([
  "Please fill in all required fields.",
  "You may save the form as a draft for future use.",
  "Review the Cut off time for issuing diet orders.",
]);

const emit = defineEmits(['closeDialog', 'success']);

const LOCAL_STORAGE_KEY = 'diet-form';
const toast = useToast();
const patient_age = props.age ? Number(props.age) : 0;
const authUserCookie = useCookie<cookieUserInterface>('authUser');
const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
const current_cut_off_time = ref();

const draft = reactive({
  title: '',
  remarks: ''
});

const selected = reactive <doctorsOrderFormInterface>({
  dietCategory: '1',
  dietType1: null,
  dietType2: null,
  dietCalories: null,
  dietVolume: null,
  dietDilution: '1',
  nutrientsProtein: null ,
  nutrientsCarbohydrates: null ,
  nutrientsFat: null,
  nutrientsFiber: null,
  feedingMode: null,
  feedingDuration: null,
  feedingFrequency: null,
  allergyType: null,
  allergySubtype: null,
  precautions: null,
  snsType: null,
  snsFrequency: null,
  snsDescription: null,
  remarks: null,
});

const debouncedSave = useDebounceFn(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...selected }));
});

watch (() => ({ ...selected }), debouncedSave, { deep: true });

// Toggles
const toggleDietOrder = ref(false);
const toggleUseSavedDietOrder = ref(false);
const toggleDraft = ref(false);

// Rendering condition values
const show_Add_SubDietType_Input = ref(false);
const show_Add_Therapeutic_Input = ref(false);
const show_Add_DietType_Button = ref(false);
const show_as_Enteral = computed(() => selected.dietCategory === '2' ? true : false);

// Input Invalid Validation condition values
const isDietType1Required = computed(() => !selected.dietType1);
const isDietType2Required = computed(() => selected.dietType1 === '46'  && !selected.dietType2);
const isDietCaloriesRequired = computed(() => !selected.dietCalories);
const isDietDilutionRequired = computed(() => selected.dietCategory === '2' && !selected.dietDilution);
const isNutrientsProteinRequired = computed(() => !!(patient_age > 18 && !selected.nutrientsProtein));
const isNutrientsCarbsRequired = computed(() => !!(patient_age > 18 && !selected.nutrientsCarbohydrates));
const isNutrientsFatRequired = computed(() => !!(patient_age > 18 && !selected.nutrientsFat));
const isFeedingModeRequired = computed(() => !selected.feedingMode);
const isFeedingDurationRequired = computed(() => !selected.feedingDuration);
const isFeedingFrequencyRequired = computed(() => !selected.feedingFrequency);
const isAllergyTypeRequired = computed(() => !selected.allergyType);
const isAllergySubtypeRequired = computed(() => selected.allergyType === '10' || selected.allergyType === '11' ? !selected.allergySubtype : false);
const isSnsFrequencyRequired = computed(() => !!(selected.snsType && !selected.snsFrequency));
// const isSnsDescriptionRequired = computed(() => !!(selected.snsType && !selected.snsDescription));
// Component Functions
const onClickedAddDietType = () => {
    show_Add_SubDietType_Input.value = !show_Add_SubDietType_Input.value;
    selected.dietType2= null;
} 

const onAllergyChange = () => { 
    selected.allergySubtype = null;
}

const onDietType1Change = () => { 
    show_Add_DietType_Button.value = false;
    show_Add_Therapeutic_Input.value = false;
    show_Add_SubDietType_Input.value = false;
    selected.dietType2= null;

    if(selected.dietType1 === '01') { 
        show_Add_DietType_Button.value = !show_Add_DietType_Button.value;
    }

    if(selected.dietType1 === '46') { 
        show_Add_Therapeutic_Input.value = !show_Add_Therapeutic_Input.value;
    }

}

const onClickSubmit = () => { 

    const inputs = <doctorsOrdeInputInterface>{ ...selected, age: props.age, gender: props.gender };
    const { isValid, errors } = useDoctorsOrderValidation(inputs);
    if (isValid) {
        submitForm();
    } else {
        console.log('Errors:', errors);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields.' , life: 3000});
    }
}

const submitForm = async () => {

    try { 
        const data = await $fetch('/api/doctors-api/doctor_submitForm', {
            method: 'POST',
            body: {
                ...selected,
                docId: authUserCookie.value.employeeid,
                hpercode: props.hpercode,
                enccode: props.enccode,
                age: props.age,
                gender: props.gender,
                previousDietcode: props.dietcode || null
            }
        });

        toast.add({
            severity: 'success',
            summary: 'Diet Order Created',
            detail: 'Diet Order has been successfully created.',
            life: 3000
        });

        clearSelectedStorage();
        emit('success');

    } catch (error: any) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.data.data.error_message,
            life: 3000
        });
        return;
    }
}

const clearSelectedStorage = () => { 
    localStorage.removeItem(LOCAL_STORAGE_KEY);
}

const onClickClearForm = () => { 
    clearSelectedStorage();
    selected.dietCategory = '1';
    selected.dietType1 = null;
    selected.dietType2 = null;
    selected.dietCalories = null;
    selected.dietVolume = null;
    selected.dietDilution = '1';
    selected.nutrientsProtein = null;
    selected.nutrientsCarbohydrates = null;
    selected.nutrientsFat = null;
    selected.nutrientsFiber = null;
    selected.feedingMode = null;
    selected.feedingDuration = null;
    selected.feedingFrequency = null;
    selected.allergyType = null;
    selected.allergySubtype = null;
    selected.precautions = null;
    selected.snsType = null;
    selected.snsFrequency = null;
    selected.snsDescription = null;
    selected.remarks = null;
}

const onClickSubmitDraft = async () => {

    if (!draft.title) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please enter a title for the draft.', life: 3000 });
        return;
    }

    // Proceed with submitting the draft
    try { 
        const data = await $fetch('/api/doctors-api/doctor_saveDraft', {
            method: 'POST',
            body: {
                docId: authUserCookie.value.employeeid,
                draftTitle: draft.title,
                draftRemarks: draft.remarks,
                draftDetails: selected 
            }
        });

        toast.add({
            severity: 'success',
            summary: 'Diet Order Created',
            detail: 'Diet Order has been successfully created.',
            life: 3000
        });

        toggleDraft.value = false;

    } catch (error: any) {
        // gets the error: Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'error_message')
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.data?.data?.error_message || 'Oops... Something went wrong. Unable to save draft.',
            life: 3000
        });
        return;
    }

}

const computeNutrients = () => {

  const age = Number(props.age);

  if (age && age < 19) {
      let calories, carbohydrates, protein, fats;

      if (age >= 1 && age <= 2) {
          calories = 1000;
      } else if (age >= 3 && age <= 5) {
          calories = 1300;
      } else if (age >= 6 && age <= 9) {
          calories = 1500;
      } else if (age >= 10 && age <= 12) {
          calories = 2000;
      } else if (age >= 13 && age <= 18) {
          calories = 2600;
      }

      if (calories) {
          carbohydrates = Math.round((calories * 0.55) / 4); 
          protein = Math.round((calories * 0.15) / 4);       
          fats = Math.round((calories * 0.30) / 9);          

          selected.dietCalories = calories.toString();
          selected.nutrientsCarbohydrates = carbohydrates.toString();
          selected.nutrientsProtein = protein.toString();
          selected.nutrientsFat = fats.toString();
      }
  }
}

const isSavedAvailable = () => {
    if (savedData) {
        toggleUseSavedDietOrder.value = true;
    }
}

const handleOnClick_UseSavedDietOrder = () => {
    if (savedData !== null) {
        Object.assign(selected, JSON.parse(savedData));
    }
    toggleUseSavedDietOrder.value = false;
}

const handleOnClick_CancelUseSavedDietOrder = () => { 
    clearSelectedStorage();
    toggleUseSavedDietOrder.value = false;
}

const checkCurrentCutOffTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    if (currentHour < 4 || (currentHour === 4 && currentMinutes < 59)) {
        return "Morning";
    } else if (currentHour < 10 || (currentHour === 10 && currentMinutes < 59)) {
        return "Lunch";
    } else if (currentHour < 15 || (currentHour === 15 && currentMinutes < 59)) {
        return "Dinner";
    }
}

const handleUseDietTemplate = (dietDetails: any) => {
    Object.assign(selected, dietDetails);
}

onMounted(() => { 
    computeNutrients();
    isSavedAvailable();
    current_cut_off_time.value = checkCurrentCutOffTime();
})

onBeforeUnmount(() => {
    clearSelectedStorage();
})


</script>
<template>
  <div class="w-full ">

    <div class="doctors-main-form-wrapper">
      
      <div class="doctors-main-form-container-1">

        <section class="detail-sections">
          <label class="font-bold"> Reminders</label>
          <ul class="flex flex-col gap-2 mt-2" v-for="reminder in reminders">
            <li class="flex items-start gap-2">
              <Icon name="ic:baseline-check" class="text-2xl bg-primary" />
              <p class="text-sm"> {{ reminder }} </p>
            </li>
          </ul>
        </section>

        <section>
          <label class="font-bold mt-2"> Diet Order Cut Off Time {{  }}</label>
          <ul class="text-sm flex flex-col gap-2 mt-2">
            <li class="flex items-center gap-2">
              <Icon name="bi:cloud-sun-fill" class="text-2xl" :class="current_cut_off_time === 'Morning' ? 'current_cut_off_time' : ''"/>
              <label> Breakfast: 5:00 AM </label>
            </li>
            <li class="flex items-center gap-2" :class="current_cut_off_time === 'Lunch' ? 'current_cut_off_time' : ''">
              <Icon name="bi:sun-fill" class="text-2xl" />
              <label> Lunch: 11:00 AM </label>
            </li>
            <li class="flex items-center gap-2" :class="current_cut_off_time === 'Dinner' ? 'current_cut_off_time' : ''">
              <Icon name="bi:moon-fill" class="text-xl" />
              <label> Dinner: 4:00 PM </label>
            </li>
          </ul>
        </section>

        <section>
            <label class="font-bold"> Doctors Order Templates / Drafts </label>
            <DoctorsDraft class="mt-4" @use-diet-template="handleUseDietTemplate"/>
        </section>

      </div>

      <!-- FORM -->
      <div class="doctors-main-form-container-2">
        <section>
          <Divider align="left" type="dashed">
            <div  class="flex items-center gap-2">
              <Icon name="fluent:number-circle-1-16-filled" class="text-2xl" />
              <label class="font-bold">Diet Category</label>
            </div>
          </Divider>
          <ul class="flex gap-8 ml-10 mt-2">
            <li class="flex items-center gap-5">
              <RadioButton v-model="selected.dietCategory" name="Oral" value="1" inputId="oral" /> 
              <label for="oral"> Oral </label> 
            </li>
            <li class="flex items-center gap-5">
              <RadioButton v-model="selected.dietCategory" name="Enteral" value="2" inputId="enteral" /> 
              <label for="enteral"> Enteral </label>
            </li>
          </ul>
        </section>
        
        <section>
          <Divider align="left" type="dashed">
            <div  class="flex items-center gap-2">
              <Icon name="fluent:number-circle-2-16-filled" class="text-2xl" />
              <label class="font-bold">Diet Type</label>
            </div>
          </Divider>
          <ul class="flex gap-2 justify-between items-center ml-10" v-if="selected.dietCategory === '1'">
            <li class="flex-col w-full ">
              <Select v-model="selected.dietType1" 
                class="w-full" 
                placeholder="Select Diet Type" 
                :options="DietTypes.routineTypes" 
                optionLabel="name" 
                optionValue="id" 
                @change = "onDietType1Change"
                :invalid="isDietType1Required"
              />
            </li>
            
            <Select v-model="selected.dietType2" 
              class="w-full ml-10" 
              placeholder="Select Therapeutic Diet Type" 
              :options="DietTypes.therapeuticTypes"
              :invalid="isDietType2Required" 
              optionLabel="name" 
              optionValue="id" 
              v-if="show_Add_SubDietType_Input"
            />

            <li class="flex-col gap-2 w-full" v-if="show_Add_Therapeutic_Input">
              <Select v-model="selected.dietType2" 
                class="w-full" 
                placeholder="Select Therapeutic Diet Type" 
                :options="DietTypes.therapeuticTypes"
                :invalid="isDietType2Required" 
                optionLabel="name" 
                optionValue="id" 
              />
            </li>
            
            <custom_button 
              :icon=" show_Add_SubDietType_Input ? 'ic:baseline-remove' : 'ic:baseline-add'"  
              :severity="show_Add_SubDietType_Input ? 'danger' : 'primary'"
              v-if="show_Add_DietType_Button" 
              @clicked="onClickedAddDietType" 
            />
          </ul>

          <div v-else class="flex gap-2 justify-between items-center">
            <Select v-model="selected.dietType1" 
              class="w-full ml-10" 
              placeholder="Select Diet Type" 
              :options="DietTypes.tubefeedingMeals" 
              optionLabel="name" 
              optionValue="id" 
              :invalid="selected.dietType1 === null"/>
          </div>
          
        </section>

        <section>
          <Divider align="left" type="dashed">
            <div  class="flex items-center gap-2">
              <Icon name="fluent:number-circle-3-16-filled" class="text-2xl" />
              <label class="font-bold">Diet Requirements</label>
            </div>
          </Divider>
          <div class="flex gap-10 ml-10">
            <div class="flex flex-col gap-2 mt-2">
              <IftaLabel> 
                <InputText v-model="selected.dietCalories" id="calories" :invalid="isDietCaloriesRequired"/> 
                <label for="calories"> Calories(kcal):</label> 
              </IftaLabel>
              <IftaLabel v-if="show_as_Enteral"> 
                <InputText v-model="selected.dietDilution" id="dilution" :invalid="isDietDilutionRequired"/> 
                <label for="dilution"> Dilution(1kcal:1ml):</label> 
              </IftaLabel>
            </div>

            <div class="flex flex-col gap-2 mt-2" v-if="show_as_Enteral">
              <IftaLabel> 
                <Select v-model="selected.feedingMode" :invalid="isFeedingModeRequired" :options="DietTypes.feedingMode" optionValue="id" showClear class="w-full" optionLabel="name" />
                <label for="mode"> Feeding Mode:</label> 
              </IftaLabel>
              <IftaLabel> 
                <InputText v-model="selected.feedingDuration" id="dura" :invalid="isFeedingDurationRequired"/> 
                <label for="dura"> Feeding Duration: </label> 
              </IftaLabel>
              <IftaLabel> 
                <InputText v-model="selected.feedingFrequency" id="freq" :invalid="isFeedingFrequencyRequired" /> 
                <label for="freq"> Feeding Frequency:</label> 
              </IftaLabel>
            </div>
          </div>
        </section>
        
        <section>
          <Divider align="left" type="dashed">
            <div  class="flex items-center gap-2">
              <Icon name="fluent:number-circle-4-16-filled" class="text-2xl" />
              <label class="font-bold">Macronutrients</label>
            </div>
          </Divider>
          <div class="flex justify-start gap-2">
            <div class="flex flex-col gap-2 ml-10 mt-2">
              <IftaLabel> 
                <InputText
                  v-model="selected.nutrientsProtein" 
                  id="mode"
                  :invalid="isNutrientsProteinRequired"
                />
                <label for="mode"> Protein:</label> 
              </IftaLabel>
              <IftaLabel> 
                <InputText v-model="selected.nutrientsFat" 
                  id="mode" 
                  :invalid="isNutrientsFatRequired"
                />
                <label for="mode"> Fats:</label> 
              </IftaLabel>
            </div>
            <div class="flex flex-col gap-2 ml-10 mt-2">
              <IftaLabel> 
                <InputText v-model="selected.nutrientsCarbohydrates" 
                  id="mode" 
                  :invalid="isNutrientsCarbsRequired"
                />
                <label for="mode"> Carbohydrates:</label> 
              </IftaLabel>
              <IftaLabel> 
                <InputText v-model="selected.nutrientsFiber" 
                  id="mode" 
                />
                <label for="mode"> Fiber:</label> 
              </IftaLabel>
            </div>
          </div>
        </section>

        <section>
          <Divider align="left" type="dashed">
            <div  class="flex items-center gap-2">
              <Icon name="fluent:number-circle-5-16-filled" class="text-2xl" />
              <label class="font-bold">Diet Restrictions</label>
            </div>
          </Divider>
          <div class="flex gap-5 ml-10 mt-2">
            <InputGroup class="w-full">
              <IftaLabel> 
                <Select v-model="selected.allergyType" 
                  showClear class="w-full" 
                  :options="DietTypes.allergiesMenu"
                  :invalid="isAllergyTypeRequired" 
                  optionLabel="name" 
                  optionValue="id"
                  @change="onAllergyChange"
                /> 
                <label for="allergies"> Allergies: </label> 
              </IftaLabel>

              <IftaLabel v-if="selected.allergyType === '10'"> 
                <MultiSelect v-model="selected.allergySubtype" 
                  :maxSelectedLabels="2"
                  :options="DietTypes.allergiesSubmenu"
                  :invalid="isAllergySubtypeRequired"
                  showClear 
                  class="w-full" 
                  optionLabel="name" 
                  optionValue="id" 
                /> 
                <label for="allergies"> Food Allergies:</label> 
              </IftaLabel>

              <IftaLabel v-if="selected.allergyType === '11'">
                <InputText v-model="selected.allergySubtype"  
                  id="allergies" 
                  class="w-full"
                  :invalid="isAllergySubtypeRequired"
                  /> 
                <label for="allergies"> Input Allergies:</label>
              </IftaLabel>
            </InputGroup> 

            <IftaLabel class="w-full"> 
              <Select v-model="selected.precautions" 
                showClear class="w-full" 
                :options="DietTypes.precautions"
                optionLabel="name" 
                optionValue="id"/> 
              <label for="precaution"> Food Precautions:</label> 
            </IftaLabel>

          </div>
        </section>

        <section>
          <Divider align="left" type="dashed">
            <div  class="flex items-center gap-2">
              <Icon name="fluent:number-circle-6-16-filled" class="text-2xl" />
              <label class="font-bold">SNS (Special Nutrition Supplement)</label>
            </div>
          </Divider>
          <div class="flex flex-col gap-2 mt-5 ml-10">
            <IftaLabel> 
              <Select v-model="selected.snsType" 
                :options="DietTypes.onsTypes"
                optionLabel="name" 
                optionValue="id" 
                showClear 
                class="w-full" 
                id="snsType"
              />
              <label for="snsType"> SNS Type:</label> 
            </IftaLabel>

            <IftaLabel v-if="selected.snsType"> 
              <MultiSelect v-model="selected.snsFrequency" 
                :options="DietTypes.Snacktime"
                :invalid="isSnsFrequencyRequired"
                optionLabel="name" 
                optionValue="code" 
                showClear 
                class="w-full" 
                id="snsTypes" 
              />
              <label for="snsType"> SNS Frequency:</label> 
            </IftaLabel>

            <IftaLabel v-if="selected.snsType"> 
              <InputText v-model="selected.snsDescription" 
                class="w-full" 
                id="snsType"
              />
              <label for="snsType"> SNS Description:</label> 
            </IftaLabel>
          </div>
        </section>

        <section class="flex flex-col">
          <Divider align="left" type="dashed">
            <div  class="flex items-center gap-2">
              <Icon name="fluent:number-circle-7-16-filled" class="text-2xl" />
              <label class="font-bold">Other Remarks</label>
            </div>
          </Divider>
          <Textarea v-model="selected.remarks" class="mt-2 ml-10"/>
        </section>

        <section class="flex justify-end gap-16 z-10 bg-opacity-0" style=" position: sticky; bottom: -0px;"> 
            <Button severity="secondary" raised @click="onClickClearForm">
                <Icon name="mdi:delete-forever" class="text-3xl text-red-500" />
                <span class="text-sm"> Clear Form</span>
            </Button>
            <Button severity="secondary" raised @click="toggleDraft = true">
                <Icon name="mdi:draft" class="text-3xl text-blue-500" />
                <span class="text-sm"> Save as Draft </span>
            </Button>
            <Button raised @click="onClickSubmit">
                <Icon name="mdi:content-save-move" class="text-3xl" />
                <span class="text-sm font-bold"> Issue Diet Order </span>
            </Button>
        </section>
      </div>
    </div>

    <Dialog
      v-model:visible="toggleUseSavedDietOrder"
      :draggable="false" 
      :closable="true" 
      :dismissableMask="true" 
      :blockScroll="true"  
      modal
    >
      <template #header>
        <div class="w-full ">
          <label class="font-bold text-xl">Use Saved?</label> 
        </div>
      </template>
      <p>A previous entry was saved due to unexpected closure. Do you wish to use it?</p>
      <div class="flex justify-between items-center mt-10">
        <Button severity="secondary" raised text @click="toggleDietOrder = false">
          <Icon name="mdi:close" class="text-2xl text-red-500" />
          <span class="text-sm font-bold" @click="handleOnClick_CancelUseSavedDietOrder()"> Cancel </span>
        </Button>
        <Button severity="primary" raised @click="handleOnClick_UseSavedDietOrder()">
          <Icon name="mdi:content-save-move" class="text-2xl" />
          <span class="text-sm font-bold"> Use Saved </span>
        </Button>
      </div>
    </Dialog>
    
    <Dialog
      v-model:visible="toggleDietOrder"
      :draggable="false" 
      :closable="true" 
      :dismissableMask="true" 
      :blockScroll="true"  
      modal
    >
      <template #header>
        <div class="w-full ">
          <label class="font-bold text-xl">Save Entry as Draft?</label> 
          <p class="text-sm"> Saving this entry will save it as a draft and can be used later. </p>
        </div>
      </template>
      <div class="w-full flex flex-col gap-2 mt-5">
        <label class="font-bold"> Title </label>
        <InputText v-model="draft.title" 
          class="w-full" 
          placeholder="Enter title for this draft."
        />
        <label class="font-bold mt-5"> Remarks </label>
        <Textarea v-model="draft.remarks" 
          class="w-full" 
          placeholder="Enter remarks for this draft (optional)"
        />
      </div>
      <div class="flex justify-between items-center mt-10">
        <Button severity="secondary" raised text @click="toggleDietOrder = false">
          <Icon name="mdi:close" class="text-2xl text-red-500" />
          <span class="text-sm font-bold" @click="toggleDietOrder = false"> Cancel </span>
        </Button>
        <Button severity="primary" raised @click="onClickSubmit">
          <Icon name="mdi:content-save" class="text-2xl" />
          <span class="text-sm font-bold"> Save Draft </span>
        </Button>
      </div>
    </Dialog>

    <Dialog
        v-model:visible="toggleDraft"
        :draggable="false" 
        :closable="true" 
        :dismissableMask="true" 
        :blockScroll="true"  
        modal
        >
        <template #header>
            <div class="w-full ">
                <label class="font-bold text-xl">Save Entry as Draft?</label> 
                <p> Saving this entry will save it as a draft and can be used later. </p>
            </div>
        </template>
        <div class="w-full flex flex-col gap-2 mt-5">
            <label class="font-bold"> Title </label>
            <InputText v-model="draft.title" 
                class="w-full" 
                placeholder="Enter title for this draft."
            />
            <label class="font-bold mt-5"> Remarks </label>
            <Textarea v-model="draft.remarks" 
                class="w-full" 
                placeholder="Enter remarks or description for this draft (optional)"
            />
        </div>
        <div class="flex justify-between items-center mt-10">
            <Button severity="secondary" raised text @click="toggleDietOrder = false">
                <Icon name="mdi:close" class="text-2xl text-red-500" />
                <span class="text-sm font-bold" @click="toggleDraft = false"> Cancel </span>
            </Button>
            <Button severity="primary" raised @click="onClickSubmitDraft">
                <Icon name="mdi:content-save-move" class="text-2xl" />
                <span class="text-sm font-bold"> Save Draft </span>
            </Button>
        </div>
    </Dialog>
    
  </div>
</template>


<style scoped>

.current_cut_off_time {
  font-weight: bold;
  font-size: 1rem;
  color: var(--primary-color);
}
</style>