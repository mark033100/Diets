
export const useFetchPatientNutritionScreening = (enccode: string) => {

    return useAsyncData('patientNutritionScreening', () => $fetch(`/api/patients-api/patients-nutritionScreening/${enccode}`));

}
