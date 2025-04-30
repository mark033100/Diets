export default defineEventHandler(async (event) => {


  const { BACKEND_API } = useRuntimeConfig();

  const uri = `${BACKEND_API}/api/v1/wards`;
  const authFetch = createAuthFetch(event);

  const result = await authFetch(uri, {
    method: 'GET',
  });

  return result;


})
