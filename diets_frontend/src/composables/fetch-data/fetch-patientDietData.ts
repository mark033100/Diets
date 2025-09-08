
export const useFetchPatientDietData = async (enccode: string) => {



    const formattedEnccode = encodeURIComponent(enccode);

    try {

        const patientsAdmittedResults = await $fetch(`/api/patients-api/patients-dietData/${formattedEnccode}`);

        return {
            status: 'success',
            title: 'Patients Diet fetched successfully',
            description: 'You have successfully fetched patient diet data',
            error: null,
            data: patientsAdmittedResults
        };

    } catch (error) {

        return {
            status: 'error',
            title: 'Patients Diet fetch failed',
            description: 'Something went wrong during patient diet data fetch',
            error,
            data: null
        };
    }

}

