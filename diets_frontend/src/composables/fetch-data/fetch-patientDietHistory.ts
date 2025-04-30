
export const useFetchPatientDietHistory = (hpercode: string) => {

  return useAsyncData('patientDietHistory', () => $fetch(`/api/patients-api/patients-dietHistory/${hpercode}`));

}
