
export default defineEventHandler(async (event) => {



  try {
    const { enccode } = getQuery(event);
    const { BACKEND_API } = useRuntimeConfig();

    if (!enccode) {
      throw createError({ statusCode: 400, statusMessage: "Missing enccode parameter" });
    }

    const uri = `${BACKEND_API}/api/patient-nutrition-assessment/${enccode}`;
    const result = await $fetch(uri);
    return result;

  } catch (error: any) {

    throw createError({ statusCode: 500, statusMessage: "Failed to fetch patient Nutrition Screening Data from API." + error, data: error.data.error_message });

  }

});