import type { doctorsOrdeInputInterface, validationResult } from '@/types/objectTypes';



export const useDoctorsOrderValidation = (selectedInputs: doctorsOrdeInputInterface): validationResult => {

    let isValid = false;
    const errors: { field: string; message: string }[] = [];
    const addErrors = (field: string, message: string) => {
        errors.push({
            field,
            message
        });
    }

    // If Oral
    if (selectedInputs.dietCategory === '1') {
        // If Therapeutic Diet, Diet Type 2 is Required
        if (selectedInputs.dietType1 === '46' && !selectedInputs.dietType2) {
            addErrors('dietType2', 'Select the Therapeutic Diet Type.');
        } else {
            // If Standard
            isValid = validateGeneralInputs();
        }
    }

    // If Enteral
    else if (selectedInputs.dietCategory === '2') {
        isValid = validateDietRequirements() && validateGeneralInputs();
    }

    return { isValid, errors };


    // If Continuos: Duration and Frequency is not Required
    function validateDietRequirements(): boolean {


        // If Feeding Mode is Continuous
        if (selectedInputs.feedingMode === '01') {
            return !!selectedInputs.dietDilution;
        }

        return !!selectedInputs.feedingDuration && !!selectedInputs.feedingFrequency && !!selectedInputs.dietDilution && !!selectedInputs.feedingMode

    }


    function validateGeneralInputs(): boolean {

        if (!selectedInputs.dietType1) {
            addErrors('dietType1', 'Please select a diet type.');
            return false;
        }

        if (!validateNutrients()) {
            addErrors('nutrients', 'Please make sure to fill in all nutrient fields.');
            return false;
        }

        if (!validateAllergy()) {
            addErrors('nutrients', 'Please make sure to fill the allergy field.');
            return false;
        }

        if (!validateSNS()) {
            addErrors('nutrients', 'Please make sure to fill in all required fields for SNS.');
            return false;
        }

        return true;
    }



    function validateNutrients(): boolean {
        if (Number(selectedInputs.age) < 1) return true;

        if (selectedInputs.nutrientsProtein) {
            if (selectedInputs.snsType || selectedInputs.dietCategory === '1') { // Carbs and Fats are not required if SNS is selected or if Diet Category is Oral
                return true;
            } else {
                return selectedInputs.nutrientsFat && selectedInputs.nutrientsCarbohydrates && selectedInputs.dietCalories ? true : false;
            }
        }
        addErrors('nutrients', 'Please make sure to fill in all nutrient fields.');
        return false;
    };


    function validateAllergy(): boolean {

        return selectedInputs.allergyType === '10' ? !!selectedInputs.allergySubtype : !!selectedInputs.allergyType;

    }

    function validateSNS(): boolean {

        return selectedInputs.snsType ? !!selectedInputs.snsFrequency : true;

    }

}


