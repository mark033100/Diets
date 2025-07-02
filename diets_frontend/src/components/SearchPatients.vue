<script setup>
import { useFetchPatientSearchList } from '~/composables/fetch-data/fetch-patientSearchList';
import Loader_Egg from '~/components/misc/loaders/Loader_Egg.vue';


const toast = useToast();

const patients = ref([]);
const dietTypes = ref([]);
const wardTypes = ref([]);
const loading = ref(false);
const filteredPatients = ref([]);
const router = useRouter();

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
});

const emit = defineEmits(['close']);

async function getAdmittedPatients(){
  loading.value = true;

  const admittedPatientsResult = await useFetchPatientSearchList();

  if (admittedPatientsResult.status === 'success') {
    patients.value = formatNullDiets(admittedPatientsResult.data);
    filteredPatients.value = patients.value;
    setFilterOptions(filteredPatients.value);
  } else {
    patients.value = [];
    handleError('Something went wrong with fetching patients');
  } 

  loading.value = false;
}


function setFilterOptions(data) {
  
  dietTypes.value = [...new Set(data.map(item => item.dietname))].map(item => ({ 'dietname': item}));
  wardTypes.value = [...new Set(data.map(item => item.wardname))].map(item => ({ 'wardname': item}));
}


async function filterTable() { 

  filteredPatients.value = patients.value.filter(patient => 
    (filterObject.value.diet_type.length === 0 || filterObject.value.diet_type.includes(patient.dietname)) &&
    (filterObject.value.ward_type.length === 0 || filterObject.value.ward_type.includes(patient.wardname)) &&
    (filterObject.value.admission_date === null || filterAdmissionDate(patient.admdate, filterObject.value.admission_date)) &&
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

const formatFilterOptions = (array) => { 

  return array.map(item => ({
    label: item,
    value: item
  }));
}



function onRowSelect(event) { 
  emit('close');
  const enccode = encodeURIComponent(event.data.enccode);
  router.push('/doctor/' + enccode + '+' + event.data.hpercode);
}

</script>

<template>
  <div>
    <Panel header="Filter Search">
      <div class=" mt-6 flex gap-2 ">
        <FloatLabel variant="on" class="w-full" >
          <InputText v-model="filterObject.hpercode" type="text" class="w-full p-column-filter border-0 border-b border-black shadow-none rounded-none focus:outline-none"  id="on_hospital_number"/>
          <label for="on_hospital_number" class="font-bold">Search by Hospital Number</label>
        </FloatLabel> 

        <FloatLabel variant="on" class="w-full">
          <InputText v-model="filterObject.patient_name" type="text" class="w-full p-column-filter border-0 border-b border-black shadow-none rounded-none focus:outline-none"  id="on_name"/>
          <label for="on_name" class="font-bold">Search by Patient Name</label>
        </FloatLabel>
      </div>
      
      <div class="mt-6 flex gap-2 w-full">
        <FloatLabel variant="on" class="w-full">
          <DatePicker showButtonBar showIcon iconDisplay="input" class="w-full " v-model="filterObject.admission_date" dateFormat="m/dd/yy" mask="99/99/9999" id="on_calendar"/>
          <label for="on_calendar" class="font-bold">Admission Date</label>
        </FloatLabel>

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
      </div>

      <div class="mt-8 flex justify-end gap-4">
        <Button label="Clear All Filter" severity="danger" icon="pi pi-filter-slash" class="w-1/6" @click="clearFilters()" />
        <Button label="Apply Filter" icon="pi pi-filter" class="w-1/6" @click="filterTable()" />
      </div>
    </Panel>

    <div class="container mx-auto p-4 w-full border" v-if="!loading">
      <DataTable :value="filteredPatients"
        :loading="loading"
        dataKey="id"
        @rowClick="onRowSelect"
        stripedRows 
        removableSort
        selectionMode="single"
        paginator :rows="8" :pageLinkSize="3"
        :rowsPerPageOptions="[8, 10, 50, 100]"
        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        scrollable 
        scrollHeight="450px"
        pt:root:class="text-xs sm:text-xs md:text-sm lg:text-md"
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