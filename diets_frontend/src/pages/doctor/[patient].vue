<script setup>
//  COMPOSABLES
import { useFetchPatientDietData } from '~/composables/fetch-data/fetch-patientDietData';
import { useFetchReproductiveStatus } from '~/composables/fetch-data/fetch-reproductiveStatus';

// COMPONENTS
import DietHistory from '~/components/DoctorsComponents/DietHistory.vue';
import DietDetails from '~/components/DoctorsComponents/DietDetails.vue';
import DietNutritionScreening from '~/components/DoctorsComponents/DietNutritionScreening.vue';
import CreateNewDoctorsOrder from '~/components/DoctorsComponents/CreateNewDoctorsOrder.vue';
import AdmissionDetails from '~/components/DoctorsComponents/AdmissionDetails.vue';
import Loader_Egg from '~/components/misc/loaders/Loader_Egg.vue';

// STORES
import { useMyPatientDetailsStore } from '~/stores/patientDetails';

definePageMeta({
  middleware: 'doctors-middleware'
});

// Constants
const ERROR_MESSAGES = {
    NO_ENCOUNTER_CODE: {
        status: '500',
        title: 'Patient Data Not Found',
        description: 'No patient encounter code was found in the route parameters.'
    },
    SERVER_ERROR: {
        status: '500',
        title: 'Server Error',
        description: 'There was an error fetching patient data.'
    },
    NO_PATIENT_DATA: {
        status: '500',
        title: 'Patient Data Not Found',
        description: 'No patient data was found for the provided encounter code.'
    }
};

// Refs
const toast = useToast();
const patient_store = useMyPatientDetailsStore();
const toggle_diet_order = ref(false);
const toggle_disabled_diet_order = ref(false);
const api_status = ref(false);
const patientsDietResult = ref(null);
const error_object = ref({ status: null, title: '', description: ''});

// Extract patient data from route
const { patient } = useRoute().params;
const enccode = decodeURIComponent(patient?.split('+')[0] || '');

// Computed
const isPatientDataLoaded = computed(() => api_status.value === 'success' && patientsDietResult.value);

// Lifecycle Hooks
onMounted(async () => {
    if (!enccode) {
        handleError(ERROR_MESSAGES.NO_ENCOUNTER_CODE);
        return;
    }

    api_status.value = 'loading';
    
    try {
        const result = await useFetchPatientDietData(enccode);
        if (result.status === 'success') {
            await handleFetchSuccess(result?.data[0]);
        } else {
            handleError({
                ...ERROR_MESSAGES.SERVER_ERROR,
                description: result.error
            });
        }
    } catch (error) {
        handleError(ERROR_MESSAGES.SERVER_ERROR);
    }
});

// Methods
function handleError(error) {
    api_status.value = 'error';
    toast.add({ 
        severity: 'error', 
        summary: error.title, 
        detail: error.description, 
        life: 3000 
    });
    error_object.value = { ...error };
}

function transformPatientData(patient) {
    return {
        ...patient,
        disable_diet_order: !patient.height || !patient.weight,
        isAdult: Number(patient.patage) >= 18,
        gender: patient.patsex === 'M' ? 'Male' : patient.patsex === 'F' ? 'Female' : 'Unknown',
        age: getPatientAge(patient.patage, patient.patagemo),
        unformattedAge: patient.patage,
        tags: {
        admitted: true,
        pedia: Number(patient.patage) < 18,
        atrisk: patient.riskIndicator,
        }
    };
}

function addPatientTag(patient) {
    patient_store.addPatientTag({
        title: Number(patient.patage) < 18 ? 'Pedia' : 'Adult',
        severity: 'warn'
    });
}

async function handleFetchSuccess(data) {
    if (!data || Object.keys(data).length === 0) {
        handleError(ERROR_MESSAGES.NO_PATIENT_DATA);
        return;
    }

    api_status.value = 'success';
    console.log('Fetched Patient Data:', data);
    patientsDietResult.value = transformPatientData(data);
    addPatientTag(data);
}

async function onSuccessSubmit() {
    toggle_diet_order.value = false;
    await useFetchPatientDietData();
}


</script>

