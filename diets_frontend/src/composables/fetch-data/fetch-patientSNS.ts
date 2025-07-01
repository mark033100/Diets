export const useFetchPatientSNS = async (docointkey: any) => {

  const result = ref();
  const runtimeconfig = useRuntimeConfig();

  const backendAPI = runtimeconfig.public.BACKEND_API;

  try {

    const dietTypes = await $fetch(`${backendAPI}/api/doctors-orders-sns/${docointkey}`, {
      method: 'GET',
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`
    });

    result.value = {
      status: 'success',
      title: 'Diet types fetched successfully',
      description: 'You have successfully fetched diet types',
      error: null,
      data: dietTypes
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
