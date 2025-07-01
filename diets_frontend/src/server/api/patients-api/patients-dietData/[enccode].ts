export default defineEventHandler(async (event) => {

  const { enccode } = getRouterParams(event)
  const decoded = decodeURIComponent(enccode)

  const { BACKEND_API } = useRuntimeConfig();
  const uri = `${BACKEND_API}/api/patient/${decoded}`;

  const result = await $fetch(uri, {
    method: 'GET',
  });

  return result;
})
