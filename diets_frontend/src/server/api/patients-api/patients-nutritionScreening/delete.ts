export default defineEventHandler(async (event): Promise<any> => {


  const body = await readBody(event);
  const { BACKEND_API } = useRuntimeConfig();


  const uri = `${BACKEND_API}/api/delete-nutrition-screening/${body.id}`;
  const authFetch = createAuthFetch(event);

  const result = await authFetch(uri, {
    method: 'DELETE'
  });

  return result;

})
