<script lang="ts" setup>
const toast = useToast();
const {data: total_diets_wards, status: total_diets_wards_status, error: total_diets_wards_error} = useAsyncData('total_diets_wards', () => $fetch('/api/admin-api/fetch-totalWardEntries'));
const chartData = ref();
const chartOptions = ref();

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

    
if ( total_diets_wards_error.value ) {
    const detail = total_diets_wards_error.value && typeof total_diets_wards_error.value === 'object' && total_diets_wards_error.value.data && typeof total_diets_wards_error.value.data === 'object' && 'message' in total_diets_wards_error.value.data
        ? (total_diets_wards_error.value.data as { message: string }).message
        : 'An error occurred';
    toast.add({ severity: 'error', summary: 'Error', detail, life: 3000 });
}

const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        datasets: [
            {
                data: [540, 325],
                backgroundColor: [documentStyle.getPropertyValue('--p-red-700'), documentStyle.getPropertyValue('--p-emerald-700')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--p-red-500'), documentStyle.getPropertyValue('--p-emerald-500')]
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    cutout: '10%',
                    color: textColor
                }
            }
        }
    };
};

</script>

<template>
    <div>
        <section class="card">
            <p class=" flex items-center gap-2 mb-6 text-sm">
                <a><i class="pi pi-home"></i> Home</a>
            </p>
            <h3 class="m-0">Admin Dashboard </h3>
            <p class="text-sm"> Overview of Admin Dashboard</p>
        </section>

        <div class="grid grid-cols-12 grid-rows-12 gap-4">

            <section class="card-1 col-span-4 row-span-2">  <!-- Admitted Patients -->
                <h5 class="text-lg"> Admitted Patients </h5>
                <div class="ml-4 text-sm">
                    <span class="flex items-center justify-between">
                        <label> Total Admitted Patients: </label>
                        <p class="font-bold"> 0 </p>
                    </span>
                    <span class="flex items-center justify-between">
                        <label> With Diets: </label>
                        <p class="font-bold"> 0 </p>
                    </span>
                    <span class="flex items-center justify-between">
                        <label> With No Diets: </label>
                        <p class="font-bold"> 0 </p>
                    </span>
                </div>
            </section>

            <section class="card-1 col-span-4 row-span-2">  <!-- Nutrition Screening Survey -->
                <h5 class="text-lg"> Nutrition Screening Survey </h5>
                <div class="flex justify-between items-start">
                    <p class="flex flex-col gap-4 text-sm">
                        <span class="font-bold text-red-500"> At Risk: 540 </span>
                        <span class="font-bold text-emerald-500"> Not at Risk: 325 </span>
                    </p>
                    <Chart type="doughnut" :data="chartData"  class="w-32 h-32" />
                </div>
            </section>

            <section class="card-1 col-span-4 row-span-2">  <!-- Doctor's Orders -->
                <h5 class="text-lg"> Doctor's Orders </h5>
                <div class="flex flex-col ml-4 text-sm">
                    <span class="flex items-center justify-between">
                        <label> Today: </label>
                        <p class="font-bold"> 0 </p>
                    </span>
                    <span class="flex items-center justify-between">
                        <label> Week: </label>
                        <p class="font-bold"> 0 </p>
                    </span>
                    <span class="flex items-center justify-between">
                        <label> Month: </label>
                        <p class="font-bold"> 0 </p>
                    </span>
                </div>
            </section>

            <section class="card-1 col-span-8 row-span-6">  <!-- Total Diets Entries -->
                <Datatable :value="total_diets_wards" scrollable scrollHeight="400px">
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h5 class="m-0"> Total Diet Entries </h5>
                        </div>
                    </template>
                    <div v-if="total_diets_wards_error">
                        <p>Error Loading Total Diets Entries</p>
                    </div>
                    <Column field="wardname" header="Ward" class="text-xs" />
                    <column header="Entries / # of Patients">
                        <template #body="slotProps">
                            <div class="flex text-xs justify-end">
                                {{ slotProps.data.entries ? slotProps.data.entries : 0 }} / {{ slotProps.data.total }}
                            </div>
                        </template>
                    </column>
                </Datatable>
            </section>

            <section class="card-1 col-span-4 row-span-4">  <!-- Total Diets -->
                <h5 class="text-lg"> Total Diets </h5>
                <div class="ml-4 text-sm">
                    <span class="flex items-center justify-between">
                        <label class="text-sm font-bold"> Oral: </label>
                        <p class="font-bold"> 0 </p>
                    </span>
                    <ul class="ml-4 mt-2 text-sm">
                        <li class="flex items-center justify-between">
                            <label> Full Diet: </label>
                            <p class="font-bold"> 0 </p>
                        </li>
                        <li class="flex items-center justify-between">
                            <label> Soft Diet: </label>
                            <p class="font-bold"> 0 </p>
                        </li>
                        <li class="flex items-center justify-between">
                            <label> Therapeutic Diet: </label>
                            <p class="font-bold"> 0 </p>
                        </li>
                        <li class="flex items-center justify-between">
                            <label> Liquid Diet: </label>
                            <p class="font-bold"> 0 </p>
                        </li>
                    </ul>
                    <Divider  type="dotted"/>
                    <span class="flex items-center justify-between mt-2">
                        <label class="font-bold"> Enteral: </label>
                        <p class="font-bold"> 0 </p>
                    </span>
                    <ul class="ml-4 mt-2">
                        <li class="flex items-center justify-between">
                            <label class="text-sm"> Blenderized: </label>
                            <p class="font-bold"> 0 </p>
                        </li>
                        <li class="flex items-center justify-between">
                            <label class="text-sm"> Standard Polymeric Formula: </label>
                            <p class="font-bold"> 0 </p>
                        </li>
                        <li class="flex items-center justify-between">
                            <label class="text-sm"> Cancer Specific Formmula: </label>
                            <p class="font-bold"> 0 </p>
                        </li>
                        <li class="flex items-center justify-between">
                            <label class="text-sm"> Diabetic Formula: </label>
                            <p class="font-bold"> 0 </p>
                        </li>
                        <li class="flex items-center justify-between">
                            <label class="text-sm"> Renal Specific Formula: </label>
                            <p class="font-bold"> 0 </p>
                        </li>
                        <li class="flex items-center justify-between">
                            <label class="text-sm"> Semi-elemental Formula: </label>
                            <p class="font-bold"> 0 </p>
                        </li>
                    </ul>
                </div>
            </section>
        </div>


    </div>
</template>



<style scoped>


</style>