export const useFetchDietTypes = async () => {

  const result = ref();

  try {

    const dietTypes = await $fetch(`/api/generalData-api/api-dietTypes`);

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
