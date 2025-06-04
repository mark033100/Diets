<script setup>
import { FilterMatchMode, FilterOperator  } from '@primevue/core/api';
import { useFetchWardTypes } from '~/composables/fetch-data/fetch-wardTypes';
import { useFetchDietTypes } from '~/composables/fetch-data/fetch-dietTypes';
import { useFetchAllergiesandprecautions } from '~/composables/fetch-data/fetch-allergiesandprecautions';
import { useFetchPatientSearchList } from '~/composables/fetch-data/fetch-patientSearchList';
import Loader_Egg from '~/components/misc/loaders/Loader_Egg.vue';


const toast = useToast();

const patients = ref([]);
const dietTypes = ref([]);
const wardTypes = ref([]);
const allergyTypes = ref([]);
const precautionTypes = ref([]);
const selectedDiet = ref(null);
const loading = ref(false);
const filteredPatients = ref([]);
const filterObject = ref({
  admission_date: null,
  hpercode: null,
  diet_type: [],
  ward_type: [],
  patient_name: null,
  precaution: [],
  allergy: []
});

onMounted(() => {
  getAdmittedPatients();
  getDietTypes();
  getWardNames();
  getallergiesandprecautions();
});

async function getAdmittedPatients(){
  loading.value = true;

  const admittedPatientsResult = await useFetchPatientSearchList();

  if (admittedPatientsResult.status === 'success') {
    patients.value = formatNullDiets(admittedPatientsResult.data);
    filteredPatients.value = patients.value;
  } else {
    patients.value = [];
    handleError('Something went wrong with fetching patients');
  } 

  loading.value = false;
}

async function getDietTypes() {
  const dietTypesResult = await useFetchDietTypes();
  if (dietTypesResult.status === 'success') {
    dietTypes.value = filterByColumn(dietTypesResult.data, 'dietstat', 'A')
  } else {
    dietTypes.value = [];
    handleError('Something went wrong with fetching diet types');
  }
}

async function getWardNames() {
    const wardTypesResult = await useFetchWardTypes();

  if (wardTypesResult.status === 'success') {
    wardTypes.value = wardTypesResult.data;
  }else {
    wardTypes.value = [];
    handleError('Something went wrong with fetching ward types');
  }
}


async function getallergiesandprecautions() {
  const allergiesandprecautionsResult = await useFetchAllergiesandprecautions();

  if (allergiesandprecautionsResult.status === 'success') {
    allergyTypes.value = allergiesandprecautionsResult.data.filter(item => item.category === 'Allergy');
    precautionTypes.value = allergiesandprecautionsResult.data.filter(item => item.category === 'Precaution');
  }else {
    allergyTypes.value = [];
    precautionTypes.value = [];
    handleError('Something went wrong with fetching allergies and precautions');
  }
}


async function filterTable() { 

  filteredPatients.value = patients.value.filter(patient => 
    (filterObject.value.diet_type.length === 0 || filterObject.value.diet_type.includes(patient.dietname)) &&
    (filterObject.value.ward_type.length === 0 || filterObject.value.ward_type.includes(patient.wardname)) &&
    (filterObject.value.admission_date === null || filterAdmissionDate(patient.admdate, filterObject.value.admission_date)) &&
    (filterObject.value.precaution.length === 0 || filterObject.value.precaution.includes(patient.precaution)) &&
    (filterObject.value.allergy.length === 0 || filterObject.value.allergy.includes(patient.allergy)) &&
    ((filterObject.value.hpercode === null || filterObject.value.hpercode === '') || patient.hpercode.includes(filterObject.value.hpercode)) && 
    ((filterObject.value.patient_name === null || filterObject.value.patient_name === '' ) || patient.patname.toLowerCase().includes(filterObject.value.patient_name.toLowerCase()))
  );

}


const clearFilters = () => {
  filterObject.value = {
    admission_date: null,
    hpercode: null,
    diet_type: [],
    ward_type: [],
    patient_name: null,
    precaution: [],
    allergy: []
  };
  filteredPatients.value = patients.value;
};

const handleError = (message) => {
  toast.add({ severity: 'error', summary: 'Error Message', detail: message, life: 3000 });
};

watch(filterObject, () => {
  filterTable();
}, { deep: true });




    // Custom filter function for date comparison
