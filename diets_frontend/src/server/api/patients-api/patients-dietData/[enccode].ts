export default defineEventHandler(async (event) => {

  const params = event.context.params;

  const { BACKEND_API } = useRuntimeConfig();

  const uri = `${BACKEND_API}/api/v1/patients-diet/${params?.enccode}`;


  const result = await $fetch(uri);
  return result;
})
