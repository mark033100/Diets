

export default defineEventHandler(async (event): Promise<unknown> => {

  const { BACKEND_API } = useRuntimeConfig();

  const uri = `${BACKEND_API}/api/doctors-orders-total`;
  const authFetch = createAuthFetch(event);

  const result: unknown = await authFetch(uri, {
    method: 'GET',
  });

  return result;
})
