export const useFetchAdmittedPatients = async () => {

  const result = ref();
  const runtimeconfig = useRuntimeConfig();


  try {

    const patientsAdmittedResults = await $fetch(`/api/doctors-api/patients-admitted`);

    result.value = {
      status: 'success',
      title: 'Diet types fetched successfully',
      description: 'You have successfully fetched diet types',
      error: null,
      data: patientsAdmittedResults
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

