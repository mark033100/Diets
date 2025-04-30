import { ref } from 'vue';

export default defineEventHandler(async (event) => {

  const result = ref();

  try {
    const { hpercode } = event.context.params!;
    const { BACKEND_API } = useRuntimeConfig();

    if (!hpercode) {
      throw createError({ statusCode: 400, statusMessage: "Missing enccode parameter" });
    }

    const uri = `${BACKEND_API}/api/v1/patients-diet-history/${hpercode}`;
    result.value = await $fetch(uri);
    return result.value;

  } catch (error) {

    return createError({ statusCode: 500, statusMessage: "Failed to fetch diet history from API", data: error });

  }

});
