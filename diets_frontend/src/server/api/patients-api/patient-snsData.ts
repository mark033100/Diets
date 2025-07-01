export default defineEventHandler(async (event) => {

  const query = getQuery(event);

  const enccode = query.enccode as string;

  const { BACKEND_API } = useRuntimeConfig();
  const uri = `${BACKEND_API}/api/patient/`;

  const result = await $fetch(uri, {
    method: 'POST',
    body: {
      enccode: enccode,
    }
  });

  return result || 'No enccode provided';
})
