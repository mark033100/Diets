export default defineEventHandler(async (event): Promise<any> => {


  const body = await readBody(event);
  const { BACKEND_API } = useRuntimeConfig();

  const uri = `${BACKEND_API}/api/save-nutrition-screening`;
  const authFetch = createAuthFetch(event);

  const result = await authFetch(uri, {
    method: 'POST',
    body: JSON.stringify(body)
  });

  return result;

})
