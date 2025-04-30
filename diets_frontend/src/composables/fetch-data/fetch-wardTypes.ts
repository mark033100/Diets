export const useFetchWardTypes = async () => {

  const result = ref();
  const runtimeconfig = useRuntimeConfig();

  const backendAPI = runtimeconfig.public.BACKEND_API;

  try {

    const wardTypes = await $fetch(`/api/generalData-api/api-wards`);

    result.value = {
      status: 'success',
      title: 'Ward types fetched successfully',
      description: 'You have successfully fetched ward types',
      error: null,
      data: wardTypes
    };

  } catch (error) {

    result.value = {
      status: 'error',
      title: 'Ward types fetch failed',
      description: 'Something went wrong during ward types fetch',
      error,
      data: null
    };
  }

  { return result.value }

}
