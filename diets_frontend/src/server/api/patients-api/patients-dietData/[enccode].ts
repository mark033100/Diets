export default defineEventHandler(async (event) => {

  const params = event.context.params;

  const { BACKEND_API } = useRuntimeConfig();
  const uri = `${BACKEND_API}/api/patient/`;

  // const result = await $fetch(uri, {
  //   params: {
  //     enccode: params?.enccode,
  //   }
  // });

  return 'test 2';
})
