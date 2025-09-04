export default defineEventHandler(async (event) => {

    const body = await readBody(event);
    const config = useRuntimeConfig();

    const result = await $fetch(`${config.BACKEND_API}/api/save-doctors-order-draft`, {
        method: 'POST',
        body

    });

    return body;

})

