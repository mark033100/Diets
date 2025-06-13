import type { nutritionScreeningInterface } from '~/types/objectTypes';


export const useCrudNutritionScreening = () => {


  const create_NutritionScreening = async (form: nutritionScreeningInterface) => {

    try {

      verifyForm_ScreeningAnswers(form.screeningAnswers);
      const riskIndicator = checkRiskIndicator(form.screeningAnswers, form.age);
      const result = await $fetch('/api/patients-api/patients-nutritionScreening/post', {
        method: 'POST',
        body: { ...form, 'riskIndicator': riskIndicator }
      });

      return {
        status: 'success',
        title: 'Nutrition Screening Created Successfully',
        description: 'You have successfully created a Nutrition Screening',
        error: null,
        data: result
      }

    } catch (error: any) {
      return {
        status: 'error',
        title: 'Nutrition Screening Creation Failed',
        description: 'Invalid Screening Answers',
        error: error,
        data: null
      }
    }
  }

  const get_NutritionScreening = (enccode: string) => {

    return useAsyncData('patientNutritionScreening', () => $fetch(`/api/patients-api/patients-nutritionScreening/${enccode}`));

  }

  const update_NutritionScreening = async (event: any) => {
    // Currently not required

  }

  const delete_NutritionScreening = async (id: string) => {

    try {

      const result = await $fetch(`/api/patients-api/patients-nutritionScreening/delete`, {
        method: 'POST',
        body: { id },
      });

      return {
        status: 'success',
        title: 'Deleted Successfully',
        description: 'Nutrition Screening was deleted successfully.',
        error: null,
        data: result
      }

    } catch (error) {
      return {
        status: 'error',
        title: 'Nutrition Screening Deletion Failed',
        description: 'An Error Occured During Deletion',
        error: error,
        data: null
      }
    }

  }



  // Helper functions 

  const verifyForm_ScreeningAnswers = (answers: Array<string>) => {

    if (answers.some((ans) => !ans)) {
      throw createError({ statusCode: 400, statusMessage: `Invalid or Incomplete Screening Answer` });
    }

    return

  };

  const checkRiskIndicator = (answers: Array<string>, age: string) => {

    const _answers = Array.from(answers);

    return Number(age) > 18
      ? _answers.some(ans => ans === 'Y') ? 'Nutritionally at Risk' : 'Not at Risk'
      : _answers.filter(ans => ans === 'Y').length >= 2 ? 'Nutritionally at Risk' : 'Not at Risk';

  }



  return {
    create_NutritionScreening,
    get_NutritionScreening,
    update_NutritionScreening,
    delete_NutritionScreening
  }


}