const filterAdmissionDate = (value, filter) => {
    if (!filter) {
        return true; 
    }

    const filterDate = new Date(filter);
    const cellDate = new Date(value);

    // Compare only the date parts (ignore time)
    return (
        cellDate.getFullYear() === filterDate.getFullYear() &&
        cellDate.getMonth() === filterDate.getMonth() &&
        cellDate.getDate() === filterDate.getDate()
    );
};


const openPatientDetails = (patient) => {
  console.log(patient);
}


</script>

<template>
  <div>
      <Panel>
        <div class="flex justify-between w-full ">
          <FloatLabel variant="on" class="w-full h-full">
            <DatePicker showButtonBar showIcon iconDisplay="input" v-model="filterObject.admission_date" dateFormat="m/dd/yy" mask="99/99/9999" id="on_calendar"/>
            <label for="on_calendar" class="font-bold">Admission Date</label>
          </FloatLabel>
          <Button label="Clear All Filter" icon="pi pi-filter-slash" class="w-1/6" @click="clearFilters()" />
        </div>

        <div class=" mt-6 flex gap-2 ">
          <FloatLabel variant="on" class="w-full" >
            <InputText v-model="filterObject.hpercode" type="text" @input="filterTable()" class="w-full p-column-filter border-0 border-b border-black shadow-none rounded-none focus:outline-none"  id="on_hospital_number"/>
            <label for="on_hospital_number" class="font-bold">Search by Hospital Number</label>
          </FloatLabel> 

          <FloatLabel variant="on" class="w-full">
            <InputText v-model="filterObject.patient_name" type="text" @input="filterTable()" class="w-full p-column-filter border-0 border-b border-black shadow-none rounded-none focus:outline-none"  id="on_name"/>
            <label for="on_name" class="font-bold">Search by Patient Name</label>
          </FloatLabel>
        </div>

        <div class=" mt-6 flex gap-2 w-full">
          <FloatLabel variant="on" class="w-full">
            <MultiSelect v-model="filterObject.ward_type" :options="wardTypes" optionLabel="wardname" optionValue="wardname" filter display="chip" class="w-full" :maxSelectedLabels=1>
                <template #option="slotProps">
                    <div class="flex items-center">
                        <div>{{ slotProps.option.wardname }}</div>
                    </div>
                </template>
                <template #dropdownicon>
                    <i class="pi pi-map" />
                </template>
                <template #filtericon>
                    <i class="pi pi-map-marker" />
                </template>
                <template #header>
                    <div class="font-medium px-3 py-2">Wards</div>
                </template>
                <template #footer>
                    <div class="p-3 flex justify-between">
                        <!-- <Button label="Add New" severity="secondary" text size="small" icon="pi pi-plus" /> -->
                        <Button label="Remove All" @click="filterObject.ward_type = []" severity="danger" text size="small" icon="pi pi-times" />
                    </div>
                </template>
            </MultiSelect>
            <label for="on_ward" class="font-bold">Filter by Ward</label>
          </FloatLabel>

          <FloatLabel variant="on" class="w-full">
            <MultiSelect v-model="filterObject.diet_type" :options="dietTypes" optionLabel="dietname" optionValue="dietname" filter display="chip" class="w-full" :maxSelectedLabels=1>
                <template #option="slotProps">
                    <div class="flex items-center">
                        <div>{{ slotProps.option.dietname }}</div>
                    </div>
                </template>
                <template #dropdownicon>
                    <i class="pi pi-map" />
                </template>
                <template #filtericon>
                    <i class="pi pi-map-marker" />
                </template>
                <template #header>
                    <div class="font-medium px-3 py-2">Diet Types</div>
                </template>
                <template #footer>
                    <div class="p-3 flex justify-end">
                        <!-- <Button label="Add New" severity="secondary" text size="small" icon="pi pi-plus" /> -->
                        <Button label="Remove All" @click="filterObject.diet_type = []" severity="danger" text size="small" icon="pi pi-times" />
                    </div>
                </template>
            </MultiSelect>
            <label for="on_diet_types" class="font-bold">Filter by Diet Types</label>
          </FloatLabel>

          <FloatLabel variant="on" class="w-full">
            <MultiSelect v-model="filterObject.precaution" :options="precautionTypes" optionLabel="name" optionValue="name" filter display="chip" class="w-full" :maxSelectedLabels=1>
                <template #option="slotProps">
                    <div class="flex items-center">
                        <div>{{ slotProps.option.name }}</div>
                    </div>
                </template>
                <template #dropdownicon>
                    <i class="pi pi-map" />
                </template>
                <template #filtericon>
                    <i class="pi pi-map-marker" />
                </template>
                <template #header>
                    <div class="font-medium px-3 py-2">Precautions</div>
                </template>
                <template #footer>
                    <div class="p-3 flex justify-end">
                        <!-- <Button label="Add New" severity="secondary" text size="small" icon="pi pi-plus" /> -->
                        <Button label="Remove All" @click="filterObject.precaution = []" severity="danger" text size="small" icon="pi pi-times" />
                    </div>
                </template>
            </MultiSelect>
            <label for="on_precaution" class="font-bold">Filter by Precautions</label>
          </FloatLabel>

          <FloatLabel variant="on" class="w-full">
            <MultiSelect v-model="filterObject.allergy" :options="allergyTypes" optionLabel="name" optionValue="name" filter display="chip" class="w-full" :maxSelectedLabels=1>
                <template #option="slotProps">
                    <div class="flex items-center">
                        <div>{{ slotProps.option.name }}</div>
                    </div>
                </template>
                <template #dropdownicon>
                    <i class="pi pi-map" />
                </template>
                <template #filtericon>
                    <i class="pi pi-map-marker" />
                </template>
                <template #header>
                    <div class="font-medium px-3 py-2">Allergies</div>
                </template>
                <template #footer>
                    <div class="p-3 flex justify-end">
                        <!-- <Button label="Add New" severity="secondary" text size="small" icon="pi pi-plus" /> -->
                        <Button label="Remove All" @click="filterObject.allergy = []" severity="danger" text size="small" icon="pi pi-times" />
                    </div>
                </template>
            </MultiSelect>
            <label for="on_allergies" class="font-bold">Filter by Allergy</label>
          </FloatLabel>
        </div>
      </Panel>

    <div class="container mx-auto p-4">
        <DataTable :value="filteredPatients" 
            tableStyle="width: 80rem" 
            stripedRows 
            :rowHover="true"
            removableSort
            paginator :rows="8" :pageLinkSize="3"
            pt:root:class="text-xs sm:text-xs md:text-sm lg:text-md"
            responsiveLayout="stack"
            pt:paginator:root:class="rounded-none"
            dataKey="id"
            :rowsPerPageOptions="[8, 10, 50, 100]"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            :loading="loading"
            scrollable 
            scrollHeight="450px"
            >
            <template #loading>
                <div class="flex justify-center" v-if="loading">
                    <Loader_Egg />
                </div>
            </template>
            <template #empty>
                <span class="flex justify-center text-2xl " v-if="loading">Loading Data.</span>
                <span class="flex justify-center" v-else>No patient found.</span>
            </template>
            
            <Divider />


            
            <div class=""> <!--// Body -->
                <Column 
                    header="Admission Date" 
                    filterField="admdate" 
                    dataType="date" 
                    style="width: 15%" 
                    sortable
                    sortField ="admdate"
                    >
                    <template #body="{ data }">
                        {{ formatDate(data.admdate) }}
                    </template>
                </Column>

                
                <Column field="hpercode" header="Hospital #" style="width: 15%" sortable>
                </Column>
                <Column field="patname" header="Patient Name" style="width: 20%" sortable>
                </Column>

                <Column field="wardname" header="Wards" style="width: 20%" sortable>
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.wardname}}</span>
                        </div>
                    </template>
                </Column>

                <Column header="Diets" filterField="dietname" style="width: 15%">
                    <template #body="{ data }">
                        <div class="flex align-items-center gap-2">
                            <span>{{ data.dietname}}</span>
                        </div>
                    </template>
                </Column>

                <Column headerClass="" bodyClass="pl-0 pr-10" style="width: 5%">
                    <template #body="patients">
                        <NuxtLink :to="'/doctor/' + patients.data.enccode + '+' + patients.data.hpercode"  @click="($emit('close'), $event.preventDefault())">
                            <i class="pi pi-external-link animate-bounce hover:animate-none hover:scale-125" style="font-size: 1.5rem; color:mediumaquamarine"></i>
                        </NuxtLink>
                    </template>
                </Column>
            </div>
        </DataTable>
    </div>
  </div>
</template>


<style scoped>

.spinner-color {
    stroke: #34D399;
    background: #34D399;
    color:#34D399; /* Example color (green) */
}
</style>