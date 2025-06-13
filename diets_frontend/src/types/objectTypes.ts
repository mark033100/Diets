export interface doctorsOrdeInputInterface {

    dietCategory: '1' | '2',
    dietType1: String | null,
    dietType2: String | null,
    dietCalories: String | null,
    dietVolume: String | null,
    dietDilution: String | null,
    nutrientsProtein: String | null,
    nutrientsCarbohydrates: String | null,
    nutrientsFat: String | null,
    nutrientsFiber: String | null,
    feedingMode: String | null,
    feedingDuration: String | null,
    feedingFrequency: String | null,
    allergyType: String | null,
    allergySubtype: String | null,
    precautions: String | null,
    snsType: String | null,
    snsFrequency: Array<String> | null,
    snsDescription: String | null,
    remarks: String | null,
    age: String | null,
    gender: String | null

}

export interface validationResult {
    isValid: boolean,
    errors: {
        field: string,
        message: string
    }[];
}


export interface errorFieldsInterface {
    diet: string,
    message: string
}


export interface requiredBodyInterface {
    hpercode: string,
    enccode: string,
    entryBy: string,
    remarks: string,
    dietCode1: string,
    dietCode2: string,
    protein: string,
    fiber: string,
    calories: string,
    dilution: string,
    carbohydrates: string,
    fats: string,
    sodium: string,
    volume: string,
    licno: string,
    allergy: string,
    onsFrequency: string,
    onsType: string,
    onsDescription: string,
    feedingMode: string,
    feedingDuration: string,
    feedingFrequency: string,
    priority: string,
    onsType2: string,
    precaution: string,
    reproductiveStat: string,
    previousDiet: string                        // Old Diet name used for showing what was selected and updated. 
}

export interface cookieUserInterface {
    employeeid: string,
    user_name: string,
    user_level: string,
    firstname: string,
    lastname: string,
    middlename: string,
    posttitle: string,
}

export interface nutritionScreeningInterface {
    screeningAnswers: Array<string>,
    enccode: string,
    height: string,
    weight: string,
    bmi: string,
    entry_by: string,
    age: string
}