<template>
    <div class="content-area">
        <!-- Header Section -->
        <section class="card flex justify-between items-center">
            <div>
                <h4 class="m-0">Patient Diet Information</h4>
                <p class="text-xs">General Admission Data and Diet Data of the Patient.</p>
                {{ console.log('patient')}}
            </div>
            
            <div v-if="isPatientDataLoaded">
                <Button 
                    v-if="patientsDietResult.disable_diet_order"
                    severity="danger" 
                    @click="toggle_disabled_diet_order = true"
                    class="mr-2"
                >
                    <Icon name="fluent:book-exclamation-mark-24-filled" size="1.5em"/>
                    <label class="font-bold">Disabled Diet Order</label>
                </Button>
                
                <Button 
                    v-else
                    @click="toggle_diet_order = true"
                    class="mr-2"
                >
                    <Icon name="fluent:add-circle-12-filled" size="1.5em"/>
                    <label class="font-bold">Create New Diet Order</label>
                </Button>
            </div>
        </section>

        <!-- Loading State -->
        <div 
            v-if="api_status === 'loading'" 
            class="card flex flex-col justify-center items-center h-[80vh] gap-24"
            >
            <Loader_Egg class="w-24 h-24" />
            <span class="text-gray-500 ml-28 font-bold">Loading Patient Diet Data ...</span>
        </div>

        <!-- Error State -->
        <div 
            v-else-if="api_status === 'error'" 
            class="card flex flex-col justify-center items-center h-[80vh] gap-4"
        >
        <div class="flex items-center">
            <Icon name="fluent:accessibility-error-20-filled" size="3em" class="text-red-500" />
            <span class="text-gray-500 ml-4 font-bold">{{ error_object.title }}</span>
        </div>
            <p class="text-sm text-gray-500">{{ error_object.description }}</p>
            <Button 
                as="router-link" 
                to="/" 
                severity="info" 
                outlined 
                class="mt-12"
            >
                <Icon name="fluent:home-16-filled" size="1.5em" />
                <span class="ml-2 font-bold">Return Search</span>
            </Button>
        </div>

        <!-- Success State -->
        <div v-else-if="isPatientDataLoaded" class="doctors-main-wrapper doctors-main-container">
            <section class="card admission-details">
                <AdmissionDetails 
                    :patientsDietResult="patientsDietResult" 
                    @toggle_diet_order="toggle_diet_order = $event"
                />
            </section>
            
            <section class="card diet-details">
                <DietDetails :patientsDietResult="patientsDietResult" />
            </section>
            
            <section class="card nutrition-screening">
                <DietNutritionScreening 
                :enccode="patientsDietResult.enccode" 
                :age="patientsDietResult.patage"
                />
            </section>
            
            <section class="card diet-history">
                <DietHistory :hpercode="patientsDietResult.hpercode" />
            </section>
        </div>

        <!-- Dialogs -->
        <Dialog 
            v-model:visible="toggle_diet_order" 
            :style="{ width: '95vw', height: '95vh' }" 
            :draggable="false" 
            :closable="true" 
            :closeOnEscape="true" 
            :blockScroll="true" 
            class="overflow-y-hidden"
            modal
        >
            <template #header>
                <div class="w-full">
                    <span>
                        <label class="font-bold text-xl">Create Diet Order</label> 
                        <p>This is a form to create a new diet order for a patient.</p>
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

        <Dialog 
            v-model:visible="toggle_disabled_diet_order"
            :style="{ width: '32vh', height: '18vh' }" 
            :draggable="false" 
            :closable="true" 
            :closeOnEscape="true" 
            :blockScroll="true" 
            class="overflow-y-hidden"
            modal
            >
            <template #header>
                <div class="w-full">
                    <span>
                        <label class="font-bold text-xl">Disabled Diet Order</label>
                    </span>
                </div>
            </template>
            
            <div class="flex flex-col justify-center">
                <p>Patient's height or weight is missing.</p>
                <Button 
                    label="Close" 
                    severity="danger" 
                    @click="toggle_disabled_diet_order = false" 
                />
            </div>
        </Dialog>
    </div>
</template>

<style scoped>
.content-area {
  /* Add any specific styles here */
}

.doctors-main-wrapper {
  /* Add grid or flex styles for the main content layout */
}

.card {
  /* Card styles */
}
</style>