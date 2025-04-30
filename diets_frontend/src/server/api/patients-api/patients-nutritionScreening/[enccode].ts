import { ref } from 'vue';

export default defineEventHandler(async (event) => {

  const result = ref();

  try {
    const { enccode } = event.context.params!;
    const { BACKEND_API } = useRuntimeConfig();

    if (!enccode) {
      throw createError({ statusCode: 400, statusMessage: "Missing enccode parameter" });
    }

    const uri = `${BACKEND_API}/api/v1/patients-nutrition-screening/${enccode}`;
    result.value = await $fetch(uri);
    return result.value;

  } catch (error) {

    return createError({ statusCode: 500, statusMessage: "Failed to fetch patient Nutrition Screening from API", data: error });

  }

});
