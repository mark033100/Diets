import get from "../patients-api/patients-nutritionAssessment/get";

export default defineEventHandler(async (event) => {

    const id = getQuery(event).id;

    const config = useRuntimeConfig();

    const result = await $fetch(`${config.BACKEND_API}/api/delete-doctors-order-draft/${id}`, {
        method: 'DELETE',

    });

    return result;

})

