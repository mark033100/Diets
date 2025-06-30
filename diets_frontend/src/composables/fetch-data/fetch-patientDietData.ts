
export const useFetchPatientDietData = async (enccode: string) => {

  const result = ref();

  try {

    const patientsAdmittedResults = await $fetch(`/api/patients-api/patients-dietData/fetch`, {
      params: {
        enccode
      }
    });

    result.value = {
      status: 'success',
      title: 'Patients Diet fetched successfully',
      description: 'You have successfully fetched patient diet data',
      error: null,
      data: patientsAdmittedResults
    };

  } catch (error) {

    result.value = {
      status: 'error',
      title: 'Patients Diet fetch failed',
      description: 'Something went wrong during patient diet data fetch',
      error,
      data: null
    };
  }

  return result.value;

}

