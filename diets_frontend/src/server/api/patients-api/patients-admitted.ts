export default defineEventHandler(async () => {
  const { BACKEND_API } = useRuntimeConfig();
  const uri = `${BACKEND_API}/api/patients-admitted`;
  const patients = await $fetch(uri);
  return patients;
});