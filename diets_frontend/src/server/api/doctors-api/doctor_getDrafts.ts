export default defineEventHandler(async (event) => {

    const routeParam = getQuery(event)
    const emp_id = routeParam.emp_id
    if (!emp_id) {
        throw createError({ statusCode: 400, statusMessage: 'Employee ID is required' });
    }

    const config = useRuntimeConfig();

    const result = await $fetch(`${config.BACKEND_API}/api/get-doctors-order-draft/${emp_id}`);



    return result;
})
