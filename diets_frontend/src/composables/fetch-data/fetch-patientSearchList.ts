
export const useFetchPatientSearchList = async () => {

  const result = ref();

  try {

    const data = await $fetch(`/api/patients-api/api-patientSearchList`);

    result.value = {
      status: 'success',
      title: 'Diet types fetched successfully',
      description: 'You have successfully fetched diet types',
      error: null,
      data: formatNullDiets(data)
    };

  } catch (error) {

    result.value = {
      status: 'error',
      title: 'Diet types fetch failed',
      description: 'Something went wrong during diet types fetch',
      error,
      data: null
    };
  }

  { return result.value }

}
