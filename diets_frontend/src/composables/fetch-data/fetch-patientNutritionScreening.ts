
export const useFetchPatientNutritionScreening = (enccode: string) => {

    return useAsyncData('patientNutritionScreening', () => $fetch(`/api/patients-api/patients-nutritionScreening/${enccode}`));

}

export const fetchNutritionAssessmentReview = async (enccode: string) => {

    return useAsyncData('nutritionAssessmentReview', () => $fetch(`/api/patients-api/patients-nutritionAssessment/${enccode}`));
}
