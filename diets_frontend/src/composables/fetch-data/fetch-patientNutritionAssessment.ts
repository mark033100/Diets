export const useFetchPatientNutritionAssessment = async (enccode: string) => {

  const result = ref({});

  try {

    const fetchedData = await $fetch(`/api/patients-api/patients-nutritionAssessment/${enccode}`);

    return result.value = {
      status: 'success',
      title: 'Diet types fetched successfully',
      description: 'You have successfully fetched diet types',
      error: null,
      data: fetchedData
    }
  } catch (err: any) {

    return result.value = {
      status: 'error',
      title: 'Diet types fetch failed',
      description: 'Something went wrong during diet types fetch',
      error: err.data.error_message,
      data: null
    }
  }

  return

}