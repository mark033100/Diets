export const useFetchReproductiveStatus = async (enccode) => {

  const result = ref();
  const runtimeconfig = useRuntimeConfig();
  const backendAPI = runtimeconfig.public.BACKEND_API;

  try {

    const patientStatusResults = await $fetch(`${backendAPI}/api/getPatientReproductiveStatus/${enccode}`);

    if (patientStatusResults.summary === 'success') {
      result.value = {
        status: 'success',
        title: 'Maternal Data fetched successfully',
        description: 'You have successfully fetched Maternal Data',
        error: null,
        data: patientStatusResults.data
      }
    } else if (patientStatusResults.summary === 'error') {
      result.value = {
        status: 'error',
        title: 'Maternal Data fetched failed',
        description: 'You have failed in fetching Maternal Data',
        error: patientStatusResults.detail,
        data: []
      }
    }

  } catch (error) {

    result.value = {
      status: 'error',
      title: 'Patients Diet fetch failed',
      description: 'Something went wrong during patient diet data fetch',
      error,
      data: null
    };
  }

  { return result.value }
}
